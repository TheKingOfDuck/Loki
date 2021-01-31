package net.thekingofduck.loki.core;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ResourceUtils;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templatemode.TemplateMode;

import java.io.File;
import java.io.FileNotFoundException;

/**
 * Project: loki
 * Date:2021/1/10 下午5:58
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */

@Configuration
public class ThymeleafConfigurations {

    @Value("${loki.templates}")
    private String templates;

    @Bean
    public SpringResourceTemplateResolver firstTemplateResolver() {
        SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
        //templateResolver.setPrefix("classpath:/templates2/");

        File path = null;
        try {
            path = new File(ResourceUtils.getURL("classpath:").getPath());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        String outside_templates= String.format("%s%s",System.getProperty("user.dir"),templates).replaceAll("\\\\","/");
        templateResolver.setPrefix("file:"+outside_templates);

        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateResolver.setCharacterEncoding("UTF-8");
        templateResolver.setCheckExistence(true);

        //Spring Boot中Thymeleaf引擎动态刷新
        templateResolver.setCacheable(false);
        return templateResolver;
    }

}
