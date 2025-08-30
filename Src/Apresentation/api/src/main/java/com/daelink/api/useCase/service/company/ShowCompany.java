package com.daelink.api.useCase.service.company;

import org.springframework.stereotype.Service;

import com.daelink.api.driver.repository.CompanyRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ShowCompany {
    private final CompanyRepository companyRepository;

    public CompanyEntity getById(String id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }

    public List<CompanyEntity> getAll() {
        return companyRepository.findAll();
    }

    public List<CompanyEntity> getByIds(List<String> ids) {
        return companyRepository.findAllById(ids);
    }

    public List<CompanyEntity> getByName(String name) {
        return companyRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }
}
