package com.gameshop.api;

import com.gameshop.model.CheckoutRequest;
import com.gameshop.model.CheckoutResponse;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gameshop.service.CheckoutService;

/** Endpoints de compra do e-commerce. */
@RestController
@RequestMapping("/api")
public class CheckoutController {

    private final CheckoutService service;

    public CheckoutController(CheckoutService service) {
        this.service = service;
    }

    /** Processa um novo pedido vindo do front React. */
    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponse> checkout(@Valid @RequestBody CheckoutRequest request) {
        CheckoutResponse response = service.checkout(request);
        return ResponseEntity.ok(response);
    }

    /** Healthcheck simples para monitoramento / deploy. */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "gameshop-backend",
                "supabaseConfigured", service.isSupabaseConfigured()));
    }
}
