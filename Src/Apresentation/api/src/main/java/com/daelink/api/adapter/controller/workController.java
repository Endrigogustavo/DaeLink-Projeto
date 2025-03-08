package com.daelink.api.adapter.controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daelink.api.entity.model.workEntity;

@RestController
@RequestMapping("/work")
public class workController {
    @Autowired
    private com.daelink.api.useCase.service.workService workService;
    
    @GetMapping("/getAllWorks")
    public ResponseEntity<?> getAllWorks() {
        try {
            return ResponseEntity.ok(workService.getAllWorks());
        } catch (InterruptedException | ExecutionException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getWorkById/{id}")
    public ResponseEntity<?> getWorkById(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(workService.getWorkById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createWork(@CookieValue(name = "token", defaultValue="null") String empresaId, @RequestBody workEntity work) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(workService.createWork(work, empresaId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/update")
    public String updateWork() {
        return "Work";
    }

    @PostMapping("/delete")
    public String deleteWork() {
        return "Work";
    }

    @PostMapping("/addUserToWork")
    public String addUserToWork() {
        return "Work";
    }

    @GetMapping("/viewPeopleInWork/{id}")
    public ResponseEntity<?> viewPeopleInWork(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(workService.viewPeopleInWork(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getMyWorks")
    public ResponseEntity<?> getMyWorks(@CookieValue(name = "token", defaultValue="null") String empresaId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(workService.getVagasByEmpresa(empresaId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
