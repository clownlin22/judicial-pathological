package com.rds.task;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class RdsJudicialFinanceDailyTask {

	// 每天早上2点执行
	// 日报生成
//	@Scheduled(cron = "0 50 23 * * ? ")
	// @Scheduled(cron="10 55 * * * ? ")
//	 @Scheduled(cron="0/60 * *  * * ? ")
	@Scheduled(cron = "0 0 2 * * ? ")
	public void generateFinanceDaily() {
		
	}
	
}
