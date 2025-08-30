package com.daelink.api.driver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.JobEntity;

public interface JobRepository extends JpaRepository<JobEntity, String> {

}
