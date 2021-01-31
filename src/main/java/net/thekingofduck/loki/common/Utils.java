package net.thekingofduck.loki.common;

import cn.hutool.core.codec.Base64;
import org.springframework.util.StreamUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * Project: loki
 * Date:2021/1/10 上午1:20
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
public class Utils {
    public static String params2string(Map<String, String[]> parms) {

        String result ="";
        for(String key : parms.keySet()){
            String[] values = parms.get(key);
            String value ="";
            for (String str:values){
                value += str;
            }

            String param = String.format("%s=%s",key,value);
            result += String.format("%s&",param);
        }

        if (result.endsWith("&")){
            return result.substring(0,result.length() - 1);
        }

        return result;
    }

    public static String httpServletToBase64(HttpServletRequest request) {
        try {

            System.out.println(StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8));
            String httpServlet = StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8);
            System.out.println(Base64.encode(httpServlet));
            return Base64.encode(httpServlet);
        }catch (Exception ex){
            return Base64.encode(ex.getMessage());
        }
    }



}
