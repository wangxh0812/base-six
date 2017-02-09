/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.form.EditForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ExtPluginEditForm',
	requires : [ 'Ext.form.field.Text' ],
	defaultType : 'textfield',
	defaults : {
		readOnly : false
	},
	layout : {
		type : 'table',
		padding : '10',
		margin : '20',
		columns : 4
	}
});