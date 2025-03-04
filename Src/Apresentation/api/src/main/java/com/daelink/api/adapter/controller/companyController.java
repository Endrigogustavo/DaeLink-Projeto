package com.daelink.api.adapter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
            return ResponseEntity.badRequest().body("Erro ao buscar empresas");
        }
    }

    @GetMapping("/getCompanyById")
    public ResponseEntity<?> getCompanyById() {
        try {
            return ResponseEntity.ok(service.getCompanyById("u3wdvwj1ggaeoZ272POPq058Z0K3"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar empresa " + e.getMessage());
        }
    }

    @PostMapping("/craate")
    public String createCompany() {

        return "Company";
    }
}
