package com.rds.order.model;

import lombok.Data;

@Data
public class RdsOrderDicAreaModel {
	private String id;
	private String text;
	private String parentId;
	private boolean checked = false;
	private boolean leaf = true;
	private String type;
	private boolean expanded=true;

  
	public String getText() {
		return text+"-"+id;
	}

	public void setText(String text) {
		this.text = text;
	}


}
