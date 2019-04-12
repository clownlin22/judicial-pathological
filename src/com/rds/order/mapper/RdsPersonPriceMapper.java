package com.rds.order.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rds.judicial.model.RdsJudicialKeyValueModel;
import com.rds.order.model.RdsContractModel;
import com.rds.order.model.RdsOrderAttachmentModel;
import com.rds.order.model.RdsPersonpriceConfigureModel;

public interface RdsPersonPriceMapper {

	List<RdsJudicialKeyValueModel> getUsersId(Map<String, Object> params);

	boolean savePersonPrice(Map<String, Object> params);

	List<RdsPersonpriceConfigureModel> getPersonPrice(Map<String, Object> params);

	int CountPersonPrice(Map<String, Object> params);

	boolean updatePersonPrice(Map<String, Object> params);

	boolean updatePersonPriceState(Map<String, Object> params);

	boolean updatePersonPriceAndProject(Map<String, Object> params);

	List<RdsContractModel> getContractInfo(Map<String, Object> params);

	int CountContractInfo(Map<String, Object> params);

	boolean insertContractInfo(Map<String, Object> params);

	boolean updateContractInfo(Map<String, Object> params);

	String getPathByAttId(String att_id);

	boolean deletAtt(Map<String, Object> params);

	int insertAttInfo(RdsOrderAttachmentModel pmodel);

	int deleteAttInfo(RdsOrderAttachmentModel pmodel);

	List<RdsOrderAttachmentModel> queryAtt(Map<String, Object> params);

	List<RdsJudicialKeyValueModel> getCheckProjectInfoById(Map<String, Object> map);

	List<RdsPersonpriceConfigureModel> getContractAndPriceInfo(Map<String, Object> params);

	int CountContractAndPriceInfo(Map<String, Object> params);

	boolean deleteContractInfo(Map<String, Object> params);

	List<RdsPersonpriceConfigureModel> queryPriceByConId(Map<String, Object> params);

	int CountPriceByConId(Map<String, Object> params);

	boolean saveContractPersonPrice(Map<String, Object> params);

    List<RdsPersonpriceConfigureModel> getPersonPriceByCpId(Map<String, Object> params);

	int CountPersonPriceByCpId(Map<String, Object> params);

    boolean deleteCheckProject(Map<String, Object> params);

    List<RdsPersonpriceConfigureModel> findPersonPrice(Map<String, Object> params);

	boolean updatePersonPriceByPrice(Map<String, Object> params);

    void deletePersonPrice(HashMap<String, Object> hashMap);

	boolean deletePersonPriceById(Map<String, Object> params);

    void deletePersonPriceByPcId(Map<String, Object> params);

    void deletePersonPriceByPcId2(Map<String, Object> params);
}
