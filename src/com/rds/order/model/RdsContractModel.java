package com.rds.order.model;

import java.sql.Date;

import lombok.Data;

@Data
public class RdsContractModel {

	private String con_id;  
	private String pc_id;
	private String party_a;//甲方
	private String party_b;//乙方
	private String agent;//代理人
	private Date take_effect_time;//生效时间
	private Date fail_time;//失效时间
	private String cre_time;
	private String cre_person;
	private int state;
	
	private String username;
	private String username1;
	private String username2;
	private String num;
	private String user_id;
	private String cp_id;

}
