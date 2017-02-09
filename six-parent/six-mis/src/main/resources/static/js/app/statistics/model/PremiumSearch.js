Ext.define('FMS.app.statistics.model.PremiumSearch', {
	extend : 'Ext.data.Model',
	fields : [
	'contractId',
	'companyId',
	'customerName', 
	'customerIdType',
	'customerIdNo',
	'customerPhone',
	'companyShortName',
	'autoVinNo',
	'fapiaoAmount',
	'servicePeriod',
	'feeRate',
	'serviceBeginDate',
	'sericeEndDate',
	'autoModelsName',
	'autoSeriesName',
	'firstBuyDate',
	'gouzhishuiAmount'
	]
});