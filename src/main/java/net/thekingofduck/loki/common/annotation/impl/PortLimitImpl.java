package net.thekingofduck.loki.common.annotation.impl;

import net.thekingofduck.loki.common.annotation.PortLimit;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
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
public class PortLimitImpl {

    @Pointcut("@annotation(net.thekingofduck.loki.common.annotation.PortLimit)")
    private void PortLimit(){
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

    @Before("PortLimit()")
    public String before(JoinPoint joinPoint){

        //获取注解传过来的值
        MethodSignature sign = (MethodSignature) joinPoint.getSignature();
        Method method = sign.getMethod();
        PortLimit portLimit = method.getAnnotation(PortLimit.class);
        int cport = Integer.parseInt(portLimit.port());
        System.out.println(cport);

        //获取当前请求中的信息
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        //从获取RequestAttributes中获取HttpServletRequest的信息
        HttpServletRequest request = (HttpServletRequest) requestAttributes.resolveReference(RequestAttributes.REFERENCE_REQUEST);
        assert request != null;
        Integer sport = request.getServerPort();
        System.out.println(sport);

        System.out.println(request.getRequestURI());

        if (cport == sport){

            return request.getRequestURI();
        }else {
            return "honeypot";
        }


    }

//    @After("cut()")
//    public void after(){
//        System.out.println("5");
//    }

}
