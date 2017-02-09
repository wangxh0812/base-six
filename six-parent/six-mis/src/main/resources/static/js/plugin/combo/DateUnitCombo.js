Ext.define("Plugin.combo.DateUnitCombo", {
	extend : "Ext.form.field.ComboBox",
	alias : 'widget.PluginComboDateUnitCombo',
	valueField : 'code',
	displayField : 'value',
	queryMode : 'local',
	editable : false,
	width : 50,
	// typeAhead : true,
	// value : '天',
	// rawValue : 0,
	loadLocalData : function() {
		var currentData = [ {
			"code" : "0",
			"value" : "天"
		}, {
			"code" : "1",
			"value" : "星期"
		}];
		this.store.loadData(currentData);
	},
	initComponent : function() {
		var me = this;
		var baseStore = Ext.create("Ext.data.JsonStore", {
			fields : [ "code", "value" ],
			proxy : {
				type : "memory"
			}
		});
		me.store = baseStore;
		me.loadLocalData();
		this.callParent(arguments);
		// this.setRawValue("天");
		this.setValue('0');
	}

});