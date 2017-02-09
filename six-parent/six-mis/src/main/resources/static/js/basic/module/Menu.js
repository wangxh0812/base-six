Ext.define('FMS.basic.module.Menu', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSbasicmoduleMenu',
	requires : [ 'FMS.basic.store.Menus', 'Plugin.combo.Combotree',
			'Plugin.form.combobox.Module' ],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		Ext.apply(this, {
			store : Ext.create('FMS.basic.store.Menus'),
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.callParent(arguments);
	},
	getGridColumns : function() {
		return [ {
			text : '菜单代号',
			dataIndex : 'menuCode',
			width : 200
		}, {
			text : '菜单名称',
			dataIndex : 'menuName',
			width : 200
		}, {
			text : '菜单链接',
			dataIndex : 'menuLink',
			width : 300
		}, {
			text : '菜单描述',
			dataIndex : 'menuResrc',
			width : 200
		},/* {
			text : '菜单图标',
			dataIndex : 'menuIcon',
			width : 200
		},*/ {
			text : '排序',
			dataIndex : 'menuSeq',
			width : 90
		}, {
			text : '父菜单',
			dataIndex : 'parentName',
			flex : 1
		}, {
			text : '最后更新时间',
			dataIndex : 'updateTime',
			width : 100
		}, {
			text : '是否有效',
			dataIndex : 'menuStatus',
			width : 100,
			renderer : function(val) {
				if (val == "1") {
					return '有效';
				}
				return '无效';
			}
		} ];
	},
	// 按钮栏
	getGridDockedItems : function() {
		var _this = this;
		var filed1 = new Ext.form.Field();
		var filed2 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {
				xtype : 'ExtPluginGridAdd',
				customParameter : {
					items : _this.getWindowColumns()
				}
			}, {
				xtype : 'ExtPluginGridEdit',
				customParameter : {
					items : _this.getWindowColumns()
				}
			}, {
				xtype : 'ExtPluginGridDel'
			}, "->", "菜单名称：", filed1, "菜单代号：", filed2, {
		        text: "搜索",
		        handler: function () {
		        	_this.store.load({ params: { menuName: filed1.getValue(), menuCode: filed2.getValue()} });
		        }
		    } ]
		} ];
	},
	// 新增弹出窗口
	getWindowColumns : function() {
		return [ {
			name : 'menuCode',
			fieldLabel : '菜单代号',
			allowBlank : false
		}, {
			name : 'menuName',
			fieldLabel : '菜单名称',
			allowBlank : false
		}, {
			name : 'menuLink',
			fieldLabel : '菜单链接'
		}, {
			name : 'menuResrc',
			fieldLabel : '菜单描述'
		},/* {
			name : 'menuIcon',
			fieldLabel : '菜单图标'
		},*/ {
			name : 'menuStatus',
			xtype : 'ExtPluginFormCombobox',
			tCode : 'c_status',
			fieldLabel : '是否有效'
		}, {
			name : 'menuSeq',
			xtype : 'numberfield',
			fieldLabel : '排序',
			minValue : 0,
			maxValue : 20
		}, {
			name : 'parentName',
			keyName : 'parentId',
			xtype : 'combotree',
			fieldLabel : '父菜单',
			rootId : '',
			storeUrl : StaticSetting.absUrl + '/menu/getMenus',
			id : 'cmbJS',
			selectMode : 'all',
			treeHeight : 300,
			expanded : true
		}, {
			name : 'parentId',
			hidden : true
		} ];
	}
});
