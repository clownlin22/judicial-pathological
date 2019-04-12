package com.rds.order.model;


import java.sql.Date;

import lombok.Data;

@Data
public class RdsLaboratoryProject {

	private String lp_id;
	private String lab_id;
	private String tb_cp_id;
	private String cp_id;
	private String state;
	private String remark;
	private Date cre_time;
	private String cre_person;

}
