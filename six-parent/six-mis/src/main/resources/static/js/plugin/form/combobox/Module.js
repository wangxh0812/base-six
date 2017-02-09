/**
 * kinjoYang 2014-03
 */
//下拉框初始化控制
Ext.define('Plugin.form.combobox.Module', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.ExtPluginFormCombobox',
	requires : [ 'Plugin.form.combobox.Store' ],
	fieldLabel : 'xxxx',
	valueField : 'value',
	displayField : 'name',
	queryMode : 'local',
	typeAhead : true,
	emptyText : '--请选择--',
	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			store : Ext.create('Plugin.form.combobox.Store')
		});
		var store = this.store;
		store.getProxy().setExtraParam('tCode', this.tCode);
		if(this.defaultSelectFirst)
			store.on('load', function(){
			    me.select(store.getAt(0));
			});
		store.load();
		this.callParent(arguments);
	}
});