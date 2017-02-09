/**
 *  产品model类 
 */
Ext.define('FMS.app.tour.model.TourGuide',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'tourGuideId',
    'guideName',
    'guideMobile',
    'workPlace',
    'wechat',
    'isValid'
    ]
});