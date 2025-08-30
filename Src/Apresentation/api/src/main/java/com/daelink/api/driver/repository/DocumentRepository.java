package com.daelink.api.driver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.DocumentEntity;

public interface DocumentRepository extends JpaRepository<DocumentEntity, String> {

}