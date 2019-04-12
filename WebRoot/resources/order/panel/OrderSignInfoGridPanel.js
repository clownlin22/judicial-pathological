var ocp_id='';

Ext.define("Rds.order.panel.OrderSignInfoGridPanel", {
    extend: "Ext.grid.Panel",
    loadMask: true,
    viewConfig: {
        trackOver: false,
        stripeRows: false
    },
    region: 'center',
    pageSize: 23,
    initComponent: function () {
        var me = this;
        ocp_id=this.ocp_id;

        me.store = Ext.create('Ext.data.Store', {
            fields: ["sample_type","sign_time","sign","cre_time","cre_person","username"],
            proxy: {
                type: 'jsonajax',
                actionMethods: {
                    read: 'POST'
                },
                url: 'order/register/getSignInfos.do',
                params: {
                    start: 0,
                    limit: 23,
                    ocp_id: ocp_id
                },
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'count'
                }
            },
            autoLoad: true,
            listeners: {
                'beforeload': function (ds, operation, opt) {
                    Ext.apply(me.store.proxy.extraParams, {

                    });
                }
            }
        });
        var mystore=me.getStore();
        mystore.on('load',function(){
            for (var i = 0; i < mystore.getCount(); i++) {
                if (mystore.getAt(i).get("checked")=="true") {
                    me.getSelectionModel().select(i, true, false);
                }
            }
        })

        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
        });
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            pageSize: me.pageSize,
            displayInfo: true,
            displayMsg: "第 {0} - {1} 条  共 {2} 条",
            emptyMsg: "没有符合条件的记录"
        });

        me.columns = [ {text: '样本类型', dataIndex: 'sample_type', width: 150, menuDisabled: true,
            renderer: function (value) {
                switch (value) {
                    case  1:
                        return "血液";
                        break;
                    case 2 :
                        return "组织";
                        break;
                }
            }},
            {text: '签收时间', dataIndex: 'sign_time', width: 150, menuDisabled: true},
            {text: '签收人', dataIndex: 'sign', width: 150, menuDisabled: true},
            {text: '创建时间', dataIndex: 'cre_time', width: 150, menuDisabled: true},
            {text: '创建人', dataIndex: 'username', width: 150, menuDisabled: true}
        ];
        me.startdate = new Date(new Date().getFullYear() + '/01/01')
        me.dockedItems = [  {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '查询',
                iconCls: 'Find',
                handler: me.onSearch
            }]
        }];

        me.callParent(arguments);
    }
});
