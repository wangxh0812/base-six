/**
 *  品牌model类 
 */
Ext.define('FMS.app.autoBrand.model.AutoBrand',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'autoBrandId',
    'autoBrandName',
    'createTime',
    'updateTime',
    'opUser',
    'isvalid'
    ]
});