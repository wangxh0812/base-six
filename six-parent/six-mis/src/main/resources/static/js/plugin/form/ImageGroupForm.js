Ext.define('Plugin.form.ImageGroupForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ExtPluginImageGroupForm',
	layout : 'column',
	height : 330,
	initComponent : function(a, b, c, d) {
		var items = [];
		Ext.each(this.customParameter.items, function(item) {
			var itemConfig = {
				columnWidth : .25,
				border : 0,
				defaultType : 'image',
				layout : 'form',
				items : [ item ]
			};
			if (item.columnWidth)
				Ext.apply(itemConfig, {
					columnWidth : item.columnWidth
				});
			items.push(itemConfig);
		});
		Ext.apply(this, {
			items : items
		});
		this.callParent();
	}
});