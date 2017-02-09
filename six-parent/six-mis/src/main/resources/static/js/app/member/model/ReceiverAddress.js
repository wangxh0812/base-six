Ext.define('FMS.app.member.model.ReceiverAddress',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'userId',
    'userAddressId',
    'province',
    'city',
    'district',
    'isvalid',
    'receiverName',
    'address',
    'phone',
    'zipCode',
    'isDefault',
    'provinceName',
    'cityName',
    'districtName'
    ]
});