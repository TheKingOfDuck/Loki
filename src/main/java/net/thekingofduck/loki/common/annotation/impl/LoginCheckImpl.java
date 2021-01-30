package net.thekingofduck.loki.common.annotation.impl;

import net.thekingofduck.loki.common.annotation.PortLimit;
import net.thekingofduck.loki.service.AuthService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;

@Aspect
@Component
@Controller
@Deprecated
public class LoginCheckImpl {

    @Pointcut("@annotation(net.thekingofduck.loki.common.annotation.LoginCheck)")
    private void LoginCheck(){
    }

//    @Around("cut()")
//    public void around(ProceedingJoinPoint joinPoint)throws Throwable{
//        System.out.println("1");
//        try{
//            joinPoint.proceed();
//        } catch (Exception e){
//            e.printStackTrace();
//        }
//        System.out.println("4");
//    }

    @Before("LoginCheck()")
    public String before(JoinPoint joinPoint){

        //获取当前请求中的信息
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        //从获取RequestAttributes中获取HttpServletRequest的信息
        HttpServletRequest request = (HttpServletRequest) requestAttributes.resolveReference(RequestAttributes.REFERENCE_REQUEST);
        assert request != null;

        if (new AuthService().check(request)) {
            return "admin";
        }

        return "admin";

    }

//    @After("cut()")
//    public void after(){
//        System.out.println("5");
//    }

}
