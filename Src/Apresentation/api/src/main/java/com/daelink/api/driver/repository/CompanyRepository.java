package com.daelink.api.driver.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.CompanyEntity;

public interface CompanyRepository extends JpaRepository<CompanyEntity, String> {
    Optional<List<CompanyEntity>> findByName(String name);
}