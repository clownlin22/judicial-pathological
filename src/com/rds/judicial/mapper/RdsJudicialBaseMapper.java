package com.rds.judicial.mapper;

import java.util.List;

public interface RdsJudicialBaseMapper {
	
	public List<Object> queryAll(Object params) throws Exception;
	
	public Object queryModel(Object params) throws Exception;
	
	public List<Object> queryAllPage(Object params) throws Exception;
	
	public int queryAllCount(Object params) throws Exception; 
	
	public int update(Object params) throws Exception;
	
	public int insert(Object params) throws Exception;
	
	public int delete(Object params) throws Exception;

}
