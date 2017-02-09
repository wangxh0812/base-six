Ext.define('FMS.app.tour.model.TourGroup',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'tourGroupId',
    'tourGuideId',
    'guideMobile',
    'guideWechat',
    'guideName',
    'tourTime',
    'productId',
    'productCode',
    'productName',
    'isValid'
    ]
});