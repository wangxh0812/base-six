Ext.define('FMS.app.configure.model.DaysConfig',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'daysConfigId',
    'workDay',
    'dayType'
    ]
});