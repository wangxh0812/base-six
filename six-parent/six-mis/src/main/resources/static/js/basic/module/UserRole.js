Ext.define('FMS.basic.module.UserRole', {
	//extend : 'Plugin.grid.Show',
	extend: 'Plugin.grid.GridTree', 
	alias : 'widget.FMSbasicmoduleUserRole',
	requires : [ 'FMS.basic.store.User', 'Plugin.form.combobox.Module','FMS.basic.store.UserRoleTree' ],
	treeStore:'FMS.basic.store.UserRoleTree',
	proxyParameter:{
	     key:'opId',
	     userId:'userId'
	},
	initComponent : function() {
		Ext.apply(this, {
			store : Ext.create('FMS.basic.store.User'),
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
			text : '登录账号',
			dataIndex : 'account',
			width : 150
		}, {
			text : '姓名',
			dataIndex : 'realName',
			width : 200
		}, {
			text : '电话',
			dataIndex : 'tel',
			width : 200
		}, {
			text : '邮箱',
			dataIndex : 'email',
			width : 250
		}, {
			text : '状态',
			dataIndex : 'status',
			width : 100,
			renderer : function(val) {
				if (val == "1") {
					return '有效';
				}
				return '无效';
			}
		}/*, {
			text : '所属公司',
			dataIndex : 'companyName',
			flex : 1
		}*/ ];
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
				disabled : true,
				hidden : true,
				customParameter : {
					items : _this.getWindowColumns()
				}
			},{
				xtype : 'ExtPluginGridEdit',
				disabled : true,
				hidden : true,
				customParameter : {
					items : _this.getWindowColumns()
				}
			}, {
				xtype : 'ExtPluginGridDel',
				hidden : true,
				disabled : true
			}, "->", "登录账号：", filed1, "姓名：", filed2,
			{
				text : "查询",
				iconCls : 'icon-search',
//				handler : function() {
//					_this.store.load({
//						params : {
//							policyNo : this.ownerCt.getComponent("policyNo").getValue(),
//							contractNo: filed1.getValue(),
//							customerName: filed2.getValue()
//						}
//					});
//				}
	            handler : function() {
					Ext.apply(_this.store.proxy.extraParams,{
						account: filed1.getValue(),
						realName: filed2.getValue()
					});
					_this.store.load();
				}
			}]
		} ];
	},
	// 新增弹出窗口
	getWindowColumns : function() {}
});
