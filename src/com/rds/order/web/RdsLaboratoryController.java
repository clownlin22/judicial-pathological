package com.rds.order.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rds.code.utils.uuid.UUIDUtil;
import com.rds.order.model.RdsMessageModel;
import com.rds.order.model.RdsOrderCheckProject;
import com.rds.order.model.RdsOrderDicAreaModel;
import com.rds.order.model.RdsPersonpriceConfigureModel;
import com.rds.order.model.RdsResponse;
import com.rds.order.service.RdsLaboratoryService;
import com.rds.upc.model.RdsUpcUserModel;

@Controller
@RequestMapping("laboratory/register")
public class RdsLaboratoryController {

    @Autowired
    private RdsLaboratoryService rdsLaboratoryService;

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
     *  实验室（主页面）
     */
    @RequestMapping("getLabInfo")
    @ResponseBody
    public RdsResponse getLabInfo(
            @RequestBody Map<String, Object> params, HttpSession session) {
        return rdsLaboratoryService.getLabInfo(params);
    }

    /**
     *  添加实验室
     */
    @RequestMapping("insertLabInfo")
    @ResponseBody
    public RdsMessageModel insertLabInfo(@RequestBody Map<String, Object> params,
                                         HttpServletRequest request) {
        RdsUpcUserModel user = extracted(request);
        params.put("cre_person", user.getUserid());
        String uuid = UUIDUtil.getUUID();
        params.put("lab_id", uuid);
        return rdsLaboratoryService.insertLabInfo(params)
                ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
    }


    /**
     *   修改实验室
     */
    @RequestMapping("updateLabInfo")
    @ResponseBody
    public RdsMessageModel updateLabInfo(@RequestBody Map<String, Object> params,
                                         HttpSession session) {
        return rdsLaboratoryService.updateLabInfo(params)
                ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
    }


    /**
     *  废除实验室
     */
    @RequestMapping("deleteLabInfo")
    @ResponseBody
    public boolean deleteLabInfo(@RequestBody Map<String, Object> params) {
        return rdsLaboratoryService.deleteLabInfo(params);
    }


    /**
     *  获取选中项目信息
     */
    @RequestMapping("getCheckProjectInfo")
    @ResponseBody
    public List<RdsOrderCheckProject> getCheckProjectInfo(
            @RequestBody Map<String, Object> params) {
        return rdsLaboratoryService.getCheckProjectInfo(params);
    }

    /**
     *   获取选中地区信息
     */
    @RequestMapping("getDicAreaInfo")
    @ResponseBody
    public List<RdsOrderDicAreaModel> getDicAreaInfo(
            @RequestBody Map<String, Object> params, HttpServletRequest request) {
        String lab_id = request.getParameter("lab_id");
        params.put("lab_id", lab_id);
        return rdsLaboratoryService.getDicAreaInfo(params);
    }


    /**
     *   保存实验室  地区以及项目
     */
    @RequestMapping("saveLabAndAreaAndPro")
    @ResponseBody
    public RdsMessageModel saveLabAndAreaAndPro(@RequestBody Map<String, Object> params,
                                                HttpServletRequest request) {
        RdsUpcUserModel user = extracted(request);
        params.put("cre_person", user.getUserid());

        String cnum = (String) params.get("cp_id");
        String inum = (String) params.get("id");
        List<String> cp_id_list = java.util.Arrays.asList((cnum).split(","));
        List<String> id_list = java.util.Arrays.asList((inum).split(","));
        params.put("cp_ids", cp_id_list);
        params.put("ids", id_list);

        if (inum.equals("")) {
            return rdsLaboratoryService.saveLabAndPro(params)
                    ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
        }else if (cnum.equals("")) {
            return rdsLaboratoryService.saveLabAndArea(params)
                    ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
        }else {
            //存在  返回地区编码+项目id  不存在返回‘0’
            String num=rdsLaboratoryService.queryAreAndPro(params,cp_id_list,id_list);
            if(!"0".equals(num)){
                List<String> numlist = java.util.Arrays.asList((num).split(","));
                return this.setModel(false, "地区编码："+numlist.get(0)+" 项目id:"+numlist.get(1)+"已经存在");
            }
            return (rdsLaboratoryService.saveLabAndArea(params) && rdsLaboratoryService.saveLabAndPro(params))
                    ? this.setModel(true, "保存成功") : this.setModel(false, "保存失败,请联系管理员");
        }
    }





}
