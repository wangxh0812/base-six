Ext.define('FMS.basic.model.User', {
	extend: 'Ext.data.Model',
	fields: [{name:'id',mapping:'id'}, 'userId','account','password','realName','tel','email','status','updateTime','companyId','companyName','departId','departName','lastLoginTime','lastLoginIp']
});