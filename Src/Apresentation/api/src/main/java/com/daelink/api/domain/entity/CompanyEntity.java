package com.daelink.api.domain.entity;

import java.util.UUID;

import com.daelink.api.domain.enums.UserType;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "company")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) 
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "O CNPJ é obrigatório")
    @Size(min = 14, max = 18, message = "O CNPJ deve ter entre 14 e 18 caracteres")
    @Column(unique = true, nullable = false, length = 18)
    private String cnpj;

    @NotBlank(message = "O nome é obrigatório")
    @Column(nullable = false, length = 120)
    private String nome;

    @Email(message = "E-mail inválido")
    @NotBlank(message = "O e-mail é obrigatório")
    @Column(unique = true, nullable = false, length = 150)
    private String email;

    @NotBlank(message = "A área é obrigatória")
    @Column(nullable = false, length = 100)
    private String area;

    @NotBlank(message = "O endereço é obrigatório")
    @Column(nullable = false, length = 200)
    private String endereco;

    @NotBlank(message = "O CEP é obrigatório")
    @Size(min = 8, max = 9, message = "O CEP deve ter 8 ou 9 caracteres")
    @Column(nullable = false, length = 9)
    private String cep;

    @Column(columnDefinition = "TEXT")
    private String sobre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserType tipo;

    private String imageProfile;

    private String imageUrl;
}
