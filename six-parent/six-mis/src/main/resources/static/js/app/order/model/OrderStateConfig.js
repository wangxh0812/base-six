Ext.define('FMS.app.order.model.OrderStateConfig',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'stateConfigId',
    'statusName',
    'parentStateConfigId',
    'thresholdDays',
    'isvalid',
    'parentStatus',
    'statusCode',
    'userStateName',
    'dealerSalerName',
    'dealerLeaderName',
    'logisticsName'
    ]
});