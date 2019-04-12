Ext.define("Rds.order.panel.ContractGridPanel", {
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
        var party_a = Ext.create('Ext.form.field.Text', {
            name: 'party_a',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '甲方'
        });
        var party_b = Ext.create('Ext.form.field.Text', {
            name: 'party_b',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '乙方'
        });
        var agent = Ext.create('Ext.form.field.Text', {
            name: 'agent',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '代理人'
        });
        var take_effect_time_start = Ext.create('Ext.form.DateField', {
            name: 'take_effect_time_start',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '生效日期',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            listeners: {
                select: function () {
                    var start = take_effect_time_start
                        .getValue();
                    take_effect_time_end.setMinValue(
                        start);
                }
            }
        });
        var take_effect_time_end = Ext.create('Ext.form.DateField', {
            name: 'take_effect_time_end',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '到',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            listeners: {
                select: function () {
                    var end = take_effect_time_end
                        .getValue();
                    take_effect_time_start.setMaxValue(
                        end);
                }
            }
        });
        var fail_time_start = Ext.create('Ext.form.DateField', {
            name: 'fail_time_start',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '失效日期',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            listeners: {
                select: function () {
                    var start = fail_time_start
                        .getValue();
                    fail_time_end.setMinValue(
                        start);
                }
            }
        });
        var fail_time_end = Ext.create('Ext.form.DateField', {
            name: 'fail_time_end',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '到',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            listeners: {
                select: function () {
                    var end = fail_time_end
                        .getValue();
                    fail_time_start.setMaxValue(
                        end);
                }
            }
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
                data: [['全部',],
                    ['未删除', 0],
                    ['已删除', 1]]
            }),
            mode: 'local',
            name: 'state'
        });

        me.store = Ext.create('Ext.data.Store', {
            fields: ["con_id", "pc_id", "party_a", "party_b", "agent", "take_effect_time", "fail_time",
                "cre_time", "cre_person", "username", "username1", "username2", "user_id", "state"],
            proxy: {
                type: 'jsonajax',
                actionMethods: {
                    read: 'POST'
                },
                url: 'personPrice/register/getContractInfo.do',
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
                        state: state.getValue(),
                        party_a: trim(party_a.getValue()),
                        party_b: trim(party_b.getValue()),
                        agent: trim(agent.getValue()),
                        take_effect_time_start: dateformat(take_effect_time_start.getValue()),
                        take_effect_time_end: dateformat(take_effect_time_end.getValue()),
                        fail_time_start: dateformat(fail_time_start.getValue()),
                        fail_time_end: dateformat(fail_time_end.getValue())
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
            {dataIndex: 'con_id', hidden: true},
            {dataIndex: 'pc_id', hidden: true},
            {dataIndex: 'user_id', hidden: true},
            {
                text: '甲方', dataIndex: 'party_a', width: 200, menuDisabled: true,
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
            {
                text: '乙方', dataIndex: 'username1', width: 200, menuDisabled: true,
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
            {text: '代理人', dataIndex: 'username2', width: 200, menuDisabled: true},
            {text: '生效时间', dataIndex: 'take_effect_time', width: 200, menuDisabled: true},
            {text: '失效时间', dataIndex: 'fail_time', width: 200, menuDisabled: true},
            {text: '创建日期', dataIndex: 'cre_time', width: 200, menuDisabled: true,
                renderer: function (value) {
                    return value.substring(0,19);
                }},
            {text: '创建人', dataIndex: 'username', width: 200, menuDisabled: true}
        ];
        me.startdate = new Date(new Date().getFullYear() + '/01/01')
        me.dockedItems = [{
            xtype: 'toolbar',
            name: 'search',
            dock: 'top',
            items: [party_a, party_b, agent, take_effect_time_start, take_effect_time_end]
        }, {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [fail_time_start,fail_time_end, state, {
                text: '查询',
                iconCls: 'Find',
                handler: me.onSearch
            }]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '查看或配置定价信息',
                iconCls: 'Find',
                handler: me.onFind
            }, {
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
                text: '上传附件',
                iconCls: 'Add',
                handler: me.onInsertAtt
            }]
        }];
        me.callParent(arguments);
    },
    onSearch: function () {
        var me = this.up("gridpanel");
        me.getStore().currentPage = 1;
        me.getStore().load();
    },
    onFind: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要查看的定价信息!");
            return;
        };

        var form = Ext.create("Rds.order.panel.ContractPriceGridPanel", {
            region: "center",
            autoScroll: true,
            grid: me,
            con_id: selections[0].data.con_id
        });
        var win = Ext.create("Ext.window.Window", {
            title: '查看或配置定价信息',
            width: 1200,
            iconCls: 'Pageedit',
            height: 500,
            maximizable: true,
            maximized: false,
            layout: 'border',
            items: [form]
        });
        win.show();

    },
    onInsertAtt: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择需要上传附件的项目!");
            return;
        }
        ;

        var win = Ext.create("Ext.window.Window", {
            title: "上传附件管理",
            width: 1000,
            iconCls: 'Find',
            height: 300,
            modal: true,
            resizable: false,
            layout: 'border',
            autoScroll: true,
            father: me,
            tbar: [{
                text: '添加',
                iconCls: 'Pageadd',
                handler: function () {
                    var father = this.up('window');
                    var form = Ext.create('Ext.form.Panel', {
                        region: "center",
                        autoScroll: true,
                        layout: 'anchor',
                        bodyPadding: 10,
                        defaults: {
                            anchor: '100%'
                        },
                        defaultType: 'textfield',
                        items: [{
                            xtype: "hiddenfield",
                            name: 'con_id',
                            value: selections[0].data.con_id
                        }, {
                            xtype: "hiddenfield",
                            name: 'case_id',
                            value: selections[0].data.case_id
                        }, {
                            xtype: "hiddenfield",
                            name: 'ocp_id',
                            value: selections[0].data.ocp_id
                        }, {
                            xtype: "hiddenfield",
                            name: 'order_id',
                            value: selections[0].data.order_id
                        }, {
                            xtype: "hiddenfield",
                            name: 'att_id',
                            value: selections[0].data.att_id
                        }, {
                            xtype: "hiddenfield",
                            name: 'att_catalog'
                        }, {
                            xtype: 'filefield',
                            name: 'headPhoto',
                            fieldLabel: '附件',
                            allowBlank: false,
                            buttonText: '选择附件',
                            validator: function (v) {
                                /////???
                                return true;
                            }
                        }],

                        buttons: [{
                            text: '上传',
                            iconCls: 'Diskupload',
                            handler: function () {
                                var grid2 = this.up('window').father.father;
                                var grid = this.up('window').father.down('gridpanel');
                                var myWindow = this.up('window');
                                var form = this.up('form').getForm();
                                if (!form.isValid()) {
                                    Ext.MessageBox.alert("提示信息", "请选择附件!");
                                    return;
                                }

                                form.submit({
                                    url: 'personPrice/register/uploadAtt.do',
                                    method: 'post',
                                    waitMsg: '正在上传您的文件...',
                                    success: function (form, action) {
                                        Ext.Msg.alert("提示", "上传成功!");
                                        grid.getStore().reload();
                                        grid2.getStore().reload();
                                        myWindow.close();
                                    },
                                    failure: function () {
                                        Ext.Msg.alert("提示", "上传失败，请联系管理员!");
                                        myWindow.close();
                                    }
                                });
                            }
                        }, {
                            text: '取消',
                            iconCls: 'Cancel',
                            handler: function () {
                                this.up('window').close();
                            }
                        }]
                    });

                    var win = Ext.create("Ext.window.Window", {
                        title: '案例添加',
                        iconCls: 'Pageedit',
                        width: 400,
                        modal: true,
                        height: 300,
                        layout: 'border',
                        items: [form],
                        father: father
                    });
                    win.show();
                }
            },
                {
                    text: '删除',
                    iconCls: 'Delete',
                    handler: function () {
                        var grid2 = this.up('window').father;
                        var grid = this.up("window").down('gridpanel');
                        var selections = grid.getView().getSelectionModel().getSelection();
                        if (selections.length != 1) {
                            Ext.Msg.alert("提示", "请选择需要删除的记录!");
                            return;
                        };
                        if (grid.getView().all.count < 2) {
                            Ext.Msg.alert("提示", "请保留一条数据!");
                            return;
                        }
                        Ext.MessageBox.confirm("提示", "确认删除选中记录？", function (btn) {
                            if ("yes" == btn) {
                                Ext.Ajax.request({
                                    url: "personPrice/register/deletAtt.do",
                                    method: "POST",
                                    headers: {'Content-Type': 'application/json'},
                                    jsonData: {
                                        att_id: selections[0].data.att_id
                                    },
                                    success: function (response, options) {
                                        response = Ext.JSON.decode(response.responseText);
                                        if (response) {
                                            Ext.MessageBox.alert("提示信息", "成功");
                                            grid2.getStore().reload();
                                            grid.getStore().reload();
                                        } else {
                                            Ext.MessageBox.alert("错误信息", "失败");
                                        }
                                    },
                                    failure: function () {
                                        Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
                                    }

                                });
                            }
                        });

                    }
                }],
            bodyStyle: "background-color:white;",
            items: [
                Ext.create('Ext.grid.Panel', {
                    renderTo: Ext.getBody(),
                    width: 1000,
                    height: 300,
                    frame: false,
                    viewConfig: {
                        forceFit: true,
                        stripeRows: true// 在表格中显示斑马线
                    },
                    store: {// 配置数据源
                        fields: ['con_id', 'att_type', 'att_id', 'att_catalog', 'case_id', 'upload_time', 'upload_person', 'ocp_id'],// 定义字段
                        proxy: {
                            type: 'jsonajax',
                            actionMethods: {
                                read: 'POST'
                            },
                            url: 'personPrice/register/queryAtt.do',
                            params: {
                                'con_id': selections[0].get("con_id"),
                                'att_type': 1
                            },
                            reader: {}
                        },
                        autoLoad: true
                    },
                    columns: [{text: '主键', dataIndex: 'att_id', hidden: true},
                        {text: '附件', dataIndex: 'att_catalog', width: '30%', menuDisabled: true,},
                        {
                            header: "下载附件", dataIndex: '', width: '10%', menuDisabled: true,
                            renderer: function (value, cellmeta,
                                                record, rowIndex, columnIndex,
                                                store) {
                                return "<a href='#'>下载</a>";
                            },
                            listeners: {
                                'click': function () {
                                    var me = this.up("gridpanel");
                                    var selections = me.getView().getSelectionModel().getSelection();
                                    if (selections.length < 1 || selections.length > 1) {
                                        Ext.Msg.alert("提示", "请选择需要下载的一条记录!");
                                        return;
                                    }
                                    window.location.href = "personPrice/register/downAtt.do?" + "att_id=" + selections[0].data.att_id;
                                }
                            }
                        }, {
                            header: "操作",
                            dataIndex: '',
                            width: '10%',
                            menuDisabled: true,
                            renderer: function (value, cellmeta,
                                                record, rowIndex, columnIndex,
                                                store) {
                                return "<a href='#'>修改</a>";
                            },
                            listeners: {
                                'click': function () {
                                    var me = this.up("gridpanel");
                                    var selections = me.getView().getSelectionModel().getSelection();
                                    var mei = this.up("gridpanel");
                                    var selections = mei.getView().getSelectionModel().getSelection();
                                    if (selections.length != 1) {
                                        Ext.Msg.alert("提示", "请选择案例!");
                                        return;
                                    }
                                    var form = Ext.create('Ext.form.Panel', {
                                        region: "center",
                                        layout: 'anchor',
                                        bodyPadding: 10,
                                        defaults: {
                                            anchor: '100%'
                                        },
                                        defaultType: 'textfield',
                                        items: [{
                                            xtype: "hiddenfield",
                                            name: 'con_id'
                                        }, {
                                            xtype: "hiddenfield",
                                            name: 'case_id'
                                        }, {
                                            xtype: "hiddenfield",
                                            name: 'ocp_id',
                                        }, {
                                            xtype: "hiddenfield",
                                            name: 'att_id'
                                        }, {
                                            xtype: "hiddenfield",
                                            name: 'att_type'
                                        }, {
                                            xtype: "hiddenfield",
                                            name: 'att_catalog'
                                        }, {
                                            xtype: 'filefield',
                                            name: 'headPhoto',
                                            fieldLabel: '附件',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            anchor: '100%',
                                            buttonText: '选择附件',
                                            validator: function (v) {
                                                /////???
                                                return true;
                                            }
                                        }],
                                        buttons: [{
                                            text: '上传',
                                            iconCls: 'Diskupload',
                                            handler: function () {
                                                var me = this;
                                                var myWindow = me.up('window');
                                                var form = me.up('form').getForm();
                                                if (!form.isValid()) {
                                                    Ext.MessageBox.alert("提示信息", "请选择附件!");
                                                    return;
                                                }

                                                form.submit({
                                                    url: 'personPrice/register/uploadAtt.do',
                                                    method: 'post',
                                                    waitMsg: '正在上传您的文件...',
                                                    success: function (form, action) {
                                                        Ext.Msg.alert("提示", "上传成功!");
                                                        var grid = mei.up("gridpanel");
                                                        mei.getStore().load();
                                                        myWindow.close();
                                                    },
                                                    failure: function () {
                                                        Ext.Msg.alert("提示", "上传失败，请联系管理员!");
                                                        myWindow.close();
                                                    }
                                                });

                                            }
                                        }, {
                                            text: '取消',
                                            iconCls: 'Cancel',
                                            handler: function () {
                                                this.up('window').close();
                                            }
                                        }]
                                    });
                                    var win = Ext.create("Ext.window.Window", {
                                        title: '案例附件修改',
                                        width: 400,
                                        iconCls: 'Pageadd',
                                        height: 200,
                                        modal: true,
                                        layout: 'border',
                                        items: [form]
                                    });
                                    form.loadRecord(selections[0]);
                                    win.show();
                                }
                            }
                        }]
                })]
        });
        win.show();
    },

    onUpdate: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要修改的合同信息!");
            return;
        };

        var form = Ext.create("Rds.order.form.ContractUpdateForm", {
            region: "center",
            autoScroll: true,
            grid: me
        });
        var win = Ext.create("Ext.window.Window", {
            title: '修改合同',
            width: 600,
            iconCls: 'Pageedit',
            height: 300,
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
            Ext.Msg.alert("提示", "请选择一条需要废除的合同!");
            return;
        }
        ;
        var values = {
            con_id: selections[0].get("con_id")
        };
        Ext.MessageBox.confirm('提示', '确定废除此合同吗', function (id) {
            if (id == 'yes') {
                Ext.Ajax.request({
                    url: "personPrice/register/deleteContractInfo.do",
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


        var form = Ext.create("Rds.order.form.ContractInstertForm", {
            region: "center",
            autoScroll: true,
            grid: me
        });
        var win = Ext.create("Ext.window.Window", {
            title: '登记合同',
            width: 600,
            iconCls: 'Pageedit',
            height: 400,
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
