package com.daelink.api.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "application")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "O ID da empresa é obrigatório")
    @Column(nullable = false, length = 50)
    private String empresaId;

    @NotBlank(message = "O ID do PCD é obrigatório")
    @Column(nullable = false, length = 50)
    private String pcdId;

    @NotBlank(message = "O ID da vaga é obrigatório")
    @Column(nullable = false, length = 50)
    private String vagaId;
}
