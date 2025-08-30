package com.daelink.api.domain.entity;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "document")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pcd_id", nullable = false)
    private PeopleWithSpecialNeedEntity candidato;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vaga_id", nullable = false)
    private JobEntity vaga;

    @Column(length = 20)
    private String telefone;

    @ElementCollection
    @CollectionTable(name = "document_habilidades", joinColumns = @JoinColumn(name = "document_id"))
    @Column(name = "habilidade")
    private List<String> habilidades;

    @ElementCollection
    @CollectionTable(name = "document_certificacoes", joinColumns = @JoinColumn(name = "document_id"))
    @Column(name = "certificacao")
    private List<String> certificacoes;

    @ElementCollection
    @CollectionTable(name = "document_idiomas", joinColumns = @JoinColumn(name = "document_id"))
    @Column(name = "idioma")
    private List<String> idiomas;
}

