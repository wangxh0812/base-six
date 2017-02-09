Ext.define('FMS.app.order.module.OrderAllState', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSappordermoduleOrderAllState',
			requires : ['FMS.app.order.store.OrderState','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','Plugin.form.SelectionForm','FMS.app.select.module.OrderStateConfigModule','MyApp.ux.DateTimeField'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.order.store.OrderState');
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
							text : '当前状态',
							dataIndex : 'logisticsName',
							width : 100
						},/* {
							text : '上个状态',
							dataIndex : 'originalStatus',
							width : 100
						},*//* {
							text : '计划开始时间',
							dataIndex : 'planBeginDateStr',
							width : 150
						},*/{
							text : '计划时间',
							dataIndex : 'planEndDateStr',
							width : 150
						}, /*{
							text : '实际开始时间',
							dataIndex : 'realBeginDateStr',
							width : 150
						},*/{
							text : '实际时间',
							dataIndex : 'realEndDateStr',
							width : 150
						},{
							text : '备注',
							dataIndex : 'msg',
							width : 150
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
							items : [/*{
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
									}*/]
								} ];
			},
			getWindowColumns : function() {
				return [{
							fieldLabel : '逻辑ID',
							name : 'orderStateId',
							hidden : true
						}, {
		     				xtype : 'ExtPluginSelectionForm',
		     				textFeildName : "当前状态",
		     				windowTitle : '选择状态',
		     				grid : "FMSappselectmoduleOrderStateConfigModule",
		     				itemId : 'orderStateConfigSelectForm',
		     				hiddenFields : [{
								fieldName : 'stateConfigId',
								storeName : 'stateConfigId'
							}],
							textField : {
								fieldName : 'logisticsName',
								storeName : 'staus'
							},
		     				windowWidth : 600,
		     				editable : true
		            	},			
						/*{
							fieldLabel : '当前状态',
							name : 'staus',
							emptyText : '当前状态',
							maxLength : 15,
							allowBlank : false
						},{
							fieldLabel : '上个状态',
							name : 'originalStatus',
							emptyText : '上个状态',
						},  *//*{
							fieldLabel : '实际开始时间',
							name : 'realBeginDate',
							emptyText : '实际开始时间',
							xtype : 'datetimefield',
							format : 'Y-m-d H:i:s',
			            	itemId : 'realBeginDate'
						}, */{
							fieldLabel : '实际结束时间',
							name : 'realEndDate',
							emptyText : '结束时间',
							xtype : 'datetimefield',
							format : 'Y-m-d H:i:s',
			            	itemId : 'realEndDate'
						},{
							name : 'msg',
							fieldLabel : '备注',
							emptyText : '备注'
						}
						];
			}
		});