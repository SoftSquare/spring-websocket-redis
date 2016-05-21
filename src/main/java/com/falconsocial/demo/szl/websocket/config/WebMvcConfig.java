package com.falconsocial.demo.szl.websocket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig {
    private static final String RESOURCE_LOCATIONS = "classpath:/web";

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                if (!registry.hasMappingForPattern("/webjars/**")) {
                    registry.addResourceHandler("/webjars/**").addResourceLocations(
                            "classpath:/META-INF/resources/webjars/");
                }
//                if (!registry.hasMappingForPattern("/**")) {
//                    registry.addResourceHandler("/**").addResourceLocations(RESOURCE_LOCATIONS);
//                }
            }
        };
    }
}
