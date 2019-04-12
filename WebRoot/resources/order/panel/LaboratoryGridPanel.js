Ext.define("Rds.order.panel.LaboratoryGridPanel", {
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
        var name = Ext.create('Ext.form.field.Text', {
            name: 'name',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '名称'
        });
        var affiliated_area = Ext.create('Ext.form.field.Text', {
            name: 'affiliated_area',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '所属地区'
        });

        var res_person = Ext.create('Ext.form.field.Text', {
            name: 'res_person',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '负责人'
        });
        var res_telephone = Ext.create('Ext.form.field.Text', {
            name: 'res_telephone',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '电话'
        });
        var laboratory_state = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '状态',
            width: '16%',
            labelWidth: 60,
            editable: false,
            triggerAction: 'all',
            displayField: 'Name',
            valueField: 'Code',
            value: 0,
            store: new Ext.data.ArrayStore({
                fields: ['Name', 'Code'],
                data: [['启用', 0], ['废除', 1]]
            }),
            mode: 'local',
            name: 'laboratory_state'
        });
        me.store = Ext.create('Ext.data.Store', {
            fields: ["lab_id", "name", "affiliated_area", "introduce", "res_person", "res_telephone", "laboratory_state", "remark"],
            proxy: {
                type: 'jsonajax',
                actionMethods: {
                    read: 'POST'
                },
                url: 'laboratory/register/getLabInfo.do',
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
                        laboratory_state: laboratory_state.getValue(),
                        name: trim(name.getValue()),
                        affiliated_area: trim(affiliated_area.getValue()),
                        res_person: trim(res_person.getValue()),
                        res_telephone: trim(res_telephone.getValue())
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

        me.columns = [{dataIndex: 'lab_id', hidden: true},
            {
                text: '名称', dataIndex: 'name', width: 200, menuDisabled: true,
                renderer: function (value, cellmeta, record ) {
                    var laboratory_state = record.data["laboratory_state"];
                    if (laboratory_state == 1) {
                        return "<div style=\"text-decoration: line-through;color: red;\">"
                            + value + "</div>"
                    } else {
                        return value;
                    }
                }
            },
            {text: '所属地区', dataIndex: 'affiliated_area', width: 200, menuDisabled: true},
            {text: '介绍', dataIndex: 'introduce', width: 200, menuDisabled: true},
            {text: '负责人', dataIndex: 'res_person', width: 200, menuDisabled: true},
            {text: '负责人电话', dataIndex: 'res_telephone', width: 200, menuDisabled: true},
            {
                text: '实验室状态', dataIndex: 'laboratory_state', width: 200, menuDisabled: true,
                renderer: function (value) {
                    switch (value) {
                        case 0 :
                            return "启用";
                            break;
                        case 1 :
                            return "废除";
                            break;
                    }
                }
            },
            {text: '备注', dataIndex: 'remark', width: 200, menuDisabled: true},
        ];
        me.startdate = new Date(new Date().getFullYear() + '/01/01')
        me.dockedItems = [{
            xtype: 'toolbar',
            name: 'search',
            dock: 'top',
            items: [name, affiliated_area, res_person, res_telephone]
        }, {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [laboratory_state, {
                text: '查询',
                iconCls: 'Find',
                handler: me.onSearch
            }]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '登记',
                iconCls: 'Pageedit',
                handler: me.onInsert
            }, {
                text: '修改',
                iconCls: 'Pageedit',
                handler: me.onUpdate
            }, {
                text: '废除',
                iconCls: 'Delete',
                handler: me.onDelete
            }, {
                text: '权限配置',
                iconCls: 'Cog',
                handler: me.onPermitConfig
            }]
        }];
        me.callParent(arguments);
    },
    onSearch: function () {
        var me = this.up("gridpanel");
        me.getStore().currentPage = 1;
        me.getStore().load();
    },
    //
    onPermitConfig: function () {
        var me = this.up("gridpanel");
        var ss = this.up("gridpanel").getView().getSelectionModel().getSelection();
        if (ss.length != 1) {
            Ext.MessageBox.alert("提示信息", '请选择一间需要配置的实验室!');
            return;
        }
        if (ss[0].data.laboratory_state!=0) {
            Ext.MessageBox.alert("提示信息", '该实验室已废除，请重新选择!');
            return;
        }

        var form = Ext.create("Rds.order.panel.LaboratoryConfigGridPanel", {
            region: "center",
            autoScroll: true,
            grid: me,
            lab_id: ss[0].data.lab_id
        });
        var win = Ext.create("Ext.window.Window", {
            title: '实验室配置',
            width: 1000,
            iconCls: 'Pageedit',
            height: 600,
            maximizable: true,
            maximized: false,
            layout: 'border',
            items: [form]
        });
        form.loadRecord(ss[0]);
        win.show();
    },
    //
    onUpdate: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections[0].data.laboratory_state == 1) {
            Ext.Msg.alert("提示", "该实验室已废弃");
            return;
        }
        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择需要修改的记录!");
            return;
        }

        var form = Ext.create("Rds.order.form.LaboratoryUpdateForm", {
            region: "center",
            autoScroll: true,
            grid: me
        });
        var win = Ext.create("Ext.window.Window", {
            title: '实验室修改',
            width: 600,
            iconCls: 'Pageedit',
            height: 350,
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
        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要废除的实验室!");
            return;
        }
        ;
        var values = {
            lab_id: selections[0].get("lab_id")
        };
        Ext.MessageBox.confirm('提示', '确定废除该实验室吗', function (id) {
            if (id == 'yes') {
                Ext.Ajax.request({
                    url: "laboratory/register/deleteLabInfo.do",
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

        var form = Ext.create("Rds.order.form.LaboratoryInstertForm", {
            region: "center",
            autoScroll: true,
            grid: me
        });
        var win = Ext.create("Ext.window.Window", {
            title: '实验室登记',
            width: 600,
            iconCls: 'Pageedit',
            height: 350,
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
