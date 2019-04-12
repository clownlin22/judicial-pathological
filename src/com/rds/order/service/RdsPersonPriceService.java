package com.rds.order.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.rds.judicial.model.RdsJudicialKeyValueModel;
import com.rds.order.model.RdsOrderAttachmentModel;
import com.rds.order.model.RdsPersonpriceConfigureModel;
import com.rds.order.model.RdsResponse;

public interface RdsPersonPriceService {

    List<RdsJudicialKeyValueModel> getUsersId(Map<String, Object> map);

    RdsResponse getPersonPrice(Map<String, Object> params);

    boolean updatePersonPrice(Map<String, Object> params);

    boolean updatePersonPriceState(Map<String, Object> params);

    RdsResponse getContractInfo(Map<String, Object> params);

    boolean updateContractInfo(Map<String, Object> params);

    boolean deletAtt(Map<String, Object> params);

    String getPathByAttId(String att_id);

    List<RdsOrderAttachmentModel> queryAtt(Map<String, Object> params);

    Map<String, String> attUpload(RdsOrderAttachmentModel pmodel, MultipartFile[] headPhoto) throws IOException;

    List<RdsJudicialKeyValueModel> getCheckProjectInfoById(Map<String, Object> map);

    boolean insertContractInfo(Map<String, Object> params);

    RdsResponse getContractAndPriceInfo(Map<String, Object> params);

    boolean deleteContractInfo(Map<String, Object> params);

    RdsResponse queryPriceByConId(Map<String, Object> params);

    RdsResponse getPersonPriceByCpId(Map<String, Object> params);

    boolean deleteCheckProject(Map<String, Object> params);

    List<RdsPersonpriceConfigureModel> findPersonPrice(Map<String, Object> params);

    boolean savePersonPrice(Map<String, Object> params);

    boolean deletePersonPriceById(Map<String, Object> params);

    void deletePersonPriceByPcId(Map<String, Object> params);

    void deletePersonPriceByPcId2(Map<String, Object> params);

    void deletePersonPriceTosave(HashMap<String, Object> hashMap, String[] user_id, String[] cp_id, String[] hospital, String[] market_price, String[] discount_type, String[] balance_type, int num);

    int savePersonPriceCheckIs(HashMap<String, Object> hashMap, String[] user_id, String[] cp_id, String[] hospital, String[] market_price, String[] discount_type, String[] balance_type);
}
