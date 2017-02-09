/**
 * kinjoYang 2014-03
 */
Ext.define('FMS.basic.kframe.store.tree.Trees', {
	extend : 'Ext.data.TreeStore',
	model : 'FMS.basic.kframe.model.tree.Tree',
	autoLoad : false,
	autoSync : false,
	rootVisible : false,
	proxy : {
		type : 'ajax',
		url : StaticSetting.absUrl + '/menu/getMenus',
		reader : {
			type : 'json',
			root : 'data',
			successProperty : 'success'
		}
	},
	nodeParam : 'id',
	root : {
		id : '',
		expanded : false
	}
});