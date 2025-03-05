package com.daelink.api.adapter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daelink.api.useCase.service.peopleWithDisabilityService;

@RestController
@RequestMapping("/peopleWithDisability")
public class peopleWithDisabilityController {
    @Autowired
    private peopleWithDisabilityService service;
    
    @GetMapping("/getMyProfile")
    public ResponseEntity<?> getMyProfile(@CookieValue(name = "token", defaultValue="null") String id) {
        try {
            return ResponseEntity.ok(service.getPeopleWithDisabilityById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar empresa " + e.getMessage());
        }
    }

    @GetMapping("/getProfileById/{id}")
    public ResponseEntity<?> getProfileById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getPeopleWithDisabilityById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar empresa " + e.getMessage());
        }
    }

    @GetMapping("/getAllProfile")
    public ResponseEntity<?> getAllProfiles() {
        try {
            return ResponseEntity.ok(service.getAllPeopleWithDisability());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar empresa " + e.getMessage());
        }
    }

    @PutMapping("/updateMyProfile")
    public String updateMyProfile() {
        return "My Profile";
    }

    @DeleteMapping("/deleteMyProfile")
    public String deleteMyProfile() {
        return "My Profile";
    }

}
