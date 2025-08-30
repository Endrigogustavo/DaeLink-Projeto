package com.daelink.api.useCase.service.peopleWithSpecialNeed;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.daelink.api.domain.entity.PeopleWithSpecialNeedEntity;
import com.daelink.api.driver.repository.PeopleWithSpecialNeedRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ShowPeopleWithSpecialNeed {
    private final PeopleWithSpecialNeedRepository repository;

    public PeopleWithSpecialNeedEntity getById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "People with special needs not found"));
    }

    public List<PeopleWithSpecialNeedEntity> getAll() {
        return repository.findAll();
    }

    public List<PeopleWithSpecialNeedEntity> getByIds(List<String> ids) {
        return repository.findAllById(ids);
    }

    public PeopleWithSpecialNeedEntity getByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "People with special needs not found"));}

    public List<PeopleWithSpecialNeedEntity> getByName(String name) {
        return repository.findByName(name);
    }

    public PeopleWithSpecialNeedEntity getByCpf(String cpf) {
        return repository.findByCpf(cpf)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "People with special needs not found"));
    }
}
