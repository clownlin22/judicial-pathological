package com.rds.judicial.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Setter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.rds.judicial.mapper.RdsJudicialPhoneMapper;
import com.rds.judicial.model.RdsJudicialPhoneRequestModel;
import com.rds.judicial.service.RdsJudicialPhoneRegisterService;
import com.rds.upc.model.RdsUpcUserModel;
import com.rds.upc.service.RdsUpcUserService;

/**
 * @description 手机端服务
 * @author ThinK 2015年4月15日
 */
@Service("RdsJudicialPhoneRegisterService")
public class RdsJudicialPhoneRegisterServiceImpl implements
		RdsJudicialPhoneRegisterService {

	@Setter
	@Autowired
	private RdsJudicialPhoneMapper pMapper;

	@Setter
	@Autowired
	private RdsUpcUserService rdsUpcUserService;

	private Map<String, Object> setMsg(boolean success, String msg) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", success);
		map.put("msg", msg);
		return map;
	}

	// 上传文件
	@Override
	@Transactional
	public Map<String, Object> register(String usercode, String userid,
			String case_code, double charge, String remark, int filenum,
			MultipartFile[] file, String filetype) throws Exception {
		// String case_id = pMapper.getCaseID(case_code);
		// // case_id已经存在的话说明这个案例编号已经被使用了
		// if (case_id == null || "".equals(case_id)) {
		// RdsJudicialCaseInfoModel caseInfoModel = new
		// RdsJudicialCaseInfoModel();
		// case_id = UUIDUtil.getUUID();
		// caseInfoModel.setCase_id(case_id);
		// caseInfoModel.setCase_code(case_code);
		// caseInfoModel.setCase_in_per(userid);
		// caseInfoModel.setAccept_time(new SimpleDateFormat("yyyy-MM-dd")
		// .format(new Date()));
		// caseInfoModel.setRemark(remark);
		// // 上传登记照片
		// if (upload(case_id, case_code, file, filetype) > 0) {
		// if (pMapper.firstInsertCase(caseInfoModel) > 0) {
		// RdsJudicialFeePerCaseModel feepercaseModel = new
		// RdsJudicialFeePerCaseModel();
		// feepercaseModel.setCase_id(case_id);
		// feepercaseModel.setCase_fee(charge);
		// // 插入案例费用
		// if (feepercaseMapper.insert(feepercaseModel) > 0) {
		// return setMsg(true, "登记成功");
		// } else
		// return setMsg(false, "登记失败");
		// } else
		// return setMsg(false, "登记失败");
		// } else
		// return setMsg(false, "登记失败");
		// } else
		return setMsg(false, "案例编号已经存在，登记失败");
	}

	@Override
	public Map<String, Object> isCaseCodeExist(String case_code) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("case_code", case_code);
		if (pMapper.exsitCaseCode(params) > 0) {
			return setMsg(false, "条形码已经存在,请更换条形码重试");
		} else
			return setMsg(true, "OK");
	}

	@Override
	@Transactional
	public Map<String, Object> repassword(String usercode, String oldpass,
			String newpass) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("usercode", usercode);
		RdsUpcUserModel user = (RdsUpcUserModel) rdsUpcUserService
				.queryForLogin(params);
		if (user == null) {
			return setMsg(false, "请重新登录");
		}
		if (oldpass.equals(user.getPassword())) {
			params.put("userid", "'" + user.getUserid() + "'");
			params.put("password", newpass);
			if (rdsUpcUserService.updatePass(params) > 0) {
				params.clear();
				params.put("success", true);
				params.put("msg", "OK");
				return params;
			} else {
				params.put("success", false);
				params.put("msg", "修改密码失败");
				return params;
			}
		} else {
			params.put("success", false);
			params.put("msg", "原密码错误，无法修改");
			return params;
		}
	}

	@Override
	public Map<String, Object> getManager(String userid) {
		Map<String, Object> msg = new HashMap<String, Object>();
		List<Map<String, Object>> list = pMapper.getManager(userid);
		if (list.size() < 1) {
			msg.put("success", false);
			msg.put("data", "该采样员未配置销售经理！");
		} else {
			msg.put("success", true);
			msg.put("data", list);
		}
		return msg;
	}

	@Override
	public Map<String, Object> getArea(String managerid) {
		Map<String, Object> msg = new HashMap<String, Object>();
		List<Map<String, Object>> list = pMapper.getArea(managerid);
		if (list.size() < 1) {
			msg.put("success", false);
			msg.put("data", "该销售经理未配置地区！");
		} else {
			msg.put("success", true);
			msg.put("data", list);
		}
		return msg;
	}

	@Override
	public Map<String, Object> getAllManager() {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Map<String, Object>> list = pMapper.getAllManager();
		map.put("data", list.size() > 0 ? list : "");
		map.put("success", list.size() > 0 ? true : false);
		return map;
	}


	@Override
	public String getProcessInstanceId(String id_number) {
		
		return pMapper.getProcessInstanceId(id_number);
	}


	@Override
	public Map<String, Object> queryBank() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> queryHistory(Map<String, Object> params)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> reregister(MultipartFile[] file,
			RdsJudicialPhoneRequestModel phoneReq) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getStandFee(Integer typeid, Integer pernum,
			String areaid, Integer case_type) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> register(MultipartFile[] file,
			RdsJudicialPhoneRequestModel phoneReq) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getDaily(String userid) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getMonthly(String userid) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getCaseStatus(String case_id) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getDailyDetail(String id) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getMonthlyDetail(String id) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getEquation(String areaid, String case_type) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getUnConfirm(String userid) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getCaseStatesList(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Map<String, Object> getCaseStateById(Map<String, String> params) {
		// TODO Auto-generated method stub
		return null;
	}
}
