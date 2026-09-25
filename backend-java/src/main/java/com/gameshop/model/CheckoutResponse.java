package com.gameshop.model;

import java.math.BigDecimal;

/** Resposta padronizada do checkout para o front-end. */
public class CheckoutResponse {

    private String orderId;
    private String status;
    private BigDecimal total;
    private String source; // supabase | demo

    public CheckoutResponse() {}

    public CheckoutResponse(String orderId, String status, BigDecimal total, String source) {
        this.orderId = orderId;
        this.status = status;
        this.total = total;
        this.source = source;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}
