package com.daelink.api.useCase.service.document;

import org.springframework.stereotype.Service;

import com.daelink.api.domain.entity.DocumentEntity;
import com.daelink.api.driver.repository.DocumentRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ManageDocument {
    private final DocumentRepository documentRepository;

    public DocumentEntity createDocument(DocumentEntity documentEntity) {
        return documentRepository.save(documentEntity);
    }

    public void deleteDocument(String id) {
        documentRepository.deleteById(id);
    }

    public void updateDocument(String id, DocumentEntity documentEntity) {
        DocumentEntity existingDocument = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        documentEntity.setId(existingDocument.getId());
        documentRepository.save(documentEntity);
    }
}
