Ext.define('Plugin.lov.lovStore', {
	extend : 'Ext.data.Store',
	model : 'Plugin.lov.lovModel',
	autoLoad : true,
	pageSize : 20,
	proxy : {
		type : 'ajax',
		url : StaticSetting.absUrl + '/lov/querylist',
		reader : {
			type : 'json',
			root : 'data',
			totalProperty : 'count',
			successProperty : 'success'
		}
	}
});