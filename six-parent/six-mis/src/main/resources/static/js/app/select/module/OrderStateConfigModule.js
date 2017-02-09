Ext.define('FMS.app.select.module.OrderStateConfigModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleOrderStateConfigModule',
	requires : ['FMS.app.order.store.OrderStateConfig'],
	initComponent : function() {
		var _store = Ext.create('FMS.app.order.store.OrderStateConfig');
		Ext.apply(_store.proxy.extraParams, {
			statusCode : 'logistics'
		});
		Ext.apply(this, {
					store : _store,
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [{
					text : '状态',
					dataIndex : 'statusName',
					width : 300
				}, {
					text : '父状态',
					dataIndex : 'parentStatus',
					width : 300
				}];
	},

	// 按钮栏
	getGridDockedItems : function() {
		return [];
	},
	// 新增弹出窗口
	getWindowColumns : function() {return [];}
	
});