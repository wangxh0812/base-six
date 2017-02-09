Ext.define('FMS.app.contract.model.Contract', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 
	'contractId', 
	'isvalid', 
	'createTime', 
	'updateTime',
	'opUser', 
	'contractNo', 
	'companyId', 
	'companyName',
	'companyCode', 
	'companyShortName', 
	'companyContactsId',
	'contactsName', 
	'customerName', 
	'customerIdType', 
	'customerIdNo',
	'customerPhone', 
	'firstBuyDate', 
	'autoStatus',
	'autoNo',
	'autoEngineNo',
	'autoVinNo',
	'autoBrandId',
	'autoBrandName',
	'autoSeriesId',
	'autoSeriesName', 
	'autoModelsId',
	'autoModelsName',
	'fapiaoAmount',
	'gouzhishuiAmount',
	'insuranceCode',
	'serviceType',
	'servicePrice',
	'servicePeriodType',
	'servicePeriod',
	'serviceBeginDate',
	'sericeEndDate',
	'salesName',
	'additionalService',
	'remark',
	'status',
	'saveDatetime',
	'printDatetime',
	'settlementAmount',
	'feeRate',
	'jiashuiAmount',
	'presave',
	'companyTelephone',
	'userId',
	'insuranceName',
	'insuranceType',
	'policyNo',
	'servicePeriodName',
	'autoStatusName',
	'serviceTypeName',
	'statusName',
	'customerAddress',
	'companyAddress',
	'riskCode'
	]
});