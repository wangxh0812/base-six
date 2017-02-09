Ext.define('FMS.basic.module.Role', {
	//extend : 'Plugin.grid.Show',
	extend: 'Plugin.grid.GridTree', 
	alias : 'widget.FMSbasicmoduleRole',
	requires : [ 'FMS.basic.store.Role', 'Plugin.form.combobox.Module','FMS.basic.store.RoleMenuTree' ],
	treeStore:'FMS.basic.store.RoleMenuTree',
	proxyParameter:{
	     key:'opId',
	     userId:'roleId'
	},
	initComponent : function() {
		Ext.apply(this, {
			store : Ext.create('FMS.basic.store.Role'),
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns(),
			treeParameter:this.gettreeParameter()
		});
		this.callParent(arguments);
	},
    gettreeParameter:function(){
        return {
            store : Ext.create(this.treeStore),
            width : 400
        };
    },
	getGridColumns : function() {
		return [ {
			text : '角色代号',
			dataIndex : 'code',
			width : 100
		}, {
			text : '角色名称',
			dataIndex : 'name',
			flex : 1
		}, {
			text : '角色描述',
			dataIndex : 'descn',
			flex : 1
		}, {
			text : '角色状态',
			dataIndex : 'status',
			width : 200,
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
			} ]
		} ];
	},
	// 新增弹出窗口
	getWindowColumns : function() {
		return [ {
			name : 'code',
			fieldLabel : '角色代号',
			allowBlank : false
		}, {
			name : 'name',
			fieldLabel : '角色名称',
			allowBlank : false
		}, {
			name : 'descn',
			fieldLabel : '角色描述'
		}, {
			name : 'status',
			xtype : 'ExtPluginFormCombobox',
			tCode : 'c_status',
			fieldLabel : '状态'
		} ];
	}
});
