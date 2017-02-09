Ext.define('FMS.app.question.module.UserQuestion', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappquestionmoduleUserQuestion',
	requires : ['FMS.app.question.store.UserQuestion', 'Plugin.form.combobox.Module','Plugin.form.SelectionForm'],
	initComponent : function() {
		Ext.apply(this, {
					store : Ext.create('FMS.app.question.store.UserQuestion'),
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.editRows = this.openEdit;
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [{
					text : '用户',
					dataIndex : 'userName',
					width : 80
				}, {
					text : '问题',
					dataIndex : 'questionName',
					width : 500
				}, {
					text : '答案',
					dataIndex : 'answer',
					width : 80
				}];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var me = this;
		var field1 = new Ext.form.Field();
		var field2 = new Ext.form.Field();
		return [{
			xtype : 'toolbar',
			dock : 'top',
			items : [/*{
						xtype : 'button',
						text : '新增',
						iconCls : 'icon-add',
						handler : function() {
							me.addFormWindow();
						}
					},*/ /*{
						xtype : 'button',
						text : '查看',
						iconCls : 'icon-add',
						handler : function() {
							me.openEdit();
						}
					},*/ {
						xtype : 'button',
						text : '导出',
						iconCls : 'icon-edit'
					}]
		}];
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
	formWindowUp : function(feedBackId) {
		var me = this;
		var idParams = {
				feedBackId : feedBackId
		};
		
		var win = this.createCientWindow({
					title : '修改订单信息',
					idName : 'feedBackId',
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
					formItemId : 'feedBackForm',
					formUrl : StaticSetting.absUrl + '/mis/feedBack/save',
					formItems : this.getMain(),
					submitParams : obj.idParams,
					hiddenFormButten : true
				});
		return _win;
	},
	// 创建客户弹出窗口的Tab页面
	createWindowTabs : function(_win, obj) {
		_win.addTabClientPanel(Ext.create(
				"FMS.app.question.module.Subject", {
					title : '题目修改',
					itemId : 'subjectGrid',
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
				url : StaticSetting.absUrl + '/mis/feedBack/getFeedBack',
				formItemId : 'feedBackForm'
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
								name : 'feedBackId',
								hidden : true
							}, {
								name : 'feedBackName',
								fieldLabel : '问卷',
								allowBlank : false,
								emptyText : '问卷'
							}, {
								name : 'feedBackDate',
								fieldLabel : '调查时间',
								allowBlank : false,
								emptyText : '调查时间',
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
								name : 'feedBackAddress',
								fieldLabel : '调查地点',
								allowBlank : false,
								emptyText : '调查地点',
								maxLength : 30
							}]
				}];
	}
});