Ext.define('FMS.app.dealer.model.DealerUser',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'dealerId',
    'dealerUserId',
    'mobilePhone',
    'grade',
    'name',
    'certifyType',
    'certifyCode',
    'sex',
    'isvalid',
    'dealerName'
    ]
});