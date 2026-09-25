package com.gameshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * GamesShop Backend — API REST de e-commerce gamer.
 * Processa compras (checkout), mensagens de contato e integra-se
 * ao Supabase via REST quando as chaves estiverem configuradas.
 */
@SpringBootApplication
public class GamesShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamesShopApplication.class, args);
    }
}
