package com.daelink.api.entity.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class workEntity {
    private String workId;
    private String empresaId;
    private String empresa;
    private String area;
    private String detalhes;
    private String local;
    private String exigencias;
    private String salario;
    private String status;
    private String tipo;
}
