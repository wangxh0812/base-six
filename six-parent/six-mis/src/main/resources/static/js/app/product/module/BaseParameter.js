Ext.define('FMS.app.product.module.BaseParameter', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappproductmoduleBaseParameter',
	requires : [ 'FMS.app.product.store.ProductParameter', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm'],
	initComponent : function() {
		var _store = Ext.create('FMS.app.product.store.ProductParameter');
		if (!Ext.isEmpty(this.idParams)) {
			var productId = this.idParams.productId;
			Ext.apply(_store.proxy.extraParams, {
				parameterType : '2',
				productId : productId
			});
		}
		Ext.apply(this, {
			store : _store,
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [ {
			text : '参数名称',
			dataIndex : 'parameterName',
			width : 100
		}, {
			text : '参数',
			dataIndex : 'parameterValue',
			width : 100
		}, {
			text : '序号',
			dataIndex : 'sortNo',
			width : 100
		} ];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var me = this;
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {
				xtype : 'ExtPluginGridAdd',
				customParameter : {
					items : me.getWindowColumns()
				}
			}, {
				xtype : 'ExtPluginGridEdit',
				customParameter : {
					items : me.getWindowColumns()
				}
			}, {
				xtype : 'ExtPluginGridDel'
			} ]
		} ];
	},
	getWindowColumns : function() {
		return [ {
			fieldLabel : '逻辑ID',
			name : 'productParameterId',
			hidden : true
		}, {
			fieldLabel : '逻辑ID',
			name : 'parameterType',
			value : '2',
			hidden : true
		}, {
			fieldLabel : '参数名称',
			name : 'parameterName',
			emptyText : '参数名称',
			maxLength : 15,
			allowBlank : false
		}, {
			fieldLabel : '参数',
			name : 'parameterValue',
			emptyText : '参数',
			maxLength : 40
		}, {
			name : 'sortNo',
			fieldLabel : '序号',
			emptyText : '序号',
			maxLength : 5,
			xtype : 'numberfield',
			minValue : 0
		} ];
	}
});