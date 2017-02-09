Ext.define('FMS.app.order.module.OrderByUser', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappordermoduleOrderByUser',
	requires : [ 'FMS.app.order.store.Order', 'Plugin.form.combobox.Module',
			'Plugin.form.SelectionForm', 'FMS.app.order.store.OrderState',
			'Plugin.window.UploadWindow','MyApp.ux.DateTimeField' ],
	initComponent : function() {
		var _store = Ext.create('FMS.app.order.store.Order');
		if (!Ext.isEmpty(this.idParams)) {
			Ext.apply(_store.proxy.extraParams, this.idParams);
		}
		Ext.apply(this, {
			store : _store,
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
				if (val == '1'){
					return "<font color = red>是</font>";
				}else{
					return "否";
				}
				return val;
			},
			width : 100
		},{
			text : '订单编号',
			dataIndex : 'orderNo',
			width : 200
		}, {
			text : '用户姓名',
			dataIndex : 'userName',
			width : 100
		}, {
			text : '用户名',
			dataIndex : 'userAccount',
			width : 150
		}, {
			text : '产品名称',
			dataIndex : 'productName',
			width : 80
		}, {
			text : '状态',
			dataIndex : 'logisticsName',
			width : 100
		}, {
			text : '总金额',
			dataIndex : 'feeAmount',
			width : 100
		}, {
			text : '下单时间',
			dataIndex : 'applyTimeStr',
			width : 100
		}, {
			text : 'VIN号',
			dataIndex : 'vinNo',
			width : 80
		}, {
			text : '大通订单号',
			dataIndex : 'associationNo',
			width : 150
		},{
			text : '安吉编号',
			dataIndex : 'anJiNo',
			width : 150
		}, {
			text : '生产计划时间',
			dataIndex : 'shangXianDate',
			width : 150
		}, {
			text : '质保下线时间',
			dataIndex : 'baoJiaoDate',
			width : 150
		}, {
			text : '发运时间',
			dataIndex : 'faYunDate',
			width : 150
		} ];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var me = this;
		var field1 = new Ext.form.Field();
		var field2 = new Ext.form.Field();
		var field3 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [/*
						 * { xtype : 'button', text : '新增', iconCls :
						 * 'icon-add', handler : function() {
						 * me.addFormWindow(); } },
						 */
					/*{
						xtype : 'button',
						text : '修改',
						iconCls : 'icon-edit',
						handler : function() {
							me.openEdit(true);
						}
					},{

						text : '上线',
						iconCls : 'icon-edit',
						handler : function(){
							var selection = me.down("grid").getSelectionModel().getSelection();
							if (selection.length > 1 || selection.length <= 0) {
								Ext.MessageBox.show({
									title : '警告',
									msg : '只允许操作一条数据',
									icon : Ext.MessageBox.INFO
								});
								return false;
							}
							
							var orderId = selection[0].data.orderId;
							var statusCode = selection[0].data.status;
							if(statusCode != 'S0301')
								return Ext.MessageBox.show({
									title : '警告',
									msg : '该订单不是上线状态，不能提交上线!',
									icon : Ext.MessageBox.INFO,
									buttons : Ext.MessageBox.OK
								});
							
							me.openShangXianApply(selection[0].data.orderId);
						}
					},{


						text : '报交',
						iconCls : 'icon-edit',
						handler : function(){
							var selection = me.down("grid").getSelectionModel().getSelection();
							if (selection.length > 1 || selection.length <= 0) {
								Ext.MessageBox.show({
									title : '警告',
									msg : '只允许操作一条数据',
									icon : Ext.MessageBox.INFO
								});
								return false;
							}
							
							var orderId = selection[0].data.orderId;
							var statusCode = selection[0].data.status;
							if(statusCode != 'S0304')
								return Ext.MessageBox.show({
									title : '警告',
									msg : '该订单不是总装下线状态，不能提交报交!',
									icon : Ext.MessageBox.INFO,
									buttons : Ext.MessageBox.OK
								});
							
							me.openBaoJiaoApply(selection[0].data.orderId);
						}
					
					},
					{
						xtype : 'button',
						text : '警报',
						iconCls : 'icon-baojing',
						handler : function() {
							me.viewAudit();
						}
					},*/
					{
						xtype : 'button',
						text : '查看',
						iconCls : 'icon-edit',
						handler : function() {
							me.openEdit(true);
						}
					}/*,
					"->",
					"订单编号：",
					field1,
					"VIN号：",
					field2,
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
						iconCls : 'icon-search',
						handler : function() {
							me.store.load({
								params : {
									orderNo : field1.getValue(),
									vinNo : field2.getValue(),
									applyTime : this.ownerCt.getComponent(
											"applyTime").getValue()
								}
							});
						}
					} */]
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
			me.formWindowUp(selection[0].data.orderId, effected);
		}
	},

	/**
	 * 修改 弹出窗口
	 */
	formWindowUp : function(orderId, effected) {
		var me = this;
		var idParams = {
			orderId : orderId
		};
		var win = this.createCientWindow({
			title : '修改订单信息',
			idName : 'orderId',
			idParams : idParams,
			hiddenButtons : effected,
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
				name : 'userName',
				fieldLabel : '用户姓名',
				emptyText : '用户姓名',
				maxLength : 30,
				readOnly : true,
			    style:'background:#E6E6E6'
			}, {
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
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'vinNo',
				fieldLabel : 'VIN号',
				emptyText : 'VIN号',
				readOnly : true,
			    style:'background:#E6E6E6'
			}, {
				name : 'associationNo',
				fieldLabel : '大通订单号',
				emptyText : '大通订单号',
				readOnly : true,
			    style:'background:#E6E6E6'
			} ]
		},{

			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'shangXianDateStr',
				fieldLabel : '上线时间',
				readOnly : true,
			    style:'background:#E6E6E6'
			},{
				name : 'baoJiaoDateStr',
				fieldLabel : '报交时间',
				readOnly : true,
			    style:'background:#E6E6E6'
			}  ]
		
		}/*,{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'faYunDateStr',
				fieldLabel : '发运时间',
				readOnly : true,
			    style:'background:#E6E6E6'
			}, ]
		}*/ ];
	}
});