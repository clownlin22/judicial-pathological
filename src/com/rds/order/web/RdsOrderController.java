package com.rds.order.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.util.SystemOutLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.rds.code.utils.PropertiesUtils;
import com.rds.code.utils.syspath.ConfigPath;
import com.rds.code.utils.uuid.UUIDUtil;
import com.rds.order.model.RdsLaboratoryInfoModel;
import com.rds.order.model.RdsMessageModel;
import com.rds.order.model.RdsOrderAttachmentModel;
import com.rds.order.model.RdsOrderSignModel;
import com.rds.order.model.RdsOrderVerifyModel;
import com.rds.order.model.RdsResponse;
import com.rds.order.service.RdsOrderService;
import com.rds.upc.model.RdsUpcUserModel;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("order/register")
public class RdsOrderController {

    private static final String FILE_PATH = ConfigPath.getWebInfPath() +
            "spring" + File.separatorChar + "properties" + File.separatorChar +
            "config.properties";

    private static final String ATTACHMENTPATH = PropertiesUtils.readValue(
            FILE_PATH, "order_att");


    @Autowired
    private RdsOrderService rdsOrderService;

    public RdsMessageModel setModel(boolean result, String message) {
        RdsMessageModel model = new RdsMessageModel();
        model.setResult(result);
        model.setMessage(message);
        return model;
    }

    private RdsUpcUserModel extracted(HttpServletRequest request) {
        RdsUpcUserModel user = new RdsUpcUserModel();
        if (request.getSession().getAttribute("user") != null) {
            user = (RdsUpcUserModel) request.getSession().getAttribute("user");
        }
        return user;
    }


    /**
     *   案例处理
     */
    @RequestMapping("getCaseInfo")
    @ResponseBody
    public RdsResponse getCaseInfo(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsOrderService.getCaseInfo(params);
    }

    /**
     *   签收信息
     */
    @RequestMapping("getSignInfos")
    @ResponseBody
    public RdsResponse getSignInfos(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsOrderService.getSignInfos(params);
    }


    /**
     *   订单折扣（主页面）
     */
    @RequestMapping("getOrderDiscountPrice")
    @ResponseBody
    public RdsResponse getOrderDiscountPrice(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsOrderService.getOrderDiscountPrice(params);
    }


    /**
     *   订单折扣（子页面）
     */
    @RequestMapping("getOrderDiscountPriceById")
    @ResponseBody
    public RdsResponse getOrderDiscountPriceById(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsOrderService.getOrderDiscountPriceById(params);
    }


    /**
     *   登记
     */
    @RequestMapping("updateCaseInfo")
    @ResponseBody
    public RdsMessageModel updateCaseInfo(@RequestBody Map<String, Object> params,
                                          HttpSession session) {
        params.put("statenum", 3);
        return (rdsOrderService.updateCaseState(params) && rdsOrderService.updateCaseInfo(params))
                ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
    }


    /**
     *   查询图片
     */
    @RequestMapping("queryCasePhoto")
    @ResponseBody
    public List<RdsOrderAttachmentModel> queryCasePhoto(
            @RequestBody Map<String, Object> params, HttpSession session)
            throws Exception {
        return rdsOrderService.queryCasePhoto(params);
    }


    /**
     *   审核通过
     */
    @RequestMapping("yes")
    @ResponseBody
    public RdsMessageModel yes(
            @RequestBody Map<String, Object> params, HttpServletRequest request, HttpSession session)
            throws Exception {
        RdsUpcUserModel user = extracted(request);
        params.put("userid", user.getUserid());

        params.put("statenum", 5);
        params.put("verify_id", UUIDUtil.getUUID());
        return (rdsOrderService.updateCaseState(params) && rdsOrderService.insertVerifyInfo(params))
                ? this.setModel(true, "审核通过成功") : this.setModel(false, "审核通过失败,请联系管理员");
    }


    /**
     *   审核不通过
     */
    @RequestMapping("no")
    @ResponseBody
    public RdsMessageModel no(
            @RequestBody Map<String, Object> params, HttpServletRequest request, HttpSession session)
            throws Exception {
        RdsUpcUserModel user = extracted(request);
        params.put("userid", user.getUserid());

        params.put("statenum", 4);
        params.put("verify_id", UUIDUtil.getUUID());
        return (rdsOrderService.updateCaseState(params) && rdsOrderService.insertVerifyInfo(params))
                ? this.setModel(true, "审核不通过成功") : this.setModel(false, "审核不通过失败,请联系管理员");
    }


    /**
     *   获取审核不通过信息
     */
    @RequestMapping("getVerifyInfo")
    @ResponseBody
    public List<RdsOrderVerifyModel> getVerifyInfo(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsOrderService.getVerifyInfo(params);
    }


    /**
     *   上传附件
     */
    @RequestMapping("uploadAtt")
    @ResponseBody
    public void AttUpload(RdsOrderAttachmentModel pmodel,
                          @RequestParam MultipartFile[] headPhoto,
                          HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        RdsUpcUserModel user = extracted(request);
        pmodel.setUpload_person(user.getUserid());
        pmodel.setAtt_type(1);

        Map<String, Object> pmap = rdsOrderService.attUpload(
                pmodel, headPhoto);
        response.setContentType("text/html; charset=utf-8");
        response.getWriter().write(JSONObject.fromObject(pmap).toString());
        response.flushBuffer();
    }


    /**
     *   修改状态
     */
    @RequestMapping("updateCaseState")
    @ResponseBody
    public RdsMessageModel updateCaseState(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsOrderService.updateCaseState(params)
                ? this.setModel(true, "审核不通过成功") : this.setModel(false, "审核不通过失败,请联系管理员");
    }


    /**
     *   修改状态  并查询附件是否全部审核通过  是则改订单状态
     */
    @RequestMapping("updateCaseStateAndCheckAtt")
    @ResponseBody
    public RdsMessageModel updateCaseStateAndCheckAtt(
            @RequestBody Map<String, Object> params, HttpSession session) {
          rdsOrderService.checkOrderToPayState(params);

        return rdsOrderService.updateCaseState(params)
                ? this.setModel(true, "审核不通过成功") : this.setModel(false, "审核不通过失败,请联系管理员");
    }


    /**
     *   查询附件
     */
    @RequestMapping("queryAtt")
    @ResponseBody
    public List<RdsOrderAttachmentModel> queryAtt(
            @RequestBody Map<String, Object> params, HttpSession session)
            throws Exception {
        return rdsOrderService.queryAtt(params);
    }


    /**
     *   废除附件
     */
    @RequestMapping("deletAtt")
    @ResponseBody
    public boolean deletAtt(
            @RequestBody Map<String, Object> params, HttpSession session)
            throws Exception {
        return rdsOrderService.deletAtt(params);
    }


    /**
     *   下载附件
     */
    @SuppressWarnings("all")
    @RequestMapping("downAtt")
    public void download(HttpServletRequest request, HttpServletResponse response) {
        try {
            String att_id = request.getParameter("att_id").toString();
            String p = rdsOrderService.getPathByAttId(att_id);
            String path = ATTACHMENTPATH + p;
            // path是指欲下载的文件的路径。
            File file = new File(path);
            // 取得文件名。
            String filename = file.getName();

            // 以流的形式下载文件。
            InputStream fis = new BufferedInputStream(new FileInputStream(path));
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();
            // 清空response
            response.reset();
            OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
            // 设置response的Header
            response.addHeader("Content-Length", "" + file.length());
            response.setHeader("Content-Disposition", "attachment; filename="
                    + URLEncoder.encode(filename,"UTF-8"));
            response.setContentType("application/octet-stream; charset=utf-8");

            toClient.write(buffer);
            toClient.flush();
            toClient.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }


    /**
     *    查看附件
     */
    @RequestMapping("lookAtt")
    public void lookAtt(HttpServletRequest request, HttpServletResponse response) {
        try {
            String att_id = request.getParameter("att_id").toString();
            String p = rdsOrderService.getPathByAttId(att_id);
            String path = ATTACHMENTPATH + p;
            // 以流的形式下载文件。
            InputStream fis = new BufferedInputStream(new FileInputStream(path));
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            response.getOutputStream().write(buffer);
            fis.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }


    /**
     *    查询是否可以自动匹配实验室
     */
    @RequestMapping("queryIsLab")
    @ResponseBody
    public RdsMessageModel queryIsLab(@RequestBody Map<String, Object> params,
                                      HttpSession session) {
        List<RdsLaboratoryInfoModel> lab = rdsOrderService.queryIsLab(params);
        String areacode = (String) params.get("areacode");

        if (lab.size() > 0) {
            return saveLab(params, lab);
        } else {
            lab = queryLab(params, areacode, 2, "00");
            if (lab.size() > 0) {
                return saveLab(params, lab);
            } else {
                lab = queryLab(params, areacode, 4, "0000");
                if (lab.size() > 0) {
                    return saveLab(params, lab);
                } else {
                    return this.setModel(false, "签收匹配失败");
                }
            }
        }
    }

    private List<RdsLaboratoryInfoModel> queryLab(Map<String, Object> params, String areacode, int numm, String num) {
        List<RdsLaboratoryInfoModel> lab;
        StringBuilder sb = new StringBuilder();
        String areatwo = areacode.substring(0, areacode.length() - numm);
        sb.append(areatwo).append(num);
        params.put("areacode", sb.toString());
        lab = rdsOrderService.queryIsLab(params);
        return lab;
    }

    private RdsMessageModel saveLab(Map<String, Object> params, List<RdsLaboratoryInfoModel> lab) {
        String lab_id = lab.get(0).getLab_id();
        params.put("lab_id", lab_id);
        params.put("statenum", 2);
        return (rdsOrderService.saveLabAndCase(params) && rdsOrderService.updateCaseState(params))
                ? this.setModel(true, "签收成功") : this.setModel(false, "签收失败");
    }


    /**
     *   分配实验室
     */
    @RequestMapping("saveLabAndCase")
    @ResponseBody
    public RdsMessageModel saveLabAndCase(@RequestBody Map<String, Object> params,
                                          HttpSession session) {
        params.put("statenum", 2);
        return (rdsOrderService.saveLabAndCase(params) && rdsOrderService.updateCaseState(params))
                ? this.setModel(true, "分配成功") : this.setModel(false, "分配失败");
    }


    /**
     *   保存签收信息
     */
    @RequestMapping("saveSignInfo")
    @ResponseBody
    public RdsMessageModel saveSignInfo(@RequestBody Map<String, Object> params, HttpServletRequest request,
                                        HttpSession session) throws ParseException {
        List<RdsOrderSignModel> signInfo = rdsOrderService.getSignInfo(params);

        RdsUpcUserModel user = extracted(request);
        params.put("cre_person", user.getUserid());
        String uuid = UUIDUtil.getUUID();
		params.put("ss_id", uuid);

        if (signInfo.size() > 0)
            params.put("numsign", signInfo.get(signInfo.size() - 1).getNumsign() + 1);
        else
            params.put("numsign", 1);
        params.put("ifsign", 1);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date d = format.parse((String) params.get("sign_time"));
        java.sql.Date date = new java.sql.Date(d.getTime());
        params.put("sign_time", date);
        params.put("statenum", 1);
        //签收时  将价格添加到中间表
        //rdsOrderService.savePersonPrice(params);
        return (rdsOrderService.updateCaseState(params) && rdsOrderService.saveSignInfo(params))
                ? this.setModel(true, "") : this.setModel(false, "绑定失败");
    }


    /**
     *   更改项目价格
     */
    @RequestMapping("updateDisCountPrice")
    @ResponseBody
    public RdsMessageModel updateDisCountPrice(@RequestParam(value = "orderId")String orderId){
        HashMap<String, Object> params = new HashMap<>();
        boolean flag=false;
        params.put("order_id",orderId);
        List<String> lists=rdsOrderService.queryOcpByOrderId(params);
        System.out.println("");
        for (String ocp_id : lists){
            params.put("ocp_id",ocp_id);
            flag=rdsOrderService.savePersonPrice(params);
        }
        return flag?this.setModel(true, "success") : this.setModel(false, "fail");

    }
















    ////废除签收信息
    //@RequestMapping("deleteSignInfo")
    //@ResponseBody
    //public RdsMessageModel deleteSignInfo(
    //        @RequestBody Map<String, Object> params, HttpSession session) {
    //    return rdsOrderService.deleteSignInfo(params)
    //            ? this.setModel(true, "成功") : this.setModel(false, "审核不通过失败,请联系管理员");
    //}

}
