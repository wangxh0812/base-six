/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.window.Window', {
	extend : 'Ext.window.Window',
	alias : 'widget.ExtPluginWindow',
	requires : [ 'Plugin.form.Form' ],
	title : 'Edit Grid',
	//id : 'ExtPluginWindowId',
	modal : true,
	autoShow : true,
	border : false,
	floating : true,
	width : 550,
	anchor : '100%',
	//layout : 'fit',
	layout : 'form',  
	handler : function(a, b, c) {

	},
	initComponent : function() {
		this.items = this.items || [ {
			itemId : 'form',
			xtype : 'ExtPluginForm',
			grid : this.grid,
			customParameter : this.customParameter,
			listeners : this.listeners,
			selection : this.selection,
			onCreated : this.onCreated
		} ];
		Ext.apply(this, this.windowParameter);
		this.callParent(arguments);
		var formDom = this.down("ExtPluginForm");
		var selection = this.selection;
		if (selection) {
			formDom.setActiveRecord(selection[0] || null);
		}
	}
});
