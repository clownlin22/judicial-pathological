package com.rds.platform.mina2;


import java.net.SocketAddress;

import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IoSession;

import com.rds.platform.thread.SendMessageThread;

public class MinaClientHanlder extends IoHandlerAdapter{
	
	public void sessionOpened(IoSession session) throws Exception {
		SocketAddress address = session.getRemoteAddress();
		
    }
	
	@Override
	public void messageReceived(IoSession session, Object message)
			throws Exception {
		final String msg = (String)message;
		//应答
		session.write("\6");
		
		new SendMessageThread(msg).run();
		
	}
	
	@Override
	public void sessionClosed(IoSession session) throws Exception {
		SocketAddress address = session.getRemoteAddress();
		session.close();
	}
	@Override 
	public void messageSent(IoSession session, Object message) throws Exception { 
//		System.out.println("服务端发送信息成�?..."+message.toString()); 
		super.messageSent(session, message); 
	} 
}
