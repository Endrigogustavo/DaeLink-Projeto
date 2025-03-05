package com.daelink.api.driver.document;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class swagger {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("DaeLink API")
                .description("API para o aplicativo DaeLink")
                .version("1.0")
                .contact(new Contact()
                    .name("Endrigo")
                    .url("https://www.kumowind.com")
                    .email("contato@kumowind.com"))
                .termsOfService("Termos de uso: Kumo Wind")
                .license(new License()
                    .name("Licença - Kumo Wind")
                    .url("https://www.kumowind.com/terms"))
    );
    } 
}
