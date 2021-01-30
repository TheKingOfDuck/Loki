package net.thekingofduck.loki.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

/**
 * Project: loki
 * Date:2021/1/9 下午5:20
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */

@Getter
@Setter
@ToString
@Component
public class HttpLogEntity {
    private int id;
    private String ip;
    private String method;
    private String path;
    private String parameter;
    private String headers;
    private String body;
    private String time;
}
