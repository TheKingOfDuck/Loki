package net.thekingofduck.loki;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

/**
 * Project: loki
 * Date:2021/1/8 下午7:21
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */


@Configuration
@SpringBootApplication
@MapperScan("net.thekingofduck.loki.mapper")
public class LokiApplication {
    public static void main(String[] args) {
        SpringApplication.run(LokiApplication.class, args);
    }
}
