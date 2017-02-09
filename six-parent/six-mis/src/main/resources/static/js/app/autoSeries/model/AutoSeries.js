/**
 *  车系model类 
 */
Ext.define('FMS.app.autoSeries.model.AutoSeries',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'autoSeriesId',
    'autoSeriesName',
    'autoBrandId',
    'autoBrandName',
    'createTime',
    'updateTime',
    'opUser',
    'isvalid'
    ]
});