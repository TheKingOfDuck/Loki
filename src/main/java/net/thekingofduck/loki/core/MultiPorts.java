package net.thekingofduck.loki.core;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import org.apache.catalina.connector.Connector;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

/**
 * Project: loki
 * Date:2021/1/9 下午10:02
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */

@Configuration
public class MultiPorts {

    static Log log = LogFactory.get(Thread.currentThread().getStackTrace()[1].getClassName());

    @Value("${server.multiPorts}")
    private String additionalPorts;

    @Value("${server.ssl.enabled}")
    private boolean ssl;

    @Bean
    public TomcatServletWebServerFactory servletContainer() {
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
        Connector[] additionalConnectors = this.additionalConnector();
        if (additionalConnectors != null && additionalConnectors.length > 0) {
            tomcat.addAdditionalTomcatConnectors(additionalConnectors);
        }
        return tomcat;
    }

    private Connector[] additionalConnector() {
        String scheme = "http";
        if (ssl){
            scheme = "https";
        }
        if (StringUtils.isBlank(this.additionalPorts)) {
            return null;
        }
        String[] ports = this.additionalPorts.split(",");
        List<Connector> result = new ArrayList<>();
        for (String port : ports) {
            if (port.contains("-")){
                String startport = port.split("-")[0];
                String endport = port.split("-")[1];
                for (int iport = Integer.parseInt(startport); iport < Integer.parseInt(endport) + 1; iport++) {
                    //System.out.println(iport);
                    try {
                        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
                        connector.setScheme(scheme);
                        connector.setPort(Integer.parseInt(String.valueOf(iport)));
                        result.add(connector);
                    }catch (Exception e){
                        log.error(e.toString());
                    }
                }

            }else {
                Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
                connector.setScheme(scheme);
                connector.setPort(Integer.parseInt(port));
                result.add(connector);
            }

        }
        return result.toArray(new Connector[] {});
    }
}
