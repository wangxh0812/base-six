/**
 *  车型model类 
 */
Ext.define('FMS.app.autoModels.model.AutoModels',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'autoModelsId',
    'autoModelsName',
    'autoSeriesId',
    'autoSeriesName',
    'createTime',
    'updateTime',
    'opUser',
    'isvalid',
    'autoModelsCode'
    ]
});