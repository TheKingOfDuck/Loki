package net.thekingofduck.loki.core;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

/**
 * Project: loki
 * Date:2021/1/10 下午5:55
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
@Configuration
@EnableWebMvc
public class ResourceConfigurations implements WebMvcConfigurer {

    @Value("${loki.statics}")
    private String statics;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String outside_statics= String.format("%s%s",System.getProperty("user.dir"),statics).replaceAll("\\\\","/");
        //System.out.println("file:" + outside_statics);
        registry.addResourceHandler("/**").addResourceLocations("file:" + outside_statics,"classpath:/static/");
    }
}
