package com.rds.order.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rds.order.mapper.RdsLaboratoryMapper;
import com.rds.order.model.RdsLaboratoryInfoModel;
import com.rds.order.model.RdsOrderCheckProject;
import com.rds.order.model.RdsOrderDicAreaModel;
import com.rds.order.model.RdsPersonpriceConfigureModel;
import com.rds.order.model.RdsResponse;
import com.rds.order.service.RdsLaboratoryService;

@Service
public class RdsLaboratoryServiceImpl implements RdsLaboratoryService {

    @Autowired
    private RdsLaboratoryMapper rdsLaboratoryMapper;

    @Override
    public RdsResponse getLabInfo(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsLaboratoryInfoModel> labInfos = rdsLaboratoryMapper
                .getLabInfo(params);
        int count = rdsLaboratoryMapper.countLabInfo(params);
        response.setCount(count);
        response.setItems(labInfos);
        return response;
    }

    @Override
    public boolean insertLabInfo(Map<String, Object> params) {
        return rdsLaboratoryMapper.insertLabInfo(params);
    }

    @Override
    public boolean updateLabInfo(Map<String, Object> params) {
        return rdsLaboratoryMapper.updateLabInfo(params);
    }

    @Override
    public boolean deleteLabInfo(Map<String, Object> params) {
        return rdsLaboratoryMapper.deleteLabInfo(params);
    }

    @Override
    public String queryAreAndPro(Map<String, Object> params, List<String> cp_id_list, List<String> id_list) {
        rdsLaboratoryMapper.deleteLabAndArea(params);
        rdsLaboratoryMapper.deleteLabAndPro(params);

        for (int i = 0; i < cp_id_list.size(); i++) {
            for (int j = 0; j < id_list.size(); j++) {
                params.put("cp_id2", cp_id_list.get(i));
                params.put("area_coding2", id_list.get(j));
                int num = rdsLaboratoryMapper.queryAreAndPro(params);
                if (num > 0) {
                    return id_list.get(i) + "," + cp_id_list.get(j);
                }
            }
        }
        return "0";
    }

    @Override
    public List<RdsOrderCheckProject> getCheckProjectInfo(Map<String, Object> params) {
        return rdsLaboratoryMapper.getCheckProjectInfo(params);
    }

    @Override
    public boolean saveLabAndArea(Map<String, Object> params) {
        rdsLaboratoryMapper.deleteLabAndArea(params);
        return rdsLaboratoryMapper.saveLabAndArea(params);
    }

    @Override
    public boolean saveLabAndPro(Map<String, Object> params) {
        rdsLaboratoryMapper.deleteLabAndPro(params);
        return rdsLaboratoryMapper.saveLabAndPro(params);
    }

    @Override
    public List<RdsPersonpriceConfigureModel> queryExistAre(Map<String, Object> params) {
        return rdsLaboratoryMapper.queryExistAre(params);
    }

    @Override
    public List<RdsPersonpriceConfigureModel> queryExistPro(Map<String, Object> params) {
        return rdsLaboratoryMapper.queryExistPro(params);
    }

    @Override
    public List<RdsOrderCheckProject> queryProNameById(Map<String, Object> params) {
        return rdsLaboratoryMapper.queryProNameById(params);
    }

    @Override
    public List<RdsOrderDicAreaModel> getDicAreaInfo(Map<String, Object> params) {
        params.put("parentID",
                params.get("node") == null
                        ? 0
                        : (params.get("node").toString().equals("root")
                        ? 0
                        : params.get("node").toString()));
        return rdsLaboratoryMapper.getDicAreaInfo(params);
    }


}
