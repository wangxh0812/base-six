Ext.define('FMS.app.product.model.ProductParameter',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'productParameterId',
    'productId',
    'parameterType',
    'parameterName',
    'parameterValue',
    'sortNo',
    'isvalid',
    'parameterTypeName'
    ]
});