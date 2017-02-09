/**
 * '查看'功能FormPanel组件 列布局，两列 参数：customParameter 徐榕生
 */
Ext.define('Plugin.form.ViewForm', {
	extend : 'Ext.form.FieldSet',
	alias : 'widget.ExtPluginViewForm',
	requires : [ 'Ext.form.field.Text' ],
	layout : 'form',
	defaults : {
		anchor : '100%'
	},
	initComponent : function(a, b, c, d) {
		var items = [];
		Ext.each(this.customParameter.items, function(item) {
			var itemConfig = {
				columnWidth : .49,
				border : 0,
				defaultType : 'textfield',
				labelWidth : 70,
				layout : 'form',
				items : [ item ]
			};
			if (item.columnWidth)
				Ext.apply(itemConfig, {
					columnWidth : item.columnWidth
				});
			items.push(itemConfig);
		});
		if (this.mulityFormButtons) {
			this.mulityFormButtons.push({
				text : '重置',
				handler : function() {
					_form.getForm().reset();
				}

			});
		}
		var _form = Ext.create("Ext.form.Panel", {
			layout : 'column',
			border : false,
			items : items,
			buttons : this.showMulityFormButton ? this.mulityFormButtons : []
		});
		Ext.apply(this, {
			items : [ _form ]
		});
		this.callParent();
	},
	getMainForm : function() {
		return this.items.get(0);
	}
});