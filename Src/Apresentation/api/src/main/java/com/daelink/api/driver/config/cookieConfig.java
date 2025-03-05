package com.daelink.api.driver.config;

import org.springframework.context.annotation.Configuration;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class cookieConfig {

    public void CreateCookies( HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("token", token);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(60 * 60 * 24 * 30);
        response.addCookie(cookie);
    }

    public void DeleteCookies(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    
}