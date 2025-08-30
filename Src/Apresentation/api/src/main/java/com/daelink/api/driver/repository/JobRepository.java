package com.daelink.api.driver.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.JobEntity;

public interface JobRepository extends JpaRepository<JobEntity, String> {
    Optional<List<JobEntity>> findByTitle(String title);
    List<JobEntity> findByUserId(String userId);
}
