package com.daelink.api.domain.entity;

import java.time.LocalDate;
import java.util.UUID;

import com.daelink.api.domain.enums.UserType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "people_with_special_need")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PeopleWithSpecialNeedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "O CPF é obrigatório")
    @Size(min = 11, max = 14, message = "O CPF deve ter entre 11 e 14 caracteres")
    @Column(unique = true, nullable = false, length = 14)
    private String cpf;

    @NotBlank(message = "O campo deficiência é obrigatório")
    @Column(nullable = false, length = 100)
    private String deficiencia;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @NotBlank(message = "O nome é obrigatório")
    @Column(nullable = false, length = 120)
    private String nome;

    @Email(message = "E-mail inválido")
    @NotBlank(message = "O e-mail é obrigatório")
    @Column(unique = true, nullable = false, length = 150)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String experiencias;

    @Past(message = "A data de nascimento deve estar no passado")
    @Column(nullable = false)
    private LocalDate dataNascimento;

    private String imageProfile;

    private String imageUrl;

    private String laudomedico;

    @Column(columnDefinition = "TEXT")
    private String sobre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserType tipo;

    private String trabalho;

    
}
