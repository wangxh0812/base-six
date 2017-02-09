Ext.define('FMS.app.product.module.Product', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappproductmoduleProduct',
	requires : [ 'FMS.app.product.store.Product', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm',
			'Plugin.window.UploadWindow', 'FMS.app.image.store.Image',
			'Plugin.grid.UploadGridProduct','FMS.app.select.module.AutoBrandModule'],
	initComponent : function() {
		var _store = Ext.create('FMS.app.product.store.Product');
		if (!Ext.isEmpty(this.idParams)) {
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
		return [ {
			text : '产品编码',
			dataIndex : 'productCode',
			width : 100
		},{
			text : '产品名称',
			dataIndex : 'productName',
			width : 150
		},{
			text : '服务类型',
			dataIndex : 'serviceType',
			renderer : function(val) {
				if (val == '1') {
					return "赔付包含购置税";
				} else {
					return "赔付不包含购置税";
				} 
				return val;
			},
			width : 150
		}, {
			text : '品牌',
			dataIndex : 'autoBrandName',
			width : 100
		}, {
			text : '车辆状态',
			dataIndex : 'autoStatus',
			renderer : function(val) {
				if (val == '1') {
					return "新车";
				} else if(val == '2') {
					return "1年以内次新车";
				} else if(val == '3'){
					return "1年至2年在用车";
				} else{
					return "2年至3年在用车";
				}
				return val;
			},
			width : 150
		}, {
			text : '服务期限',
			dataIndex : 'periodStr',
			width : 100
		}, {
			text : '保险费率',
			dataIndex : 'feeRate',
			width : 80
		} ];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var me = this;
		var field1 = Ext.create("Ext.form.field.Text",{
			itemId : 'field1',
			listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                    	this.ownerCt.getComponent("search").handler();
                    }
                }
            }
		});
		
		return [{
					xtype : 'toolbar',
					dock : 'top',
					items : [{
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
							},  "->","产品编码:",field1,{
								text : "搜索",
								itemId : 'search',
								iconCls : 'icon-search',
								handler : function() {
									me.store.load({
										params : {
											productCode : field1.getValue()
										}
									});
								}
							}]
				}];
	},
	
	getWindowColumns : function() {
		return [ {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '逻辑ID',
				name : 'productId',
				hidden : true
			}, {
				fieldLabel : '产品编码',
				name : 'productCode',
				emptyText : '产品编码',
				maxLength : 12,
				allowBlank : false
			}, {
				fieldLabel : '产品名称',
				name : 'productName',
				emptyText : '产品名称',
				allowBlank : false,
				//xtype : 'numberfield',
				maxLength : 22
				//minValue: 1
			} ]
		},{
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '车辆状态',
				name : 'autoStatus',
				xtype : 'ExtPluginFormCombobox',
				tCode : 'c_auto_status',
				allowBlank : true,
				forceSelection : true,
				typeAhead : false,
				editable : false
			}, {
				xtype : 'ExtPluginSelectionForm',
				grid : "FMSappselectmoduleAutoBrandModule",
				hiddenFields : ['autoBrandId'],
				textField : "autoBrandName",
				itemId : 'autoBrandSelectForm',
				textFeildName : "品牌",
				windowTitle : '选择品牌',
				windowWidth : 600
			} ]
		},  {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '服务类型',
				name : 'serviceType',
				xtype : 'ExtPluginFormCombobox',
				tCode : 'c_service_type_all',
				allowBlank : true,
				forceSelection : true,
				typeAhead : false,
				editable : false
			}, {
				fieldLabel : '服务周期',
				name : 'period',
				emptyText : '服务周期',
				allowBlank : true,
				xtype : 'numberfield',
				maxLength : 22,
				minValue: 1
			}, ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '保险费率',
				name : 'feeRate',
				emptyText : '保险费率',
				maxLength : 50
			}, {
				fieldLabel : '服务周期单位',
				name : 'periodType',
				xtype : 'ExtPluginFormCombobox',
				tCode : 'c_cycle_unit',
				allowBlank : true,
				forceSelection : true,
				typeAhead : false,
				editable : false
			}]
		} ];
	}
	
});