/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.grid.toolbar.Save', {
	extend : 'Ext.button.Button',
	alias : 'widget.ExtPluginGridSave',
	iconCls : 'icon-save',
	defaultType : 'button',
	scale : 'small',
	disabled : true,
	handler : function(a, b, c) {
		var selection = this.up("ExtPluginGrid").getSelectionModel()
				.getSelection();
		var panelStore = this.up("panel").getStore();
		if (selection) {
			panelStore.update(selection);
		}
	},
	initComponent : function(a, b, c, d) {
		this.text = '保存';
		this.callParent(arguments);
	}
});