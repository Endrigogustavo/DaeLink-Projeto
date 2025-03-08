package com.daelink.api.entity.model;

import java.util.Date;

import com.google.cloud.firestore.annotation.DocumentId;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@NoArgsConstructor
public class personWithDisabilityEntity {
    @DocumentId
    private String id;
    private String name;
    private String email;
    private String experiencias;
    private String idade;
    private String sobre;
    private String tipo;
    private String trabalho;
    private String deficiencia;
    private String descrição;
    private String imageProfile;
    private String imageUrl;
    private String laudo;
}
