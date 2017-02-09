Ext.define('FMS.app.select.module.CompanyStatisticsModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleCompanyStatisticsModule',
	requires : ['FMS.app.userCompany.store.UserCompany4Statistics'],
	initComponent : function() {
		var _store = Ext.create('FMS.app.userCompany.store.UserCompany4Statistics');
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
					text : '经销商简称',
					dataIndex : 'companyShorten',
					width : 250
				}, {
					text : '经销商编码',
					dataIndex : 'companyCode',
					width : 100
				}, {
					text : '机构等级',
					dataIndex : 'companyGradeName',
					width : 80
				}, {
					text : '经销商经营品牌',
					dataIndex : 'autoBrandName',
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