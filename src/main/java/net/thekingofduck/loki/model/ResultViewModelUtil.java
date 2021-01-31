package net.thekingofduck.loki.model;

/**
 * Project: loki
 * Date:2021/1/9 下午5:25
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
public class ResultViewModelUtil {
    /**
     * 请求成功方法01
     * @param object 响应数据
     * @return 视图模型实例
     */
    public static net.thekingofduck.loki.model.ResultViewModel success(String message, Object object) {
        net.thekingofduck.loki.model.ResultViewModel resultViewModel = new net.thekingofduck.loki.model.ResultViewModel();
        resultViewModel.setCode(0);
        resultViewModel.setMessage(message);
        resultViewModel.setData(object);
        return resultViewModel;
    }


    /**
     * 请求成功方法01 为了兼容layui而写
     * @param object 响应数据
     * @return 视图模型实例
     */
    public static net.thekingofduck.loki.model.ResultViewModel success(String message,Integer count, Object object) {
        net.thekingofduck.loki.model.ResultViewModel resultViewModel = new net.thekingofduck.loki.model.ResultViewModel();
        resultViewModel.setCode(0);
        resultViewModel.setMessage(message);
        resultViewModel.setCount(count);
        resultViewModel.setData(object);
        return resultViewModel;
    }

    /**
     * 请求成功方法02
     * @return 视图模型实例
     */
    public static net.thekingofduck.loki.model.ResultViewModel success() {
        return success(null,null);
    }

    /**
     * 请求失败方法01（捕获到的已知异常）
     * @param code 异常编号
     * @param message 异常信息
     * @return 视图模型实例
     */
    public static net.thekingofduck.loki.model.ResultViewModel error(Integer code, String message) {
        net.thekingofduck.loki.model.ResultViewModel resultViewModel = new net.thekingofduck.loki.model.ResultViewModel();
        resultViewModel.setCode(code);
        resultViewModel.setMessage(message);
        resultViewModel.setData(null);
        return resultViewModel;
    }

    /**
     * 请求失败方法02（系统异常）
     * @return 视图模型实例
     */
    public static net.thekingofduck.loki.model.ResultViewModel error() {
        net.thekingofduck.loki.model.ResultViewModel resultViewModel = new net.thekingofduck.loki.model.ResultViewModel();
        resultViewModel.setCode(-1);
        resultViewModel.setMessage("系统异常");
        resultViewModel.setData("系统维护中...");
        return resultViewModel;
    }
}
