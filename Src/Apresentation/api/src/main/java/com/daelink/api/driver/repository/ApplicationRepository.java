package com.daelink.api.driver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.ApplicationEntity;

public interface ApplicationRepository extends JpaRepository<ApplicationEntity, String> {

}