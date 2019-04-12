Ext.define("Rds.order.panel.OrderRegisterGridPanel", {
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

        var state = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '状态',
            width: '16%',
            labelWidth: 60,
            editable: false,
            triggerAction: 'all',
            displayField: 'Name',
            valueField: 'Code',
            store: new Ext.data.ArrayStore({
                fields: ['Name', 'Code'],
                data: [['全部',null],
                    ['未分配未签收', 0], ['未分配已签收', 1], ['待登记', 2], ['待审核', 3]
                    , ['审核未通过', 4], ['待实验', 5], ['报告未审核', 6], ['报告已审核', 7]
                ]
            }),
            mode: 'local',
            name: 'state'
        });
        var name = Ext.create('Ext.form.field.Text', {
            name: 'name',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '姓名'
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
                data: [['全部', null],['男', 1],
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
        var case_illness_number = Ext.create('Ext.form.field.Text', {
            name: 'case_illness_number',
            labelWidth: 60,
            width: '16%',
            fieldLabel: '病例号'
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


        me.store = Ext.create('Ext.data.Store', {
            fields: ["case_id", "name", "sex", "agedate", "id_number", "pathology_number", "affiliated_hospital",
                "hospital_number", "telephone", "sickbed_number", "patient_number", "outpatient_number", "marital_status",
                "inspection_department", "inspection_doctor", "delivery_date", "sampling_date", "report_doctor", "revisit_doctor",
                "create_date", "cp_id", "areacode", "create_person", "order_id", "case_type", "ocp_id", "area","cre_time",
                "delivery_tele", "username", "check_project", "check_type","case_illness_number","labname"],
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
                        sex: sex.getValue(),
                        id_number: trim(id_number.getValue()),
                        pathology_number: trim(pathology_number.getValue()),
                        case_illness_number: trim(case_illness_number.getValue()),
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
                        check_project: trim(check_project.getValue()),
                        check_type: trim(check_type.getValue()),
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
            {dataIndex: 'ocp_id', hidden: true},
            {dataIndex: 'areacode', hidden: true},
            {text: '姓名', dataIndex: 'name', width: 50, menuDisabled: true},
            {
                text: '案例状态', dataIndex: 'case_type', width: 150, menuDisabled: true,
                renderer: function (value) {
                    switch (value) {
                        case 0 :
                            return "未分配未签收";
                            break;
                        case 1 :
                            return "未分配已签收";
                            break;
                        case 2 :
                            return "待登记";
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
            {text: '检测项目', dataIndex: 'check_project', width: 80, menuDisabled: true},
            {text: '项目类型', dataIndex: 'check_type', width: 50, menuDisabled: true},
            {text: '实验室名称', dataIndex: 'labname', width: 50, menuDisabled: true},
            {text: '出生年月', dataIndex: 'agedate', width: 40, menuDisabled: true},
            {text: '身份证号', dataIndex: 'id_number', width: 100, menuDisabled: true},
            {text: '病理号', dataIndex: 'pathology_number', width: 100, menuDisabled: true},
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
            items: [name, sex, id_number, pathology_number, state,inspection_department]
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
        } , {
            style: {
                borderTopWidth: '0px !important',
                borderBottomWidth: '0px !important'
            },
            xtype: 'toolbar',
            dock: 'top',
            items: [inspection_doctor, report_doctor, revisit_doctor, outpatient_number,case_illness_number,{
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
                handler: me.onUpdate
            }, {
                text: '照片管理',
                iconCls: 'Cog',
                handler: me.onPhotoManage
            }, {
                text: '签收',
                iconCls: 'Add',
                handler: me.onSign
            },{
                text: '实验室分配',
                iconCls: 'Cog',
                handler: me.onLabConfig
            },{
                text: '签收信息查看',
                iconCls: 'Cog',
                handler: me.onSignInfo
            }
            ]
        }];
        me.callParent(arguments);
    },
    onSearch: function () {
        var me = this.up("gridpanel");
        me.getStore().currentPage = 1;
        me.getStore().load();
    },
    onSignInfo:function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要查看的信息!");
            return;
        }

        if (selections[0].get("case_type") < '1' ) {
            Ext.Msg.alert("提示", "该案例还未签收，请先签收!");
            return;
        }

        var labform2 = Ext.create("Rds.order.panel.OrderSignInfoGridPanel", {
            region: "center",
            autoScroll: true,
            grid: me,
            ocp_id: selections[0].data.ocp_id
        });
        var labwin2 = Ext.create("Ext.window.Window", {
            title: '签收信息',
            width: 700,
            iconCls: 'Pageedit',
            height: 500,
            maximizable: true,
            maximized: false,
            layout: 'border',
            items: [labform2]
        });
        labwin2.show();
    },
    onLabConfig: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一个案例!");
            return;
        }
        if (selections[0].get("case_type") != 1 && selections[0].get("case_type") != 2) {
            Ext.Msg.alert("提示", "该案例状态不允许分配!");
            return;
        }

        var labform = Ext.create("Rds.order.panel.OrderLabMatchGridPanel", {
            region: "center",
            autoScroll: true,
            grid: me,
            ocp_id: selections[0].data.ocp_id
        });
        var labwin = Ext.create("Ext.window.Window", {
            title: '实验室匹配',
            width: 700,
            iconCls: 'Pageedit',
            height: 500,
            maximizable: true,
            maximized: false,
            layout: 'border',
            items: [labform]
        });
        labwin.show();
    },
    onSign: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();

        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要签收的案例!");
            return;
        }

        if (selections[0].get("case_type") != 0 && selections[0].get("case_type") != 1) {
            Ext.Msg.alert("提示", "该案例状态不允许签收!");
            return;
        }

        var form2 = Ext.create("Rds.order.form.OrderSignRegisterForm", {
            region: "center",
            autoScroll: true,
            grid: me,
            mm: me
        });
        var win2 = Ext.create("Ext.window.Window", {
            title: '签收登记',
            width: 400,
            iconCls: 'Pageedit',
            height: 260,
            maximizable: true,
            maximized: false,
            layout: 'border',
            items: [form2]
        });
        form2.loadRecord(selections[0]);
        win2.show();
    },
    onUpdate: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();
        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要登记的案例!");
            return;
        }

        if (selections[0].get("case_type") != 2 && selections[0].get("case_type") != 4 ) {
            Ext.Msg.alert("提示", "该案例状态不允许登记!");
            return;
        }

        var form = Ext.create("Rds.order.form.OrderRegisterUpdateForm", {
            region: "center",
            autoScroll: true,
            grid: me
        });
        var win = Ext.create("Ext.window.Window", {
            title: '案例登记',
            width: 1400,
            iconCls: 'Pageedit',
            height: 600,
            maximizable :true,
            maximized:true,
            layout: 'border',
            items: [form]
        });
        form.loadRecord(selections[0]);
        win.show();
    },
    onPhotoManage: function () {
        var me = this.up("gridpanel");
        var selections = me.getView().getSelectionModel().getSelection();
        if (selections.length != 1) {
            Ext.Msg.alert("提示", "请选择一条需要查看的案例!");
            return;
        }
        ;
        var win = Ext.create("Ext.window.Window", {
            title: "案例照片管理",
            width: 1000,
            iconCls: 'Find',
            height: 300,
            modal: true,
            resizable: false,
            layout: 'border',
            bodyStyle: "background-color:white;",
            items: [Ext.create('Ext.grid.Panel', {
                renderTo: Ext.getBody(),
                width: 1000,
                height: 300,
                frame: false,
                viewConfig: {
                    forceFit: true,
                    stripeRows: true// 在表格中显示斑马线
                },
                store: {// 配置数据源
                    fields: ['att_id', 'order_check_project_id', 'att_type'
                        , 'upload_time', 'att_catalog', 'username'],// 定义字段
                    proxy: {
                        type: 'jsonajax',
                        actionMethods: {
                            read: 'POST'
                        },
                        url: 'order/register/queryCasePhoto.do',
                        params: {
                            'case_id': selections[0].get("case_id")
                        },
                        reader: {}
                    },
                    autoLoad: true
                },

                columns: [{
                    text: '附件',
                    dataIndex: 'att_catalog',
                    width: '30%',
                    menuDisabled: true,
                    renderer: function (value) {
                        return value.substring(52);
                    }
                }, {
                    text: '最后上传日期',
                    dataIndex: 'upload_time',
                    width: '20%',
                    menuDisabled: true
                },
                    {
                        text: '上传人员',
                        dataIndex: 'username',
                        width: '10%',
                        menuDisabled: true
                    }, {
                        header: "查看照片",
                        dataIndex: '',
                        width: '10%',
                        menuDisabled: true,
                        renderer: function (value, cellmeta,
                                            record, rowIndex, columnIndex,
                                            store) {
                            return "<a href='#'>查看</a>";
                        },
                        listeners: {
                            'click': function () {
                                var me = this.up("gridpanel");
                                var selections = me.getView().getSelectionModel().getSelection();
                                if (selections.length < 1 || selections.length > 1) {
                                    Ext.Msg.alert("提示", "请选择一条需要查看的记录!");
                                    return;
                                }
                                var form = Ext.create(
                                    "Rds.order.form.OrderImageShow", {
                                        region: "center",
                                        grid: me
                                    });
                                var win = Ext.create("Ext.window.Window", {
                                    title: '图片查看',
                                    width: 600,
                                    iconCls: 'Pageedit',
                                    height: 600,
                                    maximizable: true,
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
