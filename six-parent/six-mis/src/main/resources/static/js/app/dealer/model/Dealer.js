Ext.define('FMS.app.dealer.model.Dealer',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'dealerId',
    'dealerName',
    'province',
    'city',
    'district',
    'address',
    'hotPhone',
    'mobilePhone',
    'isvalid',
    'provinceName',
    'cityName',
    'districtName',
    'longitude',
    'latitude',
    'defaultTransportBeginTime',
	'defaultTransportEndTime',
	'defaultTransportDays',
	'effortFlag'
    ]
});