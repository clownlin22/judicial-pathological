package com.rds.judicial.mapper;

import java.util.List;
import java.util.Map;

import com.rds.judicial.model.RdsJudicialCaseStatusModel;
import com.rds.judicial.model.RdsJudicialPhoneCaseListModel;

public interface RdsJudicialPhoneMapper {

	List<Map<String, Object>> getArea(String userid);

	List<Map<String, Object>> getAllManager();

	List<Map<String, Object>> getManager(String userid);
	
	List<RdsJudicialPhoneCaseListModel> queryByCaseinper(Map<String, Object> params);
	
	int queryByCaseinperCount(Map<String, Object> params);
	
	
//	int updateGatherID(Map<String, Object> map);
	
	String getCaseID(String case_code);
	
	List<String> queryUnPay(Map<String,Object> params);
	

	List<RdsJudicialCaseStatusModel> getStatus(String case_id);

	
	int exsitCaseCode(Map<String, Object> params);

	
	List<RdsJudicialCaseStatusModel> getCaseStatue(Map<String, String> params);

	List<RdsJudicialCaseStatusModel> getCaseStatueByIdnumber(
			Map<String, String> params);
	//查询流程
	String getProcessInstanceId(String id_number);
}
