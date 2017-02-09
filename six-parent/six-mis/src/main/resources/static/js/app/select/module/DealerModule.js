Ext.define('FMS.app.select.module.DealerModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleDealerModule',
	requires : ['FMS.app.dealer.store.Dealer'],
	initComponent : function() {
		Ext.apply(this, {
					store : Ext.create('FMS.app.dealer.store.Dealer'),
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [{
					text : '经销商名称',
					dataIndex : 'dealerName',
					width : 100
				}, {
					text : '所在省',
					dataIndex : 'provinceName',
					width : 100
				}, {
					text : '所在市',
					dataIndex : 'cityName',
					width : 100
				}, {
					text : '所在区',
					dataIndex : 'districtName',
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