package com.daelink.api.useCase.service.job;

import java.util.List;

import org.springframework.stereotype.Service;

import com.daelink.api.domain.entity.JobEntity;
import com.daelink.api.driver.repository.JobRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ShowJob {
    private final JobRepository jobRepository;

    public JobEntity getById(String id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public List<JobEntity> getAll() {
        return jobRepository.findAll();
    }

    public List<JobEntity> getByIds(List<String> ids) {
        return jobRepository.findAllById(ids);
    }

    public List<JobEntity> getByTitle(String title) {
        return jobRepository.findByTitle(title);
    }
}
