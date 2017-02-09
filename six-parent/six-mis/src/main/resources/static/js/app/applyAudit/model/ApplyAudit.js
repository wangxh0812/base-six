Ext.define('FMS.app.applyAudit.model.ApplyAudit', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 
	'applyAuditId', 
	'auditType', 
	'auditProgress', 
	'auditOper',
	'auditTime', 
	'auditStatus', 
	'auditRemark', 
	'contractId',
	'claimId', 
	'createTime', 
	'updateTime',
	'auditTypeName',
	'auditProgressName',
	'auditStatusName'
	]
});