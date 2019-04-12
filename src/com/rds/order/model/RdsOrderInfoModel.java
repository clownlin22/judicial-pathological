package com.rds.order.model;

import java.sql.Date;

import lombok.Data;

@Data
public class RdsOrderInfoModel {

    private String order_id;
    private String order_number;//订单编号
    private int pay_state;//支付状态
    private String user_id;//用户id
    private String  cre_time;//创建日期
    private String pay_source;//支付来源
    private String pay_time;//支付来源
    private int state;

    private Double price;
    private String username;
    private String check_project;
    private String check_type;
    private String ocp_id;


}
