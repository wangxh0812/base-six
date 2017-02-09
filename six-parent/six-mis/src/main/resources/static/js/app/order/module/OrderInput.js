Ext
		.define(
				'FMS.app.order.module.OrderInput',
				{
					extend : 'Plugin.grid.Show',
					alias : 'widget.FMSappordermoduleOrderInput',
					requires : [ 'FMS.app.order.store.OrderInput',
							'Plugin.form.combobox.Module',
							'Plugin.form.SelectionForm',
							'FMS.app.order.store.OrderState',
							'Plugin.window.UploadWindow',
							'Plugin.form.CascadeForm', 
							'MyApp.ux.DateTimeField', 'Plugin.ux.IFrame'],
					initComponent : function() {
						var _store = Ext.create('FMS.app.order.store.OrderInput');
						Ext.apply(_store.proxy.extraParams, {
							status : 'input'
						});
						Ext.apply(this, {
							store : _store,
							gridDockedItems : this.getGridDockedItems(),
							gridColumns : this.getGridColumns()
						});
						// this.editRows = this.openEdit;
						this.callParent(arguments);
					},

					getGridColumns : function() {
						return [ {
							text : '订单编号',
							dataIndex : 'orderNo',
							width : 80
						},{
							text : '大通订单号',
							dataIndex : 'associationNo',
							width : 100
						},{
							text : '安吉编号',
							dataIndex : 'anJiNo',
							width : 150
						},{
							text : '产品名称',
							dataIndex : 'productName',
							width : 100
						}, {
							text : '下单时间',
							dataIndex : 'applyTimeStr',
							width : 150
						}, {
							text : '用户名',
							dataIndex : 'userAccount',
							width : 100
						},{
							text : '经销商',
							dataIndex : 'dealerName',
							width : 200
						},{
							text : '颜色',
							dataIndex : 'bodyColor',
							width : 60
						},{
							text : '用户类型',
							dataIndex : 'userType',
							width : 60,
							renderer : function(val) {
								if (val == '1') {
									return "个人";
								} else if (val == '2') {
									return "公司";
								} else {
									return "";
								}
							}
						},{
							text : '性别',
							dataIndex : 'userSex',
							width : 60,
							renderer : function(val) {
								if (val == '1') {
									return "先生";
								} else if (val == '2') {
									return "女士";
								} 
								return val;
							}
						},{
							text : '手机号码',
							dataIndex : 'userMobilephone',
							width : 100
						},{
							text : '邮箱',
							dataIndex : 'userEmail',
							width : 120
						},{
							text : '身份证号码',
							dataIndex : 'certiCode',
							width : 150
						},{
							text : '所在省',
							dataIndex : 'provinceName',
							width : 200
						},{
							text : '所在市',
							dataIndex : 'cityName',
							width : 200
						},{
							text : '所在区',
							dataIndex : 'districtName',
							width : 200
						},{
							text : '详细地址',
							dataIndex : 'detailedAddress',
							width : 200
						},{
							text : '邮编',
							dataIndex : 'postCode',
							width : 150
						},{
							text : '公司名',
							dataIndex : 'companyName',
							width : 200
						},{
							text : '授权代表',
							dataIndex : 'athorityRepresentative',
							width : 80
						},{
							text : '传真',
							dataIndex : 'fax',
							width : 120
						},{
							text : '电话',
							dataIndex : 'telephone',
							width : 120
						},{
							text : '发票类型',
							dataIndex : 'invoiceType',
							width : 80,
							renderer : function(val) {
								if (val == '1') {
									return "个人";
								} else if (val == '2') {
									return "公司";
								} 
								return val;
							}
						},{
							text : '发票',
							dataIndex : 'invoiceTitle',
							width : 150
						}];
					},

					// 按钮栏
					getGridDockedItems : function() {
						var me = this;
						var field1 = new Ext.form.Field();
						var field2 = new Ext.form.Field();
						var field3 = new Ext.form.Field();
						return [ {
							xtype : 'toolbar',
							dock : 'top',
							items : [
									{
										text : '录入大通订单号',
										iconCls : 'icon-edit',
										handler : function() {
											var selection = me.down("grid")
													.getSelectionModel()
													.getSelection();
											if (selection.length > 1
													|| selection.length <= 0) {
												Ext.MessageBox.show({
													title : '警告',
													msg : '只允许操作一条数据',
													icon : Ext.MessageBox.INFO
												});
												return false;
											}
											var orderId = selection[0].data.orderId;
											var statusCode = selection[0].data.status;
											if (statusCode != 'S1301')
												return Ext.MessageBox.show({
													title : '警告',
													msg : '该订单不是生产计划状态，不能录入!',
													icon : Ext.MessageBox.INFO,
													buttons : Ext.MessageBox.OK
												});
											me.openInputApply(selection[0].data.orderId);
										}
									},{
										xtype : 'button',
										text : '导入大通订单号',
										iconCls : 'icon-add',
										handler : function() {
											me.getRealImportWindow();
										}
									},{
										text : '导出',
										iconCls : 'icon-excel',
										handler : function() {
											me.getDownWindow();
										}
									},{
										xtype : 'button',
										text : '查看',
										iconCls : 'icon-edit',
										handler : function() {
											me.openEdit(true);
										}
									},{
										text : '导入模板',
										iconCls : 'icon-excel',
										handler : function() {
											me.getDownExcelImportReal();
										}
									}
									]
						}/*,{
							xtype : 'toolbar',
							dock : 'top',
							items : ["订单编号:",field1,"下单时间:", {
								xtype : 'datefield',
								fieldLable : '',
								format : 'Y-m-d',
								name : 'applyTime',
								itemId : 'applyTime'
							},{
								text : "搜索",
								iconCls : 'icon-search',
								handler : function() {
									me.store
											.load({
												params : {
													orderNo : field1.getValue(),
													applyTime : this.ownerCt.getComponent("applyTime").getValue()
												}
											});
								}
							}]
						}*/  ];
					},openEdit : function(effected) {
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
						} else {
							me.formWindowUp(selection[0].data.orderId,effected);
						}
					},
					openInputApply : function(orderId) {
						var me = this;
						var url = StaticSetting.absUrl + "/mis/order/inputApply";
						me.inputApply(orderId, url);
					},
					inputApply : function(orderId, url) {
						var me = this;
						var inputApplyForm = Ext.create("Ext.form.Panel", {
							border : false,
							layout : 'form',
							defaultType : 'textfield',
							items : [ {
								xtype : 'textfield',
								name : 'associationNo',
								fieldLabel : '大通订单号',
								allowBlank : false
							} ]
						});
						var inputApplyWindow = Ext
								.create(
										"Ext.window.Window",
										{
											title : '录入',
											modal : true,
											border : false,
											floating : true,
											width : 550,
											anchor : '100%',
											layout : 'form',
											items : [ inputApplyForm ],
											buttons : [
													{
														text : '确定',
														handler : function() {
															var associationNo = inputApplyForm
																	.getForm()
																	.findField(
																			"associationNo")
																	.getValue();
															
															me
																	.visitOrderByAjax(
																			orderId,
																			url,
																			{
																				associationNo : associationNo
																			});
															inputApplyWindow
																	.close();
														}
													},
													{
														text : '取消',
														handler : function() {
															inputApplyWindow
																	.close();
														}
													} ]
										});
						inputApplyWindow.show();
					},
					
					visitOrderByAjax : function(orderId, url, extraParams) {
						var me = this;
						Ext.Ajax.request({
							url : url,
							params : Ext.isEmpty(extraParams) ? {
								orderId : orderId
							} : Ext.apply({
								orderId : orderId
							}, extraParams),
							method : 'GET',
							success : function(response, options) {
								var resultJSON = Ext.JSON
										.decode(response.responseText);
								if (resultJSON.success) {
									Ext.MessageBox.show({
										title : '提示',
										msg : '操作成功!',
										icon : Ext.MessageBox.INFO,
										buttons : Ext.MessageBox.OK
									});

								} else {
									Ext.MessageBox.show({
										title : '警告',
										msg : resultJSON.msg,
										icon : Ext.MessageBox.WARNING,
										buttons : Ext.MessageBox.OK
									});
								}
								me.store.reload();
							},
							failure : function(response, options) {
								Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：'
										+ response.status);
							}
						});
					},
					

					/**
					 * 修改 弹出窗口
					 */
					formWindowUp : function(orderId, effected) {
						var me = this;
						var idParams = {
							orderId : orderId
						};
						var win = this.createCientWindow({
							title : '修改订单信息',
							idName : 'orderId',
							idParams : idParams,
							hiddenButtons : effected,
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
						var _win = Ext.create(
								"FMS.app.mis.module.window.CommonWindow", obj);
						_win.addBaseClientForm({
							fieldSetTitle : '订单基本信息',
							formItemId : 'orderForm',
							formUrl : StaticSetting.absUrl + '/mis/order/save',
							formItems : this.getMain(),
							submitParams : obj.idParams,
							hiddenFormButten : true
						});
						return _win;
					},
					// 创建客户弹出窗口的Tab页面
					// 创建客户弹出窗口的Tab页面
					createWindowTabs : function(_win, obj) {
						_win.addTabClientPanel(Ext.create("FMS.app.order.module.OrderAllState", {
							title : '状态',
							itemId : 'orderAllStateGrid',
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
								name : '订单基本信息',
								url : StaticSetting.absUrl
										+ '/mis/order/getOrder',
								formItemId : 'orderForm'
							},
							tabForm : []
						};
					},getDownWindow : function() {
						var _form = Ext.create("Ext.form.Panel", {
							layout : 'form',
							border : false,
							defaultType : 'textfield',
							items : [ {
								name : 'orderNo',
								fieldLabel : "订单编号"
							} ]
						});
						var downWindow = Ext.create("Ext.window.Window", {
							modal : true,
							border : false,
							floating : true,
							width : 450,
							layout : 'form',
							title : '导出',
							items : [ _form ],
							buttons : [ {
								text : '导出',
								handler : function() {
									if (!_form.getForm().isValid()) {
										Ext.MessageBox.show({
											title : '警告',
											msg : "请根据提示正确输入相关信息!",
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.WARNING
										});
										return false;
									}
									var resultJson = _form.getForm().getValues();
									var url = StaticSetting.absUrl + '/mis/order/exportOrder?'
											+ Ext.Object.toQueryString(resultJson);
									var downloadForm = Ext.create("Ext.form.Panel", {
										border : 0,
										layout : 'fit',
										renderTo : Ext.getBody(),
										items : [ {
											xtype : 'PluginuxIFrame',
											src : url,
											listeners : {
												'load' : function() {
													Ext.messagebox.msg('提示',
															'如未下载，表示文件不存在/已损坏，请与管理员联系!');
												}
											}
										} ]
									});
								}
							} ]
						});
						downWindow.show();
					},getRealImportWindow : function() {
						var _this = this;
						var importWindow = Ext
								.create(
										"Plugin.window.UploadWindow",
										{
											title : '导入',
											hiddenType : true,
											formUrl : StaticSetting.absUrl
													+ '/mis/order/importMaxusNo',
											onUploadFile : function(_form) {
												var formParams = _this.store.proxy.extraParams;
												_form
														.getForm()
														.submit(
																{
																	waitTitle : '提示',
																	waitMsg : '正在保存数据请稍后...',
																	params : formParams,
																	method : "GET",
																	success : function(
																			form,
																			action) {
																		var flag = action.result.success;
																		if (flag) {
																			Ext.MessageBox
																					.show({
																						title : "提示",
																						msg : "上传成功！",
																						icon : Ext.MessageBox.INFO,
																						buttons : Ext.MessageBox.OK
																					});
																			importWindow
																					.close();
																			_this.store
																					.reload();
																		}
																	},
																	failure : function(
																			form,
																			action) {
																		Ext.MessageBox
																				.show({
																					title : "错误",
																					msg : "上传失败:["
																							+ action.result.msg
																							+ "]",
																					icon : Ext.MessageBox.ERROR,
																					buttons : Ext.MessageBox.OK
																				});
																	}
																});
											}

										});
						importWindow.show();
					},getDownExcelImportReal:function(){
						var me = this;
						var url = StaticSetting.absUrl + '/file/downExcelTpl/importMaxNo.xlsx';
						//document.location = encodeURI(url);
						var downloadForm = Ext.create("Ext.form.Panel", {
							border : 0,
							layout : 'fit',
							renderTo : Ext.getBody(),
							items : [{
								xtype : 'PluginuxIFrame',
								src : url,
								listeners : {
									'load' : function() {
										Ext.messagebox.msg('提示','如未下载，表示文件不存在/已损坏，请与管理员联系!');
									}
								}
							}]
						});
					},
					// 设置主表信息
					getMain : function(userType) {
						return [ {
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'orderId',
								hidden : true
							}, {
								name : 'orderNo',
								fieldLabel : '订单编号',
								emptyText : '订单编号',
								readOnly : true,
							    style:'background:#E6E6E6'
							}, {
								name : 'applyTimeStr',
								fieldLabel : '下单时间',
								emptyText : '下单时间',
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]
						}, {
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'userAccount',
								fieldLabel : '用户名',
								emptyText : '用户名',
								maxLength : 30,
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]
						}, {
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'productName',
								fieldLabel : '产品名称',
								emptyText : '产品名称',
								readOnly : true,
							    style:'background:#E6E6E6'
							}, {
								name : 'quantity',
								fieldLabel : '购买数量',
								emptyText : '购买数量',
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]
						}, {
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'feeAmount',
								fieldLabel : '总金额',
								emptyText : '总金额',
								xtype : 'numberfield',
								readOnly : true,
							    style:'background:#E6E6E6'
							}, {
								name : 'logisticsName',
								fieldLabel : '当前状态',
								emptyText : '当前状态',
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'dealerName',
								fieldLabel : '经销商',
								emptyText : '经销商',
								readOnly : true,
							    style:'background:#E6E6E6'
							},{
								name : 'bodyColor',
								fieldLabel : '颜色',
								emptyText : '颜色',
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'deliveryDateStr',
								fieldLabel : '承诺交付日',
								emptyText : '承诺交付日',
								readOnly : true,
							    style:'background:#E6E6E6'
							},{
								name : 'shangXianDateStr',
								fieldLabel : '上线时间',
								emptyText : '上线时间',
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'subscriptionDateStr',
								fieldLabel : '付定金时间',
								emptyText : '付定金时间',
								readOnly : true,
							    style:'background:#E6E6E6'
							}, {
								name : 'deliveryConfirmDateStr',
								fieldLabel : '交付时间',
								emptyText : '交付时间',
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]
						} ,{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'userConfirmDateStr',
								fieldLabel : '用户确认时间',
								emptyText : '用户确认时间',
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						} , {
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'vinNo',
								fieldLabel : 'VIN号',
								emptyText : 'VIN号',
								readOnly : true,
							    style:'background:#E6E6E6'
							},  {
								name : 'associationNo',
								fieldLabel : '大通订单号',
								emptyText : '大通订单号',
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'userType',
								fieldLabel : '客户类型',
								emptyText : '客户类型',
								xtype : 'ExtPluginFormCombobox',
								tCode : 'c_user_type',
								forceSelection : true,
								typeAhead : false,
								editable : false,
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'userName',
								fieldLabel : '客户姓名',
								emptyText : '客户姓名',
								readOnly : true,
							    style:'background:#E6E6E6'
							},{
								name : 'userSex',
								fieldLabel : '性别',
								xtype : 'ExtPluginFormCombobox',
								tCode : 'c_sex',
								forceSelection : true,
								typeAhead : false,
								editable : false,
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'userMobilephone',
								fieldLabel : '手机号码',
								emptyText : '手机号码',
								maxLength : 11,
								readOnly : true,
							    style:'background:#E6E6E6'
							},{
								name : 'userEmail',
								fieldLabel : '邮箱',
								emptyText : '邮箱',
								maxLength : 30,
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'certiCode',
								fieldLabel : '身份证号码',
								emptyText : '身份证号码',
								maxLength : 18,
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'companyName',
								fieldLabel : '公司名称',
								emptyText : '公司名称',
								maxLength : 30,
								readOnly : true,
							    style:'background:#E6E6E6'
							},{
								name : 'athorityRepresentative',
								fieldLabel : '授权代表',
								emptyText : '授权代表',
								maxLength : 30,
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						},
						{
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
										fieldLabel : '所在地:',
										readOnly : true,
									    style:'background:#E6E6E6'
									}]
						
						},{
							xtype : 'container',
							layout : 'form',
							defaultType : 'textfield',
							items : [{
								fieldLabel : '详细地址',
								name : 'detailedAddress',
								emptyText : '详细地址',
								maxLength : 30,
								width: 400,
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'postCode',
								fieldLabel : '邮编',
								emptyText : '邮编',
								maxLength : 6,
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'fax',
								fieldLabel : '传真',
								emptyText : '传真',
								maxLength : 15,
								readOnly : true,
							    style:'background:#E6E6E6'
							},{
								name : 'telephone',
								fieldLabel : '电话',
								emptyText : '电话',
								maxLength : 15,
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						
						},{
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'invoiceType',
								fieldLabel : '发票类型',
								emptyText : '发票类型',
								xtype : 'ExtPluginFormCombobox',
								tCode : 'c_invoice_type',
								forceSelection : true,
								typeAhead : false,
								editable : false,
								readOnly : true,
							    style:'background:#E6E6E6'
							},{
								name : 'invoiceTitle',
								fieldLabel : '发票名称',
								emptyText : '发票名称',
								maxLength : 15,
								readOnly : true,
							    style:'background:#E6E6E6'
							}]
						}];
					}
				});