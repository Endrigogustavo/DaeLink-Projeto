package com.daelink.api.adapter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/work")
public class workController {
    
    @GetMapping("/getAllWorks")
    public String getAllWorks() {
        return "Works";
    }

    @GetMapping("/getWorkById")
    public String getWorkById() {
        return "Work";
    }

    @PostMapping("/create")
    public String createWork() {
        return "Work";
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

    @GetMapping("/viewPeopleInWork")
    public String viewPeopleInWork() {
        return "Work";
    }

    @GetMapping("/getMyWorks")
    public String getMyWorks() {
        return "Work";
    }

}
