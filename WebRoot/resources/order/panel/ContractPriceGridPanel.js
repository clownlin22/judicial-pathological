var con_id = '';
Ext.define("Rds.order.panel.ContractPriceGridPanel", {
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
        con_id = this.con_id;
        var username = Ext.create('Ext.form.field.Text', {
            name: 'username',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '姓名'
        });
        var hospital = Ext.create('Ext.form.field.Text', {
            name: 'hospital',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '医院'
        });
        var market_price = Ext.create('Ext.form.field.Text', {
            name: 'market_price',
            labelWidth: 100,
            width: '16%',
            fieldLabel: '标准市场价/折扣'
        });
        var discount_type = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '折扣类型',
            width: '16%',
            labelWidth: 60,
            editable: false,
            triggerAction: 'all',
            displayField: 'Name',
            valueField: 'Code',
            store: new Ext.data.ArrayStore({
                fields: ['Name', 'Code'],
                data: [['全部',],
                    ['定额', 1],
                    ['比例', 2]]
            }),
            mode: 'local',
            name: 'discount_type'
        });
        var balance_type = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '模板类型',
            width: '16%',
            labelWidth: 60,
            editable: false,
            triggerAction: 'all',
            displayField: 'Name',
            valueField: 'Code',
            store: new Ext.data.ArrayStore({
                fields: ['Name', 'Code'],
                data: [['全部',],
                    ['市场价', 1],
                    ['折扣', 2]]
            }),
            mode: 'local',
            name: 'balance_type'
        });
        var state = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '状态',
            width: '16%',
            labelWidth: 60,
            editable: false,
            triggerAction: 'all',
            displayField: 'Name',
            value: 0,
            valueField: 'Code',
            store: new Ext.data.ArrayStore({
                fields: ['Name', 'Code'],
                data: [['全部', null],
                    ['未删除', 0],
                    ['已删除', 1]]
            }),
            mode: 'local',
            name: 'state'
        });
        me.store = Ext.create('Ext.data.Store', {
            fields: ["cp_id", "pc_id", "username", "username1", "hospital", "discount_type","user_id",
                "balance_type", "market_price", "cre_person", "cre_time", "state", "con_id", "check_project"],
            proxy: {
                type: 'jsonajax',
                actionMethods: {
                    read: 'POST'
                },
                url: 'personPrice/register/queryPriceByConId.do',
                params: {
                    con_id: this.con_id,
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
                        username: trim(username.getValue()),
                        hospital: trim(hospital.getValue()),
                        discount_type: discount_type.getValue(),
                        balance_type: balance_type.getValue(),
                        state: state.getValue(),
                        market_price: trim(market_price.getValue())
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
            {dataIndex: 'pc_id', hidden: true},
            {dataIndex: 'user_id', hidden: true},
            {dataIndex: 'con_id', hidden: true},
            {
                text: '标准市场价/折扣', dataIndex: 'market_price', width: 200, menuDisabled: true,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex,
                                    store) {
                    var state = record.data["state"];
                    if (state == 1) {
                        return "<div style=\"text-decoration: line-through;color: red;\">"
                            + value + "</div>"
                    } else {
                        return value;
                    }
                }
            },
            {text: '姓名', dataIndex: 'username', width: 200, menuDisabled: true},
            {text: '医院', dataIndex: 'hospital', width: 200, menuDisabled: true},
            {text: '检测项目', dataIndex: 'check_project', width: 200, menuDisabled: true},
            {
                text: '折扣类型', dataIndex: 'discount_type', width: 200, menuDisabled: true,
                renderer: function (value) {
                    switch (value) {
                        case 1 :
                            return "定额";
                            break;
                        case 2 :
                            return "比例";
                            break;
                    }
                }
            },
            {
                text: '结算类型', dataIndex: 'balance_type', width: 200, menuDisabled: true,
                renderer: function (value) {
                    switch (value) {
                        case 1 :
                            return "市场价";
                            break;
                        case 2 :
                            return "折扣";
                            break;
                    }
                }
            },
            {text: '创建人', dataIndex: 'username1', width: 200, menuDisabled: true},
            {text: '创建时间', dataIndex: 'cre_time', width: 200, menuDisabled: true}
        ];
        me.startdate = new Date(new Date().getFullYear() + '/01/01')
        me.dockedItems = [{
            xtype: 'toolbar',
            name: 'search',
            dock: 'top',
            items: [username, hospital, discount_type, balance_type, market_price]
        }, {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [state, {
                text: '查询',
                iconCls: 'Find',
                handler: me.onSearch
            }]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '添加配置',
                iconCls: 'Pageedit',
                handler: me.onInsert
            }, {
                text: '修改配置',
                iconCls: 'Pageedit',
                handler: me.onUpdate
            }, {
                text: '废除',
                iconCls: 'Delete',
                handler: me.onDelete
            }]
        }];
        me.callParent(arguments);
    },
    onSearch: function () {
        var me = this.up("gridpanel");
        me.getStore().currentPage = 1;
        me.getStore().load();
    },
    onUpdate: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要修改的合同");
            return;
        }
        ;

        if (selections[0].data.state == 1) {
            Ext.Msg.alert("提示", "该定价配置已废弃!");
            return;
        }
        var form = Ext.create("Rds.order.form.ContractpriceUpdateForm", {
            region: "center",
            autoScroll: true,
            grid: me,
            aaa: selections[0].data.balance_type
        });
        var win = Ext.create("Ext.window.Window", {
            title: '修改定价配置',
            width: 350,
            iconCls: 'Pageedit',
            height: 380,
            maximizable: true,
            maximized: false,
            layout: 'border',
            items: [form]
        });
        form.loadRecord(selections[0]);
        win.show();
    },
    onDelete: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();
        if (selections.length < 1) {
            Ext.Msg.alert("提示", "请选择一条需要废除的定价配置!");
            return;
        }
        ;
        var pc_ids="";
        for (var i = 0; i < selections.length; i++) {

            if (i == 0) {
                pc_ids += selections[i].get("pc_id")
            } else {
                pc_ids += ',' +  selections[i].get("pc_id")
            }
        }

        var values = {
            pc_ids: pc_ids
        };
        Ext.MessageBox.confirm('提示', '确定废除改定价配置吗', function (id) {
            if (id == 'yes') {
                Ext.Ajax.request({
                    url: "personPrice/register/updatePersonPriceState.do",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    jsonData: values,
                    success: function (response, options) {
                        response = Ext.JSON
                            .decode(response.responseText);
                        if (response == true) {
                            Ext.MessageBox.alert("提示信息",
                                "废除成功！");
                            me.getStore().load();
                        } else {
                            Ext.MessageBox.alert("错误信息",
                                "废除失败！");
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert("提示", "网络故障<br>请联系管理员!");
                    }
                });
            }
        });
    },
    onInsert: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();
        var form = Ext.create("Rds.order.form.ContractpriceInstertForm", {
            region: "center",
            autoScroll: true,
            grid: me,
            con_id: con_id
        });
        var win = Ext.create("Ext.window.Window", {
            title: '添加定价配置',
            width: 350,
            iconCls: 'Pageedit',
            height: 380,
            maximizable: true,
            maximized: false,
            layout: 'border',
            items: [form]
        });
        win.show();
    },

    listeners: {
        'afterrender': function () {
            var con_id = this.con_id;
            this.store.load();
        }
    }
});
