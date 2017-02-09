Ext.define('FMS.basic.module.Department', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSbasicmoduleDepartment',
	requires : [ 'FMS.basic.store.Department', 'Plugin.combo.Combotree',
			'Plugin.form.combobox.Module','Plugin.form.Picker','Plugin.form.SelectionForm','FMS.app.select.module.CompanyModule' ],
	initComponent : function() {
		Ext.apply(this, {
			store : Ext.create('FMS.basic.store.Department'),
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.callParent(arguments);
	},
	getGridColumns : function() {
		return [ {
			text : '部门代号',
			dataIndex : 'departCode',
			width : 200
		}, {
			text : '部门名称',
			dataIndex : 'departName',
			width : 250
		}, {
			text : '负责人',
			dataIndex : 'managerAgent',
			width : 200
		}, {
			text : '联系电话',
			dataIndex : 'telphone',
			width : 200
		}, {
			text : '状态',
			dataIndex : 'isvalid',
			width : 100,
			renderer : function(val) {
				if (val == "1") {
					return '有效';
				}
				return '无效';
			}
		}, {
			text : '上层部门',
			dataIndex : 'parentDepartName',
			width : 250
		}, {
			text : '所属公司',
			dataIndex : 'companyName',
			flex : 1
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
			}, "->", "部门代号：", filed1, "部门名称：", filed2, {
				text : "查询",
				iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							departCode : filed1.getValue(),
							departName : filed2.getValue()
						}
					});
				}
			} ]
		} ];
	},
	// 新增弹出窗口
	getWindowColumns : function() {
		return [ {
			name : 'departCode',
			fieldLabel : '部门代号',
			allowBlank : false
		}, {
			name : 'departName',
			fieldLabel : '部门名称'
		}, {
			name : 'managerAgent',
			fieldLabel : '负责人',
			allowBlank : false
		}, {
			name : 'telphone',
			fieldLabel : '联系电话'
		}, {
			name : 'isvalid',
			xtype : 'ExtPluginFormCombobox',
			tCode : 'c_status',
			fieldLabel : '是否有效'
		}, {
			name : 'parentDepartName',
			xtype : 'ExtPluginFormPicker',
			fieldLabel : '上层部门',
			storeUrl : StaticSetting.absUrl + '/lov/querylist',
			treeHeight : 300,
			expanded : true,
			keyId : 'parentDepart',
			lCode : 'depart'
		}, {
			name : 'parentDepart',
			hidden : true
		},{
			xtype : 'ExtPluginSelectionForm',
			grid : "FMSappselectmoduleCompanyModule",
			hiddenFields : ['companyId'],
			textField : "companyCnname",
			textFeildName : "所属公司",
			textFieldConfig : {
				allowBlank: false
			},
			windowTitle : '选择公司',
			margins: '0 0 5 0',
			windowWidth : 800
    	} /*{
			name : 'companyName',
			keyName : 'companyId',
			xtype : 'combotree',
			fieldLabel : '所属公司',
			rootId : '',
			storeUrl : StaticSetting.absUrl + '/depart/getCompanyTree',
			id : 'cmbdcJS',
			selectMode : 'all',
			treeHeight : 300,
			expanded : true
		}, {
			name : 'companyId',
			hidden : true
		} */];
	}
});