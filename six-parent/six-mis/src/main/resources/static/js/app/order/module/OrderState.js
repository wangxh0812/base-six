Ext.define('FMS.app.order.module.OrderState', {
			//extend : 'Plugin.grid.EditShow',
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSappordermoduleOrderState',
			requires : ['FMS.app.order.store.OrderState','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','FMS.app.select.module.OrderStateConfigModule','MyApp.ux.DateTimeField'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.order.store.OrderState');
				var nowStatus = "";
				if(!Ext.isEmpty(this.idParams)){
					var orderId = this.idParams.orderId;
					nowStatus = this.idParams.logisticsName;
					Ext.apply(_store.proxy.extraParams, {
						orderId : orderId,
						staus : 'logistics'
					});
				}
				Ext.apply(this, {
							store : _store,
							gridDockedItems : this.getGridDockedItems(nowStatus),
							gridColumns : this.getGridColumns(nowStatus),
							enableCondition :nowStatus
						});
				this.callParent(arguments);
			},

			getGridColumns : function(nowStatus) {
				var me = this;
				return [{
							text : '当前状态',
							dataIndex : 'logisticsName',
							width : 100,
							renderer : function(val){
								if(val==nowStatus){
									return "<span style='font-weight:bold;'>"+val+"</span>";
								}
								return val;
							},
						},/* {
							text : '上个状态',
							dataIndex : 'originalStatus',
							width : 100
						},*/ /*{
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
			getGridDockedItems : function(nowStatus) {
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
									},*/ /*{
										xtype : 'ExtPluginGridEdit',
										customParameter : {
											items : me.getWindowColumns()
										}
									},*/{
										xtype : 'button',
										text : '  更新',
										iconCls : 'icon-edit',
										handler : function() {
											me.openEdit(nowStatus);
										}
									}/*, {
										xtype : 'ExtPluginGridDel'
									}*/]
								} ];
			},openEdit : function(nowStaus) {
				var me = this;
				var selection = this.down("grid").getSelectionModel()
						.getSelection();
				if (selection.length > 1 || selection.length <= 0) {
					Ext.MessageBox.show({
						title : 'Error',
						msg : '只允许编辑一条数据',
						icon : Ext.MessageBox.INFO
					});
					return false;
				}
				var logisticsName = selection[0].data.logisticsName;
				/*if(nowStaus!=logisticsName){
					Ext.MessageBox.show({
						title : '警告',
						msg : '只允许修改当前状态的数据',
						icon : Ext.MessageBox.INFO
					});
					return false;
				}*/
				me.formWindowUp(selection[0].data.orderStateId);
				
			},
			formWindowUp : function(orderStateId) {
				var me = this;
				var idParams = {
					orderStateId : orderStateId
				};
				var win = this.createCientWindow({
					title : '修改状态信息',
					idName : 'orderStateId',
					idParams : idParams,
					//hiddenButtons : effected,
					getLoadDetailInfoArray : me.getLoadDetailInfoArray,
					listeners : {
						"closeWindow" : function(_win) {
							Ext.MessageBox.show({
								title : "提示",
								msg : "操作成功",
								icon : Ext.MessageBox.INFO,
								buttons : Ext.MessageBox.OK,
								fn : function(buttonId) {
									if (buttonId === "ok") {
										me.store.reload();
										_win.close();
									}
								}
							});
						}
					}
				});
				/*win = this.createWindowTabs(win, {
					idParams : idParams
				});*/
				win.loadAndRenderDetailInfo(idParams, win);
				win.show();
			},
			// 创建客户详情弹出窗口
			createCientWindow : function(obj) {
				var me = this;
				var _win = Ext.create(
						"FMS.app.mis.module.window.CommonWindowNotLoadTab", obj);
				_win.addBaseClientForm({
					fieldSetTitle : '状态基本信息',
					formItemId : 'orderStateForm',
					formUrl : StaticSetting.absUrl + '/mis/orderState/save',
					formItems : this.getWindowColumns(),
					submitParams : obj.idParams,
					hiddenFormButten : true
				});
				return _win;
			},
			getLoadDetailInfoArray : function() {
				return {
					baseForm : {
						name : '订单基本信息',
						url : StaticSetting.absUrl
								+ '/mis/orderState/getOrderState',
						formItemId : 'orderStateForm'
					},
					tabForm : []
				};
			},
			getWindowColumns : function() {
				return [{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [ {
						fieldLabel : '逻辑ID',
						name : 'orderStateId',
						hidden : true
					}, {
						fieldLabel : '当前状态',
						name : 'logisticsName',
						emptyText : '当前状态',
						readOnly : true,
					    style:'background:#E6E6E6'
					}, {
						fieldLabel : '实际时间',
						name : 'realEndDate',
						emptyText : '实际时间',
						xtype : 'datetimefield',
						format : 'Y-m-d H:i:s',
		            	itemId : 'realEndDate'
					} ]
				},{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [ {
						name : 'msg',
						fieldLabel : '备注',
						emptyText : '备注'
					}]
				}, /*{
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
							fieldLabel : '当前状态',
							name : 'logisticsName',
							emptyText : '当前状态',
							readOnly : true,
						    style:'background:#E6E6E6'
		            	},			
						{
							fieldLabel : '当前状态',
							name : 'staus',
							emptyText : '当前状态',
							maxLength : 15,
							allowBlank : false
						},{
							fieldLabel : '上个状态',
							name : 'originalStatus',
							emptyText : '上个状态',
						},  {
							fieldLabel : '实际开始时间',
							name : 'realBeginDate',
							emptyText : '实际开始时间',
							xtype : 'datetimefield',
							format : 'Y-m-d H:i:s',
			            	itemId : 'realBeginDate'
						}, {
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
						}*/
						];
			}
		});