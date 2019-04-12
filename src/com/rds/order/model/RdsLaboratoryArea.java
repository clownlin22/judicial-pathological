package com.rds.order.model;

import java.sql.Date;

import lombok.Data;

@Data
public class RdsLaboratoryArea {

	private String  area_id;
	private String  area_coding;
	private int  state;
	private String  cre_person;
	private Date  cre_time;


}
