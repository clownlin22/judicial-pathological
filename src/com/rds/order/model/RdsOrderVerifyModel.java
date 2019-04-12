package com.rds.order.model;

import lombok.Data;

@Data
public class RdsOrderVerifyModel {

	private String verify_id;
	private String user_id;//操作人id
	private String verify_time;//操作时间
	private String reason;//审核理由
	private String ocp_id;//中间表id
	
	private String username;//操作人


}
