package net.thekingofduck.loki.core;

import java.nio.charset.StandardCharsets;
import java.util.*;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import net.thekingofduck.loki.mapper.HttpLogMapper;
import net.thekingofduck.loki.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.apache.commons.io.IOUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.SimpleDateFormat;

/**
 * Project: loki
 * Date:2021/1/30 下午11:01
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
public class LokiFilter implements Filter{

    static Log log = LogFactory.get(Thread.currentThread().getStackTrace()[1].getClassName());

    @Autowired
    HttpLogMapper httpLogMapper;

    @Value("${loki.adminPort}")
    private Integer adminPort;

    @Value("${loki.adminPath}")
    private String adminPath;

    public static String getTime() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String  nowtime = df.format(new Date());
        return nowtime;
    }



    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("Loki Filter is init.... ");
    }

   public String getHeaders(HttpServletRequest request){

       StringBuilder headerStr = new StringBuilder();
       Enumeration headerNames = request.getHeaderNames();
       while (headerNames.hasMoreElements()){
           String headerKey = (String) headerNames.nextElement();
           String headerValue = request.getHeader(headerKey);
           headerStr.append(String.format("%s: %s\r\n", headerKey, headerValue));
       }
       return headerStr.toString();
   }


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        try {
            String ip = request.getRemoteAddr();
            String method = request.getMethod();
            String path = request.getRequestURI();

            if (!path.contains(adminPath)&&!adminPort.equals(request.getServerPort())){
                String body =  Base64.getEncoder().encodeToString(IOUtils.toString(request.getInputStream()).getBytes());
                String headerStr = new String(Base64.getEncoder().encode(getHeaders(request).getBytes(StandardCharsets.UTF_8)));
                String parameter = request.getQueryString();
                if (!new AuthService().check(request)){
                    httpLogMapper.addHttpLog(ip,method,path,parameter, headerStr, body,getTime());
                }
            }

        }catch (Exception e){}

        filterChain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        log.info("Loki Filter was destroyed....");
    }
}
