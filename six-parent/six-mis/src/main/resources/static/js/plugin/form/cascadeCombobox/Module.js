Ext.define("Plugin.form.cascadeCombobox.Module", {
	extend : "Ext.form.field.ComboBox",
	alias : 'widget.ExtPluginFormCascadeCombobox',
	requires : [ 'Plugin.form.cascadeCombobox.Store' ],
	//valueField : 'areaName',
	valueField : 'areaCode',
	displayField : 'areaName',
	queryMode : 'local',
	editable : false,
	firstCombo : false,
	nextCombo : null,
	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			store : Ext.create('Plugin.form.cascadeCombobox.Store')
		});
		var store = this.store;
		store.getProxy().setExtraParam('code', this.code);
		if (this.firstCombo)
			me.store.load();
		me.on({
			select : this.onComboSelect,
			scope : this
		});
		this.callParent(arguments);
	},
	onComboSelect : function(combo, records, eOpts) {
		if (this.nextCombo != null) {
			var tCompont = Ext.getCmp(this.nextCombo);
			cleanText(tCompont);
			if(tCompont.nextCombo != null){
				cleanText(Ext.getCmp(tCompont.nextCombo));
			}
			tCompont.store.load({
				params : {
					code : records[0].get("areaCode")
				}
			});
		}
		function cleanText(obj){
			obj.store.removeAll();
			obj.setValue('');
		}
		
	}
});