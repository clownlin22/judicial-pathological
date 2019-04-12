Ext.define("Rds.order.panel.OrderAttGridPanel", {
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

        var order_id = Ext.create('Ext.form.field.Text', {
            name: 'order_id',
            labelWidth: 60,
            width: '16%',
            regexText: '请输入订单编号',
            fieldLabel: '订单编号'
        });
        var name = Ext.create('Ext.form.field.Text', {
            name: 'name',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '姓名'
        });
        var age = Ext.create('Ext.form.field.Text', {
            name: 'age',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '出生年月'
        });
        var state = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '状态',
            width: '16%',
            labelWidth: 60,
            editable: false,
            triggerAction: 'all',
            displayField: 'Name',
            value: 5,
            valueField: 'Code',
            store: new Ext.data.ArrayStore({
                fields: ['Name', 'Code'],
                data: [['全部',null],
                    ['未分配未签收',0 ],['未分配已签收',1],['待登记',2] ,['待审核',3]
                    ,['审核未通过',4] ,['待实验',5] ,['报告未审核',6] ,['报告已审核',7]
                ]
            }),
            mode: 'local',
            name: 'state'
        });
        var sex = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '性别',
            width: '16%',
            labelWidth: 60,
            editable: false,
            triggerAction: 'all',
            displayField: 'Name',
            valueField: 'Code',
            store: new Ext.data.ArrayStore({
                fields: ['Name', 'Code'],
                data: [['男', 1],
                    ['女', 0]]
            }),
            mode: 'local',
            name: 'sex'
        });
        var id_number = Ext.create('Ext.form.field.Text', {
            name: 'id_number',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '身份证号'
        });
        var pathology_number = Ext.create('Ext.form.field.Text', {
            name: 'pathology_number',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '病理号'
        });
        var affiliated_hospital = Ext.create('Ext.form.field.Text', {
            name: 'affiliated_hospital',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '所属医院'
        });
        var hospital_number = Ext.create('Ext.form.field.Text', {
            name: 'hospital_number',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '住院号'
        });
        var telephone = Ext.create('Ext.form.field.Text', {
            name: 'telephone',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '联系电话'
        });
        var sickbed_number = Ext.create('Ext.form.field.Text', {
            name: 'sickbed_number',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '病床号'
        });
        var patient_number = Ext.create('Ext.form.field.Text', {
            name: 'patient_number',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '病人编号'
        });
        var outpatient_number = Ext.create('Ext.form.field.Text', {
            name: 'outpatient_number',
            labelWidth: 55,
            width: '16%',
            fieldLabel: '门诊号'
        });
        var inspection_department = Ext.create('Ext.form.field.Text', {
            name: 'inspection_department',
            labelWidth: 58,
            width: '16%',
            fieldLabel: '送检科室'
        });
        var inspection_doctor = Ext.create('Ext.form.field.Text', {
            name: 'inspection_doctor',
            labelWidth: 58,
            width: '16%',
            fieldLabel: '送检医生'
        });
        var report_doctor = Ext.create('Ext.form.field.Text', {
            name: 'report_doctor',
            labelWidth: 58,
            width: '16%',
            fieldLabel: '报告医生'
        });
        var revisit_doctor = Ext.create('Ext.form.field.Text', {
            name: 'revisit_doctor',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '复诊医生'
        });
        var create_person = Ext.create('Ext.form.field.Text', {
            name: 'create_person',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '创建人'
        });
        var case_illness_number = Ext.create('Ext.form.field.Text', {
            name: 'case_illness_number',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '病例号'
        });
        var delivery_date_start = Ext.create('Ext.form.DateField', {
            name: 'delivery_date_start',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '送样日期',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            listeners: {
                select: function () {
                    var start = delivery_date_start
                        .getValue();
                    delivery_date_end.setMinValue(
                        start);
                }
            }
        });
        var delivery_date_end = Ext.create('Ext.form.DateField', {
            name: 'delivery_date_end',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '到',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            listeners: {
                select: function () {
                    var end = delivery_date_end
                        .getValue();
                    delivery_date_start.setMaxValue(
                        end);
                }
            }
        });
        var sampling_date_start = Ext.create('Ext.form.DateField', {
            name: 'sampling_date_start',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '接样日期',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            listeners: {
                select: function () {
                    var start = sampling_date_start
                        .getValue();
                    sampling_date_end.setMinValue(
                        start);
                }
            }
        });
        var sampling_date_end = Ext.create('Ext.form.DateField', {
            name: 'sampling_date_end',
            width: '16%',
            labelWidth: 60,
            fieldLabel: '到',
            emptyText: '请选择日期',
            format: 'Y-m-d',
            listeners: {
                select: function () {
                    var end = sampling_date_end
                        .getValue();
                    sampling_date_start.setMaxValue(
                        end);
                }
            }
        });
        var check_project = Ext.create('Ext.form.field.Text', {
            name: 'check_project',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '检测项目'
        });
        var check_type = Ext.create('Ext.form.field.Text', {
            name: 'check_type',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '项目类型'
        });

        me.store = Ext.create('Ext.data.Store', {
            fields: ["case_id", "name","labname", "sex", "agedate","case_illness_number", "id_number", "pathology_number", "affiliated_hospital",
                "hospital_number", "telephone", "sickbed_number", "patient_number", "outpatient_number", "marital_status",
                "inspection_department", "inspection_doctor", "delivery_date", "sampling_date", "report_doctor", "revisit_doctor",
                "create_date", "create_person","cre_time", "order_id", "case_type", "ocp_id", "username", "check_project", "check_type"],
            proxy: {
                type: 'jsonajax',
                actionMethods: {
                    read: 'POST'
                },
                url: 'order/register/getCaseInfo.do',
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
                        name: trim(name.getValue()),
                        age: trim(age.getValue()),
                        sex: sex.getValue(),
                        id_number: trim(id_number.getValue()),
                        case_illness_number: trim(case_illness_number.getValue()),
                        pathology_number: trim(pathology_number.getValue()),
                        affiliated_hospital: trim(affiliated_hospital.getValue()),
                        hospital_number: trim(hospital_number.getValue()),
                        telephone: trim(telephone.getValue()),
                        sickbed_number: trim(sickbed_number.getValue()),
                        patient_number: trim(patient_number.getValue()),
                        outpatient_number: trim(outpatient_number.getValue()),
                        inspection_department: trim(inspection_department.getValue()),
                        inspection_doctor: trim(inspection_doctor.getValue()),
                        report_doctor: trim(report_doctor.getValue()),
                        revisit_doctor: trim(revisit_doctor.getValue()),
                        create_person: trim(create_person.getValue()),
                        delivery_date_start: dateformat(delivery_date_start.getValue()),
                        delivery_date_end: dateformat(delivery_date_end.getValue()),
                        sampling_date_start: dateformat(sampling_date_start.getValue()),
                        sampling_date_end: dateformat(sampling_date_end.getValue())
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

        me.columns = [{dataIndex: 'case_id', hidden: true},
            {dataIndex: 'order_id', hidden: true},
            {text: '姓名', dataIndex: 'name', width: 50, menuDisabled: true},
            {
                text: '案例审核状态', dataIndex: 'case_type', width: 100, menuDisabled: true,
                renderer: function (value) {
                    switch (value) {
                        case 0 :
                            return "未分配未签收";
                            break;
                        case 1 :
                            return "未分配已签收";
                            break;
                        case 2 :
                            return "登记";
                            break;
                        case 3 :
                            return "待审核";
                            break;
                        case 4 :
                            return "<span style='color:red'>案例审核未通过</span><a class='lbtnComment' href='#'>查看原因</a>";
                            break;
                        case 5 :
                            return "待实验";
                            break;
                        case 6 :
                            return "报告未审核";
                            break;
                        case 7 :
                            return "报告已审核";
                            break;
                    }
                }
            },
            {
                text: '性别', dataIndex: 'sex', width: 40, menuDisabled: true,
                renderer: function (value) {
                    switch (value) {
                        case 0 :
                            return "女";
                            break;
                        case 1 :
                            return "男";
                            break;
                    }
                }
            },
            {text: '检测项目', dataIndex: 'check_project', width: 40, menuDisabled: true},
            {text: '项目类型', dataIndex: 'check_type', width: 40, menuDisabled: true},
            {text: '实验室名称', dataIndex: 'labname', width: 50, menuDisabled: true},
            {text: '出生年月', dataIndex: 'agedate', width: 40, menuDisabled: true},
            {text: '身份证号', dataIndex: 'id_number', width: 100, menuDisabled: true},
            {text: '病理号', dataIndex: 'pathology_numb', width: 100, menuDisabled: true},
            {text: '病例号', dataIndex: 'case_illness_number', width: 100, menuDisabled: true},
            {text: '所属医院', dataIndex: 'affiliated_hospital', width: 100, menuDisabled: true},
            {text: '住院号', dataIndex: 'hospital_number', width: 100, menuDisabled: true},
            {text: '联系电话', dataIndex: 'telephone', width: 110, menuDisabled: true},
            {text: '病床号', dataIndex: 'sickbed_number', width: 100, menuDisabled: true},
            {text: '病人编号', dataIndex: 'patient_number', width: 100, menuDisabled: true},
            {text: '门诊号', dataIndex: 'outpatient_number', width: 100, menuDisabled: true},
            {
                text: '婚姻状况', dataIndex: 'marital_status', width: 100, menuDisabled: true,
                renderer: function (value) {
                    switch (value) {
                        case 0 :
                            return "未婚";
                            break;
                        case 1 :
                            return "已婚";
                            break;
                    }
                }
            },
            {text: '送检科室', dataIndex: 'inspection_department', width: 100, menuDisabled: true},
            {text: '送检医生', dataIndex: 'inspection_doctor', width: 100, menuDisabled: true},
            {text: '送样日期', dataIndex: 'delivery_date', width: 110, menuDisabled: true},
            {text: '接样日期', dataIndex: 'sampling_date', width: 110, menuDisabled: true},
            {text: '报告医生', dataIndex: 'report_doctor', width: 100, menuDisabled: true},
            {text: '复诊医生', dataIndex: 'revisit_doctor', width: 100, menuDisabled: true},
            {text: '创建时间', dataIndex: 'cre_time', width: 110, menuDisabled: true,
                renderer: function (value) {
                    return value.substring(0,19);
                }},
            {text: '创建人', dataIndex: 'username', width: 100, menuDisabled: true}
        ];
        me.startdate = new Date(new Date().getFullYear() + '/01/01')
        me.dockedItems = [{
            xtype: 'toolbar',
            name: 'search',
            dock: 'top',
            items: [name, sex,   id_number, pathology_number, state,inspection_department]
        }, {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [affiliated_hospital, hospital_number, telephone, sickbed_number, patient_number, create_person]
        }, {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [delivery_date_start, delivery_date_end, sampling_date_start, sampling_date_end, check_project, check_type]
        }, {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [ inspection_doctor, report_doctor, revisit_doctor, outpatient_number,case_illness_number,{
                text: '查询',
                iconCls: 'Find',
                handler: me.onSearch
            }]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '查看报告',
                iconCls: 'Add',
                handler: me.onLook
            },{
                text: '上传报告',
                iconCls: 'Add',
                handler: me.onInsert
            }, {
                text: '确认报告审核通过',
                iconCls: 'Applicationformmagnify',
                handler: me.onVerify
            }
            ]
        }];
        me.callParent(arguments);
    },
    onLook: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要查看报告的案例!");
            return;
        }

        var win = Ext.create("Ext.window.Window", {
            title: "查看报告",
            width: 1000,
            iconCls: 'Find',
            height: 300,
            modal: true,
            resizable: false,
            layout: 'border',
            autoScroll: true,
            father: me,
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
                        fields: ['att_type', 'att_id', 'att_catalog', 'case_id', 'upload_time', 'upload_person', 'ocp_id'],// 定义字段
                        proxy: {
                            type: 'jsonajax',
                            actionMethods: {
                                read: 'POST'
                            },
                            url: 'order/register/queryAtt.do',
                            params: {
                                'ocp_id': selections[0].get("ocp_id"),
                                'att_type': 1
                            },
                            reader: {}
                        },
                        autoLoad: true
                    },
                    columns: [{text: '主键', dataIndex: 'att_id', hidden: true},
                        {text: '报告', dataIndex: 'att_catalog', width: '30%', menuDisabled: true,},
                        {
                            header: "查看报告", dataIndex: '', width: '10%', menuDisabled: true,
                            renderer: function (value, cellmeta,
                                                record, rowIndex, columnIndex,
                                                store) {
                                return "<a href='#'>查看</a>";
                            },
                            //
                            listeners: {
                                'click': function () {
                                    //
                                    var me = this.up("gridpanel");
                                    var selections = me.getView().getSelectionModel().getSelection();
                                    if (selections.length < 1 || selections.length > 1) {
                                        Ext.Msg.alert("提示", "请选择需要查看的一条记录!");
                                        return;
                                    }
                                    var print_chanel = function () {
                                        win.close();
                                    }
                                    var src = "order/register/lookAtt.do?" + "att_id=" + selections[0].data.att_id;
                                    var win = Ext.create("Ext.window.Window", {
                                        title: '案例打印',
                                        maximized: true,
                                        maximizable: true,
                                        iconCls: 'Printer',
                                        modal: true,
                                        bodyStyle: "background-color:white;",
                                        html: "<iframe width=100% height=100% id='alcoholmodel' src='"
                                        + src + "'></iframe>",
                                        buttons: [{
                                            text: '取消',
                                            iconCls: 'Cancel',
                                            handler: print_chanel
                                        }]
                                    });
                                    win.show();
                                }
                            }
                        }, {
                            header: "下载报告", dataIndex: '', width: '10%', menuDisabled: true,
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
                                    window.location.href = "order/register/downAtt.do?" + "att_id=" + selections[0].data.att_id;
                                }
                            }
                        }]
                })]
        });
        win.show();
    },
    onSearch: function () {
        var me = this.up("gridpanel");
        me.getStore().currentPage = 1;
        me.getStore().load();
    },
    onVerify: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要审核的案例!");
            return;
        }
        if (selections[0].get("case_type") != 6) {
            Ext.Msg.alert("提示", "该案例状态不允许审核!");
            return;
        }

        Ext.MessageBox.confirm("提示", "确认审核通过该选中记录？", function (btn) {
            if ("yes" == btn) {
                Ext.Ajax.request({
                    url: "order/register/updateCaseStateAndCheckAtt.do",
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    jsonData: {
                        order_id: selections[0].data.order_id,
                        statenum: 7,
                        ocp_id: selections[0].data.ocp_id
                    },
                    success: function (response, options) {
                        response = Ext.JSON.decode(response.responseText);
                        if (response.result == true) {
                            Ext.MessageBox.alert("提示信息", "审核通过成功！");
                            me.getStore().load();
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
    },
    onInsert: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要上传报告的案例!");
            return;
        }

        if (selections[0].get("case_type") != 5 && selections[0].get("case_type") != 6) {
            Ext.Msg.alert("提示", "该案例状态不允许上传报告!");
            return;
        }

        var win = Ext.create("Ext.window.Window", {
            title: "上传报告管理",
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
                            fieldLabel: '报告',
                            allowBlank: false,
                            buttonText: '选择报告',
                            validator: function (v) {
                                if (!v.endWith(".pdf")) {
                                    return "请选择.pdf类型的图片";
                                }
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
                                    Ext.MessageBox.alert("提示信息", "请选择报告!");
                                    return;
                                }

                                Ext.Ajax.request({
                                    url: "order/register/updateCaseState.do",
                                    method: "POST",
                                    headers: {'Content-Type': 'application/json'},
                                    jsonData: {
                                        order_id: selections[0].data.order_id,
                                        statenum: 6,
                                        ocp_id: selections[0].data.ocp_id
                                    },
                                    success: function (response, options) {
                                    },
                                    failure: function () {
                                        Ext.Msg.alert("提示", "保存失败<br>请联系管理员!");
                                    }

                                });
                                form.submit({
                                    url: 'order/register/uploadAtt.do',
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
                            Ext.Msg.alert("提示", "请选择一条需要删除的记录!");
                            return;
                        };
                        if (grid.getView().all.count < 2) {
                            Ext.Msg.alert("提示", "请保留一条数据!");
                            return;
                        }
                        Ext.MessageBox.confirm("提示", "确认删除选中记录？", function (btn) {
                            if ("yes" == btn) {
                                Ext.Ajax.request({
                                    url: "order/register/deletAtt.do",
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
                        fields: ['att_type', 'att_id', 'att_catalog', 'case_id', 'upload_time', 'upload_person', 'ocp_id'],// 定义字段
                        proxy: {
                            type: 'jsonajax',
                            actionMethods: {
                                read: 'POST'
                            },
                            url: 'order/register/queryAtt.do',
                            params: {
                                'ocp_id': selections[0].get("ocp_id"),
                                'att_type': 1
                            },
                            reader: {}
                        },
                        autoLoad: true
                    },
                    columns: [{text: '主键', dataIndex: 'att_id', hidden: true},
                        {text: '报告', dataIndex: 'att_catalog', width: '30%', menuDisabled: true,},
                        {
                            header: "查看报告", dataIndex: '', width: '10%', menuDisabled: true,
                            renderer: function (value, cellmeta,
                                                record, rowIndex, columnIndex,
                                                store) {
                                return "<a href='#'>查看</a>";
                            },
                            //
                            listeners: {
                                'click': function () {
                                    var me = this.up("gridpanel");
                                    var selections = me.getView().getSelectionModel().getSelection();
                                    if (selections.length < 1 || selections.length > 1) {
                                        Ext.Msg.alert("提示", "请选择需要查看的一条记录!");
                                        return;
                                    }
                                    //
                                    var me = this.up("gridpanel");
                                    var selections = me.getView().getSelectionModel().getSelection();
                                    if (selections.length < 1 || selections.length > 1) {
                                        Ext.Msg.alert("提示", "请选择需要查看的一条记录!");
                                        return;
                                    }
                                    var print_chanel = function () {
                                        win.close();
                                    }
//			        	            			window.location.href ="order/register/lookAtt.do?"+"att_id="+selections[0].data.att_id;
                                    var src = "order/register/lookAtt.do?" + "att_id=" + selections[0].data.att_id;
                                    var win = Ext.create("Ext.window.Window", {
                                        title: '案例打印',
                                        maximized: true,
                                        maximizable: true,
                                        iconCls: 'Printer',
                                        modal: true,
                                        bodyStyle: "background-color:white;",
                                        html: "<iframe width=100% height=100% id='alcoholmodel' src='"
                                        + src + "'></iframe>",
                                        buttons: [{
                                            text: '取消',
                                            iconCls: 'Cancel',
                                            handler: print_chanel
                                        }]
                                    });
                                    win.show();
                                }
                            }
                        }, {
                            header: "下载报告", dataIndex: '', width: '10%', menuDisabled: true,
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
                                    window.location.href = "order/register/downAtt.do?" + "att_id=" + selections[0].data.att_id;
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
                                    if (selections.length < 1) {
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
                                            fieldLabel: '报告',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            anchor: '100%',
                                            buttonText: '选择报告',
                                            validator: function (v) {
                                                if (!v.endWith(".pdf")) {
                                                    return "请选择.pdf类型的图片";
                                                }
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
                                                    Ext.MessageBox.alert("提示信息", "请选择报告!");
                                                    return;
                                                }

                                                form.submit({
                                                    url: 'order/register/uploadAtt.do',
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
                                        title: '案例报告修改',
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
    listeners: {
        'afterrender': function () {
            this.store.load();
        },
        'cellclick': function (grid, td, cellIndex, record, tr, rowIndex, e) {
            //查看审核不通过原因
            if (e.getTarget('.lbtnComment')) {
                Ext.create("Ext.window.Window", {
                    title: '审核不通过原因',
                    width: 500,
                    height: 250,
                    modal: true,
                    layout: 'fit',
                    items: [{
                        xtype: "gridpanel",
                        columns: [
                            {
                                header: "审核时间",
                                dataIndex: "verify_time",
                                align: 'center',
                                width: 150,
                                sortable: false,
                                menuDisabled: true
                            },
                            {
                                header: "审核人",
                                dataIndex: "username",
                                align: 'center',
                                width: 100,
                                sortable: false,
                                menuDisabled: true
                            },
                            {
                                header: "审核意见",
                                dataIndex: "reason",
                                align: 'center',
                                flex: 1,
                                sortable: false,
                                menuDisabled: true,
                                renderer: function (value, cellmeta, record,
                                                    rowIndex, columnIndex, store) {
                                    if (null == value) return "";
                                    else
                                        return "<span title='" + value + "'>" + value
                                            + "</span>";
                                }
                            }
                        ],
                        store: Ext.create('Ext.data.Store', {
                            fields: ['reason', 'username', 'verify_time', {
                                name: 'timeString', type: 'date',
                                convert: function (v, rec) {
                                    return rec.data.time == null ? "" : Ext.Date.format(new Date(rec.data.time), 'Y-m-d H:i');
                                }
                            }],
                            autoLoad: true,
                            proxy: {
                                type: 'jsonajax',
                                actionMethods: {
                                    read: 'POST'
                                },
                                url: 'order/register/getVerifyInfo.do',
                                params: {"ocp_id": record.data.ocp_id},
                                reader: {
                                    type: 'json'
                                }
                            }
                        })
                    }]
                }).show();
            }
        }
    }
});
