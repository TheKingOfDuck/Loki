package net.thekingofduck.loki.entity;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Project: loki
 * Date:2021/1/9 下午5:20
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */

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