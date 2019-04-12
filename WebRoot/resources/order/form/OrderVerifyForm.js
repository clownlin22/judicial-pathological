var imgs = "";
var img_show_index = 0;
var img_count = 0;
Ext.define('Rds.order.form.OrderVerifyForm', {
    extend: 'Ext.form.Panel',
    layout: "border",
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'panel',
            region: 'west',
            width: 750,
            autoScroll: true,
            items: [{
                xtype: 'form',
                width: 700,
                style: 'margin-left:5px;margin-right:5px;margin-top:25px;margin-bottom:5px;',
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
                    layout: "form",
                    items: [{
                        border: false,
                        xtype: 'fieldcontainer',
                        layout: "column",
                        items: [{
                            xtype: "hiddenfield",
                            name: "order_id"
                        }, {
                            xtype: "hiddenfield",
                            name: "ocp_id"
                        }, {
                            xtype: "hiddenfield",
                            name: "case_id"
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: '基本信息',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: "textfield",
                                fieldLabel: '姓名',
                                readOnly: true,
                                labelWidth: 70,
                                name: 'name',
                                id: 'name',
                                labelAlign: 'right',
                                width: 320,
                                maxLength: 20
                            }, {
                                xtype: "combo",
                                fieldLabel: '性别',
                                readOnly: true,
                                mode: 'local',
                                id: 'sex',
                                name: 'sex',
                                labelWidth: 70,
                                displayField: 'Name',
                                valueField: 'Code',
                                blankText: '请选择折扣类型',
                                emptyText: '请选择折扣类型',
                                labelAlign: 'right',
                                width: 320,
                                blankText: "不能为空",// 错误提示信息，默认为This field is required!
                                store: new Ext.data.ArrayStore({
                                    fields: ['Name', 'Code'],
                                    data: [['女', 0], ['男', 1]]
                                })
                            }]
                        }, {
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: 'datefield',
                                name: 'agedate',
                                id: 'agedate',
                                readOnly: true,
                                labelWidth: 70,
                                allowBlank: false,
                                width: 320,
                                fieldLabel: '出生年月 ',
                                labelAlign: 'right',
                                format: 'Y-m-d'
                            }, {
                                xtype: "textfield",
                                width: 320,
                                fieldLabel: '身份证号',
                                labelWidth: 70,
                                readOnly: true,
                                regex: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                                name: 'id_number',
                                id: 'id_number',
                                labelAlign: 'right',
                                maxLength: 20
                            }]
                        }, {
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: "textfield",
                                fieldLabel: '联系电话',
                                readOnly: true,
                                width: 320,
                                labelWidth: 70,
                                name: 'telephone',
                                id: 'telephone',
                                labelAlign: 'right',
                                regex: /(^((1[0-9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$)/,
                                maxLength: 20
                            }, {
                                xtype: "combo",
                                fieldLabel: '婚姻状况',
                                mode: 'local',
                                id: 'marital_status',
                                name: 'marital_status',
                                labelWidth: 70,
                                displayField: 'Name',
                                valueField: 'Code',
                                blankText: '请选择折扣类型',
                                emptyText: '请选择折扣类型',
                                readOnly: true,
                                labelAlign: 'right',
                                width: 320,
                                blankText: "不能为空",// 错误提示信息，默认为This field is required!
                                store: new Ext.data.ArrayStore({
                                    fields: ['Name', 'Code'],
                                    data: [['未婚', 0], ['已婚', 1]]
                                })
                            }]
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: '医院信息',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: "textfield",
                                fieldLabel: '病理号',
                                readOnly: true,
                                width: 320,
                                labelWidth: 70,
                                name: 'pathology_number',
                                id: 'pathology_number',
                                labelAlign: 'right',
                                maxLength: 20
                            }, {
                                xtype: "textfield",
                                fieldLabel: '所属医院',
                                readOnly: true,
                                width: 320,
                                labelWidth: 70,
                                name: 'affiliated_hospital',
                                id: 'affiliated_hospital',
                                labelAlign: 'right',
                                maxLength: 20
                            }]
                        }, {
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: "textfield",
                                width: 320,
                                fieldLabel: '住院号',
                                readOnly: true,
                                labelWidth: 70,
                                name: 'hospital_number',
                                id: 'hospital_number',
                                labelAlign: 'right',
                                maxLength: 20
                            }, {
                                xtype: "textfield",
                                fieldLabel: '病床号',
                                readOnly: true,
                                labelWidth: 70,
                                width: 320,
                                name: 'sickbed_number',
                                id: 'sickbed_number',
                                labelAlign: 'right',
                                maxLength: 20
                            }]
                        }, {
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: "textfield",
                                fieldLabel: '病人编号',
                                labelWidth: 70,
                                readOnly: true,
                                width: 320,
                                name: 'patient_number',
                                id: 'patient_number',
                                labelAlign: 'right',
                                maxLength: 20
                            }, {
                                xtype: "textfield",
                                fieldLabel: '门诊号',
                                readOnly: true,
                                width: 320,
                                labelWidth: 70,
                                name: 'outpatient_number',
                                id: 'outpatient_number',
                                labelAlign: 'right',
                                maxLength: 20
                            }]
                        }, {
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: "textfield",
                                fieldLabel: '送检科室',
                                readOnly: true,
                                width: 320,
                                labelWidth: 70,
                                name: 'inspection_department',
                                id: 'inspection_department',
                                labelAlign: 'right',
                                maxLength: 20
                            }, {
                                xtype: "textfield",
                                fieldLabel: '送检医生',
                                labelWidth: 70,
                                readOnly: true,
                                width: 320,
                                name: 'inspection_doctor',
                                id: 'inspection_doctor',
                                labelAlign: 'right',
                                maxLength: 20
                            }]
                        }, {
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: "textfield",
                                fieldLabel: '报告医生',
                                labelWidth: 70,
                                readOnly: true,
                                width: 320,
                                name: 'report_doctor',
                                id: 'report_doctor',
                                labelAlign: 'right',
                                maxLength: 20
                            }, {
                                xtype: "textfield",
                                fieldLabel: '复诊医生',
                                labelWidth: 70,
                                readOnly: true,
                                width: 320,
                                name: 'revisit_doctor',
                                id: 'revisit_doctor',
                                labelAlign: 'right',
                                maxLength: 20
                            }]
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: '快递信息',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: 'datefield',
                                width: 320,
                                name: 'delivery_date',
                                id: 'delivery_date',
                                labelWidth: 70,
                                fieldLabel: '送样日期 ',
                                readOnly: true,
                                labelAlign: 'right',
                                format: 'Y-m-d',
                                labelAlign: 'right',
                                value: Ext.Date.add(new Date(), Ext.Date.DAY)
                            }, {
                                xtype: 'datefield',
                                name: 'sampling_date',
                                id: 'sampling_date',
                                labelWidth: 70,
                                readOnly: true,
                                width: 320,
                                fieldLabel: '接样日期 ',
                                labelAlign: 'right',
                                format: 'Y-m-d',
                                labelAlign: 'right',
                                value: Ext.Date.add(new Date(), Ext.Date.DAY)
                            }]
                        }, {
                            border: false,
                            xtype: 'fieldcontainer',
                            layout: "column",
                            items: [{
                                xtype: "textfield",
                                fieldLabel: '收货地址',
                                labelWidth: 70,
                                readOnly: true,
                                width: 320,
                                name: 'area',
                                id: 'area',
                                labelAlign: 'right',
                                maxLength: 20
                            }, {
                                xtype: "textfield",
                                fieldLabel: '收货电话',
                                labelWidth: 70,
                                readOnly: true,
                                width: 320,
                                name: 'delivery_tele',
                                id: 'delivery_tele',
                                labelAlign: 'right',
                                regex: /(^((1[0-9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$)/,
                                maxLength: 20
                            }]
                        }]
                    }, {
                        border: false,
                        xtype: 'fieldcontainer',
                        layout: "column",
                        items: [{
                            xtype: 'textarea',
                            emptyText: '审核不通过时，请填写审核理由',
                            fieldLabel: '审核理由',
                            name: 'reason',
                            id: 'reason',
                            maxLength: 1000,
                            labelWidth: 70,
                            labelAlign: 'right',
                            width: 600
                        }]
                    }]
                }]
            }]
        }, {
            xtype: 'panel',
            region: 'center',
            id: 'children_img_show_verify',
            autoScroll: true,
            items: [],
            buttons: [{
                text: '上一张',
                iconCls: 'Arrowleft',
                handler: me.onLast
            }, {
                text: '下一张',
                iconCls: 'Arrowright',
                handler: me.onNext
            }]
        }];

        me.buttons = [{
            text: '审核通过',
            iconCls: 'Accept',
            handler: me.onYesVerify
        }, {
            text: '审核不通过',
            iconCls: 'Cancel',
            handler: me.onNoVerify
        }, {
            text: '取消',
            iconCls: 'Arrowredo',
            handler: me.onCancel
        }]
        me.callParent(arguments);
    },
    onYesVerify: function () {
        var me = this.up("form");
        var form = me.getForm();
        var values = form.getValues();
        console.log(values)
        if (form.isValid()) {
            Ext.Msg.confirm("提示", "确认该案例通过?", function (id) {
                if (id == 'yes') {
                    Ext.MessageBox.wait('正在操作', '请稍后...');
                    Ext.Ajax.request({
                        url: "order/register/yes.do",
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        jsonData: values,
                        success: function (response, options) {
                            response = Ext.JSON.decode(response.responseText);
                            if (response.success == true) {
                                Ext.MessageBox.alert("提示信息", response.message);
                                me.grid.getStore().load();
                                me.up("window").close();
                            } else {
                                Ext.MessageBox.alert("错误信息", response.message);
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert("提示", "出错<br>请联系管理员!");
                        }
                    });
                }
            });
        }
    },
    onNoVerify: function () {
        var reason = Ext.getCmp("reason").getValue();
        if (reason == '' || reason == null) {
            Ext.Msg.alert("提示", "请填写审核不通过理由。");
            return;
        }
        var me = this.up("form");
        var form = me.getForm();
        var values = form.getValues();
        if (form.isValid()) {
            Ext.Msg.confirm("提示", "确认该案例不通过?", function (id) {
                if (id == 'yes') {
                    Ext.MessageBox.wait('正在操作', '请稍后...');
                    Ext.Ajax.request({
                        url: "order/register/no.do",
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        jsonData: values,
                        success: function (response, options) {
                            response = Ext.JSON.decode(response.responseText);
                            if (response.success == true) {
                                Ext.MessageBox.alert("提示信息", response.message);
                                me.grid.getStore().load();
                                me.up("window").close();
                            } else {
                                Ext.MessageBox.alert("错误信息", response.message);
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert("提示", "出错<br>请联系管理员!");
                        }
                    });
                }
            });
        }
    },
    onLast: function () {
        if (imgs == "") {
            Ext.Msg.alert("提示", "图片不存在!");
            return;
        }
        var me = this.up("box");
        var box = Ext.getCmp('children_img_box_verify');
        if (box == null) {
            Ext.Msg.alert("提示", "没有图片！");
            return;
        }
        if (img_show_index == 0) {
            Ext.Msg.alert("提示", "没有上一张了！");
            return;
        }
        Ext.getCmp('children_img_show_verify').remove(Ext
            .getCmp('children_photo_type'));
        Ext.getCmp('children_img_show_verify').remove(Ext
            .getCmp('children_img_box_verify'));
        img_show_index -= 1;
        //获取图片高度和宽度
        Ext.getCmp('children_img_show_verify').add({
            id: 'children_photo_type',
            xtype: 'tbtext',
            style: 'color:black;margin-left:20px;margin-top:10px;margin-bottom:10px;font-size:20px',
            text: "照片"
        }, {
            xtype: 'box',
            id: 'children_img_box_verify',
            autoEl: {
                tag: 'img',
//				src : "order/register/getImg.do?filename="
//				+ imgs[img_show_index].att_catalog+"&v="+new Date().getTime()
                src: imgs[img_show_index].att_catalog
            }
        });
    },
    onNext: function () {
        if (imgs == "") {
            Ext.Msg.alert("提示", "图片不存在!");
            return;
        }
        var me = this.up("box");
        var box = Ext.getCmp('children_img_box_verify');
        if (box == null) {
            Ext.Msg.alert("提示", "没有图片！");
            return;
        }
        if (img_show_index + 1 == img_count) {
            Ext.Msg.alert("提示", "没有下一张了！");
            return;
        }
        Ext.getCmp('children_img_show_verify').remove(Ext
            .getCmp('children_img_box_verify'));
        Ext.getCmp('children_img_show_verify').remove(Ext
            .getCmp('children_photo_type'));
        img_show_index += 1;
        Ext.getCmp('children_img_show_verify').add({
            id: 'children_photo_type',
            xtype: 'tbtext',
            style: 'color:black;margin-left:20px;margin-top:10px;margin-bottom:10px;font-size:20px',
            text: "照片"
        }, {
            xtype: 'box',
            id: 'children_img_box_verify',
            autoEl: {
                tag: 'img',
//				src : "order/register/getImg.do?filename="
//				+ imgs[img_show_index].att_catalog+"&v="+new Date().getTime()
                src: imgs[img_show_index].att_catalog
            }
        });

    },
    onCancel: function () {
        var me = this;
        me.up("window").close();
    },
    listeners: {
        'afterrender': function () {
            var me = this;
            var values = me.getValues();
            var case_id = values["case_id"];
            //添加案例图片信息
            Ext.Ajax.request({
                url: "order/register/queryCasePhoto.do",
                method: "POST",
                async: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                jsonData: {
                    'case_id': case_id
                },
                success: function (response, options) {
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.length > 0) {
                        imgs = data;
                        img_count = data.length;
                        Ext.getCmp('children_img_show_verify').add({
                            id: 'children_photo_type',
                            xtype: 'tbtext',
                            style: 'color:black;margin-left:20px;margin-top:10px;margin-bottom:10px;font-size:20px',
                            text: "照片"
                        }, {
                            xtype: 'box',
                            id: 'children_img_box_verify',
                            autoEl: {
                                tag: 'img',
                                src: imgs[img_show_index].att_catalog
                            }
                        });

                    }
                },
                failure: function () {
                    Ext.Msg.alert("提示", "获取图片失败<br>请联系管理员!");
                }
            });
        }
    }
});
