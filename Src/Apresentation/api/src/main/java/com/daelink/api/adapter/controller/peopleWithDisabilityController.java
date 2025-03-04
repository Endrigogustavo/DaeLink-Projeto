package com.daelink.api.adapter.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/peopleWithDisability")
public class peopleWithDisabilityController {
    
    @GetMapping("/getMyProfile")
    public String getMyProfile() {
        return "My Profile";
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
