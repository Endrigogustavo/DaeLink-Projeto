package com.daelink.api.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "candidacy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CandidacyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vaga_id", nullable = false)
    private JobEntity vaga;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pcd_id", nullable = false)
    private PeopleWithSpecialNeedEntity candidato;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime dataCandidatura = LocalDateTime.now();

    @Column(length = 50, nullable = false)
    private String status = "Pendente";
}
