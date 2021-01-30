package net.thekingofduck.loki.service;

import net.thekingofduck.loki.common.Crypto;
import org.yaml.snakeyaml.Yaml;
import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Map;

/**
 * Project: loki
 * Date:2021/1/8 下午10:43
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */

public class AuthService {

    static Log log = LogFactory.get(Thread.currentThread().getStackTrace()[1].getClassName());

    public static String username;
    public static String password;

    public static String getUsername() {
        return username;
    }

    public static void setUsername(String username) {
        AuthService.username = username;
    }

    public static String getPassword() {
        return password;
    }

    public static void setPassword(String password) {
        AuthService.password = password;
    }

    public AuthService() {
        try {
            File exconfig = new File(String.format("%s/application.yml",System.getProperty("user.dir")));
            File inconfig = new File(this.getClass().getClassLoader().getResource("application.yml").getPath());
            InputStream in;
            if (exconfig.exists()){
                in = new FileInputStream(exconfig);
            }else {
                in = new FileInputStream(inconfig);
            }
            Yaml yaml = new Yaml();
            Map<String, Object> map = yaml.loadAs(in, Map.class);
            setUsername(((Map<String, Object>) map.get("loki")).get("username").toString().trim());
            setPassword(((Map<String, Object>) map.get("loki")).get("password").toString().trim());
        }catch (Exception e){
            log.error(e);
        }
    }

    public String getCookies(HttpServletRequest request){
        Cookie[] cookies =  request.getCookies();
        if(cookies != null){
            for(Cookie cookie : cookies){
                if("token".equals(cookie.getName())){
                    return cookie.getValue();
                }
            }
        }
        return  null;
    }

    public boolean check(HttpServletRequest request){

        try {
            String token = getCookies(request);
            //log.info("GetToken: " + token);
            if (Crypto.decrypt(token, getPassword()).equals(getUsername())){
                return true;
            }

            return false;
        }catch (Exception e){
            return false;
        }
    }


    public static void main(String[] args) {
        System.out.println(System.getProperty("user.dir"));
    }
}
