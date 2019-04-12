package com.rds.order.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.*;

import com.rds.order.model.*;
import org.jsoup.helper.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.rds.code.utils.PropertiesUtils;
import com.rds.code.utils.file.RdsFileUtil;
import com.rds.code.utils.syspath.ConfigPath;
import com.rds.code.utils.uuid.UUIDUtil;
import com.rds.order.mapper.RdsOrderMapper;
import com.rds.order.service.RdsOrderService;

@Service
public class RdsOrderServiceImpl implements RdsOrderService {

    @Autowired
    private RdsOrderMapper rdsOrderMapper;


    private static final String FILE_PATH = ConfigPath.getWebInfPath() +
            "spring" + File.separatorChar + "properties" + File.separatorChar +
            "config.properties";

    private static final String ATTACHMENTPATH = PropertiesUtils.readValue(
            FILE_PATH, "order_att");


    @Override
    public RdsResponse getCaseInfo(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsOrderCaseInfo> caseInfos = rdsOrderMapper
                .getCaseInfo(params);
        int count = rdsOrderMapper.countCaseInfo(params);
        response.setCount(count);
        response.setItems(caseInfos);
        return response;
    }


    @Override
    public boolean updateCaseInfo(Map<String, Object> params) {
        return rdsOrderMapper.updateCaseInfo(params);
    }


    @Override
    public List<RdsOrderAttachmentModel> queryCasePhoto(Map<String, Object> params) {
        return rdsOrderMapper.queryCasePhoto(params);
    }


    @Override
    public boolean updateCaseState(Map<String, Object> params) {
        return rdsOrderMapper.updateCaseState(params);
    }


    @Override
    public boolean insertVerifyInfo(Map<String, Object> params) {
        return rdsOrderMapper.insertVerifyInfo(params);
    }


    @Override
    public List<RdsOrderVerifyModel> getVerifyInfo(Map<String, Object> params) {
        return rdsOrderMapper.getVerifyInfo(params);
    }


    @Override
    public List<RdsOrderAttachmentModel> queryAtt(Map<String, Object> params) {
        return rdsOrderMapper.queryAtt(params);
    }


    @Override
    public Map<String, Object> attUpload(RdsOrderAttachmentModel pmodel, MultipartFile[] photo) throws IOException {
        String msg = "";
        Map<String, Object> map = new HashMap<String, Object>();
        if (!StringUtil.isBlank(pmodel.getAtt_id())) {
            if (!(rdsOrderMapper.deleteAttInfo(pmodel) > 0)) {
                msg = msg + "文件：" + photo[0].getOriginalFilename()
                        + "上传失败,请联系管理员！";
                map.put("success", false);
                map.put("message", msg);
                return map;
            }
            // 删除原来照片
            if (!RdsFileUtil.delFile(ATTACHMENTPATH + pmodel.getAtt_catalog())) {
                msg = msg + "文件：" + photo[0].getOriginalFilename()
                        + "上传失败,请联系管理员！";
                map.put("success", false);
                map.put("message", msg);
                return map;
            }
        }
        // 文件路径
        String attachmentPath =
                photo[0].getOriginalFilename();
                //+ File.separatorChar
                //+ new Date().getTime()
                //+ photo[0].getOriginalFilename().substring(
                //photo[0].getOriginalFilename().lastIndexOf("."),
                //photo[0].getOriginalFilename().length())


        String att_id = UUIDUtil.getUUID();
        pmodel.setAtt_id(att_id);
        pmodel.setAtt_catalog(attachmentPath);
        if (!RdsFileUtil.getState(attachmentPath
                + photo[0].getOriginalFilename())) {
            // 上传
            RdsFileUtil.fileUpload(ATTACHMENTPATH + attachmentPath,
                    photo[0].getInputStream());
            // 插入数据库
            if (rdsOrderMapper.insertAttInfo(pmodel) > 0)
                msg = msg + "文件：" + photo[0].getOriginalFilename() + "上传成功";
            else
                msg = msg + "文件：" + photo[0].getOriginalFilename() + "上传失败";
        } else {
            msg = msg + "文件：" + photo[0].getOriginalFilename() + "已存在,上传失败";
        }
        map.put("success", true);
        map.put("message", msg);
        return map;
    }

    @Override
    public boolean deletAtt(Map<String, Object> params) {
        return rdsOrderMapper.deletAtt(params);
    }

    @Override
    public String getPathByAttId(String att_id) {
        return rdsOrderMapper.getPathByAttId(att_id);
    }

    @Override
    public List<RdsLaboratoryInfoModel> queryIsLab(Map<String, Object> params) {
        return rdsOrderMapper.queryIsLab(params);
    }


    @Override
    public boolean saveLabAndCase(Map<String, Object> params) {
        return rdsOrderMapper.saveLabAndCase(params);
    }


    @Override
    public RdsResponse getOrderDiscountPrice(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsOrderInfoModel> orderInfos = rdsOrderMapper.getOrderDiscountPrice(params);
        for (RdsOrderInfoModel orderInfo : orderInfos) {
            params.put("order_id", orderInfo.getOrder_id());
            double priceAll = rdsOrderMapper.getpriceByOrder(params);
            orderInfo.setPrice(priceAll);
        }
        int count = rdsOrderMapper.CountOrderDiscountPrice(params);
        response.setCount(count);
        response.setItems(orderInfos);
        return response;
    }

    @Override
    public RdsResponse getOrderDiscountPriceById(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsPersonpriceConfigureModel> orderInfos = rdsOrderMapper.getOrderCheckProInfo(params);
        int count = rdsOrderMapper.CountOrderDiscountPriceById(params);
        response.setCount(count);
        response.setItems(orderInfos);
        return response;
    }

    private void setProjectInfo(RdsPersonpriceConfigureModel orderInfo, List<RdsPersonpriceConfigureModel> userlist) {
        if (userlist.get(0).getDiscount_type() == 1) {
            orderInfo.setCheck_project(userlist.get(0).getCheck_project());
            orderInfo.setCheck_type(userlist.get(0).getCheck_type());
        } else {
            orderInfo.setCheck_project(userlist.get(0).getCheck_project());
            orderInfo.setCheck_type(userlist.get(0).getCheck_type());
        }
    }


    @Override
    public List<RdsOrderSignModel> getSignInfo(Map<String, Object> params) {
        return rdsOrderMapper.getSignInfo(params);
    }


    @Override
    public boolean saveSignInfo(Map<String, Object> params) {
        return rdsOrderMapper.saveSignInfo(params);
    }

    @Override
    public boolean deleteSignInfo(Map<String, Object> params) {
        return rdsOrderMapper.deleteSignInfo(params);
    }

    @Override
    public void checkOrderToPayState(Map<String, Object> params) {
        int num = rdsOrderMapper.checkOrderToPayState(params);
        if (num == 0) {
            rdsOrderMapper.updateOrderPayState(params);
        }
    }

    @Override
    public boolean savePersonPrice(Map<String, Object> params) {

        double price = 0;
        List<RdsPersonpriceConfigureModel> userlist = rdsOrderMapper.queryPriceByUser(params);
        if (userlist.size() > 0) {
            if (userlist.get(0).getDiscount_type() == 1) {
                price = userlist.get(0).getMarket_price();
            } else {
                price = userlist.get(0).getMarket_price() * userlist.get(0).getPrice();
            }
        } else {
            List<RdsPersonpriceConfigureModel> hospitallist = rdsOrderMapper.queryPriceByHospital(params);
            if (hospitallist.size() > 0) {
                if (hospitallist.get(0).getDiscount_type() == 1) {
                    price = hospitallist.get(0).getMarket_price();
                } else {
                    price = hospitallist.get(0).getMarket_price() * hospitallist.get(0).getPrice();
                }
            } else {
                List<RdsPersonpriceConfigureModel> userandhospitallist = rdsOrderMapper.queryPriceByHospitalAndUser(params);
                if (userandhospitallist.size() > 0) {
                    if (userandhospitallist.get(0).getDiscount_type() == 1) {
                        price = userandhospitallist.get(0).getMarket_price();
                    } else {
                        price = userandhospitallist.get(0).getMarket_price() * userandhospitallist.get(0).getPrice();
                    }
                }
            }
        }
        params.put("discountprice", price);
        return rdsOrderMapper.savePriceToOCP(params);
    }

    @Override
    public RdsResponse getSignInfos(Map<String, Object> params) {
        RdsResponse response = new RdsResponse();
        List<RdsOrderCaseInfo> caseInfos = rdsOrderMapper
                .getSignInfos(params);
        int count = rdsOrderMapper.countSignInfos(params);
        response.setCount(count);
        response.setItems(caseInfos);
        return response;
    }

    @Override
    public List<String> queryOcpByOrderId(HashMap<String, Object> params) {
        return rdsOrderMapper.queryOcpByOrderId(params);
    }


}
