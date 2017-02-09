Ext.define('FMS.app.tour.module.TourGroup', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSapptourmoduleTourGroup',
	requires : ['FMS.app.tour.store.TourGroup', 'Plugin.form.combobox.Module','Plugin.form.SelectionForm','FMS.app.tour.module.OrderTourGroup','FMS.app.select.module.ProductModule',
	            'FMS.app.select.module.TourGuideModule'],
	initComponent : function() {
		Ext.apply(this, {
					store : Ext.create('FMS.app.tour.store.TourGroup'),
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.editRows = this.openEdit;
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [{
					text : '产品编号',
					dataIndex : 'productCode',
					width : 80
				}, {
					text : '产品名称',
					dataIndex : 'productName',
					width : 150
				}, {
					text : '旅游时间',
					dataIndex : 'tourTime',
					width : 100
				}, {
					text : '导游',
					dataIndex : 'guideName',
					width : 100
				}, {
					text : '手机号码',
					dataIndex : 'guideMobile',
					width : 100
				}, {
					text : '微信',
					dataIndex : 'guideWechat',
					width : 150
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
			items : [{
						xtype : 'button',
						text : '新增',
						iconCls : 'icon-add',
						handler : function() {
							me.addFormWindow();
						}
					}, {
						xtype : 'button',
						text : '修改',
						iconCls : 'icon-edit',
						handler : function() {
							me.openEdit();
						}
					}, {
						xtype : 'ExtPluginGridDel'
					}, "->", "产品名称：", field1, "产品编码：", field2, {
						text : "搜索",
						iconCls : 'icon-search',
						handler : function() {
							me.store.load({
								params : {
									productName : field1.getValue(),
									productCode : field2.getValue()
								}
							});
						}
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
			me.formWindowUp(selection[0].data);
		}
	},
	/**
	 * 新增弹出窗口
	 */
	addFormWindow : function() {
		var me = this;
		var win = this.createCientWindow({
					title : '新增信息',
					hiddenTabPanel : true,
					idName : 'tourGroupId',
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
	},

	/**
	 * 修改 弹出窗口 
	 */
	formWindowUp : function(data) {
		var me = this;
		var idParams = {
			tourGroupId : data.tourGroupId
		};
		
		var idParamss = {
				tourGroupId : data.tourGroupId,
				tourTime:data.tourTime,
				productId : data.productId
			};
		
		var win = this.createCientWindow({
					title : '修改信息',
					idName : 'tourGroupId',
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
					idParams : idParamss
				});
		win.loadAndRenderDetailInfo(idParams, win);
		win.show();
	},
	// 创建客户详情弹出窗口
	createCientWindow : function(obj) {
		var me = this;
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindow",obj);
		_win.addBaseClientForm({
					fieldSetTitle : '基本信息',
					formItemId : 'tourGroupForm',
					formUrl : StaticSetting.absUrl + '/mis/tourGroup/save',
					formItems : this.getMain(),
					submitParams : obj.idParams,
					hiddenFormButten : true
				});
		return _win;
	},
	// 创建客户弹出窗口的Tab页面
	createWindowTabs : function(_win, obj) {
		_win.addTabClientPanel(Ext.create(
				"FMS.app.tour.module.OrderTourGroup", {
					title : '旅游订单',
					itemId : 'orderTourGroupGrid',
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
				name : '基本资料',
				url : StaticSetting.absUrl + '/mis/tourGroup/getTourGroup',
				formItemId : 'tourGroupForm'
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
				name : 'tourGroupId',
				hidden : true
			},{
				name : 'tourTime',
				fieldLabel : '旅游时间',
				emptyText : '旅游时间',
				xtype : 'datefield',
				format: 'Y-m-d',
		        margins: '0 0 5 0',
				allowBlank : false
			}]
		},{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
			     				xtype : 'ExtPluginSelectionForm',
			     				textFeildName : "产品名称",
			     				windowTitle : '选择产品',
			     				grid : "FMSappselectmoduleProductModule",
			     				itemId : 'productSelectForm',
			     				hiddenFields : ['productId'],
			     				textFieldConfig : {
			     					allowBlank : false
			     				},
			     				//textField : "productName",
			     				textField : {
			     					fieldName : 'productName',
			     					storeName : 'productName'
			     				},
			     				windowWidth : 600
			            	}
						]
				},{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
	     				xtype : 'ExtPluginSelectionForm',
	     				textFeildName : "姓名",
	     				windowTitle : '选择导游',
	     				grid : "FMSappselectmoduleTourGuideModule",
	     				itemId : 'tourGuideSelectForm',
	     				hiddenFields : ['tourGuideId'],
	     				textFieldConfig : {
	     					allowBlank : false
	     				},
	     				textField : {
	     					fieldName : 'guideName',
	     					storeName : 'guideName'
	     				},
	     				selectedCallBack : function(record){
	     					var guideMobile = record.get("guideMobile");
	     					var guideWechat = record.get("wechat");
	     					this.ownerCt.getComponent("guideMobileValue").setValue(guideMobile);
	     					this.ownerCt.getComponent("guideWechatValue").setValue(guideWechat);
	     				},
	     				windowWidth : 600
	            	},{
						name : 'guideMobile',
						itemId : 'guideMobileValue',
						readOnly : true,
						fieldLabel : '手机号码'
					},{
						fieldLabel : '微信',
						itemId : 'guideWechatValue',
						name : 'guideWechat',
						readOnly : true
					}]
				}];
	}
});