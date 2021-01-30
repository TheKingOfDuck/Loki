package net.thekingofduck.loki.mapper;

import net.thekingofduck.loki.entity.HttpLogEntity;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Project: loki
 * Date:2021/1/9 下午11:12
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */
@Mapper
public interface HttpLogMapper {

    /**
     * httplog get
     */
    @Select("select * from httplog order by id desc limit (#{page}-1)*#{limit},#{limit}")
    List<HttpLogEntity> getHttpLog(Integer page, Integer limit);
    /**
     * httplog count get
     */
    @Select("select count(*) from httplog")
    Integer getHttpLogCount();
    /**
     * httplog add
     */
    @Insert("INSERT INTO `main`.`httplog`(`ip`,`method`,`path`,`parameter`,`headers`,`body`,`time`) VALUES (#{ip},#{method},#{path},#{parameter},#{headers},#{body},#{time})")
    Integer addHttpLog(String ip,String method,String path,String parameter,String headers,String body,String time);
    /**
     * httplog delete
     */
    @Delete("DELETE FROM `main`.`httplog` WHERE rowid = #{id}")
    Integer deleteHttpLogById(int id);

}
