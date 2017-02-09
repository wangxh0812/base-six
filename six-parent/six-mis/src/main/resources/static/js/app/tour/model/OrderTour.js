Ext.define('FMS.app.tour.model.OrderTour',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'orderId',
    'productId',
    'tourTime',
    'productName',
    'isValid',
    'tourGroupId',
    'orderNo',
    'units',
    'payTime',
    'feeAmount'
    ]
});