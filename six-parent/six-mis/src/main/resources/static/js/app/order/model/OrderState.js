Ext.define('FMS.app.order.model.OrderState',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'orderStateId',
	'orderId',
    'staus',
    'planBeginDate',
    'planEndDate',
    'isvalid',
    'originalStatus',
    'stateConfigId',
    'msg',
    'realBeginDate',
    'realEndDate',
    'planBeginDateStr',
    'planEndDateStr',
    'realBeginDateStr',
    'realEndDateStr',
    'logisticsName',
    'enableField'
    ]
});