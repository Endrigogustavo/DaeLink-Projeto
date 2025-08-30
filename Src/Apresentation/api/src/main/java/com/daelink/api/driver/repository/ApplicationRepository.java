package com.daelink.api.driver.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.ApplicationEntity;

public interface ApplicationRepository extends JpaRepository<ApplicationEntity, String> {
    Optional<List<ApplicationEntity>> findByJobId(String jobId);
    Optional<List<ApplicationEntity>> findByUserId(String userId);
}