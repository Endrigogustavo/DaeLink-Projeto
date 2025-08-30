package com.daelink.api.driver.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.PeopleWithSpecialNeedEntity;

public interface PeopleWithSpecialNeedRepository extends JpaRepository<PeopleWithSpecialNeedEntity, String> {
    Optional<PeopleWithSpecialNeedEntity> findByEmail(String email);
    Optional<PeopleWithSpecialNeedEntity> findByCpf(String cpf);
    List<PeopleWithSpecialNeedEntity> findByName(String name);
}
