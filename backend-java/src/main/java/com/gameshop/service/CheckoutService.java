package com.gameshop.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.gameshop.model.CheckoutRequest;
import com.gameshop.model.CheckoutResponse;
import com.gameshop.model.ContactMessage;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

/**
 * Serviço de compras da GamesShop.
 * Regras de negócio: desconto Pix 5%, frete grátis acima de R$199 (senão R$24,90).
 * Persistência no Supabase via REST quando SUPABASE_URL/SUPABASE_SERVICE_KEY
 * estiverem configurados; caso contrário roda em modo demo.
 */
@Service
public class CheckoutService {

    private static final Logger log = LoggerFactory.getLogger(CheckoutService.class);
    private static final BigDecimal FREE_SHIPPING_THRESHOLD = new BigDecimal("199.00");
    private static final BigDecimal SHIPPING_FEE = new BigDecimal("24.90");
    private static final BigDecimal PIX_DISCOUNT = new BigDecimal("0.05");

    private final RestClient restClient;
    private final String supabaseUrl;
    private final String supabaseKey;

    public CheckoutService(RestClient restClient,
                           @Value("${gameshop.supabase.url:}") String supabaseUrl,
                           @Value("${gameshop.supabase.service-key:}") String supabaseKey) {
        this.restClient = restClient;
        this.supabaseUrl = supabaseUrl == null ? "" : supabaseUrl.trim();
        this.supabaseKey = supabaseKey == null ? "" : supabaseKey.trim();
    }

    public boolean isSupabaseConfigured() {
        return !supabaseUrl.isEmpty() && !supabaseKey.isEmpty() && supabaseUrl.startsWith("http");
    }

    public BigDecimal calculateTotal(CheckoutRequest request) {
        BigDecimal subtotal = request.getItems().stream()
                .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQty())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal discount = "pix".equalsIgnoreCase(request.getCustomer().getPaymentMethod())
                ? subtotal.multiply(PIX_DISCOUNT)
                : BigDecimal.ZERO;

        BigDecimal shipping = subtotal.compareTo(FREE_SHIPPING_THRESHOLD) >= 0 || subtotal.signum() == 0
                ? BigDecimal.ZERO
                : SHIPPING_FEE;

        return subtotal.subtract(discount).add(shipping).setScale(2, RoundingMode.HALF_UP);
    }

    public CheckoutResponse checkout(CheckoutRequest request) {
        BigDecimal total = calculateTotal(request);

        if (isSupabaseConfigured()) {
            try {
                String payload = toJsonPayload(request, total);
                JsonNode saved = restClient.post()
                        .uri(supabaseUrl + "/rest/v1/orders")
                        .header("apikey", supabaseKey)
                        .header("Authorization", "Bearer " + supabaseKey)
                        .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                        .header("Prefer", "return=representation")
                        .body(payload)
                        .retrieve()
                        .body(JsonNode.class);

                String orderId = (saved != null && saved.isArray() && saved.get(0).has("id"))
                        ? saved.get(0).get("id").asText()
                        : "SB-" + System.currentTimeMillis();
                log.info("Pedido {} gravado no Supabase (total R$ {})", orderId, total);
                return new CheckoutResponse(orderId, "pending", total, "supabase");
            } catch (Exception e) {
                log.error("Falha ao gravar pedido no Supabase: {}", e.getMessage());
                throw new RuntimeException("Não foi possível registrar o pedido agora. Tente novamente.", e);
            }
        }

        String orderId = "DEMO-" + Long.toString(System.currentTimeMillis(), 36).toUpperCase();
        log.info("Modo demo: pedido {} gerado sem persistência (total R$ {})", orderId, total);
        return new CheckoutResponse(orderId, "paid-demo", total, "demo");
    }

    public Map<String, Object> saveContactMessage(ContactMessage message) {
        if (isSupabaseConfigured()) {
            try {
                restClient.post()
                        .uri(supabaseUrl + "/rest/v1/contact_messages")
                        .header("apikey", supabaseKey)
                        .header("Authorization", "Bearer " + supabaseKey)
                        .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                        .body(Map.of(
                                "name", message.getName(),
                                "email", message.getEmail(),
                                "phone", message.getPhone() == null ? "" : message.getPhone(),
                                "message", message.getMessage()))
                        .retrieve()
                        .toBodilessEntity();
                return Map.of("ok", true, "source", "supabase");
            } catch (Exception e) {
                log.warn("Falha ao gravar mensagem no Supabase: {}", e.getMessage());
            }
        }
        log.info("Mensagem de contato recebida de {} <{}>", message.getName(), message.getEmail());
        return Map.of("ok", true, "source", "demo");
    }

    private String toJsonPayload(CheckoutRequest r, BigDecimal total) {
        StringBuilder items = new StringBuilder("[");
        for (int i = 0; i < r.getItems().size(); i++) {
            CheckoutRequest.Item it = r.getItems().get(i);
            if (i > 0) items.append(',');
            items.append(String.format(
                    "{\"productId\":\"%s\",\"name\":\"%s\",\"price\":%s,\"qty\":%d}",
                    escape(it.getProductId()), escape(it.getName() == null ? "" : it.getName()),
                    it.getPrice(), it.getQty()));
        }
        items.append(']');
        CheckoutRequest.Customer c = r.getCustomer();
        return String.format(
                "{\"customer_name\":\"%s\",\"customer_email\":\"%s\",\"customer_phone\":\"%s\","
              + "\"address\":\"%s\",\"payment_method\":\"%s\",\"items\":%s,\"total\":%s,\"status\":\"pending\"}",
                escape(c.getName()), escape(c.getEmail()), escape(nvl(c.getPhone())),
                escape(c.getAddress()), escape(nvl(c.getPaymentMethod())), items, total);
    }

    private static String nvl(String s) { return s == null ? "" : s; }

    private static String escape(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", " ");
    }
}
