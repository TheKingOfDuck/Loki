package net.thekingofduck.loki.core;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;

/**
 * Project: loki_2020-01-24_V2
 * Date:2021/1/30 下午11:03
 *
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
@Configuration
public class LokiConfig {
    @Bean
    public Filter addressFilterBean() {
        LokiFilter filter = new LokiFilter();
        return filter;
    }
}
