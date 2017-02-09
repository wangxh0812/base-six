Ext.define('FMS.app.select.module.ApplyAuditModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleApplyAuditModule',
	requires : ['FMS.app.applyAudit.store.ApplyAudit'],
	initComponent : function() {
		var _store = Ext.create('FMS.app.applyAudit.store.ApplyAudit');
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
					text : '审批类型',
					dataIndex : 'auditTypeName',
					width : 80
				}, {
					text : '审批进程',
					dataIndex : 'auditProgressName',
					width : 100
				}, {
					text : '审批人',
					dataIndex : 'auditOper',
					width : 100
				}, {
					text : '审批意见',
					dataIndex : 'auditRemark',
					width : 300
				}, {
					text : '时间',
					dataIndex : 'auditTime',
					width : 100
				}, {
					text : '审批状态',
					dataIndex : 'auditStatusName',
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