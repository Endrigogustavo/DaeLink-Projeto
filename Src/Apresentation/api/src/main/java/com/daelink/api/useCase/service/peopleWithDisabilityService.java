package com.daelink.api.useCase.service;

import com.daelink.api.entity.model.companyEntity;
import com.daelink.api.entity.model.personWithDisabilityEntity;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;

@Service
public class peopleWithDisabilityService {
        private final Firestore firestore;

    public peopleWithDisabilityService(Firestore firestore) {
        this.firestore = firestore;
    }

    public List<personWithDisabilityEntity> getAllPeopleWithDisability() throws InterruptedException, ExecutionException {
         return firestore.collection("PCD").get().get().getDocuments()
            .stream()
            .map(document -> {
                personWithDisabilityEntity person = document.toObject(personWithDisabilityEntity.class);
                person.setId(document.getId());
                return person;
            })
            .toList();
    }

    public personWithDisabilityEntity getPeopleWithDisabilityById(String id) throws InterruptedException, ExecutionException {
        DocumentSnapshot document = firestore.collection("PCD").document(id).get().get();
        personWithDisabilityEntity person = document.toObject(personWithDisabilityEntity.class);
        person.setId(document.getId());
        return person;
    }
}
