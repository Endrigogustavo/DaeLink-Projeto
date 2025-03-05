package com.daelink.api.useCase.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.daelink.api.entity.model.workEntity;
import com.google.cloud.firestore.Firestore;

@Service
public class workService {
    private final Firestore firestore;

    public workService(Firestore firestore) {
        this.firestore = firestore;
    }

    public List<workEntity> getAllWorks() throws InterruptedException, ExecutionException {
        return firestore.collection("Vagas").get().get().getDocuments()
        .stream()
        .map(document -> {
            workEntity work = document.toObject(workEntity.class);
            work.setWorkId(document.getId());
            return work;
        })
        .toList();
    }


}
