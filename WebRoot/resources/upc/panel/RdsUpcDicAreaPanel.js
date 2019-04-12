var areacode='';
var dicareatree_store=Ext.create("Ext.data.TreeStore",{
			fields:['id','text','type','leaf','url'],
			proxy : {
				type: 'jsonajax', //获取方式
				url : "judicial/area/getDicAreaInfo.do", //获取树节点的地址
			},
			root:{
				name:"地区",
				parentID:0
			},
			antoLoad:true,
			clearOnLoad : true
		});
Ext.define('Rds.upc.panel.RdsUpcDicAreaPanel', {
	extend : 'Ext.tree.Panel',
	collapsible: true,  
    useArrows : true,//展开按钮图标是箭头还是+-
    rootVisible: false,  
    multiSelect: true,  
	initComponent : function() {
		var me = this;
		me.store = dicareatree_store;
		me.callParent(arguments);
	},
	listeners:{
		"checkchange": function(node, state) {
			areacode='';
			for(var i = 0 ; i < this.getChecked().length ; i ++)
			{
				areacode += this.getChecked()[i].internalId + ',';
			}
        },
		'itemcontextmenu' : function(node, record, item, index, e, eOpts) {
			var id=record.get('id');
            e.preventDefault(); 
            e.stopEvent(); 
            var nodemenu;
            if(id.endWith("0")){
            	 nodemenu=Ext.create('Ext.menu.Menu', {
					    items: [{
					    	iconCls : 'Pageadd',
					        text: '添加',
					        handler:function(){
					        	var win=Ext.create("Ext.window.Window", {
					        		width : 250,
					        		iconCls :'Pageadd',
					        		height : 180,
					        		modal:true,
					        		title:'新增地区',
					        		layout : 'border',
					        		bodyStyle : "background-color:white;",
					        		items : [{
					        			xtype:"form",
					        			region : 'center',
					        			bodyPadding : 10,
					        			defaults : {
					        				anchor : '100%',
					        				labelWidth : 80,
					        				labelSeparator: "：",
					        				labelAlign: 'right'
					        			},
					        			buttons:[
					        					{
					        							text : '保存',
					        							iconCls : 'Disk',
					        							handler:function(me){
					        								var form  = me.up("form").getForm();
					        								var values = form.getValues();
					        								values["parentId"]=id;
					        								if(form.isValid()){
					        									Ext.MessageBox.wait('正在操作','请稍后...');
					        									Ext.Ajax.request({  
					        										url:"judicial/area/saveDicAreaInfo.do", 
					        										method: "POST",
					        										headers: { 'Content-Type': 'application/json' },
					        										jsonData: values, 
					        										success: function (response, options) {  
					        											response = Ext.JSON.decode(response.responseText); 
					        							                 if (response==true) {  
					        							                 	Ext.MessageBox.alert("提示信息", "添加成功");
					        							                 	dicareatree_store.load();
					        							                 	win.close();
					        							                 }else { 
					        							                 	Ext.MessageBox.alert("错误信息", "添加失败");
					        							                 } 
					        										},  
					        										failure: function () {
					        											Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
					        										}
					        							      	});
					        								}
					        							}
					        					}, {
					        							text : '取消',
					        							iconCls : 'Cancel',
					        							handler:function(){
					        								win.close();
					        							}
					        					} 
					        			],
					        			border : false,
					        			autoHeight : true,
					        			items:[
					        			       {
					        						// 该列在整行中所占的百分比
					        						xtype : "textfield",
					        						labelAlign: 'right',
					        						fieldLabel : '地区编号',
					        						labelWidth : 80,
					        						allowBlank  : false,//不允许为空  
					        			            blankText   : "不能为空",//错误提示信息，默认为This field is required! 
					        			            maxLength :50,
					        			            validator : function(value){
					        			            	var result=false;
					        			            	Ext.Ajax.request({  
					        			    				url:"judicial/area/exsitDicAreaCode.do", 
					        			    				method: "POST",
					        			    				async : false,
					        			    				headers: { 'Content-Type': 'application/json' },
					        			    				jsonData: {areacode:value}, 
					        			    				success: function (response, options) {  
					        			    					response = Ext.JSON.decode(response.responseText); 	
					        			    					if(!response){
					        			    						result= "此编号已存在";
					        			    					}else{
					        			    						result= true;
					        			    					}
					        			    				},  
					        			    				failure: function () {
					        			    					Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
					        			    				}
					        			    	      	});
					        			            	return result;
					        			            },  
					        						name : 'areacode'
					        					},
					        					{
					        						// 该列在整行中所占的百分比
					        						xtype : "textfield",
					        						labelAlign: 'right',
					        						fieldLabel : '地区名称',
					        						labelWidth : 80,
					        			            maxLength :50,
					        						name : 'areaname'
					        					}
					        			]
					        		}]
					        	});
					        	win.show();
					        }
					    },{
					    	iconCls : 'Delete',
					        text: '删除',
					        handler:function(){
					        	Ext.MessageBox.confirm("提示", "确认删除选中记录？", function (btn) {
					    	        if("yes"==btn)
					    	        {
					    	        	Ext.MessageBox.wait('正在操作','请稍后...');
					    	        	Ext.Ajax.request({  
											url:"judicial/area/delDicAreaInfo.do", 
											method: "POST",
											headers: { 'Content-Type': 'application/json' },
											jsonData: {
												areacode:id
											},
											success: function (response, options) {  
												response = Ext.JSON.decode(response.responseText); 
								                 if (response==true) {  
								                 	Ext.MessageBox.alert("提示信息", "删除成功");
								                 	dicareatree_store.load();
								                 }else { 
								                 	Ext.MessageBox.alert("错误信息", "删除失败(可能存在子区域)");
								                 } 
											},  
											failure: function () {
												Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
											}
								      	});
					    	        }
					        	})
					        	
					        }
					    }]
					});
            }else{
            	 nodemenu=Ext.create('Ext.menu.Menu', {
					    items: [{
					    	iconCls : 'Delete',
					        text: '删除',
					        handler:function(){
					        	Ext.MessageBox.confirm("提示", "确认删除选中记录？", function (btn) {
					    	        if("yes"==btn)
					    	        {
					    	        	Ext.MessageBox.wait('正在操作','请稍后...');
							        	Ext.Ajax.request({  
											url:"judicial/area/delDicAreaInfo.do", 
											method: "POST",
											headers: { 'Content-Type': 'application/json' },
											jsonData: {
												areacode:id
											},
											success: function (response, options) {  
												response = Ext.JSON.decode(response.responseText); 
								                 if (response==true) {  
								                 	Ext.MessageBox.alert("提示信息", "删除成功");
								                 	dicareatree_store.load();
								                 }else { 
								                 	Ext.MessageBox.alert("错误信息", "删除失败(可能存在子区域)");
								                 } 
											},  
											failure: function () {
												Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
											}
								      	});
					    	        }
					        	})
					        	
					        }
					    }]
					});
            }
            nodemenu.showAt(e.getPoint());
		}
	}
});