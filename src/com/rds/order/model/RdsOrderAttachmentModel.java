package com.rds.order.model;

import java.sql.Date;

import lombok.Data;

@Data
public class RdsOrderAttachmentModel {

	private String att_id;
	private int att_type;   //附件类型
	private String att_catalog;//附件目录
	private Date upload_time;//上传时间
	private String upload_person;//上传人员id
	private String ocp_id;//中间表id
	private int state;    //0  未删除  1  已删除
	
	private String username;//上传人员姓名
	private String order_id;
	private String con_id;

}
