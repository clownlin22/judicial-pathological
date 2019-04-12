Ext.define("Rds.order.form.PersonpriceInstertForm", {
    extend: 'Ext.form.Panel',
    initComponent: function () {
        var me = this;
        me.items = [{
            id: 'items',
            xtype: 'form',
            defaults: {
                anchor: '100%',
                labelWidth: 80
            },
            border: false,
            autoHeight: true,
            items: [{
                layout: "column",// 从左往右的布局
                xtype: 'fieldcontainer',
                style: 'margin-left:25px;margin-right:5px;margin-top:30px;margin-bottom:5px;',
                border: false,
                items: [
                    {
                        border: false,
                        xtype: 'fieldcontainer',
                        layout: "column",
                        items: [{
                            xtype: "combo",
                            fieldLabel: '结算类型<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                            mode: 'local',
                            labelAlign: 'right',
                            id: 'balance_type',
                            labelWidth: 70,
                            displayField: 'Name',
                            valueField: 'Code',
                            blankText: '请选择市场价或折扣',
                            emptyText: '请选择市场价或折扣',
//				        		 blankText : "不能为空",// 错误提示信息，默认为This field is required!
                            name: 'balance_type',
                            store: new Ext.data.ArrayStore({
                                fields: ['Name', 'Code'],
                                data: [['市场价', 1], ['折扣', 2]]
                            }),
                            listeners: {
                                'select': function (a, b, c) {
                                    var aa = this.up('form').down('#cp_id').getValue();

                                    a.setValue(b[0].data.Name);
                                    var balance_type = Ext.getCmp('balance_type').getValue();
                                    var choose = b[0].data.Code;

                                    var cp_id = Ext.getCmp('cp_id');
                                    var name = Ext.getCmp('user_id');
                                    var hospital = Ext.getCmp('hospital');
                                    var market_price = Ext.getCmp('market_price');
                                    var discount_type = Ext.getCmp('discount_type');
                                    if (choose == 1) {
                                        name.show();
                                        hospital.show();
                                        market_price.show();
                                        discount_type.hide();
                                        discount_type.allowBlank = true;
                                        Ext.getCmp('items').form.reset();
                                        cp_id.setValue(aa);
                                        a.setValue(b[0].data.Code);
                                    } else if (choose == 2) {
                                        name.show();
                                        hospital.show();
                                        market_price.show();
                                        discount_type.show();
                                        discount_type.allowBlank = false;
                                        Ext.getCmp('items').form.reset();
                                        cp_id.setValue(aa);
                                        a.setValue(b[0].data.Code);
                                    }
                                }
                            }
                        }]
                    },
                    {
                        xtype: "hiddenfield",
                        name: "pc_id"
                    }, {
                        xtype: "textfield",
                        style: 'margin-top:10px;',
                        labelAlign: 'right',
                        hidden: true,
                        name: 'cp_id',
                        id: 'cp_id'
                    }, {
                        xtype: "combo",
                        style: 'margin-top:10px;',
                        fieldLabel: '折扣类型',
                        mode: 'local',
                        id: 'discount_type',
                        name: 'discount_type',
                        labelWidth: 70,
                        displayField: 'Name',
                        hidden: true,
                        valueField: 'Code',
                        blankText: '请选择折扣类型',
                        emptyText: '请选择折扣类型',
                        allowBlank: true,
                        labelAlign: 'right',
                        store: new Ext.data.ArrayStore({
                            fields: ['Name', 'Code'],
                            data: [['定额', 1], ['比例', 2]]
                        })
                    }, {
                        layout: "column",// 从左往右的布局
                        xtype: 'fieldcontainer',
                        style: 'margin-top:10px;',
                        border: false,
                        items: [{
                            xtype: 'combobox',
                            fieldLabel: '姓名',
                            labelWidth: 70,
                            hidden: true,
                            name: 'user_id',
                            id: 'user_id',
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
                            minChars: 2,
                            matchFieldWidth: true,
                            listConfig: {
                                loadingText: '正在查找...',
                                emptyText: '没有找到匹配的数据'
                            },
                            listeners: {
                                'change':function () {
                                    var val=Ext.getCmp('user_id').getValue();
                                    if(val){
                                        Ext.getCmp('hospital').disable();
                                    }else {
                                        Ext.getCmp('hospital').enable();
                                    }
                                },
                                'blur':function () {
                                    if(Ext.getCmp('user_id').getValue()==Ext.getCmp('user_id').getRawValue()){
                                        Ext.getCmp('user_id').reset();
                                    }
                                }
                            }
                        }]
                    }, {
                        xtype: "textfield",
                        style: 'margin-top:10px;',
                        labelAlign: 'right',
                        fieldLabel: '医院',
                        labelWidth: 70,
                        maxLength: 20,
                        hidden: true,
                        allowBlank: true,
                        name: 'hospital',
                        id: 'hospital',
                        listeners: {
                            'change':function () {
                                var val=Ext.getCmp('hospital').getValue();
                                if(val){
                                    Ext.getCmp('user_id').disable();
                                }else {
                                    Ext.getCmp('user_id').enable();
                                }
                            },
                            'blur':function () {
                                if(Ext.getCmp('hospital').getValue().trim()==""){
                                    Ext.getCmp('hospital').reset();
                                }
                            }
                        }
                    }, {
                        xtype: "textfield",
                        style: 'margin-top:10px;',
                        labelAlign: 'right',
                        hidden: true,
                        allowBlank: false,
                        fieldLabel: '标准市场价/折扣',
                        emptyText: '如折扣：0.1',
                        labelWidth: 70,
                        maxLength: 20,
                        regex : /^\d+(\.\d{1,2})?$/,
                        name: 'market_price',
                        id: 'market_price',
                        listeners:{
                            'change':function () {
                                if(Ext.getCmp('balance_type').getValue()==2 &&
                                    Ext.getCmp('discount_type').getValue()==2
                                ){
                                    // /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/
                                    Ext.getCmp('market_price').regex= /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/;
                                }else{
                                    Ext.getCmp('market_price').regex=/^\d+(\.\d{1,2})?$/;
                                }
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
                url: "personPrice/register/savePersonPrice.do",
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
                        Ext.Msg.confirm("提示", response.message, function (id) {
                            if (id == 'yes') {
                                Ext.Ajax.request({
                                    url: "personPrice/register/updatePersonPriceByPrice.do",
                                    method: "POST",
                                    headers: {'Content-Type': 'application/json'},
                                    jsonData: values,
                                    success: function (response) {
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
                        });
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
    },
    listeners: {
        'afterrender': function () {
            var cp_id = Ext.getCmp('cp_id');
            cp_id.setValue(this.cp_id);
        },
    }
});


