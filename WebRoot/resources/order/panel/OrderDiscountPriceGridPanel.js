Ext.define("Rds.order.panel.OrderDiscountPriceGridPanel", {
    extend: "Ext.grid.Panel",
    loadMask: true,
    viewConfig: {
        trackOver: false,
        stripeRows: false
    },
    region: 'center',
    pageSize: 25,
    initComponent: function () {
        var me = this;
        var order_number = Ext.create('Ext.form.field.Text', {
            name: 'order_number',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '订单编号'
        });

        var pay_source = Ext.create('Ext.form.field.Text', {
            name: 'pay_source',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '支付来源'
        });
        var username = Ext.create('Ext.form.field.Text', {
            name: 'username',
            labelWidth: 80,
            width: '16%',
            fieldLabel: '订单所属人'
        });
        var cre_time_start = Ext.create('Ext.form.DateField', {
            name: 'cre_time_start',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '创建日期',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            maxValue: new Date(),
            listeners: {
                select: function () {
                    var start = cre_time_start
                        .getValue();
                    var end = cre_time_end
                        .getValue();
                    cre_time_end.setMinValue(
                        start);
                }
            }
        });
        var cre_time_end = Ext.create('Ext.form.DateField', {
            name: 'cre_time_end',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '到',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            maxValue: new Date(),
            listeners: {
                select: function () {
                    var start = cre_time_start
                        .getValue();
                    var end = cre_time_end
                        .getValue();
                    cre_time_start.setMaxValue(
                        end);
                }
            }
        });
        var pay_time_start = Ext.create('Ext.form.DateField', {
            name: 'pay_time_start',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '支付时间',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            maxValue: new Date(),
            listeners: {
                select: function () {
                    var start = pay_time_start
                        .getValue();
                    var end = pay_time_end
                        .getValue();
                    pay_time_end.setMinValue(
                        start);
                }
            }
        });
        var pay_time_end = Ext.create('Ext.form.DateField', {
            name: 'pay_time_end',
            width: '16%',
            labelWidth: 80,
            fieldLabel: '到',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            maxValue: new Date(),
            listeners: {
                select: function () {
                    var start = pay_time_start
                        .getValue();
                    var end = pay_time_end
                        .getValue();
                    pay_time_start.setMaxValue(
                        end);
                }
            }
        });

        me.store = Ext.create('Ext.data.Store', {
            fields: ["order_id", "order_number", "pay_state", "user_id", "cre_time", "pay_source",
                "state", "pay_number", "pay_time", "price","username"],
            proxy: {
                type: 'jsonajax',
                actionMethods: {
                    read: 'POST'
                },
                url: 'order/register/getOrderDiscountPrice.do',
                params: {
                    start: 0,
                    limit: 25
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
                        order_number: trim(order_number.getValue()),
                        pay_source: trim(pay_source.getValue()),
                        username: trim(username.getValue()),
                        cre_time_start: dateformat(cre_time_start.getValue()),
                        cre_time_end: dateformat(cre_time_end.getValue()),
                        pay_time_start: dateformat(pay_time_start.getValue()),
                        pay_time_end: dateformat(pay_time_end.getValue())
                    });
                }
            }
        });
        me.selModel = Ext.create('Ext.selection.CheckboxModel', {});
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            pageSize: me.pageSize,
            displayInfo: true,
            displayMsg: "第 {0} - {1} 条  共 {2} 条",
            emptyMsg: "没有符合条件的记录"
        });

        me.columns = [
            {dataIndex: 'order_id', hidden: true},
            {text: '订单编号', dataIndex: 'order_number', width: 200, menuDisabled: true},
            {text: '订单折扣总价', dataIndex: 'price', width: 200, menuDisabled: true},
            {text: '订单所属人', dataIndex: 'username', width: 200, menuDisabled: true},
            {
                text: '支付来源', dataIndex: 'pay_source', width: 200, menuDisabled: true,
                renderer: function (value) {
                    switch (value) {
                        case '0' :
                            return "支付宝";
                            break;
                        case '1' :
                            return "微信";
                            break;
                    }
                }
            },
            {text: '创建日期', dataIndex: 'cre_time', width: 200, menuDisabled: true,
                renderer: function (value) {
                    return value.substring(0,19);
                }},
            {text: '支付时间', dataIndex: 'pay_time', width: 200, menuDisabled: true,
                renderer: function (value) {
                    return value.substring(0,19);
                }}
        ];
        me.startdate = new Date(new Date().getFullYear() + '/01/01')
        me.dockedItems = [{
            xtype: 'toolbar',
            name: 'search',
            dock: 'top',
            items: [order_number, pay_source, username]
        }, {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [cre_time_start, cre_time_end, pay_time_start, pay_time_end, {
                text: '查询',
                iconCls: 'Find',
                handler: me.onSearch
            }]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '详情',
                iconCls: 'Cog',
                handler: me.onDetails
            }]
        }];
        me.callParent(arguments);
    },
    onSearch: function () {
        var me = this.up("gridpanel");
        me.getStore().currentPage = 1;
        me.getStore().load();
    },
    onDetails: function () {
        var me = this.up("gridpanel");
        var ss = this.up("gridpanel").getView().getSelectionModel().getSelection();
        if (ss.length != 1) {
            Ext.MessageBox.alert("提示信息", '请选择一条订单!');
            return;
        }

        var form = Ext.create("Rds.order.panel.OrderDiscountPriceDetailGridPanel", {
            region: "center",
            autoScroll: true,
            grid: me,
            order_id: ss[0].data.order_id
        });
        var win = Ext.create("Ext.window.Window", {
            title: '订单详情',
            width: 1000,
            iconCls: 'Pageedit',
            height: 600,
            maximizable: true,
            maximized: false,
            layout: 'border',
            items: [form]
        });
        win.show();
    },

    listeners: {
        'afterrender': function () {
            this.store.load();
        }
    }
});
