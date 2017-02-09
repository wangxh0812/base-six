Ext.define('FMS.app.select.module.AutoSeriesModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleAutoSeriesModule',
	requires : [ 'FMS.app.autoSeries.store.AutoSeries','Plugin.form.combobox.Module'],
	initComponent : function() {
		var _store = Ext.create('FMS.app.autoSeries.store.AutoSeries');
		if(!Ext.isEmpty(this.idParams)){
			Ext.apply(_store.proxy.extraParams, this.idParams);
		}
		Ext.apply(this, {
			store : _store,
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.callParent(arguments);
	},
	getGridColumns : function() {
		return [{
			text : '车系名称',
			dataIndex : 'autoSeriesName',
			width : 60
		}];
	},
	// 按钮栏
	getGridDockedItems : function() {
		var _this = this;
		var filed1 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : ["车系名称：", filed1, {
		        text: "查询",
		        iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							autoSeriesName : filed1.getValue()
						}
					});
				}
			} ]
		} ];
	},
	// 新增弹出窗口
	getWindowColumns : function() {return []}
});
