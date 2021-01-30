package net.thekingofduck.loki.model;

import lombok.Data;

/**
 * Project: loki
 * Date:2021/1/9 下午5:24
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
@Data
public class ResultViewModel<T> {
    private Integer code;
    private String message;
    private Integer count;
    private T data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }


    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
