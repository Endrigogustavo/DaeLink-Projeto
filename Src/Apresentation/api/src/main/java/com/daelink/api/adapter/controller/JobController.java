package com.daelink.api.adapter.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daelink.api.domain.entity.JobEntity;
import com.daelink.api.useCase.service.job.ManageJob;
import com.daelink.api.useCase.service.job.ShowJob;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final ManageJob manageJob;
    private final ShowJob showJob;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobEntity>> getJobsByUser(@PathVariable String userId) {
        List<JobEntity> jobs = showJob.getByUserId(userId);
        if (jobs.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        return ResponseEntity.ok(jobs); 
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobEntity> getJobById(@PathVariable String jobId) {
        JobEntity job = showJob.getById(jobId);
        if (job == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(job);
    }

    @PostMapping
    public ResponseEntity<JobEntity> createJob(@RequestBody JobEntity job) {
        JobEntity createdJob = manageJob.createJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }
}
