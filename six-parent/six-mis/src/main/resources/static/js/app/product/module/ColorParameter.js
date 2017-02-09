Ext.define('FMS.app.product.module.ColorParameter', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappproductmoduleColorParameter',
	requires : [ 'FMS.app.product.store.ProductParameter', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm'],
	initComponent : function() {
		var _store = Ext.create('FMS.app.product.store.ProductParameter');
		if (!Ext.isEmpty(this.idParams)) {
			var productId = this.idParams.productId;
			Ext.apply(_store.proxy.extraParams, {
				parameterType : '1',
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
			text : '车身颜色',
			dataIndex : 'parameterName',
			width : 100
		}, {
			text : '颜色编码',
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
			value : '1',
			hidden : true
		}, {
			fieldLabel : '车身颜色',
			name : 'parameterName',
			emptyText : '车身颜色',
			maxLength : 10,
			allowBlank : false
		}, {
			fieldLabel : '颜色编码',
			name : 'parameterValue',
			emptyText : '颜色编码',
			maxLength : 10
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