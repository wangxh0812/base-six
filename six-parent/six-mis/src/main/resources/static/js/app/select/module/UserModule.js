Ext.define('FMS.app.select.module.UserModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleUserModule',
	requires : ['FMS.basic.store.User'],
	initComponent : function() {
		var _store = Ext.create('FMS.basic.store.User');
		Ext.apply(_store.proxy.extraParams, this.idParams);
		Ext.apply(this, {
					store : _store,
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [{
					text : '登录账号',
					dataIndex : 'account',
					width : 200
				}, {
					text : '姓名',
					dataIndex : 'realName',
					width : 200
				}, {
					text : '所属公司',
					dataIndex : 'companyName',
					flex : 1
				}];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var _this = this;
		var filed1 = new Ext.form.Field();
		return [{
			xtype : 'toolbar',
			dock : 'top',
			items : ["登录账号：", filed1, {
		        text: "查询",
		        iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							account : filed1.getValue()
						}
					});
				}
			} ]
		}];
	},
	// 新增弹出窗口
	getWindowColumns : function() {return [];}
	
});