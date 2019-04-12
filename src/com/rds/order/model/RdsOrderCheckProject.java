package com.rds.order.model;

import lombok.Data;

@Data
public class RdsOrderCheckProject {

    private String cp_id;
    private String check_project; //项目名称
    private String check_type; //检测方法
    private String charge_standard; //收费标准
    private String disease_name; //疾病名称
    private String detection_site; //检测位点
    private String project_intr; //项目介绍
    private String det_equ; //检测设备
    private String clinical_sign; //临床意义
    private String reporting_cycle; //报告周期
    private String specimen_requ; //标本要求
    private String related_cases; //相关案例
    private int is_report; //是否有报告模板
    private String thumbnail; //缩略图
    private String project_cancer_species;
    private int project_status;

    private boolean checked = false;



}
