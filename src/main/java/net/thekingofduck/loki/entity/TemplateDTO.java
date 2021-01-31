package net.thekingofduck.loki.entity;

import lombok.Data;

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
public class TemplateDTO {
    private Integer port;
    private String path;
    private Integer code;
    private Map<String,String> header;
    private String respbody;
}
