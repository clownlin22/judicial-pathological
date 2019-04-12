//用于生成uuid
var getUUID = (function (uuidRegEx, uuidReplacer) {
    return function () {
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer);
    };
})(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == "x" ? r : (r & 3 | 8);
    return v.toString(16);
});
var ssid=getUUID();

Ext.define('Rds.order.form.OrderSignRegisterForm', {
    extend: 'Ext.form.Panel',
    initComponent: function () {
        var me = this;

        me.items = [{
            xtype: 'form',
            style: 'margin-left:5px;margin-right:5px;margin-top:30px;margin-bottom:5px;',
            bodyPadding: 10,
            defaults: {
                anchor: '100%',
                labelWidth: 80,
                labelSeparator: "：",
                labelAlign: 'right'
            },
            border: false,
            autoHeight: true,
            items: [{
                border: false,
                xtype: 'fieldcontainer',
                layout: "column",
                items: [
                    {
                        xtype: "textfield",
                        labelAlign: 'right',
                        labelWidth: 60,
                        fieldLabel: 'case_id',
                        hidden: true,
                        value: ssid,
                        name: 'ss_id'
                    },{
                        xtype: "textfield",
                        labelAlign: 'right',
                        labelWidth: 60,
                        fieldLabel: 'case_id',
                        hidden: true,
                        name: 'case_id'
                    },{
                        xtype: "textfield",
                        labelAlign: 'right',
                        labelWidth: 60,
                        fieldLabel: 'cp_id',
                        hidden: true,
                        name: 'cp_id'
                    }, {
                        xtype: "textfield",
                        labelAlign: 'right',
                        labelWidth: 60,
                        fieldLabel: 'order_id',
                        hidden: true,
                        name: 'order_id'
                    }, {
                        xtype: "textfield",
                        labelAlign: 'right',
                        labelWidth: 60,
                        fieldLabel: 'areacode',
                        hidden: true,
                        name: 'areacode'
                    }, {
                        xtype: "textfield",
                        labelAlign: 'right',
                        labelWidth: 60,
                        fieldLabel: 'ocp_id',
                        hidden: true,
                        name: 'ocp_id'
                    }, {
                        columnWidth: .9,
                        xtype: "combo",
                        fieldLabel: '样本类型',
                        mode: 'local',
                        name: 'sample_type',
                        labelWidth: 70,
                        displayField: 'Name',
                        valueField: 'Code',
                        blankText: '请选择样本类型',
                        emptyText: '请选择样本类型',
                        allowBlank: false,
                        labelAlign: 'right',
                        store: new Ext.data.ArrayStore({
                            fields: ['Name', 'Code'],
                            data: [['血液', 1], ['组织', 2]]
                        })
                    }]
            }, {
                border: false,
                xtype: 'fieldcontainer',
                layout: "column",
                items: [{
                    columnWidth: .9,
                    xtype: "textfield",
                    labelAlign: 'right',
                    labelWidth: 70,
                    allowBlank: false,
                    fieldLabel: '签收人',
                    name: 'sign',
                    maxLength: 20
                }]
            }, {
                border: false,
                xtype: 'fieldcontainer',
                layout: "column",
                items: [{
                    columnWidth: .9,
                    xtype: 'datefield',
                    name: 'sign_time',
                    fieldLabel: '签收时间 ',
                    allowBlank: false,
                    labelWidth: 70,
                    labelAlign: 'right',
                    format: 'Y-m-d',
                    labelAlign: 'right'
                }]
            }]
        }];

        me.buttons = [{
            text: '保存',
            iconCls: 'Disk',
            handler: me.onSave
        }, {
            text: '取消',
            iconCls: 'Cancel',
            handler: me.onCancel
        }]
        me.callParent(arguments);
    },
    onSave: function () {
        var me = this.up("form");
        var form = me.getForm();
        var values = form.getValues();

        if (form.isValid()) {
            Ext.Ajax.request({
                url: "order/register/saveSignInfo.do",
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                jsonData: values,
                success: function (response, options) {
                    response = Ext.JSON.decode(response.responseText);
                    if (response.result) {
                        me.up("window").close();
                        me.grid.getStore().load();
                        //Ext.getCmp('labform').ssid =ssid
                        /////
                        Ext.Ajax.request({
                            url: "order/register/queryIsLab.do",
                            method: "POST",
                            headers: {'Content-Type': 'application/json'},
                            jsonData: {
                                areacode: values.areacode,
                                cp_id: values.cp_id,
                                ocp_id: values.ocp_id,
                                order_id: values.order_id
                            },
                            success: function (response, options) {
                                response = Ext.JSON.decode(response.responseText);
                                if (response.result) {
                                    me.grid.getStore().load();
                                    Ext.MessageBox.alert("信息", response.message);
                                } else {
                                    labwin.show();
                                }
                            },
                            failure: function () {
                                Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
                            }
                        });
                        /////
                    } else {
                        Ext.MessageBox.alert("错误信息", response.message);
                    }
                },
                failure: function () {
                    Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
                }
            });
        }

        ////
        var labform = Ext.create("Rds.order.panel.OrderLabMatchGridPanel", {
            region: "center",
            autoScroll: true,
            grid: me,
            ocp_id: values.ocp_id,
            ssid: ssid,
            flag: 1,
            nn: me.mm
        });
        var labwin = Ext.create("Ext.window.Window", {
            title: '实验室匹配',
            width: 700,
            iconCls: 'Pageedit',
            height: 500,
            maximizable: true,
            maximized: false,
            layout: 'border',
            items: [labform]
        });
        labwin.hide();
        ////

    },
    onCancel: function () {
        var me = this;
        me.up("window").close();
    }
});
