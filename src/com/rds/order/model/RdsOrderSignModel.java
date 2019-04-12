package com.rds.order.model;

import java.sql.Date;

import lombok.Data;

@Data
public class RdsOrderSignModel {

	
	private String ss_id;
	private String ocp_id;
	private int sample_type;//样本类型
	private Date sign_time;//签收时间
	private String sign;//签收人
	private int ifsign;//是否签收
	private int numsign;//状态（几次签收）
	private Date cre_time;
	private String cre_person;
	private int state;
	
	private String username;


}
