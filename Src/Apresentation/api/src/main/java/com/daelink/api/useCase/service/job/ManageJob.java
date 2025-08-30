package com.daelink.api.useCase.service.job;

import org.springframework.stereotype.Service;

import com.daelink.api.domain.entity.JobEntity;
import com.daelink.api.driver.repository.JobRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ManageJob {
    private final JobRepository jobRepository;

    public JobEntity createJob(JobEntity jobEntity) {
        return jobRepository.save(jobEntity);
    }

    public void deleteJob(String id) {
        jobRepository.deleteById(id);
    }

    public void updateJob(String id, JobEntity jobEntity) {
        JobEntity existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        jobEntity.setId(existingJob.getId());
        jobRepository.save(jobEntity);
    }
}
