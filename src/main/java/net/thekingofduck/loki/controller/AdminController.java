package net.thekingofduck.loki.controller;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import net.thekingofduck.loki.common.Crypto;
import net.thekingofduck.loki.service.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Project: loki
 * Date:2021/1/8 下午9:03
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */


@Controller
public class AdminController {

    static Log log = LogFactory.get(Thread.currentThread().getStackTrace()[1].getClassName());

    @Value("${loki.adminPort}")
    private Integer adminPort;

    @RequestMapping(value = "/${loki.adminPath}")
    public String admincheck2(HttpServletRequest request, HttpServletResponse response) {

        //修改为path校验通过后允许访问function的值 如login css之类的值

        //log.info(request.getRequestURI());

        if (request.getServerPort() == adminPort){

            String method = request.getMethod();

            if ("POST".equals(method)){
                String username = request.getParameter("username");
                String password = request.getParameter("password");
                log.info(String.format("LoginData: %s %s", username,password));
                if (username.equals(AuthService.username) && password.equals(AuthService.password)){
                    try {
                        Cookie cookie =new Cookie("token",Crypto.encrypt(username,password));
                        response.addCookie(cookie);
                        return "pages/admin";
                    }catch (Exception e){
                        log.error(e.toString());
                        return "pages/login";
                    }
                }
            }

            if ("true".equals(request.getParameter("logout"))){
                Cookie cookie =new Cookie("token","delete");
                response.addCookie(cookie);
                response.setStatus(302);
                response.setHeader("Location",request.getRequestURI());
            }

            if (new AuthService().check(request)){
                return "pages/admin";
            }
            return "pages/login";
        }else {
            return "default/index";
        }
    }
}
