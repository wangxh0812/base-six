Ext.define('FMS.app.order.module.OrderList', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappordermoduleOrderList',
	requires : [ 'FMS.app.order.store.OrderList',
			'Plugin.form.combobox.Module', 'Plugin.ux.IFrame',
			'Plugin.form.CascadeForm', 'Plugin.form.SelectionForm',
			'FMS.app.order.store.OrderState', 'Plugin.window.UploadWindow' ],
	initComponent : function() {
		Ext.apply(this, {
			store : Ext.create('FMS.app.order.store.OrderList'),
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		// this.editRows = this.openEdit;
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [ {

			text : '是否超期',
			dataIndex : 'overDue',
			renderer : function(val) {
				if (val == '1') {
					return "<font color = red>是</font>";
				} else if (val == '-1') {
					return "<font color = green>提前</font>";
				} else {
					return "正常";
				}
				return val;
			},
			width : 80
		}, {
			text : '预计超期',
			dataIndex : 'overDueDays',
			width : 80
		}, {
			text : '订单编号',
			dataIndex : 'orderNo',
			width : 100
		}, {
			text : '大通订单号',
			dataIndex : 'associationNo',
			width : 100
		},{
			text : '安吉编号',
			dataIndex : 'anJiNo',
			width : 150
		}, {
			text : 'VIN号',
			dataIndex : 'vinNo',
			width : 100
		}, {
			text : '承诺交付时间',
			dataIndex : 'deliveryDateStr',
			width : 150
		}, {
			text : '当前状态',
			dataIndex : 'logisticsName',
			width : 150
		}, {
			text : '下单时间',
			dataIndex : 'applyTimeStr',
			width : 150
		}, {
			text : '确认时间',
			dataIndex : 'dealerConfirmDateStr',
			width : 150
		}, {
			text : '付定金时间',
			dataIndex : 'subscriptionDateStr',
			width : 150
		}, {
			text : '生产计划时间',
			dataIndex : 'shangXianDateStr',
			width : 150
		}, {
			text : '车身上线时间',
			dataIndex : 'xiaXianDateStr',
			width : 150
		}, {
			text : '油漆上线时间',
			dataIndex : 'tuZhuangDateStr',
			width : 150
		}, {
			text : '总装上线时间',
			dataIndex : 'zongZhuangDateStr',
			width : 150
		}, {
			text : '质保下线',
			dataIndex : 'baoJiaoDateDisStr',
			width : 150
		}, {
			text : '到达4S店时间',
			dataIndex : 'arrive4SDateStr',
			width : 150
		}, {
			text : '交付时间',
			dataIndex : 'deliveryConfirmDateStr',
			width : 150
		}, {
			text : '用户确认时间',
			dataIndex : 'userConfirmDateStr',
			width : 150
		},{
			text : '经销商',
			dataIndex : 'dealerName',
			width : 200
		},{
			text : '颜色',
			dataIndex : 'bodyColor',
			width : 60
		},{
			text : '用户类型',
			dataIndex : 'userType',
			width : 60,
			renderer : function(val) {
				if (val == '1') {
					return "个人";
				} else if (val == '2') {
					return "公司";
				} else {
					return "";
				}
			}
		},{
			text : '性别',
			dataIndex : 'userSex',
			width : 60,
			renderer : function(val) {
				if (val == '1') {
					return "先生";
				} else if (val == '2') {
					return "女士";
				} 
				return val;
			}
		},{
			text : '手机号码',
			dataIndex : 'userMobilephone',
			width : 100
		},{
			text : '邮箱',
			dataIndex : 'userEmail',
			width : 120
		},{
			text : '身份证号码',
			dataIndex : 'certiCode',
			width : 150
		},{
			text : '所在省',
			dataIndex : 'provinceName',
			width : 200
		},{
			text : '所在市',
			dataIndex : 'cityName',
			width : 200
		},{
			text : '所在区',
			dataIndex : 'districtName',
			width : 200
		},{
			text : '详细地址',
			dataIndex : 'detailedAddress',
			width : 200
		},{
			text : '邮编',
			dataIndex : 'postCode',
			width : 150
		},{
			text : '公司名',
			dataIndex : 'companyName',
			width : 200
		},{
			text : '授权代表',
			dataIndex : 'athorityRepresentative',
			width : 80
		},{
			text : '传真',
			dataIndex : 'fax',
			width : 120
		},{
			text : '电话',
			dataIndex : 'telephone',
			width : 120
		},{
			text : '发票类型',
			dataIndex : 'invoiceType',
			width : 80,
			renderer : function(val) {
				if (val == '1') {
					return "个人";
				} else if (val == '2') {
					return "公司";
				} 
				return val;
			}
		},{
			text : '发票',
			dataIndex : 'invoiceTitle',
			width : 150
		}];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var me = this;
		var field1 = Ext.create("Ext.form.field.Text",{
			itemId : 'field1',
			listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                    	this.ownerCt.getComponent("search").handler();
                    }
                }
            }
		});
		
		var field2 = Ext.create("Ext.form.field.Text",{
			itemId : 'field2',
			listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                    	this.ownerCt.getComponent("search").handler();
                    }
                }
            }
		});
		
		var field3 = Ext.create("Ext.form.field.Text",{
			itemId : 'field3',
			listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                    	this.ownerCt.getComponent("search").handler();
                    }
                }
            }
		});
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [
			         {
							xtype : 'button',
							text : '警报',
							iconCls : 'icon-baojing',
							handler : function() {
								me.viewAudit();
							}
						},
						{
							xtype : 'button',
							text : '查看',
							iconCls : 'icon-edit',
							handler : function() {
								me.openEdit(true);
							}
						},{
							xtype : 'button',
							text : '修改',
							iconCls : 'icon-edit',
							handler : function() {
								me.openEdit(false);
							}
						},{
						text : '导出',
						iconCls : 'icon-excel',
						handler : function() {
							me.getDownWindow();
						}
					} ]
		},{

			xtype : 'toolbar',
			dock : 'top',
			items : [
					"订单编号：",
					field1,
					"VIN号：",
					field2,
					"大通订单号：",
					field3,
					"下单时间",
					{
						xtype : 'datefield',
						fieldLable : '',
						format : 'Y-m-d',
						name : 'applyTime',
						itemId : 'applyTime'
					},
					{
						text : "搜索",
						itemId : 'search',
						iconCls : 'icon-search',
						handler : function() {
							me.store.load({
								params : {
									orderNo : field1.getValue(),
									vinNo : field2.getValue(),
									associationNo : field3.getValue(),
									applyTime : this.ownerCt.getComponent(
											"applyTime").getValue()
								}
							});
						}
					} ]
		
		} ];
	},
	// 修改
	openEdit : function(effected) {
		var me = this;
		var selection = this.down("grid").getSelectionModel().getSelection();
		if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
				title : 'Error',
				msg : '只允许编辑一条数据',
				icon : Ext.MessageBox.INFO
			});
			return false;
		} else {
			me.formWindowUp(selection[0].data.orderId, effected,selection[0].data.userType);
		}
	},
	viewAudit : function() {
		var me = this;
		var selection = this.down("grid").getSelectionModel().getSelection();
		/*
		 * if (selection.length > 1 || selection.length <= 0) {
		 * Ext.MessageBox.show({ title : '警告', msg : '只允许编辑一条数据', icon :
		 * Ext.MessageBox.INFO }); return false; }
		 */
		// var orderId = selection[0].data.orderId;
		var auditPanel = Ext.create("FMS.app.order.module.OrderAlarm", {
			idParams : {
				orderId : 1
			}
		});
		var auditWindow = Ext.create("Ext.window.Window", {
			title : '查看详情',
			modal : true,
			border : false,
			floating : true,
			width : 650,
			height : 400,
			anchor : '100%',
			layout : 'card',
			items : [ auditPanel ],
			buttons : [ {
				text : '关闭',
				iconCls : 'icon-cancel',
				handler : function() {
					auditWindow.close();
				}
			} ]
		});
		auditWindow.show();
	},

	/**
	 * 修改 弹出窗口
	 */
	formWindowUp : function(orderId, effected,userType) {
		var me = this;
		var idParams = {
			orderId : orderId
		};
		var win = this.createCientWindow({
			title : '订单信息',
			idName : 'orderId',
			idParams : idParams,
			hiddenButtons : effected,
			height:1500,
			width: 1000,
			getLoadDetailInfoArray : me.getLoadDetailInfoArray,
			listeners : {
				"closeWindow" : function(_win) {
					Ext.MessageBox.show({
						title : "提示",
						msg : "操作成功",
						icon : Ext.MessageBox.INFO,
						buttons : Ext.MessageBox.OK,
						fn : function(buttonId) {
							if (buttonId === "ok") {
								me.store.reload();
								_win.close();
							}
						}
					});
				}
			}
		});
		win = this.createWindowTabs(win, {
			idParams : idParams
		});
		win.loadAndRenderDetailInfo(idParams, win);
		win.show();
	},
	// 创建客户详情弹出窗口
	createCientWindow : function(obj) {
		var me = this;
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindow", obj);
		_win.addBaseClientForm({
			fieldSetTitle : '订单基本信息',
			formItemId : 'orderForm',
			formUrl : StaticSetting.absUrl + '/mis/order/save',
			formItems : this.getMain(),
			submitParams : obj.idParams,
			hiddenFormButten : true
		});
		return _win;
	},
	// 创建客户弹出窗口的Tab页面
	createWindowTabs : function(_win, obj) {
		_win.addTabClientPanel(Ext.create("FMS.app.order.module.OrderAllState", {
			title : '状态',
			itemId : 'orderAllStateGrid',
			idParams : obj.idParams,
			height : 300
		}));
		return _win;
	},
	/** ********************加载数据并赋值功能******************************** */
	// form加载url
	getLoadDetailInfoArray : function() {
		return {
			baseForm : {
				name : '订单基本信息',
				url : StaticSetting.absUrl + '/mis/order/getOrder',
				formItemId : 'orderForm'
			},
			tabForm : []
		};
	},
	// 设置主表信息
	getMain : function(userType) {
		return [ {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'orderId',
				hidden : true
			}, {
				name : 'orderNo',
				fieldLabel : '订单编号',
				emptyText : '订单编号',
				readOnly : true,
			    style:'background:#E6E6E6'
			}, {
				name : 'applyTimeStr',
				fieldLabel : '下单时间',
				emptyText : '下单时间',
				readOnly : true,
			    style:'background:#E6E6E6'
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'userAccount',
				fieldLabel : '用户名',
				emptyText : '用户名',
				maxLength : 30,
				readOnly : true,
			    style:'background:#E6E6E6'
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'productName',
				fieldLabel : '产品名称',
				emptyText : '产品名称',
				readOnly : true,
			    style:'background:#E6E6E6'
			}, {
				name : 'quantity',
				fieldLabel : '购买数量',
				emptyText : '购买数量',
				readOnly : true,
			    style:'background:#E6E6E6'
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'feeAmount',
				fieldLabel : '总金额',
				emptyText : '总金额',
				xtype : 'numberfield',
				readOnly : true,
			    style:'background:#E6E6E6'
			}, {
				name : 'logisticsName',
				fieldLabel : '当前状态',
				emptyText : '当前状态',
				readOnly : true,
			    style:'background:#E6E6E6'
			} ]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'dealerName',
				fieldLabel : '经销商',
				emptyText : '经销商',
				readOnly : true,
			    style:'background:#E6E6E6'
			},{
				name : 'bodyColor',
				fieldLabel : '颜色',
				emptyText : '颜色',
				readOnly : true,
			    style:'background:#E6E6E6'
			}]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'deliveryDateStr',
				fieldLabel : '承诺交付日',
				emptyText : '承诺交付日',
				readOnly : true,
			    style:'background:#E6E6E6'
			},{
				name : 'shangXianDateStr',
				fieldLabel : '上线时间',
				emptyText : '上线时间',
				readOnly : true,
			    style:'background:#E6E6E6'
			} ]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'subscriptionDateStr',
				fieldLabel : '付定金时间',
				emptyText : '付定金时间',
				readOnly : true,
			    style:'background:#E6E6E6'
			}, {
				name : 'deliveryConfirmDateStr',
				fieldLabel : '交付时间',
				emptyText : '交付时间',
				readOnly : true,
			    style:'background:#E6E6E6'
			} ]
		} ,{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'userConfirmDateStr',
				fieldLabel : '用户确认时间',
				emptyText : '用户确认时间',
				readOnly : true,
			    style:'background:#E6E6E6'
			}]
		} , {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'vinNo',
				fieldLabel : 'VIN号',
				emptyText : 'VIN号'
			},  {
				name : 'associationNo',
				fieldLabel : '大通订单号',
				emptyText : '大通订单号'
			} ]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'userType',
				fieldLabel : '客户类型',
				emptyText : '客户类型',
				xtype : 'ExtPluginFormCombobox',
				tCode : 'c_user_type',
				allowBlank : false,
				forceSelection : true,
				typeAhead : false,
				editable : false
			}]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'userName',
				fieldLabel : '客户姓名',
				emptyText : '客户姓名'
			},{
				name : 'userSex',
				fieldLabel : '性别',
				xtype : 'ExtPluginFormCombobox',
				tCode : 'c_sex',
				forceSelection : true,
				typeAhead : false,
				editable : false
			}]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'userMobilephone',
				fieldLabel : '手机号码',
				emptyText : '手机号码',
				maxLength : 11
			},{
				name : 'userEmail',
				fieldLabel : '邮箱',
				emptyText : '邮箱',
				maxLength : 30
			}]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'certiCode',
				fieldLabel : '身份证号码',
				emptyText : '身份证号码',
				maxLength : 18
			}]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'companyName',
				fieldLabel : '公司名称',
				emptyText : '公司名称',
				maxLength : 30
			},{
				name : 'athorityRepresentative',
				fieldLabel : '授权代表',
				emptyText : '授权代表',
				maxLength : 30
			}]
		},
		{
			xtype : 'container',
			layout : 'form',
			items : [{
						xtype : 'PluginformCascadeForm',
						name : 'test',
						code : '000000',
						firstCombo : true,
						columnWidth : .94,
						combos : ['provinceName', 'cityName', 'districtName'],
						nextCombo : null,
						fieldLabel : '所在地:'
					}]
		
		},{
			xtype : 'container',
			layout : 'form',
			defaultType : 'textfield',
			items : [{
				fieldLabel : '详细地址',
				name : 'detailedAddress',
				emptyText : '详细地址',
				maxLength : 30,
				width: 400
			}]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'postCode',
				fieldLabel : '邮编',
				emptyText : '邮编',
				maxLength : 6
			}]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'fax',
				fieldLabel : '传真',
				emptyText : '传真',
				maxLength : 15
			},{
				name : 'telephone',
				fieldLabel : '电话',
				emptyText : '电话',
				maxLength : 15
			}]
		
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'invoiceType',
				fieldLabel : '发票类型',
				emptyText : '发票类型',
				xtype : 'ExtPluginFormCombobox',
				tCode : 'c_invoice_type',
				forceSelection : true,
				typeAhead : false,
				editable : false
			},{
				name : 'invoiceTitle',
				fieldLabel : '发票名称',
				emptyText : '发票名称',
				maxLength : 15
			}]
		}];
	},
	getDownWindow : function() {
		var _form = Ext.create("Ext.form.Panel", {
			layout : 'form',
			border : false,
			defaultType : 'textfield',
			items : [ {
				name : 'orderNo',
				fieldLabel : "订单编号"
			} ]
		});
		var downWindow = Ext.create("Ext.window.Window", {
			modal : true,
			border : false,
			floating : true,
			width : 450,
			layout : 'form',
			title : '导出',
			items : [ _form ],
			buttons : [ {
				text : '导出',
				handler : function() {
					if (!_form.getForm().isValid()) {
						Ext.MessageBox.show({
							title : '警告',
							msg : "请根据提示正确输入相关信息!",
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
						return false;
					}
					var resultJson = _form.getForm().getValues();
					var url = StaticSetting.absUrl + '/mis/order/export?'
							+ Ext.Object.toQueryString(resultJson);
					var downloadForm = Ext.create("Ext.form.Panel", {
						border : 0,
						layout : 'fit',
						renderTo : Ext.getBody(),
						items : [ {
							xtype : 'PluginuxIFrame',
							src : url,
							listeners : {
								'load' : function() {
									Ext.messagebox.msg('提示',
											'如未下载，表示文件不存在/已损坏，请与管理员联系!');
								}
							}
						} ]
					});
				}
			} ]
		});
		downWindow.show();
	}
});