package net.thekingofduck.loki.controller;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Project: loki
 * Date:2021/1/8 下午7:25
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */

@ControllerAdvice
public class ExceptionController {

    static Log log = LogFactory.get(Thread.currentThread().getStackTrace()[1].getClassName());

    @ExceptionHandler(value = {Exception.class})
    @ResponseBody
    public Object error(Exception ex){
        log.error(ex.getMessage());
        Map<String,String> map = new HashMap<>();
        map.put("message", "服务器已下线...");
        map.put("code", "200");
        return map;
    }
}
