/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.form.ReadOnlyForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ExtPluginReadOnlyForm',
	requires : [ 'Ext.form.field.Text' ],
	defaultType : 'textfield',
	defaults : {
		readOnly : true
	},
	layout : {
		type : 'table',
		padding : '10',
		margin : '20',
		columns : 4
	}
});