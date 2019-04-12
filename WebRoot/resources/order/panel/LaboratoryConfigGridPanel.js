var grid = "";
var grid2 = "";
Ext.define('Rds.order.panel.LaboratoryConfigGridPanel', {
    extend: 'Ext.form.Panel',
    layout: "border",
    initComponent: function () {

        var me = this;
        var lab_id = this.lab_id;
        var store3 = Ext.create("Ext.data.TreeStore", {
            fields: ['id', 'text', 'type', 'leaf', 'url', 'checked'],
            proxy: {
                type: 'jsonajax', //获取方式
                url: "laboratory/register/getDicAreaInfo.do?lab_id=" + lab_id, //获取树节点的地址
            },
            root: {
                lab_id: lab_id,
                name: "地区",
                parentID: 0
            }
            ,
            autoLoad: true,
            clearOnLoad: true
        });

        var store = Ext.create('Ext.data.TreeStore', {
            fields: ['id', 'text', 'type', 'leaf', 'url', 'checked','expanded'],
            proxy:{
                type: 'jsonajax',
                actionMethods:{read:'POST'},
                url: "laboratory/register/getDicAreaInfo.do?lab_id=" + lab_id,
                reader:'json',
                autoLoad:true,
                params:{
                    lab_id: lab_id
                },
                clearOnLoad : true
            }
        });
        grid = Ext.create('Ext.tree.Panel', {
            title: ' 地     区 ',
            width: 499,
            height: 550,
            id: 'lefttree',
            store: store,
            rootVisible: false
        });

        // grid.expandAll();

        var store2 = Ext.create('Ext.data.Store', {
            fields: ["cp_id", "check_project","project_cancer_species","check_type","checked"],
            proxy: {
                type: 'jsonajax',
                actionMethods: {
                    read: 'POST'
                },
                url: 'laboratory/register/getCheckProjectInfo.do',
                params: {
                    lab_id: lab_id
                },
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'count'
                }
            },
            autoLoad: true
        });
        store2.addListener('load', function () {
            for (var i = 0; i < store2.getCount(); i++) {
                if (store2.getAt(i).get("checked")) {
                    grid2.getSelectionModel().select(i, true, false);
                }
            }
        });
        grid2 = Ext.create('Ext.grid.Panel', {
            title: ' 项   目 ',
            width: 499,
            height: 550,
            store: store2,
            selModel: Ext.create('Ext.selection.CheckboxModel', {
                model: 'SINGLE',
                showHeaderCheckbox: false
            }),
            columns: [{text: 'cp_id', dataIndex: 'cp_id', width: 50, menuDisabled: true, hidden: false},
                {text: '项目名称', dataIndex: 'check_project', width: 100, menuDisabled: true},
                {text: '项目类型', dataIndex: 'check_type', width: 100, menuDisabled: true},
                {text: '所属癌种', dataIndex: 'project_cancer_species', width: 100, menuDisabled: true}
            ],
            multiSelect: true
        });

        me.items = [{
            xtype: 'panel',
            region: 'west',
            width: 495,
            id: 'w',
            // autoScroll: true,
            // bodyStyle:'overflow-x:hidden;overflow-y:auto;',
            border: 0,
            items: [{
                xtype: "textfield",
                fieldLabel: '实验室id',
                hidden: true,
                name: 'lab_id',
                id: 'lab_id'
            }, {
                xtype: grid
            }]
        }, {
            xtype: 'panel',
            region: 'center',
            width: 495,
            id: 'c',
            // autoScroll: true,
            // bodyStyle:'overflow-x:hidden;overflow-y:auto;',
            border: 0,
            items: [{
                xtype: grid2
            }]
        }];

        me.buttons = [{
            text: '保存',
            iconCls: 'Disk',
            handler: me.onSave
        }, {
            text: '取消',
            iconCls: 'Arrowredo',
            handler: me.onCancel
        }]
        me.callParent(arguments);
    },
    onSave: function () {
        var me = this.up("form");
        var cp_id = '';
        var rightData = grid2.getSelectionModel().getSelection();
        for (var i = 0; i < rightData.length; i++) {
            if (i == 0) {
                cp_id += rightData[i].data.cp_id;
            } else {
                cp_id += ',' + rightData[i].data.cp_id;
            }
        }
        var id = '';
        var leftData = grid.getChecked();
        for (var i = 0; i < leftData.length; i++) {
            if (i == 0) {
                id += leftData[i].data.id;
            } else {
                id += ',' + leftData[i].data.id;
            }
        }

        Ext.Ajax.request({
            url: "laboratory/register/saveLabAndAreaAndPro.do",
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            jsonData: {
                cp_id: trim(cp_id),
                id: trim(id),
                lab_id: Ext.getCmp('lab_id').getValue()
            },
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
    },
    onCancel: function () {
        var me = this;
        me.up("window").close();
    },
    listeners: {
        // afterrender:function(){
        //     var tree=Ext.getCmp('lefttree');
        //    var childNodes= tree.getRootNode().childNodes;
        //    for (var i=0;i<childNodes.length;i++){
        //
        //    }
        // }
    }
});
