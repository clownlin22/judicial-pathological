Ext.define("Rds.order.panel.PersonpriceGridPanel", {
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

        var check_project = Ext.create('Ext.form.field.Text', {
            name: 'check_project',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '项目名称'
        });
        var check_type = Ext.create('Ext.form.field.Text', {
            name: 'check_type',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '检测方法'
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
                data: [['全部',null],
                    ['未删除', 0],
                    ['已删除', 1]]
            }),
            mode: 'local',
            name: 'state'
        });
        me.store = Ext.create('Ext.data.Store', {
            fields: ["check_project", "check_type", "cp_id", "pc_id", "username", "username1", "hospital", "discount_type",
                "balance_type", "market_price", "cre_person", "cre_time", "project_status", "flag","project_cancer_species"],
            proxy: {
                type: 'jsonajax',
                actionMethods: {
                    read: 'POST'
                },
                url: 'personPrice/register/getPersonPrice.do',
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
                        check_project: trim(check_project.getValue()),
                        check_type: trim(check_type.getValue()),
                        state: state.getValue()
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
            {text: 'id', dataIndex: 'cp_id', width: 100, menuDisabled: true},
            {
                text: '检测项目', dataIndex: 'check_project', width: 200, menuDisabled: true,
                renderer: function (value, cellmeta, record ) {
                    var project_status = record.data["project_status"];
                    if (project_status == 1) {
                        return "<div style=\"text-decoration: line-through;color: red;\">"
                            + value + "</div>"
                    } else {
                        return value;
                    }
                }
            },
            {
                text: '项目类型', dataIndex: 'check_type', width: 200, menuDisabled: true,
                renderer: function (value, cellmeta, record ) {
                    var project_status = record.data["project_status"];
                    if (project_status == 1) {
                        return "<div style=\"text-decoration: line-through;color: red;\">"
                            + value + "</div>"
                    } else {
                        return value;
                    }
                }
            },
            {text: '所属癌种', dataIndex: 'project_cancer_species', width: 200, menuDisabled: true},
            {text: '是否存在配置', dataIndex: 'flag', width: 200, menuDisabled: true}


        ];
        me.startdate = new Date(new Date().getFullYear() + '/01/01')
        me.dockedItems = [ {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [check_project, check_type, state, {
                text: '查询',
                iconCls: 'Find',
                handler: me.onSearch
            }]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '定价配置',
                iconCls: 'Pageedit',
                handler: me.onInsert
            },{
                text: '查看或配置定价',
                iconCls: 'Cog',
                handler: me.onLook
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
    onLook:function(){
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if(selections.length!=1){
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        if (selections[0].data.project_status != 0) {
            Ext.Msg.alert("提示", "该定价配置已废除，请重新选择");
            return;
        }

        var form = Ext.create("Rds.order.panel.PersonpriceLookGridPanel", {
            region: "center",
            autoScroll: true,
            grid: me ,
            cp_id: selections[0].data.cp_id
        });
        var win = Ext.create("Ext.window.Window", {
            title: '查看或配置定价',
            width: 1000,
            iconCls: 'Pageedit',
            height: 600,
            maximizable : true,
            maximized : false,
            layout: 'border',
            items: [form]
        });
        win.show();
    },

    onDelete: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();
        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要废除的定价配置!");
            return;
        }
        ;
        var values = {
            cp_id: selections[0].get("cp_id")
        };
        Ext.MessageBox.confirm('提示', '确定废除该定价配置吗', function (id) {
            if (id == 'yes') {
                Ext.Ajax.request({
                    url: "personPrice/register/deleteCheckProject.do",
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
        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要配置的项目!");
            return;
        }
        ;
        if (selections[0].data.project_status != 0) {
            Ext.Msg.alert("提示", "该定价配置已废除，请重新选择");
            return;
        }
        var form = Ext.create("Rds.order.form.PersonpriceInstertForm", {
            region: "center",
            autoScroll: true,
            grid: me,
            cp_id: selections[0].data.cp_id
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
            this.store.load();
        }
    }
});
