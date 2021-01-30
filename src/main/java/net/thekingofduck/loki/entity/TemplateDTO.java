package net.thekingofduck.loki.entity;

import lombok.Data;

import java.util.Map;

@Data
public class TemplateDTO {
    private Integer port;
    private String path;
    private Integer code;
    private Map<String,String> header;
    private String respbody;
}
