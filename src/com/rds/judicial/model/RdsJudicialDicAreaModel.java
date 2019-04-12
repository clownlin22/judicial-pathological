package com.rds.judicial.model;

public class RdsJudicialDicAreaModel {
	private String id;
	private String text;
	private String parentId;
	private boolean checked = false;
	private boolean leaf = true;
	private String type;

	// // private Set<RdsJudicialDicAreaModel> children = new TreeSet<>();
	//
	// @Override
	// public boolean equals(Object obj){
	// if(obj instanceof RdsJudicialDicAreaModel)
	// return this.id.equals(((RdsJudicialDicAreaModel) obj).getId());
	// else return false;
	// }
	//
	// @Override
	// public int compareTo(Object o) {
	// return
	// Integer.parseInt(this.id)-(Integer.parseInt(((RdsJudicialDicAreaModel)o).getId()));
	// }
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text+"-"+id;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
