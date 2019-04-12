Ext.define('Rds.order.form.LaboratoryInstertForm', {
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
                    fieldLabel: 'lab_id',
                    hidden: true,
                    name: 'lab_id'
                }, {
                    columnWidth: .5,
                    xtype: "textfield",
                    labelAlign: 'right',
                    labelWidth: 80,
                    fieldLabel: '实验室名称',
                    allowBlank: false,
                    name: 'name',
                    maxLength: 20
                }, {
                    columnWidth: .5,
                    xtype: "textfield",
                    labelAlign: 'right',
                    labelWidth: 80,
                    allowBlank: false,
                    fieldLabel: '所属地区',
                    name: 'affiliated_area',
                    maxLength: 20
                }]
            }, {
                border: false,
                xtype: 'fieldcontainer',
                layout: "column",
                items: [{
                    columnWidth: .5,
                    xtype: "textfield",
                    labelAlign: 'right',
                    allowBlank: false,
                    labelWidth: 80,
                    fieldLabel: '负责人',
                    name: 'res_person',
                    maxLength: 20
                }, {
                    columnWidth: .5,
                    xtype: "textfield",
                    labelAlign: 'right',
                    allowBlank: false,
                    labelWidth: 80,
                    fieldLabel: '负责人电话',
                    regex: /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,11}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/,
                    name: 'res_telephone',
                    regexText: "电话格式有误"
                }]
            }, {
                border: false,
                xtype: 'fieldcontainer',
                layout: "column",
                items: [{
                    xtype: 'textarea',
                    fieldLabel: '介绍',
                    name: 'introduce',
                    columnWidth: 1,
                    maxLength: 400,
                    labelWidth: 80,
                    labelAlign: 'right'
                }]
            }, {
                border: false,
                xtype: 'fieldcontainer',
                layout: "column",
                items: [{
                    xtype: 'textarea',
                    fieldLabel: '备注',
                    name: 'remark',
                    columnWidth: 1,
                    maxLength: 400,
                    labelWidth: 80,
                    labelAlign: 'right'
                }]
            }
            ]
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
                url: "laboratory/register/insertLabInfo.do",
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
