package net.thekingofduck.loki.controller;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;

//import net.thekingofduck.loki.entity.TemplateEntity;
//import net.thekingofduck.loki.core.ResponseHandler;
import net.thekingofduck.loki.common.Utils;
import net.thekingofduck.loki.entity.TemplateEntity;
import net.thekingofduck.loki.mapper.HttpLogMapper;
import org.aspectj.lang.annotation.After;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Project: loki
 * Date:2021/1/8 下午7:23
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */

@Controller
public class HoneypotController {

    static Log log = LogFactory.get(Thread.currentThread().getStackTrace()[1].getClassName());

    @SuppressWarnings("all")
    @Autowired
    HttpLogMapper httpLogMapper;

    @Autowired
    private TemplateEntity templates;

    @RequestMapping("/*")
    public String honeypot(HttpServletRequest request, HttpServletResponse response) {

        //获取当前模板名称
        String[] templateNames = templates.getList().keySet().toArray(new String[0]);
        String currentTemplateName = "default";
        for (String templateName:templateNames) {

            Map template = (Map) templates.getList().get(templateName).get(0).get("maps");
            int templatePort = Integer.parseInt((String) template.get("port"));

            if (templatePort == request.getServerPort()){
                currentTemplateName = templateName;
            }
        }
        log.info(currentTemplateName);

        //获取当前模板路径
        Map template = (Map) templates.getList().get(currentTemplateName).get(0).get("maps");
        String currentTemplate = String.format("%s",template.get("path")).replaceAll(".html","");

        //设置响应头信息
        int code = Integer.parseInt((String) template.get("code"));
        response.setStatus(code);
        Map headers = (Map)template.get("header");
        for (Object key:headers.keySet()) {
            String headerKey = (String) key;
            String headerValue = (String)headers.get(headerKey);
            response.addHeader(headerKey,headerValue);
        }

        return currentTemplate;
    }

}
