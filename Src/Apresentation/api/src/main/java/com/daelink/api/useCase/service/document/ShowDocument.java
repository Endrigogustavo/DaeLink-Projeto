package com.daelink.api.useCase.service.document;

import java.util.List;

import org.springframework.stereotype.Service;

import com.daelink.api.domain.entity.DocumentEntity;
import com.daelink.api.driver.repository.DocumentRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ShowDocument {
    private final DocumentRepository documentRepository;

    public DocumentEntity getById(String id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
    }

    public List<DocumentEntity> getAll() {
        return documentRepository.findAll();
    }

    public List<DocumentEntity> getByIds(List<String> ids) {
        return documentRepository.findAllById(ids);
    }

    public List<DocumentEntity> getByTitle(String title) {
        return documentRepository.findByTitle(title)
                .orElseThrow(() -> new RuntimeException("Document not found"));
    }
}
