package com.rds.order.model;
import java.sql.Date;

import lombok.Data;

@Data
public class RdsPersonpriceConfiguresModel {
	private String pc_id;
    private String[] user_id;
    private String[] cp_id;
    private String[] hospital;
    private int[] discount_type;//折扣类型(定额比例)
    private int[] balance_type;//结算类型(市场价折扣)
    private String quota;//定额
    private String proportion;//比例
    private double[] market_price;//标准市场价
    private int state;
    private String cre_person;
    private Date cre_time;
    private String con_id;
    
    private String[] username;
    private String username1;
    private String check_project;
    private String check_type;


}
