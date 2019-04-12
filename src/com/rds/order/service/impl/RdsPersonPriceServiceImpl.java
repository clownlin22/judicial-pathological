package com.rds.order.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rds.order.model.*;
import org.jsoup.helper.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.rds.code.utils.PropertiesUtils;
import com.rds.code.utils.file.RdsFileUtil;
import com.rds.code.utils.syspath.ConfigPath;
import com.rds.code.utils.uuid.UUIDUtil;
import com.rds.judicial.model.RdsJudicialKeyValueModel;
import com.rds.order.mapper.RdsPersonPriceMapper;
import com.rds.order.service.RdsPersonPriceService;

@Service
@Transactional
public class RdsPersonPriceServiceImpl implements RdsPersonPriceService {

    private static final String FILE_PATH = ConfigPath.getWebInfPath() +
            "spring" + File.separatorChar + "properties" + File.separatorChar +
            "config.properties";

    private static final String ATTACHMENTPATH = PropertiesUtils.readValue(
            FILE_PATH, "order_att");


    @Autowired
    private RdsPersonPriceMapper rdsPersonPriceMapper;

    @Override
    public List<RdsJudicialKeyValueModel> getUsersId(Map<String, Object> params) {
        return rdsPersonPriceMapper.getUsersId(params);
    }

    @Override
    public boolean savePersonPrice(Map<String, Object> params) {
        return rdsPersonPriceMapper.savePersonPrice(params);
    }

    @Override
    public int savePersonPriceCheckIs(HashMap<String, Object> hashMap,
                                String[] user_id, String[] cp_id, String[] hospital,
                                String[] market_price, String[] discount_type,
                                String[] balance_type) {
        if (balance_type != null) {
            for (int i = 0; i < balance_type.length; i++) {
                String uuid2 = UUIDUtil.getUUID();
                hashMap.put("pc_id", uuid2);
                hashMap.put("balance_type", balance_type[i]);
                hashMap.put("market_price", market_price[i]);
                if (discount_type == null || discount_type.length == 0)
                    hashMap.put("discount_type", null);
                else
                    hashMap.put("discount_type", discount_type[i]);
                if (user_id == null || user_id.length == 0)
                    hashMap.put("user_id", null);
                else
                    hashMap.put("user_id", user_id[i]);
                if (hospital == null || hospital.length == 0)
                    hashMap.put("hospital", null);
                else
                    hashMap.put("hospital", hospital[i]);
                if (cp_id == null || cp_id.length == 0)
                    hashMap.put("cp_id", null);
                else
                    hashMap.put("cp_id", cp_id[i]);
                List<RdsPersonpriceConfigureModel> list=rdsPersonPriceMapper.findPersonPrice(hashMap);
                if(list.size()>0) {
                    return i+1;
                }
                rdsPersonPriceMapper.savePersonPrice(hashMap);
            }
        }
        return 0;
    }


    @Override
    public boolean deletePersonPriceById(Map<String, Object> params) {
        return rdsPersonPriceMapper.deletePersonPriceById(params);
    }

    @Override
    public void deletePersonPriceByPcId(Map<String, Object> params) {
        rdsPersonPriceMapper.deletePersonPriceByPcId(params);
    }

    @Override
    public void deletePersonPriceByPcId2(Map<String, Object> params) {
        rdsPersonPriceMapper.deletePersonPriceByPcId2(params);
    }


    @Override
    public void deletePersonPriceTosave(HashMap<String, Object> hashMap, String[] user_id, String[] cp_id,
                                   String[] hospital, String[] market_price, String[] discount_type,
                                   String[] balance_type,int num) {
        if (balance_type != null) {
            for (int i = 0; i < num-1; i++) {
                //String uuid2 = UUIDUtil.getUUID();
                //hashMap.put("pc_id", uuid2);
                hashMap.put("balance_type", balance_type[i]);
                hashMap.put("market_price", market_price[i]);
                if (discount_type == null || discount_type.length == 0)
                    hashMap.put("discount_type", null);
                else
                    hashMap.put("discount_type", discount_type[i]);
                if (user_id == null || user_id.length == 0)
                    hashMap.put("username", null);
                else
                    hashMap.put("username", user_id[i]);
                if (hospital == null || hospital.length == 0)
                    hashMap.put("hospital", null);
                else
                    hashMap.put("hospital", hospital[i]);
                if (cp_id == null || cp_id.length == 0)
                    hashMap.put("cp_id", null);
                else
                    hashMap.put("cp_id", cp_id[i]);
                rdsPersonPriceMapper.deletePersonPrice(hashMap);
            }
        }
    }


    @Override
    public RdsResponse getPersonPrice(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsPersonpriceConfigureModel> labInfos = rdsPersonPriceMapper
                .getPersonPrice(params);
        int count = rdsPersonPriceMapper.CountPersonPrice(params);
        response.setCount(count);
        response.setItems(labInfos);
        return response;
    }

    @Override
    public boolean updatePersonPrice(Map<String, Object> params) {
        return rdsPersonPriceMapper.updatePersonPrice(params);
    }

    @Override
    public boolean updatePersonPriceState(Map<String, Object> params) {
        return rdsPersonPriceMapper.updatePersonPriceState(params);
    }


    @Override
    public RdsResponse getContractInfo(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsContractModel> labInfos = rdsPersonPriceMapper
                .getContractInfo(params);
        int count = rdsPersonPriceMapper.CountContractInfo(params);
        response.setCount(count);
        response.setItems(labInfos);
        return response;
    }

    @Override
    public boolean insertContractInfo(Map<String, Object> params) {
        return rdsPersonPriceMapper.insertContractInfo(params);
    }

    @Override
    public boolean updateContractInfo(Map<String, Object> params) {
        return rdsPersonPriceMapper.updateContractInfo(params);
    }

    @Override
    public List<RdsOrderAttachmentModel> queryAtt(Map<String, Object> params) {
        return rdsPersonPriceMapper.queryAtt(params);
    }


    @Override
    public Map<String, String> attUpload(RdsOrderAttachmentModel pmodel, MultipartFile[] photo) throws IOException {
        String msg = "";
        Map<String, String> map = new HashMap<>();
        if (!StringUtil.isBlank(pmodel.getAtt_id())) {
            if (!(rdsPersonPriceMapper.deleteAttInfo(pmodel) > 0)) {
                msg = msg + "文件：" + photo[0].getOriginalFilename()
                        + "上传失败,请联系管理员！";
                map.put("success", "false");
                map.put("message", msg);
                return map;
            }
            // 删除原来照片
            if (!RdsFileUtil.delFile(ATTACHMENTPATH + pmodel.getAtt_catalog())) {
                msg = msg + "文件：" + photo[0].getOriginalFilename()
                        + "上传失败,请联系管理员！";
                map.put("success", "false");
                map.put("message", msg);
                return map;
            }
        }
        // 文件路径
        String attachmentPath =
                photo[0].getOriginalFilename();

        String att_id = UUIDUtil.getUUID();
        pmodel.setAtt_id(att_id);
        pmodel.setAtt_catalog(attachmentPath);
        if (!RdsFileUtil.getState(attachmentPath
                + photo[0].getOriginalFilename())) {
            // 上传
            RdsFileUtil.fileUpload(ATTACHMENTPATH + attachmentPath,
                    photo[0].getInputStream());
            // 插入数据库
            if (rdsPersonPriceMapper.insertAttInfo(pmodel) > 0)
                msg = msg + "文件：" + photo[0].getOriginalFilename() + "上传成功";
            else
                msg = msg + "文件：" + photo[0].getOriginalFilename() + "上传失败";
        } else {
            msg = msg + "文件：" + photo[0].getOriginalFilename() + "已存在,上传失败";
        }
        map.put("success", "true");
        map.put("message", msg);
        return map;
    }

    @Override
    public boolean deletAtt(Map<String, Object> params) {
        return rdsPersonPriceMapper.deletAtt(params);
    }

    @Override
    public String getPathByAttId(String att_id) {
        return rdsPersonPriceMapper.getPathByAttId(att_id);
    }

    @Override
    public List<RdsJudicialKeyValueModel> getCheckProjectInfoById(Map<String, Object> map) {
        return rdsPersonPriceMapper.getCheckProjectInfoById(map);
    }

    @Override
    public RdsResponse getContractAndPriceInfo(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsPersonpriceConfigureModel> labInfos = rdsPersonPriceMapper
                .getContractAndPriceInfo(params);
        int count = rdsPersonPriceMapper.CountContractAndPriceInfo(params);
        response.setCount(count);
        response.setItems(labInfos);
        return response;
    }

    @Override
    public boolean deleteContractInfo(Map<String, Object> params) {
        return rdsPersonPriceMapper.deleteContractInfo(params);
    }

    @Override
    public RdsResponse queryPriceByConId(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsPersonpriceConfigureModel> labInfos = rdsPersonPriceMapper
                .queryPriceByConId(params);
        int count = rdsPersonPriceMapper.CountPriceByConId(params);
        response.setCount(count);
        response.setItems(labInfos);
        return response;
    }



    @Override
    public RdsResponse getPersonPriceByCpId(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsPersonpriceConfigureModel> labInfos = rdsPersonPriceMapper
                .getPersonPriceByCpId(params);
        int count = rdsPersonPriceMapper.CountPersonPriceByCpId(params);
        response.setCount(count);
        response.setItems(labInfos);
        return response;
    }

    @Override
    public boolean deleteCheckProject(Map<String, Object> params) {
        return rdsPersonPriceMapper.deleteCheckProject(params);
    }

    @Override
    public List<RdsPersonpriceConfigureModel> findPersonPrice(Map<String, Object> params) {
        return rdsPersonPriceMapper.findPersonPrice(params);
    }






}
