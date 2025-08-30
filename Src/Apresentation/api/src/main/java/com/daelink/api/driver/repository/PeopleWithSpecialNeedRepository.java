package com.daelink.api.driver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daelink.api.domain.entity.PeopleWithSpecialNeedEntity;

public interface PeopleWithSpecialNeedRepository extends JpaRepository<PeopleWithSpecialNeedEntity, String> {

}
