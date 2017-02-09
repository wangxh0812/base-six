Ext.define('FMS.basic.model.myFile', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 
	'fileId', 
	'fileType', 
	'businessId', 
	'businessType',
	'fileName', 
	'suffix', 
	'fileBusinessType', 
	'filePath',
	'fileBusinessTypeName', 
	'urlFullPath', 
	'createTime', 
	'updateTime',
	'opUser',
	'companyId',
	'companyCode',
	'companyShorten',
	'companyCnname'
	]
});