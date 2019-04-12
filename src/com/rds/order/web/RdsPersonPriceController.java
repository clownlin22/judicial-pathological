package com.rds.order.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.ParseException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.rds.order.model.*;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
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
import com.rds.judicial.model.RdsJudicialKeyValueModel;
import com.rds.order.service.RdsPersonPriceService;
import com.rds.upc.model.RdsUpcUserModel;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("personPrice/register")
public class RdsPersonPriceController {


    private static final String FILE_PATH = ConfigPath.getWebInfPath() +
            "spring" + File.separatorChar + "properties" + File.separatorChar +
            "config.properties";

    private static final String ATTACHMENTPATH = PropertiesUtils.readValue(
            FILE_PATH, "order_att");

    @Autowired
    private RdsPersonPriceService rdsPersonPriceService;

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
     *   模糊查询姓名
     */
    @RequestMapping("getUsersId")
    @ResponseBody
    public List<RdsJudicialKeyValueModel> getUsersId(String query,
                                                     HttpServletRequest request) {
        String userid = request.getParameter("userid");
        Map<String, Object> map = new HashMap<>();
        map.put("query", query);
        if (StringUtils.isEmpty(query)) {
            map.put("userid", userid);
        }
        return rdsPersonPriceService.getUsersId(map);
    }


    /**
     *   模糊查询检测项目
     */
    @RequestMapping("getCheckProjectInfoById")
    @ResponseBody
    public List<RdsJudicialKeyValueModel> getCheckProjectInfoById(String query,
                                                                  HttpServletRequest request) throws UnsupportedEncodingException {
        String cp_id = request.getParameter("cp_id");
        Map<String, Object> map = new HashMap<>();
        if (StringUtils.isNotBlank(query)) {
            map.put("query",query);
            map.put("cp_id", cp_id);
        }
        return rdsPersonPriceService.getCheckProjectInfoById(map);
    }



    /**
     *   定价配置（主页面）
     */
    @RequestMapping("getPersonPrice")
    @ResponseBody
    public RdsResponse getPersonPrice(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsPersonPriceService.getPersonPrice(params);
    }


    /**
     *   查看或配置定价 定价子页面
     */
    @RequestMapping("getPersonPriceByCpId")
    @ResponseBody
    public RdsResponse getPersonPriceByCpId(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsPersonPriceService.getPersonPriceByCpId(params);
    }


    /**
     *   合同配置（主页面）
     */
    @RequestMapping("getContractInfo")
    @ResponseBody
    public RdsResponse getContractInfo(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsPersonPriceService.getContractInfo(params);
    }


    /**
     *   查看或配置定价 合同子页面
     */
    @RequestMapping("queryPriceByConId")
    @ResponseBody
    public RdsResponse queryPriceByConId(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsPersonPriceService.queryPriceByConId(params);
    }


    /**
     *   保存定价配置
     */
    @RequestMapping("savePersonPrice")
    @ResponseBody
    public RdsMessageModel savePersonPrice(@RequestBody Map<String, Object> params, HttpServletRequest request,
                                           HttpSession session) {
        RdsUpcUserModel user = extracted(request);
        params.put("cre_person", user.getUserid());
        String uuid = UUIDUtil.getUUID();
        params.put("pc_id", uuid);
        Object object = params.get("discount_type");
        if ("".equals(object))
            params.put("discount_type", null);
        List<RdsPersonpriceConfigureModel> list=rdsPersonPriceService.findPersonPrice(params);
        if(list.size()>0)
            return this.setModel(false, "已存在定价配置,确定修改吗");

        if(params.get("hospital")!=null && params.get("hospital").equals("")){
            params.put("hospital",null);
        }
        if(params.get("user_id")!=null  && params.get("user_id").equals("")){
            params.put("user_id",null);
        }

        return rdsPersonPriceService.savePersonPrice(params)
                ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
    }


    /**
     *   单个继续覆盖配置
     */
    @RequestMapping("updatePersonPriceByPrice")
    @ResponseBody
    public RdsMessageModel updatePersonPriceByPrice(@RequestBody Map<String, Object> params,
                                                    HttpSession session) {
        List<RdsPersonpriceConfigureModel> list=rdsPersonPriceService.findPersonPrice(params);
        params.put("pc_id_old",list.get(0).getPc_id());
        rdsPersonPriceService.deletePersonPriceByPcId(params);
        rdsPersonPriceService.deletePersonPriceByPcId2(params);
        String uuid = UUIDUtil.getUUID();
        params.put("pc_id", uuid);

        if(params.get("hospital")!=null && params.get("hospital").equals("")){
            params.put("hospital",null);
        }
        if(params.get("user_id")!=null  && params.get("user_id").equals("")){
            params.put("user_id",null);
        }

        return rdsPersonPriceService.savePersonPrice(params)
                ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
    }



    /**
     *   废除定价配置
     */
    @RequestMapping("deleteCheckProject")
    @ResponseBody
    public boolean deleteCheckProject(@RequestBody Map<String, Object> params) {
        return rdsPersonPriceService.deleteCheckProject(params);
    }


    /**
     *   修改定价配置
     */
    @RequestMapping("updatePersonPrice")
    @ResponseBody
    public RdsMessageModel updatePersonPrice(@RequestBody Map<String, Object> params,
                                             HttpSession session) {
        List<RdsPersonpriceConfigureModel> list=rdsPersonPriceService.findPersonPrice(params);
        if(list.size()>0)
            return this.setModel(false, "已存在定价配置,确定修改吗");

        if(params.get("hospital")!=null && params.get("hospital").equals("")){
            params.put("hospital",null);
        }
        if(params.get("user_id")!=null  && params.get("user_id").equals("")){
            params.put("user_id",null);
        }

        return rdsPersonPriceService.updatePersonPrice(params)
                ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
    }


    /**
     *    废除检测项目
     */
    @RequestMapping("updatePersonPriceState")
    @ResponseBody
    public boolean updatePersonPriceState(@RequestBody Map<String, Object> params) {
        String pc_ids=(String)params.get("pc_ids");
        List<String>list= Arrays.asList(pc_ids.split(","));
        params.put("list",list);
        return rdsPersonPriceService.updatePersonPriceState(params);
    }


    /**
     *   合同登记
     */
    @RequestMapping("insertContractInfo")
    @ResponseBody
    public RdsMessageModel insertContractInfo(
            @RequestParam String[] user_id,
            @RequestParam String[] cp_id,
            @RequestParam String[] hospital,
            @RequestParam String[] market_price,
            @RequestParam String[] discount_type,
            @RequestParam String[] balance_type,
            RdsOrderAttachmentModel pmodel, RdsContractModel con,
            @RequestParam MultipartFile[] headPhoto, HttpServletRequest request
    ) throws Exception {
        RdsMessageModel model = new RdsMessageModel();
        HashMap<String, Object> hashMap = new HashMap<>();
        RdsUpcUserModel user = extracted(request);
        String uuid = UUIDUtil.getUUID();

        hashMap.put("party_a", con.getParty_a());
        hashMap.put("party_b", con.getParty_b());
        hashMap.put("agent", con.getAgent());
        hashMap.put("contract_period", con.getFail_time());
        hashMap.put("cre_person", user.getUserid());
        hashMap.put("con_id", uuid);

        //转换时间  util  --->  sql
        Date eff = con.getTake_effect_time();
        java.sql.Date effdate = new java.sql.Date(eff.getTime());
        hashMap.put("take_effect_time", effdate);
        Date fai = con.getFail_time();
        java.sql.Date faidate = new java.sql.Date(fai.getTime());
        hashMap.put("fail_time", faidate);

        //查询是否存在重复  不重复 直接保存  返回0  否则返回用户配置第几位存在问题
        int num=rdsPersonPriceService.savePersonPriceCheckIs(hashMap,
                user_id,cp_id,hospital,market_price,discount_type,balance_type);

        if(num>0){
            if(num>1){
                //如果存在  将保存的删除
                rdsPersonPriceService.deletePersonPriceTosave(hashMap,
                        user_id,cp_id,hospital,market_price,discount_type,balance_type,num);
            }
            return this.setModel(false, "第"+num+"个配置存在问题");
        }
        //保存实验室
        rdsPersonPriceService.insertContractInfo(hashMap);
        pmodel.setUpload_person(user.getUserid());
        pmodel.setAtt_type(2);
        pmodel.setAtt_id("");
        pmodel.setCon_id(uuid);

        //上传图片
        Map<String, String> pmap = rdsPersonPriceService.attUpload(
                pmodel, headPhoto);

        return  pmap.get("success").equals("true")?this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
    }


    /**
     *    合同修改
     */
    @RequestMapping("updateContractInfo")
    @ResponseBody
    public RdsMessageModel updateContractInfo(@RequestBody Map<String, Object> params,
                                              HttpSession session) {
        return rdsPersonPriceService.updateContractInfo(params)
                ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
    }


    /**
     *   合同废除
     */
    @RequestMapping("deleteContractInfo")
    @ResponseBody
    public boolean deleteContractInfo(@RequestBody Map<String, Object> params) {
        rdsPersonPriceService.deletePersonPriceById(params);
        return rdsPersonPriceService.deleteContractInfo(params);
    }



    /**
     *   查看附件
     */
    @RequestMapping("queryAtt")
    @ResponseBody
    public List<RdsOrderAttachmentModel> queryAtt(
            @RequestBody Map<String, Object> params, HttpSession session)
            throws Exception {
        return rdsPersonPriceService.queryAtt(params);
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
        pmodel.setAtt_type(2);

        Map<String, String> pmap = rdsPersonPriceService.attUpload(
                pmodel, headPhoto);
        response.setContentType("text/html; charset=utf-8");
        response.getWriter().write(JSONObject.fromObject(pmap).toString());
        response.flushBuffer();
    }


    /**
     *   废除附件
     */
    @RequestMapping("deletAtt")
    @ResponseBody
    public boolean deletAtt(
            @RequestBody Map<String, Object> params, HttpSession session)
            throws Exception {
        return rdsPersonPriceService.deletAtt(params);
    }


    /**
     *    下载附件
     */
    @SuppressWarnings("all")
    @RequestMapping("downAtt")
    public void download(HttpServletRequest request, HttpServletResponse response) {
        try {
            String att_id = request.getParameter("att_id").toString();
            String p = rdsPersonPriceService.getPathByAttId(att_id);
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














    //@RequestMapping("getContractAndPriceInfo")
    //@ResponseBody
    //public RdsResponse getContractAndPriceInfo(
    //        @RequestBody Map<String, Object> params, HttpSession session) {
    //    return rdsPersonPriceService.getContractAndPriceInfo(params);
    //}





    ////多个继续覆盖配置
    //@RequestMapping("updatePersonPriceByPrice2")
    //@ResponseBody
    //public RdsMessageModel updatePersonPriceByPrice2( @RequestParam String[] username,
    //                                                  @RequestParam String[] cp_id,
    //                                                  @RequestParam String[] hospital,
    //                                                  @RequestParam String[] market_price,
    //                                                  @RequestParam String[] discount_type,
    //                                                  @RequestParam String[] balance_type,
    //                                                  RdsOrderAttachmentModel pmodel, RdsContractModel con,
    //                                                  @RequestParam MultipartFile[] headPhoto, HttpServletRequest request
    //)  throws Exception {
    //    RdsMessageModel model = new RdsMessageModel();
    //    HashMap<String, Object> hashMap = new HashMap<>();
    //    RdsUpcUserModel user = extracted(request);
    //    String uuid = UUIDUtil.getUUID();
    //
    //    hashMap.put("party_a", con.getParty_a());
    //    hashMap.put("party_b", con.getParty_b());
    //    hashMap.put("agent", con.getAgent());
    //    hashMap.put("contract_period", con.getFail_time());
    //    hashMap.put("cre_person", user.getUserid());
    //    hashMap.put("con_id", uuid);
    //
    //    //转换时间  util  --->  sql
    //    Date eff = con.getTake_effect_time();
    //    java.sql.Date effdate = new java.sql.Date(eff.getTime());
    //    hashMap.put("take_effect_time", effdate);
    //    Date fai = con.getFail_time();
    //    java.sql.Date faidate = new java.sql.Date(fai.getTime());
    //    hashMap.put("fail_time", faidate);
    //
    //    //查询是否存在重复
    //    rdsPersonPriceService.savePersonPrice3(hashMap,
    //            username,cp_id,hospital,market_price,discount_type,balance_type);
    //
    //
    //    //保存实验室
    //    rdsPersonPriceService.insertContractInfo(hashMap);
    //    pmodel.setUpload_person(user.getUserid());
    //    pmodel.setAtt_type(2);
    //    pmodel.setAtt_id("");
    //    pmodel.setCon_id(uuid);
    //
    //    //上传图片
    //    Map<String, String> pmap = rdsPersonPriceService.attUpload(
    //            pmodel, headPhoto);
    //
    //    return  pmap.get("success").equals("true")?this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
    //
    //}










}
