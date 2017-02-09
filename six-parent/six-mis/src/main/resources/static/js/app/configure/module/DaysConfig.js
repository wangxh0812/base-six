Ext.define('FMS.app.configure.module.DaysConfig', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSappconfiguremoduleDaysConfig',
			requires : ['FMS.app.configure.store.DaysConfig','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','Plugin.form.SelectionForm'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.configure.store.DaysConfig');
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
							text : '工作日',
							dataIndex : 'workDay',
							width : 100
						}];
			},

			// 按钮栏
			getGridDockedItems : function() {
				var me = this;
				var field1 = new Ext.form.Field();
				var field2 = new Ext.form.Field();
				var field3 = new Ext.form.Field();
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
									}]
								} ];
			},
			getWindowColumns : function() {
				return [{
							fieldLabel : '逻辑ID',
							name : 'daysConfigId',
							hidden : true
						}, 			
						{
							fieldLabel : '工作日',
							name : 'workDay',
							emptyText : '工作日',
							allowBlank : false,
							xtype : 'datefield',
			            	format : 'Y-m-d',
			            	itemId : 'workDay'
						}];
			}
		});