package net.thekingofduck.loki.controller;

import cn.hutool.core.codec.Base64;
import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import net.thekingofduck.loki.common.Utils;
import net.thekingofduck.loki.entity.TemplateEntity;
import net.thekingofduck.loki.mapper.HttpLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import static net.thekingofduck.loki.common.Utils.httpServletToBase64;

@Controller
public class NotFoundController implements ErrorController {

    static Log log = LogFactory.get(Thread.currentThread().getStackTrace()[1].getClassName());


    @Autowired
    private TemplateEntity templates;

    @Autowired
    HttpLogMapper httpLogMapper;


    @RequestMapping(value = {"/error"})
    public Object error(HttpServletRequest request, HttpServletResponse response) throws IOException {

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

    @Override
    public String getErrorPath() {
        return null;
    }
}
