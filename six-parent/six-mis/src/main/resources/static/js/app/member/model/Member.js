Ext.define('FMS.app.member.model.Member',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'userId',
    'userAccount',
    'userType',
    'userEmail',
    'userName',
    'isvalid',
    'userMobilephone',
    'detailedAddress',
    'userPoint',
    'totalPoint',
    'certiCode',
    'userTypeName',
    'companyName',
    'fax'
    ]
});