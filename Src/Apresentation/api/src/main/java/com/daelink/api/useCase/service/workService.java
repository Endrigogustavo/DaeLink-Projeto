package com.daelink.api.useCase.service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.daelink.api.entity.model.candidateEntity;
import com.daelink.api.entity.model.companyEntity;
import com.daelink.api.entity.model.workEntity;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
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

    public workEntity getWorkById(String id) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = firestore.collection("Vagas").document(id).get().get();
        workEntity vaga = document.toObject(workEntity.class);
        vaga.setWorkId(document.getId());
        return vaga;
    }

    public List<candidateEntity> viewPeopleInWork(String id) throws ExecutionException, InterruptedException {
        return firestore.collection("Vagas").document(id).collection("candidatos").get().get().getDocuments()
                .stream()
                .map(document -> {
                    candidateEntity work = document.toObject(candidateEntity.class);
                    work.setCandidateId(document.getId());
                    return work;
                })
                .collect(Collectors.toList());
    }

    public List<workEntity> getVagasByEmpresa(String empresaId) throws ExecutionException, InterruptedException {
        return firestore.collection("Vagas")
                .whereEqualTo("empresaId", empresaId)
                .get().get().getDocuments()
                .stream()
                .map(document -> {
                    workEntity vaga = document.toObject(workEntity.class);
                    if (vaga != null) {
                        vaga.setWorkId(document.getId());
                    }
                    return vaga;
                })
                .collect(Collectors.toList());
    }

    public String createWork(workEntity work, String empresaId) throws InterruptedException, ExecutionException {
        work.setEmpresaId(empresaId);
        work.setStatus("Aberta");
        CollectionReference usersCollection = firestore.collection("Vagas");
        usersCollection.add(work).get();
        return "Vaga de trabalho salva com sucesso!";
    }
}
