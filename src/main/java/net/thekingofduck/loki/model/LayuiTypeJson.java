package net.thekingofduck.loki.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Project: loki
 * Date:2021/1/9 下午5:24
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
public class LayuiTypeJson<T> {
    private int code=0;
    private String msg="";
    private int count;
    private List<T> data=new ArrayList<T>();

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
