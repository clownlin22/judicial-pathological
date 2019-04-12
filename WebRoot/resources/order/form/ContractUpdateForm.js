Ext.define("Rds.order.form.ContractUpdateForm", {
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
                items: [{
                    xtype: "textfield",
                    labelAlign: 'right',
                    labelWidth: 60,
                    fieldLabel: 'con_id',
                    hidden: true,
                    name: 'con_id'
                }, {
                    xtype: "textfield",
                    labelAlign: 'right',
                    labelWidth: 60,
                    fieldLabel: 'user_id',
                    hidden: true,
                    name: 'user_id'
                }, {
                    xtype: "textfield",
                    labelAlign: 'right',
                    labelWidth: 60,
                    fieldLabel: 'pc_id',
                    hidden: true,
                    name: 'pc_id'
                }, {
                    columnWidth: .5,
                    xtype: "textfield",
                    labelAlign: 'right',
                    labelWidth: 60,
                    fieldLabel: '甲方',
                    allowBlank: false,
                    name: 'party_a',
                    maxLength: 20
                }, {
                    columnWidth: .5,
                    xtype: 'combo',
                    fieldLabel: '乙方',
                    labelWidth: 80,
                    name: 'party_b',
                    labelAlign: 'right',
                    allowBlank: false,
                    emptyText: '(人员首字母)：如小明(xm)',
                    store: Ext.create("Ext.data.Store", {
                        fields: [
                            {name: 'key', mapping: 'key', type: 'string'},
                            {name: 'value', mapping: 'value', type: 'string'}
                        ],
                        pageSize: 20,
                        autoLoad: false,
                        proxy: {
                            type: "ajax",
                            url: 'personPrice/register/getUsersId.do',
                            reader: {
                                type: "json"
                            }
                        }
                    }),
                    displayField: 'value',
                    valueField: 'key',
                    typeAhead: false,
                    hideTrigger: true,
                    minChars: 2,
                    matchFieldWidth: true,
                    listConfig: {
                        loadingText: '正在查找...',
                        emptyText: '没有找到匹配的数据'
                    },
                    listeners: {
                        'afterrender': function () {
                            this.store.load();
                        }
                    }
                }]
            }, {
                border: false,
                xtype: 'fieldcontainer',
                layout: "column",
                items: [{
                    columnWidth: .5,
                    xtype: 'combo',
                    fieldLabel: '代理人',
                    allowBlank: false,
                    labelWidth: 60,
                    name: 'agent',
                    labelAlign: 'right',
                    emptyText: '(人员首字母)：如小明(xm)',
                    store: Ext.create("Ext.data.Store", {
                        fields: [
                            {name: 'key', mapping: 'key', type: 'string'},
                            {name: 'value', mapping: 'value', type: 'string'}
                        ],
                        pageSize: 20,
                        autoLoad: false,
                        proxy: {
                            type: "ajax",
                            url: 'personPrice/register/getUsersId.do',
                            reader: {
                                type: "json"
                            }
                        }
                    }),
                    displayField: 'value',
                    valueField: 'key',
                    typeAhead: false,
                    hideTrigger: true,
                    minChars: 2,
                    matchFieldWidth: true,
                    listConfig: {
                        loadingText: '正在查找...',
                        emptyText: '没有找到匹配的数据'
                    },
                    listeners: {
                        'afterrender': function () {
                            this.store.load();
                        }
                    }
                }, {
                    columnWidth: .5,
                    xtype: 'datefield',
                    name: 'take_effect_time',
                    id: 'take_effect_time',
                    allowBlank: false,
                    fieldLabel: '生效时间 ',
                    labelWidth: 80,
                    labelAlign: 'right',
                    format: 'Y-m-d'
                }]
            }, {
                border: false,
                xtype: 'fieldcontainer',
                layout: "column",
                items: [{
                    columnWidth: .5,
                    xtype: 'datefield',
                    name: 'fail_time',
                    id: 'fail_time',
                    fieldLabel: '失效时间 ',
                    allowBlank: false,
                    labelWidth: 60,
                    labelAlign: 'right',
                    format: 'Y-m-d',
                    listeners: {
                        focus: function () {
                            var fail_time = this.up('form').down('#fail_time');
                            var take_effect_time = this.up('form').down('#take_effect_time');
                            var start = take_effect_time.getValue();
                            fail_time.setMinValue(
                                start);
                        }
                    }
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
                url: "personPrice/register/updateContractInfo.do",
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                jsonData: values,
                success: function (response, options) {
                    response = Ext.JSON.decode(response.responseText);
                    if (response.result) {
                        me.up("window").close();
                        me.grid.getStore().load();
                        Ext.MessageBox.alert("信息", response.message);
                    } else {
                        Ext.MessageBox.alert("错误信息", response.message);
                    }
                },
                failure: function () {
                    Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
                }
            });
        }
    },
    onCancel: function () {
        var me = this;
        me.up("window").close();
    }
});
