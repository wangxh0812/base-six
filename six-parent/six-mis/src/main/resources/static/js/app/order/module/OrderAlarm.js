Ext.define('FMS.app.order.module.OrderAlarm', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappordermoduleOrderAlarm',
	requires : ['FMS.app.order.store.OrderAlarm', 'Plugin.form.combobox.Module','Plugin.form.SelectionForm','FMS.app.order.store.OrderState','Plugin.window.UploadWindow'],
	initComponent : function() {
		Ext.apply(this, {
					store : Ext.create('FMS.app.order.store.OrderAlarm'),
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.editRows = this.openEdit;
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
			width : 100
		}, {
			text : '预计超期',
			dataIndex : 'overDueDays',
			width : 100
		}, {
			text : '订单编号',
			dataIndex : 'orderNo',
			width : 200
		}, {
			text : '大通订单号',
			dataIndex : 'associationNo',
			width : 100
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
			width : 80
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
			text : '实际计划时间',
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
			text : '质保下线时间',
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
		} ];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var me = this;
		var field1 = new Ext.form.Field();
		var field2 = new Ext.form.Field();
		return [{
			xtype : 'toolbar',
			dock : 'top',
			items : [{
						xtype : 'button',
						text : '导出',
						iconCls : 'icon-add',
						handler : function() {
							me.getDownWindow();
						}
					}]
		}];
	},getDownWindow : function() {
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
					var url = StaticSetting.absUrl + '/mis/order/exportAlarm?'
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
	},
	// 修改
	openEdit : function() {
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
			me.formWindowUp(selection[0].data.orderId);
		}
	},viewAudit : function(){
		var me = this;
		var selection = this.down("grid").getSelectionModel().getSelection();
		/*if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
				title : '警告',
				msg : '只允许编辑一条数据',
				icon : Ext.MessageBox.INFO
			});
			return false;
		}*/
		//var orderId = selection[0].data.orderId;
		var auditPanel = Ext.create("FMS.app.order.module.Order",{
			idParams : {
				orderId : 1
			}
		});	
		var auditWindow = Ext.create("Ext.window.Window",{
			title : '查看详情',
			modal : true,
			border : false,
			floating : true,
			width : 650,
			height : 400,
			anchor : '100%',
			layout : 'card', 
			items : [auditPanel],
			buttons : [{
				text : '关闭',
				iconCls : 'icon-cancel',
				handler : function(){
					auditWindow.close();
				}
			}]
		});
		auditWindow.show();
	},
	/**
	 * 新增弹出窗口
	 */
	/*addFormWindow : function() {
		var me = this;
		var win = this.createCientWindow({
					title : '新增产品信息',
					hiddenTabPanel : true,
					idName : 'productId',
					getLoadDetailInfoArray : me.getLoadDetailInfoArray,
					listeners : {
						"createTabs" : function(a, b) {
							me.createWindowTabs(a, b);
						},
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
		win.show();
	},*/

	/**
	 * 修改 弹出窗口 
	 */
	formWindowUp : function(orderId) {
		var me = this;
		var idParams = {
				orderId : orderId
		};
		
		var win = this.createCientWindow({
					title : '修改订单信息',
					idName : 'orderId',
					idParams : idParams,
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
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindow",
				obj);
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
		_win.addTabClientPanel(Ext.create(
				"FMS.app.order.module.OrderState", {
					title : '状态修改',
					itemId : 'orderStateGrid',
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
	getMain : function() {
		return [{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
								name : 'orderId',
								hidden : true
							}, {
								name : 'orderNo',
								fieldLabel : '订单编号',
								allowBlank : false,
								emptyText : '订单编号'
							}, {
								name : 'applyTime',
								fieldLabel : '下单时间',
								allowBlank : false,
								emptyText : '下单时间',
								forceSelection : true,
								typeAhead : false,
								editable : false,
								xtype : 'datefield',
								format : 'Y-m-d'
							}]
				},{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
								name : 'userName',
								fieldLabel : '用户姓名',
								allowBlank : false,
								emptyText : '用户姓名',
								maxLength : 30
							},{
								name : 'userAccount',
								fieldLabel : '用户名',
								allowBlank : false,
								emptyText : '用户名',
								maxLength : 30
							}]
				},{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
						name : 'productName',
						fieldLabel : '产品名称',
						emptyText : '产品名称',
						allowBlank : false
					},{	
						name : 'quantity',
						fieldLabel : '购买数量',
						emptyText : '购买数量',
						allowBlank : false
					}]
				}, {
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
						name : 'feeAmount',
						fieldLabel : '总金额',
						emptyText : '总金额',
						allowBlank : false,
						xtype : 'numberfield'
							},{
								name : 'status',
								fieldLabel : '当前状态',
								allowBlank : false,
								emptyText : '当前状态',
							}]
				},{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
						name : 'workDayBeginTime',
						fieldLabel : '工作日开始',
						allowBlank : false,
						forceSelection : true,
						typeAhead : false,
						editable : false,
						xtype : 'datefield',
						format : 'Y-m-d'
					},{
						name : 'workDayEndTime',
						fieldLabel : '工作日结束',
						allowBlank : false,
						forceSelection : true,
						typeAhead : false,
						editable : false,
						xtype : 'datefield',
						format : 'Y-m-d'
					}]
				}];
	}
});