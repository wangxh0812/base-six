Ext.define('FMS.app.point.module.PointGoods', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSapppointmodulePointGoods',
	requires : [ 'FMS.app.point.store.PointGoods', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm',
			'Plugin.window.UploadWindow', 'FMS.app.image.store.Image' ],
	initComponent : function() {
		var _store = Ext.create('FMS.app.point.store.PointGoods');
		if (!Ext.isEmpty(this.idParams)) {
			Ext.apply(_store.proxy.extraParams, this.idParams);
		}
		Ext.apply(this, {
			store : _store,
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [ {
			text : '商品编码',
			dataIndex : 'goodsCode',
			width : 100
		}, {
			text : '商品名称',
			dataIndex : 'goodsName',
			width : 150
		},  {
			text : '数量',
			dataIndex : 'goodsQuantity',
			width : 100
		}, {
			text : '品牌',
			dataIndex : 'goodsBrand',
			width : 100
		},{
			text : '分类',
			dataIndex : 'goodsCategoryName',
			width : 100
		}, {
			text : '积分',
			dataIndex : 'goodsPoint',
			width : 100
		}, {
			text : '描述',
			dataIndex : 'goodsDesc',
			width : 400
		}, ];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var me = this;
		var field1 = new Ext.form.Field();
		var field2 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {
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
			},"->", "商品名称：", field1, "商品编码：", field2, {
				text : "搜索",
				iconCls : 'icon-search',
				handler : function() {
					me.store.load({
						params : {
							goodsName : field1.getValue(),
							goodsCode : field2.getValue()
						}
					});
				}
			} ]
		} ];
	}, // 修改
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
			me.formWindowUp(selection[0].data.goodsId);
		}
	},
	/**
	 * 新增弹出窗口
	 */
	addFormWindow : function() {
		var me = this;
		var win = this.createCientWindow({
			title : '新增积分商品信息',
			hiddenTabPanel : true,
			idName : 'goodsId',
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
	// 创建客户详情弹出窗口
	createCientWindow : function(obj) {
		var me = this;
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindow", obj);
		_win.addBaseClientForm({
			fieldSetTitle : '积分商品基本信息',
			formItemId : 'goodsForm',
			formUrl : StaticSetting.absUrl + '/mis/goods/save',
			formItems : this.getWindowColumns(),
			submitParams : obj.idParams,
			hiddenFormButten : true
		});
		return _win;
	},
	formWindowUp : function(goodsId) {
		var me = this;
		var idParams = {
			goodsId : goodsId
		};
		var win = this.createCientWindow({
			title : '修改积分商品信息',
			idName : 'goodsId',
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

	// 创建客户弹出窗口的Tab页面
	createWindowTabs : function(_win, obj) {
		_win.addTabClientPanel(Ext.create('Plugin.grid.UploadGrid', {
			title : '上传图片',
			height : 300,
			itemId : 'customerUploadGrid',
			store : Ext.create("FMS.app.image.store.Image"),
			storeParams : {
				businessId : obj.idParams.goodsId,
				businessType : "2"
			},
			allowUpdate : obj.allowUpdate,
			imageFormUrl : StaticSetting.absUrl + '/mis/image/uploadGoods',
			imageFormParams : obj.idParams,
			fileFormUrl : StaticSetting.absUrl + '/mis/image/uploadGoods',
			fileFormParams : obj.idParams,
			getGridColumns : this.getUploadFileGridColumn
		}));
		return _win;
	},
	/** ********************加载数据并赋值功能******************************** */
	// form加载url
	getLoadDetailInfoArray : function() {
		return {
			baseForm : {
				name : '积分商品信息',
				url : StaticSetting.absUrl + '/mis/goods/getPointGoods',
				formItemId : 'goodsForm'
			},
			tabForm : []
		};
	},
	getUploadFileGridColumn : function() {
		return [{
					text : '文件名',
					dataIndex : 'imageName'
				}, {
					text : '文件类型',
					dataIndex : 'imageTypeName'
				}, {
					text : '后缀名',
					dataIndex : 'suffix'
				}];
	},
	getWindowColumns : function() {
		return [ {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '逻辑ID',
				name : 'goodsId',
				hidden : true
			}, {
				fieldLabel : '商品编码',
				name : 'goodsCode',
				emptyText : '商品编码',
				maxLength : 12,
				allowBlank : false
			}, {
				fieldLabel : '商品名称',
				name : 'goodsName',
				emptyText : '商品名称',
				maxLength : 50,
				allowBlank : false
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '数量',
				name : 'goodsQuantity',
				emptyText : '数量',
				maxLength : 8,
				allowBlank : false
			}, {
				fieldLabel : '积分值',
				name : 'goodsPoint',
				emptyText : '积分值',
				maxLength : 8,
				xtype : 'numberfield',
				maxLength : 8,
				minValue : 0,
				allowBlank : false
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				name : 'beginDate',
				fieldLabel : '上架时间',
				emptyText : '上架时间',
				forceSelection : true,
				typeAhead : false,
				editable : false,
				xtype : 'datefield',
				format : 'Y-m-d'
			}, {
				name : 'endDate',
				fieldLabel : '下架时间',
				emptyText : '下架时间',
				forceSelection : true,
				typeAhead : false,
				editable : false,
				xtype : 'datefield',
				format : 'Y-m-d'
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [{
				fieldLabel : '分类',
				name : 'goodsCategory',
				xtype : 'ExtPluginFormCombobox',
				tCode : 'c_goods_category',
				allowBlank : false,
				forceSelection : true,
				typeAhead : false,
				editable : false
			}, {
				fieldLabel : '品牌',
				name : 'goodsBrand',
				emptyText : '品牌',
				maxLength : 50
			} ]
		}, {
			xtype : 'container',
			layout : 'anchor',
			defaultType : 'textfield',
			items : [ {
				name : 'goodsDesc',
				fieldLabel : '描述',
				xtype : "textarea",
				labelWidth : 80,
				width : 500,
				maxLength : 600,
				emptyText : '描述'
			} ]
		} ];

	}
});