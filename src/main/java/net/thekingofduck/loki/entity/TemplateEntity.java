package net.thekingofduck.loki.entity;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Data
@Component
@Configuration
@ConfigurationProperties(prefix = "templates")
public class TemplateEntity {

    private Map<String,List<Map<String,Object>>> list;

    public Map<String, List<Map<String, Object>>> getList() {
        return list;
    }

    public void setList(Map<String, List<Map<String, Object>>> list) {
        this.list = list;
    }
}