package com.rds.order.model;


import java.sql.Date;


import hirondelle.date4j.DateTime;
import lombok.Data;

@Data
public class RdsOrderCaseInfo {

    private String case_id;
    private String name;
    private int sex;
    private String age;
    private String id_number;//身份证号
    private String pathology_number;//病理号
    private String case_illness_number;//病理号
    private String affiliated_hospital;//所属医院
    private String hospital_number;//住院号
    private String telephone;//联系电话
    private String sickbed_number;//病床号
    private String patient_number;//病人编号
    private String outpatient_number;//门诊号
    private int marital_status;//婚姻状况
    private String inspection_department;//送检科室
    private String inspection_doctor;//送检医生
    private Date delivery_date;//送样日期
    private Date sampling_date;//接样日期
    private String report_doctor;//报告医生
    private String revisit_doctor;//复诊医生
    private Date create_date;//创建时间
    private String create_person;//创建人id
    private String order_id;//订单id
    private int state;    //0  未删除  1  已删除
    private String area;
    private String delivery_tele;//收货电话

    private String  cre_time;

    private String username;//上传人员姓名
    private String ocp_id;//中间表id
    private int case_type;//案例昨天
    private String areacode;//地区
    private String cp_id;
    private String check_project;
    private String check_type;
    private int price;
    private String labname;
    private String agedate;

}
