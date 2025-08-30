package com.daelink.api.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

import com.daelink.api.domain.enums.Modality;
import com.daelink.api.domain.enums.JogStatus;

@Entity
@Table(name = "job")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "O nome da vaga é obrigatório")
    @Column(nullable = false, length = 150)
    private String vaga;

    @NotBlank(message = "A área é obrigatória")
    @Column(nullable = false, length = 100)
    private String area;

    @NotBlank(message = "O campo detalhes é obrigatório")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String detalhes;

    @NotBlank(message = "O nome da empresa é obrigatório")
    @Column(nullable = false, length = 150)
    private String empresa;

    @NotBlank(message = "O ID da empresa é obrigatório")
    @Column(nullable = false, length = 50)
    private String empresaId;

    @NotBlank(message = "As exigências são obrigatórias")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String exigencias;

    @NotBlank(message = "O local é obrigatório")
    @Column(nullable = false, length = 255)
    private String local;

    @DecimalMin(value = "0.0", inclusive = false, message = "O salário deve ser maior que zero")
    @Digits(integer = 10, fraction = 2, message = "O salário deve estar em formato válido")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal salario;

    @Enumerated(EnumType.STRING)
    @NotBlank(message = "O status é obrigatório")
    @Column(nullable = false, length = 50)
    private JogStatus status; 

    @Enumerated(EnumType.STRING)
    @NotBlank(message = "O tipo da vaga é obrigatório")
    @Column(nullable = false, length = 50)
    private Modality tipo; 
}
