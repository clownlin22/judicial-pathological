/**
 * 图片查看
 */
Ext.define('Rds.order.form.OrderImageShow', {
	extend : 'Ext.form.Panel',
	layout : "border",
	initComponent : function() {
		var me = this;
		me.items = [{
			xtype : 'hiddenfield',
			name : 'att_catalog'
		}, {
			xtype : 'panel',
			region : 'center',
			id : 'order_img_show',
			autoScroll : true,
		}];
		me.callParent(arguments);
	},
	onCancel : function() {
		var me = this;
		me.up("window").close();
	},
	listeners : {
		'afterrender' : function() {
			var me = this;
			var values = me.getValues();
			console.log(me)
			console.log(values)
			var att_catalog = values["att_catalog"];
			//添加案例图片信息
			Ext.getCmp('order_img_show').add({
				xtype : 'box',
				style : 'margin:6px;',
				autoEl : {
					tag : 'img',
					src : att_catalog
				}
			});
		}
	}
});
