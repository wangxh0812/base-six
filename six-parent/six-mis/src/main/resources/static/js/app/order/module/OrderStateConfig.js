Ext.define('FMS.app.order.module.OrderStateConfig', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSappordermoduleOrderStateConfig',
			requires : ['FMS.app.order.store.OrderStateConfig','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','Plugin.form.SelectionForm','FMS.app.select.module.OrderStateConfigModule'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.order.store.OrderStateConfig');
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
							text : '状态名称',
							dataIndex : 'statusName',
							width : 300
						}, {
							text : '父状态',
							dataIndex : 'parentStatus',
							width : 300
						}, {
							text : '天数',
							dataIndex : 'thresholdDays',
							width : 100
						}, {
							text : '状态编码',
							dataIndex : 'statusCode',
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
							name : 'stateConfigId',
							hidden : true
						}, 			
						{
							fieldLabel : '状态',
							name : 'statusName',
							emptyText : '状态名称',
							maxLength : 12,
							allowBlank : false
						}, {
		     				xtype : 'ExtPluginSelectionForm',
		     				textFeildName : "父状态",
		     				windowTitle : '选择父状态',
		     				grid : "FMSappselectmoduleOrderStateConfigModule",
		     				itemId : 'orderStateConfigSelectForm',
		     				hiddenFields : [{
								fieldName : 'parentStateConfigId',
								storeName : 'stateConfigId'
							}],
							textField : {
								fieldName : 'parentStatus',
								storeName : 'statusName'
							},
		     				windowWidth : 600,
		     				editable : true
		            	}, {
							fieldLabel : '天数',
							name : 'thresholdDays',
							emptyText : '天数',
							maxLength : 50
						}, {
							fieldLabel : '状态编码',
							name : 'statusCode',
							emptyText : '状态编码',
							maxLength : 8
						},{
							fieldLabel : '用户显示名称',
							name : 'userStateName',
							emptyText : '用户显示名称',
							maxLength : 50
						}, {
							fieldLabel : '经销商销售显示名称',
							name : 'dealerSalerName',
							emptyText : '经销商销售显示名称',
							maxLength : 50
						}, {
							fieldLabel : '经销商领导显示名称',
							name : 'dealerLeaderName',
							emptyText : '经销商领导显示名称',
							maxLength : 50
						}, {
							fieldLabel : '物流显示名称',
							name : 'logisticsName',
							emptyText : '物流显示名称',
							maxLength : 50
						}];
			}
		});