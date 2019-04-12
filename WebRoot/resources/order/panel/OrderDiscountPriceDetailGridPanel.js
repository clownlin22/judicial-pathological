Ext.define("Rds.order.panel.OrderDiscountPriceDetailGridPanel", {
	extend : "Ext.grid.Panel",
	loadMask : true,
	viewConfig : {
		trackOver : false,
		stripeRows : false
	},
	region : 'center',
	pageSize : 25,
	initComponent : function() {
		var me = this;
		var check_project = Ext.create('Ext.form.field.Text', {
			name : 'check_project',
			labelWidth : 60,
			width : '21%',
			fieldLabel : '检测项目'
		});
		var check_type = Ext.create('Ext.form.field.Text', {
			name : 'check_type',
			labelWidth : 60,
			width : '21%',
			fieldLabel : '项目类型'
		});

		me.store = Ext.create('Ext.data.Store', {
			fields : ["order_id","pay_state","user_id","cre_time","pay_source",
			          "state","pay_number","pay_time","price","check_project","check_type","discountprice","pricee","num"],
			          proxy : {
			        	  type : 'jsonajax',
			        	  actionMethods : {
			        		  read : 'POST'
			        	  },
			        	  url : 'order/register/getOrderDiscountPriceById.do',
			        	  params : {
			        		  order_id :this.order_id,
			        		  start : 0,
			        		  limit : 25
			        	  },
			        	  reader : {
			        		  type : 'json',
			        		  root : 'items',
			        		  totalProperty : 'count'
			        	  }
			          },
			          autoLoad:true,
			          listeners : {
			        	  'beforeload' : function(ds, operation, opt) {
			        		  Ext.apply(me.store.proxy.extraParams, { 
			        			  check_project : trim(check_project.getValue()),
			        			  check_type : trim(check_type.getValue())
			        		  });
			        	  }
			          }
		});
		me.selModel = Ext.create('Ext.selection.CheckboxModel',{
		});
		me.bbar = Ext.create('Ext.PagingToolbar', {
			store : me.store,
			pageSize : me.pageSize,
			displayInfo : true,
			displayMsg : "第 {0} - {1} 条  共 {2} 条",
			emptyMsg : "没有符合条件的记录"
		});

		me.columns = [{ dataIndex : 'order_id', hidden : true },
		              {text : '检测项目',dataIndex : 'check_project',width : 200,menuDisabled : true},
		              {text : '数量',dataIndex : 'num',width : 200,menuDisabled : true},
		              {text : '项目折扣总价',dataIndex : 'pricee',width : 200,menuDisabled : true},
		              {text : '市场价',dataIndex : 'price',width : 200,menuDisabled : true},
		              {text : '项目类型',dataIndex : 'check_type',width : 200,menuDisabled : true}
		              ];
		me.startdate = new Date(new Date().getFullYear()+'/01/01')
		me.dockedItems = [{
			style : {
				borderTopWidth : '0px !important',
				borderBottomWidth : '0px !important'
			},
			xtype : 'toolbar',
			dock : 'top',
			items : [check_project,check_type,{
				text : '查询',
				iconCls : 'Find',
				handler : me.onSearch
			}]
		}];
		me.callParent(arguments);
	},
	onSearch : function() {
		var me = this.up("gridpanel");
		me.getStore().currentPage = 1;
		me.getStore().load();
	},
	listeners : {
		'afterrender':function(){
			this.store.load();
		} 
	}
});
