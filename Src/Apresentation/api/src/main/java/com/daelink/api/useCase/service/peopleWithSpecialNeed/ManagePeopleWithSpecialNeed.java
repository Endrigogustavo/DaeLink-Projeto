package com.daelink.api.useCase.service.peopleWithSpecialNeed;

import org.springframework.stereotype.Service;

import com.daelink.api.domain.entity.PeopleWithSpecialNeedEntity;
import com.daelink.api.driver.repository.PeopleWithSpecialNeedRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ManagePeopleWithSpecialNeed {
    private final PeopleWithSpecialNeedRepository peopleWithSpecialNeedRepository;

    public PeopleWithSpecialNeedEntity createPeopleWithSpecialNeed(PeopleWithSpecialNeedEntity entity) {
        return peopleWithSpecialNeedRepository.save(entity);
    }

    public void deletePeopleWithSpecialNeed(String id) {
        peopleWithSpecialNeedRepository.deleteById(id);
    }

    public void updatePeopleWithSpecialNeed(String id, PeopleWithSpecialNeedEntity entity) {
        PeopleWithSpecialNeedEntity existingEntity = peopleWithSpecialNeedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("People with special needs not found"));

        entity.setId(existingEntity.getId());
        peopleWithSpecialNeedRepository.save(entity);
    }
}
