Ext.define('FMS.app.member.module.Member', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappmembermoduleMember',
	requires : [ 'FMS.app.member.store.Member', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm',
			'Plugin.window.UploadWindow', 'FMS.app.point.store.PointOrder' ],
	initComponent : function() {
		var _store = Ext.create('FMS.app.member.store.Member');
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
		return [ /*{
			text : '会员类型',
			dataIndex : 'userTypeName',
			width : 100
		}, */{
			text : '用户名',
			dataIndex : 'userAccount',
			width : 100
		}, {
			text : '姓名',
			dataIndex : 'userName',
			width : 100
		}, {
			text : '身份证号码',
			dataIndex : 'certiCode',
			width : 150
		}, {
			text : '邮箱',
			dataIndex : 'userEmail',
			width : 150
		}, {
			text : '手机号码',
			dataIndex : 'userMobilephone',
			width : 100
		}, {
			text : '地址',
			dataIndex : 'detailedAddress',
			width : 300
		}, {
			text : '传真',
			dataIndex : 'fax',
			width : 100
		}, {
			text : '公司名称',
			dataIndex : 'companyName',
			width : 200
		}, {
			text : '当前积分',
			dataIndex : 'userPoint',
			width : 80
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
						 * { xtype : 'ExtPluginGridAdd', customParameter : {
						 * items : me.getWindowColumns() } },
						 */
			{
				xtype : 'button',
				text : '查看',
				iconCls : 'icon-search',
				handler : function() {
					me.openEdit();
				}
			},/*
				 * , { xtype : 'ExtPluginGridDel' }
				 */
			"->", "用户名：", field1, "手机号码：", field2, "姓名：", field3, {
				text : "搜索",
				iconCls : 'icon-search',
				handler : function() {
					me.store.load({
						params : {
							userAccount : field1.getValue(),
							userMobilephone : field2.getValue(),
							userName : field3.getValue()
						}
					});
				}
			} ]
		} ];
	},
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
			me.formWindowUp(selection[0].data.userId);
		}
	},
	formWindowUp : function(userId) {
		var me = this;
		var idParams = {
			userId : userId
		};
		var win = this.createCientWindow({
			title : '会员信息',
			idName : 'userId',
			hiddenButtons : true,
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
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindow", obj);
		_win.addBaseClientForm({
			fieldSetTitle : '会员基本信息',
			formItemId : 'userForm',
			formUrl : StaticSetting.absUrl + '/mis/user/save',
			formItems : this.getWindowColumns(),
			submitParams : obj.idParams,
			hiddenFormButten : true
		});
		return _win;
	},
	// 创建客户弹出窗口的Tab页面
	createWindowTabs : function(_win, obj) {
		_win.addTabClientPanel(Ext.create(
				"FMS.app.point.module.PointOrderByUser", {
					title : '积分订单',
					itemId : 'pointOrderByUserGrid',
					idParams : obj.idParams,
					height : 300
				}));
		_win.addTabClientPanel(Ext.create(
				"FMS.app.order.module.OrderByUser", {
					title : '订单查看',
					itemId : 'orderByUserGrid',
					idParams : obj.idParams,
					height : 300
				}));
		_win.addTabClientPanel(Ext.create(
				"FMS.app.member.module.ReceiverAddress", {
					title : '收货信息查看',
					itemId : 'receiverAddressGrid',
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
				name : '会员基本信息',
				url : StaticSetting.absUrl + '/mis/user/getUser',
				formItemId : 'userForm'
			},
			tabForm : []
		};
	},
	getWindowColumns : function() {
		return [ {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '逻辑ID',
				name : 'userId',
				hidden : true
			}/*, {
				fieldLabel : '会员类型',
				name : 'userTypeName',
				emptyText : '会员类型'
			} */]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '用户名',
				name : 'userAccount',
				emptyText : '用户名',
				maxLength : 50
			}, {
				fieldLabel : '姓名',
				name : 'userName',
				emptyText : '姓名',
				maxLength : 50
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '身份证号码',
				name : 'certiCode',
				emptyText : '身份证号码',
				maxLength : 50
			}, {
				fieldLabel : '邮箱',
				name : 'userEmail',
				emptyText : '邮箱',
				maxLength : 50
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '手机号码',
				name : 'userMobilephone',
				emptyText : '手机号码',
				maxLength : 50
			} ]
		}, {
			xtype : 'container',
			layout : 'form',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '地址',
				name : 'detailedAddress',
				emptyText : '地址',
				maxLength : 50
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '公司名称',
				name : 'companyName',
				emptyText : '公司名称',
				maxLength : 50
			}, {
				fieldLabel : '传真',
				name : 'fax',
				emptyText : '传真',
				maxLength : 50
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '当前积分',
				name : 'userPoint',
				emptyText : '当前积分',
				maxLength : 50
			} ]
		} ];
	}
});