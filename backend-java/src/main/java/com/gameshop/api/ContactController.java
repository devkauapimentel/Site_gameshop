package com.gameshop.api;

import com.gameshop.model.ContactMessage;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gameshop.service.CheckoutService;

/** Endpoint do formulário de contato. */
@RestController
@RequestMapping("/api")
public class ContactController {

    private final CheckoutService service;

    public ContactController(CheckoutService service) {
        this.service = service;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> contact(@Valid @RequestBody ContactMessage message) {
        return ResponseEntity.ok(service.saveContactMessage(message));
    }
}
