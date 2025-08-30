package com.daelink.api.driver.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.DocumentEntity;

public interface DocumentRepository extends JpaRepository<DocumentEntity, String> {
    Optional<List<DocumentEntity>> findByTitle(String title);
}