Ext.define("Rds.order.form.ContractInstertForm", {
    extend: 'Ext.form.Panel',
    initComponent: function () {
        var me = this;

        me.items = [{
            xtype: 'form',
            id: 'form1',
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
                    fieldLabel: 'pc_id',
                    hidden: true,
                    name: 'pc_id'
                }, {
                    columnWidth: .5,
                    xtype: "textfield",
                    labelAlign: 'right',
                    labelWidth: 60,
                    allowBlank: false,
                    fieldLabel: '甲方',
                    name: 'party_a',
                    maxLength: 20
                }, {
                    columnWidth: .5,
                    xtype: 'combo',
                    fieldLabel: '乙方',
                    labelWidth: 80,
                    emptyText: '(人员首字母)：如小明(xm)',
                    name: 'party_b',
                    labelAlign: 'right',
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
                    forceSelection: true,
                    allowBlank: false,
                    minChars: 2,
                    matchFieldWidth: true,
                    listConfig: {
                        loadingText: '正在查找...',
                        emptyText: '没有找到匹配的数据'
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
                    labelWidth: 60,
                    emptyText: '(人员首字母)：如小明(xm)',
                    name: 'agent',
                    labelAlign: 'right',
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
                    forceSelection: true,
                    allowBlank: false,
                    minChars: 2,
                    matchFieldWidth: true,
                    listConfig: {
                        loadingText: '正在查找...',
                        emptyText: '没有找到匹配的数据'
                    }
                },{
                    columnWidth: .5,
                    xtype: 'datefield',
                    name: 'take_effect_time',
                    id: 'take_effect_time',
                    fieldLabel: '生效时间 ',
                    allowBlank: false,
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
                    xtype: 'filefield',
                    name: 'headPhoto',
                    fieldLabel: '附件<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                    labelWidth: 60,
                    labelAlign: 'right',
                    allowBlank: false,
                    buttonText: '选择附件'
                }, {
                    columnWidth: .5,
                    xtype: 'datefield',
                    name: 'fail_time',
                    id: 'fail_time',
                    fieldLabel: '失效时间 ',
                    allowBlank: false,
                    labelWidth: 80,
                    labelAlign: 'right',
                    format: 'Y-m-d',
                    listeners : {
                        focus : function() {
                            var fail_time=this.up('form').down('#fail_time');
                            var take_effect_time=this.up('form').down('#take_effect_time');
                            var start = take_effect_time.getValue();
                            fail_time.setMinValue(
                                start);
                        }
                    }
                }, {
                    columnWidth: .5,
                    xtype: "hiddenfield",
                    labelAlign: 'right',
                    labelWidth: 80,
                    fieldLabel: 'num',
                    id: 'num',
                    value: 0,
                    name: 'num'
                }]
            }, {
                border: false,
                xtype: 'fieldcontainer',
                layout: "column",
                items: [{
                    xtype: 'button',
                    text: '添加定价配置',
                    width: 100,
                    x: '70%',
                    listeners: {
                        click: function () {
                            var me = this.up("form");
                            var num = me.down("#num").rawValue;
                            me.down("#num").setValue(++num);
                            me.add({
                                xtype: 'form',
                                style: 'margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:5px;',
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
                                    layout: 'auto',
                                    xtype: 'panel',
                                    border: false,
                                    items: [{
                                        layout: 'column',
                                        xtype: 'panel',
                                        border: false,
                                        items: [{
                                            xtype: "combo",
                                            fieldLabel: '结算类型',
                                            mode: 'local',
                                            name: 'balance_type',
                                            labelWidth: 70,
                                            displayField: 'Name',
                                            valueField: 'Code',
                                            blankText: '请选择市场价或折扣',
                                            emptyText: '请选择市场价或折扣',
                                            allowBlank: false,
                                            labelAlign: 'right',
                                            value: 3,
                                            store: new Ext.data.ArrayStore({
                                                fields: ['Name', 'Code'],
                                                data: [[, 3], ['市场价', 1], ['折扣', 2]]
                                            }),
                                            listeners: {
                                                'select': function (a, b, c) {
                                                    if (b[0].data.Code == 1) {
                                                        var form = this.up("form");
                                                        form.getForm().findField('discount_type').hide();
                                                        form.getForm().findField('discount_type').allowBlank = true;
                                                    } else if (b[0].data.Code == 2) {
                                                        var form = this.up("form");
                                                        form.getForm().findField('discount_type').show();
                                                        form.getForm().findField('discount_type').allowBlank = false;
                                                    }
                                                }
                                            }
                                        }, {
                                            xtype: "combo",
                                            fieldLabel: '折扣类型',
                                            mode: 'local',
                                            name: 'discount_type',
                                            labelWidth: 70,
                                            hidden: true,
                                            displayField: 'Name',
                                            valueField: 'Code',
                                            blankText: '请选择折扣类型',
                                            emptyText: '请选择折扣类型',
                                            allowBlank: false,
                                            labelAlign: 'right',
                                            store: new Ext.data.ArrayStore({
                                                fields: ['Name', 'Code'],
                                                data: [['定额', 1], ['比例', 2]]
                                            })
                                        }]
                                    }
                                        , {
                                            layout: 'column',
                                            xtype: 'panel',
                                            border: false,
                                            style: 'margin-top:5px;',
                                            items: [{
                                                xtype: 'combo',
                                                fieldLabel: '姓名',
                                                labelWidth: 70,
                                                name: 'user_id',
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
                                                // forceSelection: true,
                                                allowBlank: true,
                                                readOnly:false,
                                                minChars: 2,
                                                matchFieldWidth: true,
                                                listConfig: {
                                                    loadingText: '正在查找...',
                                                    emptyText: '没有找到匹配的数据'
                                                },
                                                listeners: {
                                                    'change':function () {
                                                        var form = this.up("form");
                                                        var val=form.getForm().findField('user_id').getValue();
                                                        if(val){
                                                            form.getForm().findField('hospital').setReadOnly(true);
                                                        }else {
                                                            form.getForm().findField('hospital').setReadOnly(false);
                                                        }
                                                    }
                                                }
                                            }, {
                                                xtype: "textfield",
                                                labelAlign: 'right',
                                                fieldLabel: '医院',
                                                labelWidth: 70,
                                                maxLength: 20,
                                                readOnly: false,
                                                allowBlank: true,
                                                name: 'hospital',
                                                listeners: {
                                                    'change':function () {
                                                        var form = this.up("form");
                                                        var val=form.getForm().findField('hospital').getValue();
                                                        if(val){
                                                            form.getForm().findField('user_id').setReadOnly(true);
                                                        }else {
                                                            form.getForm().findField('user_id').setReadOnly(false);
                                                        }
                                                    },
                                                    'blur':function () {
                                                        var form = this.up("form");
                                                        if(form.getForm().findField('hospital').getValue().trim()==""){
                                                            form.getForm().findField('hospital').reset();
                                                        }
                                                    }
                                                }
                                            }]
                                        }, {
                                            layout: 'column',
                                            xtype: 'panel',
                                            border: false,
                                            style: 'margin-top:5px;',
                                            items: [{
                                                xtype: "textfield",
                                                labelAlign: 'right',
                                                allowBlank: false,
                                                fieldLabel: '市场价/折扣',
                                                labelWidth: 70,
                                                maxLength: 20,
                                                name: 'market_price'
                                            }, {
                                                layout: 'column',
                                                xtype: 'panel',
                                                border: false,
                                                items: [{
                                                    xtype: 'combo',
                                                    fieldLabel: '检测项目',
                                                    labelWidth: 70,
                                                    name: 'cp_id',
                                                    labelAlign: 'right',
                                                    emptyText: '(检测项目前两位)',
                                                    store: Ext.create("Ext.data.Store", {
                                                        fields: [
                                                            {name: 'key', mapping: 'key', type: 'string'},
                                                            {name: 'value', mapping: 'value', type: 'string'}
                                                        ],
                                                        pageSize: 20,
                                                        autoLoad: false,
                                                        proxy: {
                                                            type: "ajax",
                                                            url: 'personPrice/register/getCheckProjectInfoById.do',
                                                            reader: {
                                                                type: "json"
                                                            }
                                                        }
                                                    }),
                                                    displayField: 'value',
                                                    valueField: 'key',
                                                    typeAhead: false,
                                                    hideTrigger: true,
                                                    forceSelection: true,
                                                    allowBlank: false,
                                                    minChars: 2,
                                                    matchFieldWidth: true,
                                                    listConfig: {
                                                        loadingText: '正在查找...',
                                                        emptyText: '没有找到匹配的数据'
                                                    }
                                                }]
                                            }, {
                                                layout: 'absolute',// 从左往右的布局
                                                xtype: 'panel',
                                                border: false,
                                                style: 'margin-top:5px;',
                                                items: [{
                                                    width: 50,
                                                    x: 400,
                                                    xtype: 'button',
                                                    text: '删除',
                                                    listeners: {
                                                        click: function () {
                                                            var mei = this.up("form");
                                                            var meii = this.up("window");
                                                            var mm = meii.down("#form1")
                                                            var num = mm.down("#num").rawValue;
                                                            mm.down("#num").setValue(--num);
                                                            mei.disable(true);
                                                            mei.up("form").remove(mei);
                                                        }
                                                    }
                                                }]
                                            }]
                                        }]
                                }]
                            });
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
        if (form.isValid()) {

            form.submit({
                url: 'personPrice/register/insertContractInfo.do',
                method : 'post',
                waitMsg : '正在保存...',
                submitEmptyText: false,
                params:{
                    'cp_id':form.getValues().cp_id,
                    'user_id':form.getValues().user_id,
                    'hospital':form.getValues().hospital,
                    'market_price':form.getValues().market_price,
                    'discount_type':form.getValues().discount_type,
                    'balance_type':form.getValues().balance_type
                },
                success : function(form, action) {
                    response = Ext.JSON.decode(action.response.responseText);
                    if (response.result) {
                        Ext.MessageBox.alert("提示信息", response.message);
                        me.grid.getStore().load();
                        me.up('window').close();
                    } else {
                        Ext.MessageBox.alert("提示信息", response.message);


                        // form.submit({
                        //     url: 'personPrice/register/updatePersonPriceByPrice2.do',
                        //     method : 'post',
                        //     waitMsg : '正在保存...',
                        //     submitEmptyText: false,
                        //     params:{
                        //         'cp_id':form.getValues().cp_id,
                        //         'user_id':form.getValues().user_id,
                        //         'hospital':form.getValues().hospital,
                        //         'market_price':form.getValues().market_price,
                        //         'discount_type':form.getValues().discount_type,
                        //         'balance_type':form.getValues().balance_type
                        //     },
                        //     success : function(form, action) {
                        //         response = Ext.JSON.decode(action.response.responseText);
                        //         if (response.result) {
                        //             Ext.MessageBox.alert("提示信息", response.message);
                        //             me.grid.getStore().load();
                        //             me.up('window').close();
                        //         } else {
                        //             Ext.MessageBox.alert("提示信息", response.message);
                        //         }
                        //     },
                        //     failure : function() {
                        //         Ext.Msg.alert("提示", "保存失败，请联系管理员!");
                        //     }
                        // });




                    }
                },
                failure : function() {
                    Ext.Msg.alert("提示", "保存失败，请联系管理员!");
                }
            });
            //

        }
    },
    onCancel: function () {
        var me = this;
        me.up("window").close();
    }
});
