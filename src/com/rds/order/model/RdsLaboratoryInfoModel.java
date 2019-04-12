package com.rds.order.model;

import lombok.Data;

@Data
public class RdsLaboratoryInfoModel {

    private String lab_id;
    private String name;
    private String affiliated_area;
    private String introduce;
    private String res_person;
    private String res_telephone;
    private int laboratory_state;
    private String remark;

    private String checked;
}
