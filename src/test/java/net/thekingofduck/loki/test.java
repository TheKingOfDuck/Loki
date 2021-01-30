package net.thekingofduck.loki;

/**
 * Project: loki
 * Date:2021/1/9 下午9:45
 *
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
public class test {
    public static void main(String[] args) {
        String ports = "8080-9090";
        if (ports.contains("-")){
            String startport = ports.split("-")[0];
            String endport = ports.split("-")[1];

            for (int i = Integer.parseInt(startport); i < Integer.parseInt(endport) + 1; i++) {
                System.out.println(i);
            }
        }
    }
}
