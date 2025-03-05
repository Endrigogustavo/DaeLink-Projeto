package com.daelink.api.useCase.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.daelink.api.entity.model.companyEntity;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;

@Service
public class companyService {
    private final Firestore firestore;

    public companyService(Firestore firestore) {
        this.firestore = firestore;
    }

    public List<companyEntity> getAllCompanies() throws ExecutionException, InterruptedException {
        return firestore.collection("Empresa").get().get().getDocuments()
            .stream()
            .map(document -> {
                companyEntity companies = document.toObject(companyEntity.class);
                companies.setId(document.getId());
                return companies;
            })
            .toList();
    }

    public companyEntity getCompanyById(String id) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = firestore.collection("Empresa").document(id).get().get();
        companyEntity company = document.toObject(companyEntity.class);
        company.setId(document.getId());
        return company;
    }

}
