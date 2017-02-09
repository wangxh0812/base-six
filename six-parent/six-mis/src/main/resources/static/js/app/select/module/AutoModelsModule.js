Ext.define('FMS.app.select.module.AutoModelsModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleAutoModelsModule',
	requires : [ 'FMS.app.autoModels.store.AutoModels','Plugin.form.combobox.Module'],
	initComponent : function() {
		var _store = Ext.create('FMS.app.autoModels.store.AutoModels');
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
			text : '车型名称',
			dataIndex : 'autoModelsName',
			width : 300
		}];
	},
	// 按钮栏
	getGridDockedItems : function() {
		/*var _this = this;
		var filed1 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : ["车型名称：", filed1, {
		        text: "查询",
		        iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							autoModelsName : filed1.getValue()
						}
					});
				}
			} ]
		} ];*/
	},
	// 新增弹出窗口
	getWindowColumns : function() {return []}
});
