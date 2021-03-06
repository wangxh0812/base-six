Ext.define('FMS.app.order.model.OrderList',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'orderId',
	'orderNo',
	'vinNo',
    'associationNo',
    'deliveryDateStr',
    'logisticsName',
    'applyTimeStr',
    'dealerConfirmDateStr',
    'subscriptionDateStr',
    'shangXianDateStr',
    'xiaXianDateStr',
    'tuZhuangDateStr',
    'zongZhuangDateStr',
    'baoJiaoDateDisStr',
    'arrive4SDateStr',
    'deliveryConfirmDateStr',
    'userConfirmDateStr',
    'userId',
    'userName',
    'userAccount',
    'isvalid',
    'productId',
    'productName',
    'quantity',
    'orderStateId',
    'status',
    'feeAmount',
	'dealerConfirmDate',
	'subscriptionDate',
	'overDue',
	'overDueDays',
	'userType',
	'userSex',
	'userMobilephone',
    'userEmail',
    'certiType',
    'certiCode',
    'province',
    'city',
    'district',
    'detailedAddress',
    'postCode',
    'companyName',
    'athorityRepresentative',
    'fax',
    'telephone',
    'cityName',
    'provinceName',
    'districtName',
    'invoiceType',
    'invoiceTitle',
    'shxbjInterval',
    'bjddInterval',
    'dealerName',
    'bodyColor',
    'anJiNo'
    ]
});