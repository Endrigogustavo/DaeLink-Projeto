package com.daelink.api.useCase.service.application;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daelink.api.domain.entity.ApplicationEntity;
import com.daelink.api.domain.entity.JobEntity;
import com.daelink.api.driver.repository.ApplicationRepository;
import com.daelink.api.useCase.service.job.ShowJob;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ManageApplication {
    private final ApplicationRepository applicationRepository;
    private final ShowJob showJob;

    public ApplicationEntity getById(String id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
    }

    public List<ApplicationEntity> getAll() {
        return applicationRepository.findAll();
    }

    public List<ApplicationEntity> getByIds(List<String> ids) {
        return applicationRepository.findAllById(ids);
    }

    public List<ApplicationEntity> getByJobId(String jobId) {
        return applicationRepository.findByJobId(jobId)
                .orElseThrow(() -> new RuntimeException("Applications not found"));
    }

    public List<JobEntity> getByUserId(String userId) {
        Optional<List<ApplicationEntity>> vagasAplicadasOpt = applicationRepository.findByUserId(userId);
        List<String> jobIds = vagasAplicadasOpt
                .orElse(Collections.emptyList())
                .stream()
                .map(ApplicationEntity::getEmpresaId)
                .toList();

        return showJob.getByIds(jobIds);
    }
}
