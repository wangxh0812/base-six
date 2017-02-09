Ext.define('FMS.app.select.module.AutoBrandModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleAutoBrandModule',
	requires : ['FMS.app.autoBrand.store.AutoBrand'],
	initComponent : function() {
		var _store = Ext.create('FMS.app.autoBrand.store.AutoBrand');
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
					text : '品牌名称',
					dataIndex : 'autoBrandName',
					width : 220
				}];
	},

	// 按钮栏
	getGridDockedItems : function() {
		return [];
	},
	// 新增弹出窗口
	getWindowColumns : function() {return [];}
	
});