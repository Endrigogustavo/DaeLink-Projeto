package com.daelink.api.useCase.service.company;

import org.springframework.stereotype.Service;

import com.daelink.api.domain.entity.CompanyEntity;
import com.daelink.api.driver.repository.CompanyRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ManageCompany {
    private final CompanyRepository companyRepository;

    public CompanyEntity createCompany(CompanyEntity companyEntity) {
        return companyRepository.save(companyEntity);
    }

    public void deleteCompany(String id) {
        companyRepository.deleteById(id);
    }

    public void updateCompany(String id, CompanyEntity companyEntity) {
        CompanyEntity existingCompany = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        companyEntity.setId(existingCompany.getId());
        companyRepository.save(companyEntity);
    }
}
