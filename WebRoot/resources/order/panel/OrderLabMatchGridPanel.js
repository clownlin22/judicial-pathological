var ocp_id='';
var upgrid='';
var flag='';
var mm='';
Ext.define("Rds.order.panel.OrderLabMatchGridPanel", {
    extend: "Ext.grid.Panel",
    loadMask: true,
    viewConfig: {
        trackOver: false,
        stripeRows: false
    },
    region: 'center',
    pageSize: 23,
    initComponent: function () {
        var me = this;
          upgrid=me.grid;
         ocp_id=this.ocp_id;
         flag=this.flag;
         mm=this.nn;

        var name = Ext.create('Ext.form.field.Text', {
            name: 'name',
            labelWidth: 60,
            width: '23%',
            fieldLabel: '名称'
        });
        var affiliated_area = Ext.create('Ext.form.field.Text', {
            name: 'affiliated_area',
            labelWidth: 60,
            width: '23%',
            fieldLabel: '所属地区'
        });

        var res_person = Ext.create('Ext.form.field.Text', {
            name: 'res_person',
            labelWidth: 60,
            width: '23%',
            fieldLabel: '负责人'
        });
        var res_telephone = Ext.create('Ext.form.field.Text', {
            name: 'res_telephone',
            labelWidth: 60,
            width: '23%',
            fieldLabel: '电话'
        });
        var laboratory_state = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '状态',
            width: '23%',
            labelWidth: 60,
            editable: false,
            hidden:true,
            value: 0,
            triggerAction: 'all',
            displayField: 'Name',
            valueField: 'Code',
            store: new Ext.data.ArrayStore({
                fields: ['Name', 'Code'],
                data: [['已删除', 1],
                    ['未删除', 0]]
            }),
            mode: 'local',
            name: 'laboratory_state'
        });
        me.store = Ext.create('Ext.data.Store', {
            fields: ["lab_id", "name", "affiliated_area", "introduce",
                "res_person", "res_telephone", "laboratory_state", "remark", "ocp_id","checked"],
            proxy: {
                type: 'jsonajax',
                actionMethods: {
                    read: 'POST'
                },
                url: 'laboratory/register/getLabInfo.do',
                params: {
                    start: 0,
                    limit: 23,
                    ocp_id: ocp_id
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
        var mystore=me.getStore();
        mystore.on('load',function(){
            for (var i = 0; i < mystore.getCount(); i++) {
                if (mystore.getAt(i).get("checked")=="true") {
                    me.getSelectionModel().select(i, true, false);
                }
            }
        })

        me.selModel = Ext.create('Ext.selection.CheckboxModel', {
        });
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            pageSize: me.pageSize,
            displayInfo: true,
            displayMsg: "第 {0} - {1} 条  共 {2} 条",
            emptyMsg: "没有符合条件的记录"
        });

        me.columns = [{dataIndex: 'lab_id', hidden: true},
            {dataIndex: 'ocp_id', hidden: true},
            {
                text: '名称', dataIndex: 'name', width: 150, menuDisabled: true,
                renderer: function (value, cellmeta, record) {
                    var laboratory_state = record.data["laboratory_state"];
                    if (laboratory_state == 1) {
                        return "<div style=\"text-decoration: line-through;color: red;\">"
                            + value + "</div>"
                    } else {
                        return value;
                    }
                }
            },
            {text: '所属地区', dataIndex: 'affiliated_area', width: 150, menuDisabled: true},
            {text: '介绍', dataIndex: 'introduce', width: 150, menuDisabled: true},
            {text: '负责人', dataIndex: 'res_person', width: 150, menuDisabled: true},
            {text: '负责人电话', dataIndex: 'res_telephone', width: 150, menuDisabled: true},
            {text: '实验室状态', dataIndex: 'laboratory_state', width: 150, menuDisabled: true,
                renderer: function (value) {
                    switch (value) {
                        case 0 :
                            return "启用";
                            break;
                        case 1 :
                            return "废除";
                            break;
                    }
                }},
            {text: '备注', dataIndex: 'remark', width: 150, menuDisabled: true},
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
            items: [laboratory_state,{
                text: '查询',
                iconCls: 'Find',
                handler: me.onSearch
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
    onSearch: function () {
        var me = this.up("gridpanel");
        me.getStore().currentPage = 1;
        me.getStore().load();
    },
    onSave: function () {
        var me = this.up("gridpanel");
        var ss = this.up("gridpanel").getView().getSelectionModel().getSelection();
        var ocp_id = this.up("gridpanel").ocp_id;
        if (ss.length != 1) {
            Ext.MessageBox.alert("提示信息", '请选择一个实验室!');
            return;
        }

        Ext.Ajax.request({
            url: "order/register/saveLabAndCase.do",
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            jsonData: {
                lab_id: ss[0].data.lab_id,
                ocp_id: ocp_id
            },
            success: function (response, options) {
                response = Ext.JSON.decode(response.responseText);
                if (response.result) {
                    if(flag){
                        mm.getStore().load();
                    }else{
                        upgrid.getStore().load();
                    }
                    me.up("window").close();
                    Ext.MessageBox.alert("信息", response.message);
                } else {
                    Ext.MessageBox.alert("错误信息", response.message);
                }
            },
            failure: function () {
                Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
            }
        });
    },
    onCancel: function () {
        var me = this;
        me.up("window").close();
    },
    listeners: {
        'afterrender': function () {
            this.store.load();
        }
    }
});
