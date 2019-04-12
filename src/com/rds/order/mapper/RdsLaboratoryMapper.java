package com.rds.order.mapper;

import java.util.List;
import java.util.Map;

import com.rds.judicial.model.RdsJudicialDicAreaModel;
import com.rds.order.model.RdsLaboratoryInfoModel;
import com.rds.order.model.RdsOrderCheckProject;
import com.rds.order.model.RdsOrderDicAreaModel;
import com.rds.order.model.RdsPersonpriceConfigureModel;

public interface RdsLaboratoryMapper {

	List<RdsLaboratoryInfoModel> getLabInfo(Map<String, Object> params);

	int countLabInfo(Map<String, Object> params);

	boolean insertLabInfo(Map<String, Object> params);

	boolean updateLabInfo(Map<String, Object> params);

	List<RdsOrderCheckProject> getCheckProjectInfo(Map<String, Object> params);

	boolean saveLabAndArea(Map<String, Object> params);

	boolean saveLabAndPro(Map<String, Object> params);

	List<RdsPersonpriceConfigureModel> queryExistAre(Map<String, Object> params);

	List<RdsPersonpriceConfigureModel> queryExistPro(Map<String, Object> params);

	List<RdsOrderCheckProject> queryProNameById(Map<String, Object> params);

	List<RdsOrderDicAreaModel> getDicAreaInfo(Map<String, Object> params);

	void deleteLabAndArea(Map<String, Object> params);

	void deleteLabAndPro(Map<String, Object> params);

	boolean deleteLabInfo(Map<String, Object> params);

	int queryAreAndPro(Map<String, Object> params);


}
