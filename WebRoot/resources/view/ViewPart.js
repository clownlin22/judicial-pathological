var ownpersonTemp='';
var ownaddressTemp='';
var storeSampleType;
var storeSampleCall;
var caseTypeModel;
Ext.define(
        'model',
        {
          extend:'Ext.data.Model',
          fields:[
                  {name:'key',mapping:'key',type:'string'},
                  {name:'value',mapping:'value',type:'string'},
                  {name:'name',mapping:'name',type:'string'},
                  {name:'id',mapping:'id',type:'string'},
          ]
        }
      );
Ext.define('Rds.view.ViewPart', {
	extend : 'Ext.container.Viewport',
	requires:['Rds.ux.data.proxy.JsonAjaxProxy','Rds.ux.form.ItemSelector'],
	layout : 'border',
	initComponent : function() {
		var me = this;
		var tab = Ext.create('Ext.tab.Panel', {
			region : 'center',
			deferredRender : false,
			activeTab : 0,
			items : [ {
				title : '首&nbsp;页',
				autoScroll : true,
				html:"<iframe scrolling='auto' frameborder='0' width='100%' height='100%' src='judicial/phone/homePage.do'> </iframe>"
//				html: "<div style='text-align:center; margin-top:20%;'>"+userName+"  欢迎您使用后台管理系统~<div>"
			}]
		});
		me.items = [{
            xtype:'panel',
            region : 'north',
            border:false,
            height:70,
            html:"<div style='height:66px;background-color:#FFFFFF;'>" +
            		"<div style='float:left;width:50px'><img style='margin-top:10px;margin-left:20px;width:140px;height:40px;' src='resources/assets/img/subo.png'></div>" +
            		"<div style='float:left;width:500px;margin-top:10px;'><font style='font-family:STKaiti;font-size: 25px;color: black;margin-left: 120px;margin-bottom:100px;font-weight: bold;'>分子病理云后台管理系统</font></div>" +
            		"<div style='float:right;width:50px;margin-top:30px;'>" +
            		"<a href='quit.do' style='color:black;text-decoration:none;font-size:14px;'>注销</a></div>" +
            		"</div>"
        },{
        	xtype:'panel',
			region : 'west',
			stateId : 'navigation-panel',
			id : 'west-panel',
			title : '<div align="center">功能菜单</div>',
			split : true,
			collapsible:true,
			collapseDirection:true,
			width : 200,
			minWidth : 175,
			maxWidth : 400,
			iconCls : "icon-accordion",
			margins : '0 0 0 5',
			layout : 'accordion',
		},tab,Ext.create('Ext.Toolbar',{
    	    region:"south",
        	height:33,
        	items:["当前用户："+userName, '->',"技术支持:<a  target='_blank' style='text-decoration:none;'><font color='#0000FF'>江苏紫薇杏林信息科技有限公司</font></a>&nbsp;&nbsp;"]
		})];
		me.loadPermitRoot();
		me.callParent();
	},
	
	/**
	 *	菜单根功能
	 */
	loadPermitRoot:function(){
		var me = this;
		Ext.Ajax.request({
			url: 'upc/permit/queryUserPermitModel.do',
	        method: "POST",
	        sync:true,
	        headers: { 'Content-Type': 'application/json' },
	        jsonData: { 
	        	userid:userid,
	        	parentcode:''
	        },
	        success: function(response){
	            var result = Ext.decode(response.responseText); 
	            var west = me.down("panel[region=west]")
	            Ext.each(result,function(item){
	            	west.add(Ext.create("Ext.tree.Panel", {
						title : item.text,
						iconCls : item.icon,
						useArrows: true,
						autoScroll : true,
						rootVisible : false,
						viewConfig : {
							loadingText : "正在加载..."
						},
						store : Ext.create("Ext.data.TreeStore",{
							fields:['id','text','type','leaf','url'],
							proxy : {
								type: 'jsonajax', //获取方式
								url : "upc/permit/queryUserPermitModel.do", //获取树节点的地址
								params:{
									userid:userid,
				                	parentcode:item.id
				                }
							},
							clearOnLoad : true
						}),
						listeners : {
							itemClick:function(tree,record){
								var leaf = record.get("leaf");
								var url = record.get("url");
								var text = record.get("text");
								if(leaf){
									var tabs = me.down("tabpanel[region=center]");
									var tab = null;
									//tabs中是否存在 存在就
									for ( var i = 0; i < tabs.items.getCount(); i++) {
										var item = tabs.items.get(i);
											if (item.self.getName() == url) {
												tab = item;
										}
									}
									//如果不存在添加一个tab
									if(tab==null){
										var close=true;
										if(text=='案例登记' || text == '回款管理' || text == '订单管理' || text == '订单信息'||text=='亲子鉴定邮寄'){
											close=false;
										}
										tab = tabs.add(Ext.create(url,{
											name:url,
											title:text,
											closable:close,
										}));
									}
									//显示tab
									tab.show();
								}
							}
						}
					}));
	            });
	       },failure:function(response){
	           var json=Ext.decode(response.responseText);   
	       }
		});
	},
	listeners : {
		'afterrender' : function() {
			setTimeout("loadData()",2500);
		}
	}
});
function loadData(){
	Ext.Ajax.request({  
		url:"judicial/dicvalues/getSampleType.do", 
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		success: function (response, options) {  
			response = Ext.JSON.decode(response.responseText); 
			storeSampleType = Ext.create("Ext.data.ArrayStore", {
			      model: model,
			      data: response 
			 });
		},  
		failure: function () {
			Ext.Msg.alert("提示", "操作失败<br>请联系管理员!");
		}
	});
	
	Ext.Ajax.request({  
		url:"judicial/dicvalues/getSampleCall.do", 
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		success: function (response, options) {  
			response = Ext.JSON.decode(response.responseText); 
			storeSampleCall = Ext.create("Ext.data.ArrayStore", {
			      model: model,
			      data: response 
			 });
		},  
		failure: function () {
			Ext.Msg.alert("提示", "操作失败<br>请联系管理员!");
		}
	});
		
	Ext.Ajax.request({  
		url:"judicial/dicvalues/getCaseTypes.do", 
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		success: function (response, options) {  
			response = Ext.JSON.decode(response.responseText); 
			caseTypeModel = Ext.create("Ext.data.ArrayStore", {
			      model: model,
			      data: response 
			 });
		},  
		failure: function () {
			Ext.Msg.alert("提示", "操作失败<br>请联系管理员!");
		}
	});
}
function dateformat(value) {
    if (value != null && value !=undefined) {
        return Ext.Date.format(value, 'Y-m-d');
    } else {
        return '';
    }
}

function trim(value) {
    if (value != null && value !=undefined) {
        return Ext.util.Format.trim(value);
    } else {
        return '';
    }
}

String.prototype.endWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substring(this.length-str.length)==str)
	  return true;
	else
	  return false;
	return true;
}

//var iN = new iNotify({
//    effect: 'favicon',
//    interval: 5000,
//    message:"有消息拉！",
//    audio:{
//        //file: ['s/msg.mp4','s/msg.mp3','s/msg.wav']
//    },
//    notification:{
//        title:"通知！",
//        body:'您来了一条新消息'
//    }
//});

//function inotifyTest(){
//	iN.faviconClear();
//	Ext.Ajax.request({  
//		url:"finance/casefinance/queryCasefeePrompt.do", 
//		method: "POST",
//		headers: { 'Content-Type': 'application/json' },
//		success: function (response, options) {  
//			response = Ext.JSON.decode(response.responseText); 
//			if(response.length>0)
//			{
//				for(var i=0 ; i < response.length; i ++ )
//				{
//				    iN.setTitle('新标题').notify({
//				        title:"案例编号："+response[i].case_code,
//				        body:response[i].promptInfo + "有新案例录入了"
//				    }).player();
//				    iN.clearTimer();
//				}
//			}
//		},  
//		failure: function () {
////			Ext.Msg.alert("提示", "操作失败<br>请联系管理员!");
//		}
//	});
//}
//function remainTime(){
//   	inotifyTest();  
//    setTimeout("remainTime()",60000);  
//}  


function trim1(s) {
	return s.replace(/^\s+|\s+$/g, "");
};

// 验证身份证号并获取出生日期
function getBirthdatByIdNo(iIdNo) {
	var tmpStr = "";
	var idDate = "";
	var tmpInt = 0;

	iIdNo = trim1(iIdNo);
	
	if (iIdNo.length == 15) {
		tmpStr = iIdNo.substring(6, 12);
		tmpStr = "19" + tmpStr;
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-"
				+ tmpStr.substring(6)

		return tmpStr;
	} else {
		tmpStr = iIdNo.substring(6, 14);
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-"
				+ tmpStr.substring(6)

		return tmpStr;
	}
}