/**
 *  产品model类 
 */
Ext.define('FMS.app.product.model.Product',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'productId',
    'productName',
    'productCode',
    'autoBrandId',
    'autoBrandName',
    'autoStatus',
    'periodType',
    'period',
    'feeRate',
    'addRate',
    'settlementRate',
    'serviceType',
    'periodStr'
    ]
});