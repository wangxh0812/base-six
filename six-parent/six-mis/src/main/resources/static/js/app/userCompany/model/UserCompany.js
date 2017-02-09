/**
 *  userCompany model类 
 */
Ext.define('FMS.app.userCompany.model.UserCompany',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'userCompanyId',
    'userId',
    'companySelfId',
    'companySelfCode',
    'companySelfCnname',
    'companySelfShorten',
    'companySelfGrade',
    'status',
    'account',
    'companyId',
    'companyCode',
    'companyShorten',
    'companyCnname',
    'companyGrade',
    'companyGradeName',
    'parentId',
    'parentName',
    'autoBrandId',
    'autoBrandName',
    'createTime',
    'updateTime',
    'opUser',
    'isvalid',
    'companyIds'
    ]
});