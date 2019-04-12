package com.rds.order.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rds.order.model.*;

public interface RdsOrderMapper {

	List<RdsOrderCaseInfo> getCaseInfo(Map<String, Object> params);

	int countCaseInfo(Map<String, Object> params);

	boolean updateCaseInfo(Map<String, Object> params);

	List<RdsOrderAttachmentModel> queryCasePhoto(Map<String, Object> params);

	boolean updateCaseState(Map<String, Object> params);

	boolean insertVerifyInfo(Map<String, Object> params);

	List<RdsOrderVerifyModel> getVerifyInfo(Map<String, Object> params);

	List<RdsOrderAttachmentModel> queryAtt(Map<String, Object> params);

	int deleteAttInfo(RdsOrderAttachmentModel pmodel);

	int insertAttInfo(RdsOrderAttachmentModel pmodel);

	String getPathByAttId(String att_id);

	boolean deletAtt(Map<String, Object> params);

	List<RdsLaboratoryInfoModel> queryIsLab(Map<String, Object> params);

	boolean saveLabAndCase(Map<String, Object> params);

	List<RdsOrderInfoModel> getOrderDiscountPrice(Map<String, Object> params);

	int CountOrderDiscountPrice(Map<String, Object> params);

	List<RdsOrderCaseInfo> getOrderDiscountPriceById(Map<String, Object> params);

	int CountOrderDiscountPriceById(Map<String, Object> params);

	List<RdsOrderAttachmentModel> queryAtt2(Map<String, Object> params);

	boolean updateContractAttId(RdsOrderAttachmentModel pmodel);

	List<RdsOrderSignModel> getSignInfo(Map<String, Object> params);

	boolean saveSignInfo(Map<String, Object> params);

    boolean deleteSignInfo(Map<String, Object> params);

	int checkOrderToPayState(Map<String, Object> params);

	void updateOrderPayState(Map<String, Object> params);

	List<RdsPersonpriceConfigureModel> queryPriceAndName(Map<String, Object> params);

	List<RdsPersonpriceConfigureModel> queryPriceAndPro(Map<String, Object> params);

	List<RdsOrderInfoModel> getOrderInfo();

    List<RdsPersonpriceConfigureModel> queryPriceAndProAndName(Map<String, Object> params);

    List<RdsPersonpriceConfigureModel> queryPriceByUser(Map<String, Object> params);

	List<RdsPersonpriceConfigureModel> queryPriceByHospital(Map<String, Object> params);

	List<RdsPersonpriceConfigureModel> queryPriceByHospitalAndUser(Map<String, Object> params);

	boolean savePriceToOCP(Map<String, Object> params);

    Double  getpriceByOrder(Map<String, Object> params);

    List<RdsPersonpriceConfigureModel> getOrderCheckProInfo(Map<String, Object> params);

    int countSignInfos(Map<String, Object> params);

	List<RdsOrderCaseInfo> getSignInfos(Map<String, Object> params);

    List<String> queryOcpByOrderId(HashMap<String, Object> params);
}
