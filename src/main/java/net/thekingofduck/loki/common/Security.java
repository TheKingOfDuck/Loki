package net.thekingofduck.loki.common;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;

/**
 * Project: loki
 * Date:2021/1/9 下午4:41
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
public class Security {
    static Log log = LogFactory.get(Thread.currentThread().getStackTrace()[1].getClassName());

    public static boolean check(HttpServletRequest request) {
        String url = request.getRequestURI();
        return !url.contains("..");
    }
}
