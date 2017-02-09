Ext.define('FMS.app.point.model.PointGoods',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'goodsId',
    'goodsCode',
    'goodsName',
    'goodsDesc',
    'isvalid',
    'goodsQuantity',
    'goodsBrand',
    'goodsPoint',
    'beginDate',
    'endDate'
    ]
});