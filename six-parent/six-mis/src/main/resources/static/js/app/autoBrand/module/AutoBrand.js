Ext.define('FMS.app.autoBrand.module.AutoBrand', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappautoBrandmoduleAutoBrand',
	requires : [ 'FMS.app.autoBrand.store.AutoBrand', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm',
			'Plugin.window.UploadWindow'
			],
	initComponent : function() {
		var _store = Ext.create('FMS.app.autoBrand.store.AutoBrand');
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
			text : '品牌名称',
			dataIndex : 'autoBrandName',
			width : 100
		},{
			text : '创建时间',
			dataIndex : 'createTime',
			width : 150
		},{
			text : '更新时间',
			dataIndex : 'updateTime',
			width : 150
		},{
			text : '操作人',
			dataIndex : 'opUser',
			width : 150
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
							},  "->","品牌名称:",field1,{
								text : "搜索",
								itemId : 'search',
								iconCls : 'icon-search',
								handler : function() {
									me.store.load({
										params : {
											autoBrandName : field1.getValue()
										}
									});
								}
							}]
				}];
	},
	
	getWindowColumns : function() {
		return [ {
			fieldLabel : '逻辑ID',
			name : 'autoBrandId',
			hidden : true
		},{
			fieldLabel : '品牌名称',
			name : 'autoBrandName',
			emptyText : '品牌名称',
		    maxLength : 50,
			allowBlank : false
		} ];
	}

});