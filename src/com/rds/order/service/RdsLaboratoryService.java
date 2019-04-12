package com.rds.order.service;

import java.util.List;
import java.util.Map;

import com.rds.order.model.RdsOrderCheckProject;
import com.rds.order.model.RdsOrderDicAreaModel;
import com.rds.order.model.RdsPersonpriceConfigureModel;
import com.rds.order.model.RdsResponse;

public interface RdsLaboratoryService {

    RdsResponse getLabInfo(Map<String, Object> params);

    boolean insertLabInfo(Map<String, Object> params);

    boolean updateLabInfo(Map<String, Object> params);

    List<RdsOrderCheckProject> getCheckProjectInfo(Map<String, Object> params);

    boolean saveLabAndArea(Map<String, Object> params);

    boolean saveLabAndPro(Map<String, Object> params);

    List<RdsPersonpriceConfigureModel> queryExistAre(Map<String, Object> params);

    List<RdsOrderCheckProject> queryProNameById(Map<String, Object> params);

    List<RdsPersonpriceConfigureModel> queryExistPro(Map<String, Object> params);

    List<RdsOrderDicAreaModel> getDicAreaInfo(Map<String, Object> params);

    boolean deleteLabInfo(Map<String, Object> params);


    String queryAreAndPro(Map<String, Object> params, List<String> cp_id_list, List<String> id_list);
}
