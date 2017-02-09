Ext.define('FMS.app.select.module.TourGuideModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleTourGuideModule',
	requires : ['FMS.app.tour.store.TourGuide'],
	initComponent : function() {
		Ext.apply(this, {
					store : Ext.create('FMS.app.tour.store.TourGuide'),
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [{
					text : '姓名',
					dataIndex : 'guideName',
					width : 100
				}, {
					text : '手机号码',
					dataIndex : 'guideMobile',
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