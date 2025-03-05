package com.daelink.api.adapter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daelink.api.useCase.service.companyService;

@RestController
@RequestMapping("/company")
public class companyController {
    @Autowired
    private companyService service;

    @GetMapping("/getAllCompanies")
    public ResponseEntity<?> getAllCompany() {
        try {
            return ResponseEntity.ok(service.getAllCompanies());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar empresas " + e.getMessage());
        }
    }

    @GetMapping("/getCompanyById/{id}")
    public ResponseEntity<?> getCompanyById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getCompanyById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar empresa " + e.getMessage());
        }
    }

    @GetMapping("/getMyCompany")
    public ResponseEntity<?> getMyCompany(@CookieValue(name = "token", defaultValue="null") String id) {
        try {
            return ResponseEntity.ok(service.getCompanyById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar empresa " + e.getMessage());
        }
    }

    @PostMapping("/create")
    public String createCompany() {
        return "Company";
    }

    @PutMapping("/update")
    public String updateCompany() {
        return "Company";
    }
}
