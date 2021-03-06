Ext.define('Rds.upc.panel.RdsUpcRoleForm', {
	extend : 'Ext.form.Panel',
	config:{
		grid:null
	},
	initComponent : function() {
		var me = this;
		
		me.items = [{
        	xtype:'form',
        	region:'center',
        	name:'data',
            style : 'margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:5px;',
            labelAlign:"right",
            bodyPadding: 10,
            defaults: {
                anchor: '100%',
                labelWidth: 100
            },
            border:false,
            autoHeight:true,
            items: [{
    			xtype:"textfield",
    			fieldLabel: '角色id',
    			labelWidth:100,
    			readOnly:true,
    			fieldStyle:me.fieldStyle, 
    			name: 'roleid',
    			hidden:true
    		},{
    			xtype:"textfield",
    			fieldLabel: '角色名称',
    			labelWidth:100,
    			fieldStyle:me.fieldStyle, 
    			name: 'rolename',
    			allowBlank:false, //不允许为空
    			blankText:"不能为空", //错误提示信息，默认为This field is required! 
    			maxLength: 20
    		},{
    			xtype:"textfield",
    			fieldLabel: '角色编号',
    			labelWidth:100,
    			fieldStyle:me.fieldStyle, 
    			name: 'roletype',
    			allowBlank:false, //不允许为空
    			blankText:"不能为空", //错误提示信息，默认为This field is required! 
    			maxLength: 20
    		}]
		}];
		
		me.buttons = [{
			text:'保存',
			iconCls:'Disk',
			handler:me.onSave
		},{
			text:'取消',
			iconCls:'Cancel',
			handler:me.onCancel
		}]
		me.callParent(arguments);
	},
	//验证后保存
	onSave:function(){
		var me = this.up("form");
		var form = me.getForm();
		var values = form.getValues();
		if(form.isValid())
		{
			Ext.MessageBox.wait('正在操作','请稍后...');
			Ext.Ajax.request({  
				url:"upc/role/save.do", 
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				jsonData: values, 
				success: function (response, options) {  
					response = Ext.JSON.decode(response.responseText); 
	                 if (response.result == true) {  
	                 	Ext.MessageBox.alert("提示信息", response.message);
	                 	me.grid.getStore().load();
	                 	me.up("window").close();
	                 }else { 
	                 	Ext.MessageBox.alert("错误信息", response.message);
	                 } 
				},  
				failure: function () {
					Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
				}
	    	       
	      	});
		}
	
		
	},
	onCancel:function(){
		var me = this;
		me.up("window").close();
	}
	
});