/**
 * kinjoYang 2014-03
 */
Ext.define('FMS.basic.kframe.model.tree.Tree', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'text',
		mapping : 'text'
	}, 'id', 'link', 'iconClass','columns', 'stores' ]
});