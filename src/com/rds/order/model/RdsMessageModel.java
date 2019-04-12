package com.rds.order.model;

import lombok.Data;

@Data
public class RdsMessageModel {
	
	private boolean success = true;
	private String message = "";
	private boolean result = false;

}
