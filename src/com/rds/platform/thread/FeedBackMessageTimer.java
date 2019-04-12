package com.rds.platform.thread;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.log4j.Logger;

import com.rds.platform.mina2.MinaClient;
import com.rds.platform.msg.CRMessageUtils;

public class FeedBackMessageTimer {
	
	private static Logger logger = Logger.getLogger("FeedBackMessageTimer");
	
	public static void getFeedBack(final MinaClient client){
		Timer timer = new Timer();  
        timer.schedule(new TimerTask() {  
            public void run() {  
                try {
					String feedback = CRMessageUtils.getFeedBack();
					if(feedback.startsWith("-10")){
						logger.info("暂无状态，或暂无上行");
					}else if(feedback.startsWith("10")){
						logger.info("账号不存在");
					}else if(feedback.startsWith("11")){
						logger.info("账号注销");
					}else if(feedback.startsWith("12")){
						logger.info("账号停用");
					}else if(feedback.startsWith("13")){
						logger.info("IP鉴权失败");
					} else{
						String []msg = feedback.split("#@@#");
						for(String m:msg){
							String []mgs = m.split("#@#");
							String mobile = mgs[0];
							String content = mgs[1];
							String jobnumber = content.split("#")[1];
							client.getSession().write("3"+mobile+""+jobnumber+""+(content.charAt(content.length()-1)=='2'?"2":"1")+"");
//							System.out.println(m.split("#@#")[1]);
						}
					}
					
				} catch (IOException e) {
					e.printStackTrace();
				}
            }  
        }, 2000,1000*60*3);
	}
	
	public static void main(String[] args) {
		String feedback = "15996227893#@#Job Notice:#00001#1001 Mr. William, Choo Adaptor x1 Urgent 1【紫薇杏林】2#@#2016/8/17 17:05:00#@#41246     #@@#15996227893#@#Job Notice:#00001#1001 Mr. William, Choo Adaptor x1 Urgent 1【紫薇杏林】#@#2016/8/17 17:05:07#@#41246     ";
		String []msg = feedback.split("#@@#");
		for(String m:msg){
			String mg = m.split("#@#")[1];
			System.out.println(mg.charAt(mg.length()-1)=='2');
		}
	}

}
