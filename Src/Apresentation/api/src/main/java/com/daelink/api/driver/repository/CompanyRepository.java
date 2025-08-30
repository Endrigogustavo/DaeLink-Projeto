package com.daelink.api.driver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.CompanyEntity;

public interface CompanyRepository extends JpaRepository<CompanyEntity, String> {

}