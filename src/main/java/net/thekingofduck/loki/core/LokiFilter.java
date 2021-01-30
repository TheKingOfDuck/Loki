package net.thekingofduck.loki.core;

//import cn.hutool.core.codec.Base64;
import java.util.Base64;
import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import net.thekingofduck.loki.common.Utils;
import net.thekingofduck.loki.mapper.HttpLogMapper;
import net.thekingofduck.loki.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.Map;

/**
 * Project: loki_2020-01-24_V2
 * Date:2021/1/30 下午11:01
 *
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

    public static String getTime() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String  nowtime = df.format(new Date());
        return nowtime;
    }



    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("Loki Filter is init.... ");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        String ip = request.getRemoteAddr();
        String method = request.getMethod();
        String path = request.getServletPath();
        Map<String, String[]> param = request.getParameterMap();
        String parameter = Utils.params2string(param);

        StringBuilder headerStr = new StringBuilder();
        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()){
            String headerKey = (String) headerNames.nextElement();
            String headerValue = request.getHeader(headerKey);
            headerStr.append(String.format("%s: %s\r\n", headerKey, headerValue));
        }

        StringBuilder body = new StringBuilder();
        String str = null;
        try {
            BufferedReader br = request.getReader();
            while ((str = br.readLine())!=null){
                body.append(str);
            }
        }catch (Exception e){
            body.append(e.getMessage());
        }

        String time = getTime();

        String bheaderStr = Base64.getEncoder().encodeToString(headerStr.toString().getBytes());
        String bbody = Base64.getEncoder().encodeToString(body.toString().getBytes());

        if (!new AuthService().check(request)){
            httpLogMapper.addHttpLog(ip,method,path,parameter, bheaderStr, bbody,time);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        log.info("Loki Filter was destroyed....");
    }
}
