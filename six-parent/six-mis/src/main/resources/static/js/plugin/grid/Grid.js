/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.grid.Grid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.ExtPluginGrid',
	requires : [ 'Plugin.grid.toolbar.Add', 'Plugin.grid.toolbar.Edit',
			'Plugin.grid.toolbar.Del', 'Plugin.grid.toolbar.Save' ],
	initComponent : function(a, b, c, d) {
		var _this = this;
		var store = this.store;
		// add store
		var dockedItems = this.dockedItems;
		if (dockedItems) {
			for (var m = 0, n = dockedItems.length; m < n; m++) {
				var items = dockedItems[m].items;
				for (var i = 0, j = items.length; i < j; i++) {
					items[i].store = store;
					items[i].grid = _this;
				}
			}
		}
		var selModel = Ext.create('Ext.selection.CheckboxModel');
		var detailsSetting = {
			store : store,
			columnLines : true,
			frame : true,
			loadMask : true,
			disableSelection : false,
			selModel : selModel,
			bbar : Ext.create('Ext.PagingToolbar', {
				store : store,
				displayInfo : true
			}),
			columns : this.columns
		};
		Ext.apply(this, detailsSetting);
		this.callParent(arguments);
	}
});