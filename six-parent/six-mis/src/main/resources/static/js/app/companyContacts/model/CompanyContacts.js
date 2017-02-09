/**
 *  CompanyContacts model类 
 */
Ext.define('FMS.app.companyContacts.model.CompanyContacts',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'contactsId',
	'companyId',
    'contactsName',
    'contactsResign',
    'contactsPhone',
    'companyCode',
    'companyShorten',
    'companyTelephone',
    'updateTime'
    ]
});