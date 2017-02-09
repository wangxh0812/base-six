Ext.define('FMS.app.select.module.OrderTourModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleOrderTourModule',
	requires : ['FMS.app.tour.store.OrderTourNotGroup'],
	initComponent : function() {
		Ext.apply(this, {
					store : Ext.create('FMS.app.product.store.OrderTourNotGroup'),
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [{
					text : '旅游时间',
					dataIndex : 'tourTime',
					width : 100
				}, {
					text : '产品名称',
					dataIndex : 'productId',
					width : 100
				}];
	},

	// 按钮栏
	getGridDockedItems : function() {
		return [];
	},
	// 新增弹出窗口
	getWindowColumns : function() {return [];}
	
});