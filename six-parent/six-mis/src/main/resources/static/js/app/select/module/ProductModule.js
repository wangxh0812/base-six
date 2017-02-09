Ext.define('FMS.app.select.module.ProductModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleProductModule',
	requires : ['FMS.app.product.store.Product'],
	initComponent : function() {
		Ext.apply(this, {
					store : Ext.create('FMS.app.product.store.Product'),
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [{
					text : '产品编号',
					dataIndex : 'productCode',
					width : 100
				}, {
					text : '产品名称',
					dataIndex : 'productName',
					width : 100
				},{
					text : '供应商名称',
					dataIndex : 'distributingCompanyName',
					width : 300
				}, {
					text : '产品类型',
					dataIndex : 'productTypeName',
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