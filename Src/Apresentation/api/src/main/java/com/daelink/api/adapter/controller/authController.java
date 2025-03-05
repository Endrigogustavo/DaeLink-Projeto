package com.daelink.api.adapter.controller;

import com.daelink.api.driver.config.cookieConfig;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Cookie;
import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class authController {
    @Autowired
    private cookieConfig cookieConfig;

    @GetMapping("/cookie/{token}")
    public ResponseEntity<?> cookie(@PathVariable String token, HttpServletResponse response) {
        try {
            cookieConfig.CreateCookies(response, token);
            return ResponseEntity.status(HttpStatus.OK).body("Cookie criado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        try {
            cookieConfig.DeleteCookies(response);
            return ResponseEntity.status(HttpStatus.OK).body("Logout realizado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getCookie")
    public ResponseEntity<?> getCookie(@CookieValue(name = "token", required = false) String token, HttpServletRequest request) {
        try {
            // Se o @CookieValue não capturar, tenta manualmente pelos cookies da requisição
            if (token == null || token.equals("null")) {
                Optional<Cookie> cookie = Arrays.stream(request.getCookies())
                        .filter(c -> c.getName().equals("token"))
                        .findFirst();

                token = cookie.map(Cookie::getValue).orElse("Nenhum cookie encontrado");
            }

            System.out.println("Token obtido: " + token);
            return ResponseEntity.status(HttpStatus.OK).body(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
