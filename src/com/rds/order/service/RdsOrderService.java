package com.rds.order.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.rds.order.model.RdsLaboratoryInfoModel;
import com.rds.order.model.RdsOrderAttachmentModel;
import com.rds.order.model.RdsOrderSignModel;
import com.rds.order.model.RdsOrderVerifyModel;
import com.rds.order.model.RdsResponse;

public interface RdsOrderService {

	RdsResponse getCaseInfo(Map<String, Object> params);

	boolean updateCaseInfo(Map<String, Object> params);

	List<RdsOrderAttachmentModel> queryCasePhoto(Map<String, Object> params);

	boolean updateCaseState(Map<String, Object> params);

	boolean insertVerifyInfo(Map<String, Object> params);

	List<RdsOrderVerifyModel> getVerifyInfo(Map<String, Object> params);

	List<RdsOrderAttachmentModel> queryAtt(Map<String, Object> params);

	Map<String, Object> attUpload(RdsOrderAttachmentModel pmodel, MultipartFile[] headPhoto) throws IOException;

	boolean deletAtt(Map<String, Object> params);

	String getPathByAttId(String att_id);

	List<RdsLaboratoryInfoModel> queryIsLab(Map<String, Object> params);

	boolean saveLabAndCase(Map<String, Object> params);

	RdsResponse getOrderDiscountPrice(Map<String, Object> params);

	RdsResponse getOrderDiscountPriceById(Map<String, Object> params);

	List<RdsOrderSignModel> getSignInfo(Map<String, Object> params);

	boolean saveSignInfo(Map<String, Object> params);

    boolean deleteSignInfo(Map<String, Object> params);

	void checkOrderToPayState(Map<String, Object> params);

    boolean savePersonPrice(Map<String, Object> params);

	RdsResponse getSignInfos(Map<String, Object> params);

    List<String> queryOcpByOrderId(HashMap<String, Object> params);
}
