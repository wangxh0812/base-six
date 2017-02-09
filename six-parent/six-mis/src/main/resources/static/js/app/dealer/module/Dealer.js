Ext.define('FMS.app.dealer.module.Dealer', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSappdealermoduleDealer',
			requires : ['FMS.app.dealer.store.Dealer','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','Plugin.form.SelectionForm','Plugin.form.CascadeForm','Plugin.window.UploadWindow','FMS.app.dealer.store.DealerUser','MyApp.ux.DateTimeField'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.dealer.store.Dealer');
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
							text : '经销商名称',
							dataIndex : 'dealerName',
							width : 200
						}, {
							text : '所在省',
							dataIndex : 'provinceName',
							width : 150
						}, {
							text : '所在市',
							dataIndex : 'cityName',
							width : 150
						},{
							text : '详细地址',
							dataIndex : 'address',
							width : 400
						},{
							text : '联系电话',
							dataIndex : 'hotPhone',
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
										xtype : 'button',
										text : '新增',
										iconCls : 'icon-add',
										handler : function() {
											me.addFormWindow();
										}
									}, {
										xtype : 'button',
										text : '修改',
										iconCls : 'icon-edit',
										handler : function() {
											me.openEdit();
										}
									}, {
										xtype : 'ExtPluginGridDel'
									},"->", "经销商名称：", field1, {
										text : "搜索",
										iconCls : 'icon-search',
										handler : function() {
											me.store.load({
												params : {
													dealerName : field1.getValue()
												}
											});
										}
									}]
								} ];
			},openEdit : function() {
				var me = this;
				var selection = this.down("grid").getSelectionModel().getSelection();
				if (selection.length > 1 || selection.length <= 0) {
					Ext.MessageBox.show({
								title : 'Error',
								msg : '只允许编辑一条数据',
								icon : Ext.MessageBox.INFO
							});
					return false;
				} else {
					me.formWindowUp(selection[0].data.dealerId);
				}
			},addFormWindow : function() {
				var me = this;
				var win = this.createCientWindow({
							title : '新增经销商信息',
							hiddenTabPanel : true,
							idName : 'dealerId',
							getLoadDetailInfoArray : me.getLoadDetailInfoArray,
							listeners : {
								"createTabs" : function(a, b) {
									me.createWindowTabs(a, b);
								},
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
				win.show();
			},

			/**
			 * 修改 弹出窗口
			 */
			formWindowUp : function(dealerId) {
				var me = this;
				var idParams = {
						dealerId : dealerId
				};
				var win = this.createCientWindow({
							title : '修改经销商信息',
							idName : 'dealerId',
							idParams : idParams,
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
				win = this.createWindowTabs(win, {
							idParams : idParams
						});
				win.loadAndRenderDetailInfo(idParams, win);
				win.show();
			},
			// 创建客户详情弹出窗口
			createCientWindow : function(obj) {
				var me = this;
				var _win = Ext.create("FMS.app.mis.module.window.CommonWindow",
						obj);
				_win.addBaseClientForm({
							fieldSetTitle : '经销商基本信息',
							formItemId : 'dealerForm',
							formUrl : StaticSetting.absUrl + '/mis/dealer/save',
							formItems : this.getWindowColumns(),
							submitParams : obj.idParams,
							hiddenFormButten : true
						});
				return _win;
			},
			// 创建客户弹出窗口的Tab页面
			createWindowTabs : function(_win, obj) {
				_win.addTabClientPanel(Ext.create(
						"FMS.app.dealer.module.DealerUser", {
							title : '经销商人员管理',
							itemId : 'dealerUserGrid',
							idParams : obj.idParams,
							height : 300
						}));
				_win.addTabClientPanel(Ext.create(
						"FMS.app.order.module.OrderByUser", {
							title : '订单查看',
							itemId : 'orderByUserGrid',
							idParams : obj.idParams,
							height : 300
						}));
				return _win;
			},
			/** ********************加载数据并赋值功能******************************** */
			// form加载url
			getLoadDetailInfoArray : function() {
				return {
					baseForm : {
						name : '经销商基本信息',
						url : StaticSetting.absUrl + '/mis/dealer/getDealer',
						formItemId : 'dealerForm'
					},
					tabForm : []
				};
			},
			getWindowColumns : function() {
				return [{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
						fieldLabel : '逻辑ID',
						name : 'dealerId',
						hidden : true
					}, {
						fieldLabel : '经销商名称',
						name : 'dealerName',
						emptyText : '经销商名称',
						maxLength : 30,
						allowBlank : false
					}]
				},{
					xtype : 'container',
					layout : 'form',
					items : [{
								xtype : 'PluginformCascadeForm',
								name : 'test',
								code : '000000',
								firstCombo : true,
								columnWidth : .94,
								combos : ['provinceName', 'cityName', 'districtName'],
								nextCombo : null,
								fieldLabel : '所在地:'
							}]
				},{
					xtype : 'container',
					layout : 'form',
					defaultType : 'textfield',
					items : [{
						fieldLabel : '详细地址',
						name : 'address',
						emptyText : '详细地址',
						maxLength : 100,
						width: 400,
						allowBlank : false
					}]
				},{
					xtype : 'container',
					layout : 'form',
					defaultType : 'textfield',
					items : [{
						fieldLabel : '联系电话',
						name : 'hotPhone',
						emptyText : '联系电话',
						maxLength : 20
					}]
				},{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
						fieldLabel : '经度',
						name : 'longitude',
						emptyText : '经度',
						maxLength : 15
					},{

						fieldLabel : '纬度',
						name : 'latitude',
						emptyText : '纬度',
						maxLength : 15
					}]
				},{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
						fieldLabel : '营业开始时间',
						name : 'defaultTransportBeginTime',
						editable : false,
						xtype : 'timefield',
						format : 'H:i',
						increment: 30
							/*minValue:'6:00',  
						    maxValue:'18:00',
							increment:60,*/
						//emptyText : '营业开始时间',
						//format: 'H:i',
						//increment: 15
					},{
						fieldLabel : '营业结束时间',
						name : 'defaultTransportEndTime',
						emptyText : '营业结束时间',
						xtype: 'timefield',
						format: 'H:i',
						increment: 30
					}]
				},{
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'textfield',
					items : [{
						fieldLabel : '运输天数',
						name : 'defaultTransportDays',
						emptyText : '运输天数',
						xtype : 'numberfield',
						maxLength : 5,
						minValue : 0
					},{	

						fieldLabel : '是否参加活动',
						name : 'effortFlag',
						xtype : 'ExtPluginFormCombobox',
						tCode : 'c_yn',
						allowBlank : false,
						forceSelection : true,
						typeAhead : false,
						editable : false
					}]
				} ];
			}
		});