Ext.define('FMS.app.order.module.OrderInit',
				{
					extend : 'Plugin.grid.Show',
					alias : 'widget.FMSappordermoduleOrderInit',
					requires : [ 'FMS.app.order.store.Order',
							'Plugin.form.combobox.Module',
							'Plugin.form.SelectionForm',
							'FMS.app.order.store.OrderState',
							'Plugin.window.UploadWindow',
							'MyApp.ux.DateTimeField','Plugin.ux.IFrame' ],
					initComponent : function() {
						var _store = Ext.create('FMS.app.order.store.Order');
						Ext.apply(_store.proxy.extraParams, {
							status : 'init'
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
						}, {
							text : 'VIN号',
							dataIndex : 'vinNo',
							width : 120
						}, {
							text : '大通订单号',
							dataIndex : 'associationNo',
							width : 120
						},{
							text : '安吉编号',
							dataIndex : 'anJiNo',
							width : 150
						}, {
							text : '用户名',
							dataIndex : 'userAccount',
							width : 100
						}, {
							text : '产品名称',
							dataIndex : 'productName',
							width : 100
						}, {
							text : '下单时间',
							dataIndex : 'applyTimeStr',
							width : 150
						}, {
							text : '生产计划时间',
							dataIndex : 'shangXianDateStr',
							width : 120
						}, {
							text : '质保下线时间',
							dataIndex : 'baoJiaoDateStr',
							width : 120
						}, {
							text : '发运时间',
							dataIndex : 'faYunDateStr',
							width : 120
						},{
							text : '到达时间',
							dataIndex : 'planArriveDateStr',
							width : 120
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
						
						var field2 = Ext.create("Ext.form.field.Text",{
							itemId : 'field2',
							listeners: {
				                specialkey: function(field, e){
				                    if (e.getKey() == e.ENTER) {
				                    	this.ownerCt.getComponent("search").handler();
				                    }
				                }
				            }
						});
						
						var field3 = Ext.create("Ext.form.field.Text",{
							itemId : 'field3',
							listeners: {
				                specialkey: function(field, e){
				                    if (e.getKey() == e.ENTER) {
				                    	this.ownerCt.getComponent("search").handler();
				                    }
				                }
				            }
						});
						
						return [ {
							xtype : 'toolbar',
							dock : 'top',
							items : [{
								text : '单个初始化',
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
											msg : '该订单不是生产计划状态，不能提交初始化!',
											icon : Ext.MessageBox.INFO,
											buttons : Ext.MessageBox.OK
										});
									me.openShangXianApply(selection[0].data.orderId,selection[0].data.shxbjInterval,selection[0].data.bjddInterval);
								}
							},
									{
										xtype : 'button',
										text : '导入初始化',
										iconCls : 'icon-add',
										handler : function() {
											me.getImportWindow();
										}
									},
									'-',{
										xtype : 'button',
										text : '导入实际',
										iconCls : 'icon-add',
										handler : function() {
											me.getRealImportWindow();
										}
									},'-',{
										text : '导入初始化模板',
										iconCls : 'icon-excel',
										handler : function() {
											me.getDownExcelImportPlan();
										}
									},
									{
										text : '导入实际模板',
										iconCls : 'icon-excel',
										handler : function() {
											me.getDownExcelImportReal();
										}
									}
									]
						}/*,{
							xtype : 'toolbar',
							dock : 'top',
							items : ["订单编号:",field1,"VIN号:",field2,"大通订单号",field3,"下单时间:", {
								xtype : 'datefield',
								fieldLable : '',
								format : 'Y-m-d',
								name : 'applyTime',
								itemId : 'applyTime'
							},{
								text : "搜索",
								itemId : 'search',
								iconCls : 'icon-search',
								handler : function() {
									me.store
											.load({
												params : {
													orderNo : field1.getValue(),
													vinNo : field2.getValue(),
													associationNo : field3.getValue(),
													applyTime : this.ownerCt.getComponent("applyTime").getValue()
												}
											});
								}
							}]
						}*/  ];
					},
					getImportWindow : function() {
						var _this = this;
						var importWindow = Ext
								.create(
										"Plugin.window.UploadWindow",
										{
											title : '导入物流计划',
											hiddenType : true,
											formUrl : StaticSetting.absUrl
													+ '/mis/order/upload',
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
					},
					getRealImportWindow : function() {
						var _this = this;
						var importWindow = Ext
								.create(
										"Plugin.window.UploadWindow",
										{
											title : '实际物流计划',
											hiddenType : true,
											formUrl : StaticSetting.absUrl
													+ '/mis/order/uploadReal',
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
					},
					// 修改
					openEdit : function(effected) {
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
							//me.formWindowUp(selection[0].data.orderId,effected);
							me.formWindowUp(selection[0].data,effected);
						}
					},
					
					openShangXianApply : function(orderId,shxbjInterval,bjddInterval) {
						var me = this;
						var url = StaticSetting.absUrl
								+ "/mis/order/shangXianApply";
						me.shangXianApply(orderId,shxbjInterval,bjddInterval, url);
					},
					shangXianApply : function(orderId,shxbjInterval,bjddInterval, url) {
						var me = this;
						var shangXianApplyForm = Ext.create("Ext.form.Panel", {
							border : false,
							layout : 'form',
							defaultType : 'textfield',
							items : [ {
								xtype : 'textfield',
								name : 'vinNo',
								fieldLabel : 'VIN号',
								allowBlank : false
							}, {
								name : 'shangXianDate',
								fieldLabel : '上线时间',
								forceSelection : true,
								typeAhead : false,
								editable : false,
								xtype : 'datetimefield',
								format : 'Y-m-d H:i',
								allowBlank : false,
								listeners: {
									//添加日期选择事件
									"select": function () {
										var shangXianDate = shangXianApplyForm.getForm().findField("shangXianDate").getValue();
										var baoJiaoDate = Ext.Date.add(shangXianDate, Ext.Date.HOUR, shxbjInterval);
										shangXianApplyForm.getForm().findField("baoJiaoDate").setValue(baoJiaoDate);
										var planArriveDate = Ext.Date.add(baoJiaoDate, Ext.Date.HOUR, bjddInterval);
										shangXianApplyForm.getForm().findField("planArriveDate").setValue(planArriveDate);
									}
								}
							}, {
								name : 'baoJiaoDate',
								fieldLabel : '报交时间',
								forceSelection : true,
								typeAhead : false,
								editable : false,
								xtype : 'datetimefield',
								format : 'Y-m-d H:i',
								allowBlank : false,
								listeners: {
									//添加日期选择事件
									"select": function () {
										var baoJiaoDate = shangXianApplyForm.getForm().findField("baoJiaoDate").getValue();
										var planArriveDate = Ext.Date.add(baoJiaoDate, Ext.Date.HOUR, bjddInterval);
										shangXianApplyForm.getForm().findField("planArriveDate").setValue(planArriveDate);
									}
								}
							}, {
								name : 'planArriveDate',
								fieldLabel : '到达时间',
								forceSelection : true,
								typeAhead : false,
								editable : false,
								xtype : 'datetimefield',
								format : 'Y-m-d H:i',
								allowBlank : false
							} ]
						});
						var shangXianApplyWindow = Ext
								.create(
										"Ext.window.Window",
										{
											title : '上线',
											modal : true,
											border : false,
											floating : true,
											width : 550,
											anchor : '100%',
											layout : 'form',
											items : [ shangXianApplyForm ],
											buttons : [
													{
														text : '确定',
														handler : function() {
															var shangXianDate = shangXianApplyForm
																	.getForm()
																	.findField(
																			"shangXianDate")
																	.getValue();
															var vinNo = shangXianApplyForm
																	.getForm()
																	.findField(
																			"vinNo")
																	.getValue();
															var baoJiaoDate = shangXianApplyForm
															.getForm()
															.findField(
																	"baoJiaoDate")
															.getValue();
															var planArriveDate = shangXianApplyForm
															.getForm()
															.findField(
																	"planArriveDate")
															.getValue();
															me
																	.visitOrderByAjax(
																			orderId,
																			url,
																			{
																				shangXianDate : shangXianDate,
																				baoJiaoDate : baoJiaoDate,
																				planArriveDate : planArriveDate,
																				vinNo : vinNo
																			});
															shangXianApplyWindow
																	.close();
														}
													},
													{
														text : '取消',
														handler : function() {
															shangXianApplyWindow
																	.close();
														}
													} ]
										});
						shangXianApplyWindow.show();
					},
					openBaoJiaoApply : function(orderId) {
						var me = this;
						var url = StaticSetting.absUrl
								+ "/mis/order/baoJiaoApply";
						me.baoJiaoApply(orderId, url);
					},
					baoJiaoApply : function(orderId, url) {
						var me = this;
						var baoJiaoApplyForm = Ext.create("Ext.form.Panel", {
							border : false,
							layout : 'form',
							defaultType : 'textfield',
							items : [ {
								name : 'baoJiaoDate',
								fieldLabel : '报交时间',
								forceSelection : true,
								typeAhead : false,
								editable : false,
								xtype : 'datetimefield',
								format : 'Y-m-d H:i',
								allowBlank : false
							} ]
						});
						var baoJiaoApplyWindow = Ext
								.create(
										"Ext.window.Window",
										{
											title : '报交',
											modal : true,
											border : false,
											floating : true,
											width : 550,
											anchor : '100%',
											layout : 'form',
											items : [ baoJiaoApplyForm ],
											buttons : [
													{
														text : '确定',
														handler : function() {
															var baoJiaoDate = baoJiaoApplyForm
																	.getForm()
																	.findField(
																			"baoJiaoDate")
																	.getValue();
															me
																	.visitOrderByAjax(
																			orderId,
																			url,
																			{
																				baoJiaoDate : baoJiaoDate
																			});
															baoJiaoApplyWindow
																	.close();
														}
													},
													{
														text : '取消',
														handler : function() {
															baoJiaoApplyWindow
																	.close();
														}
													} ]
										});
						baoJiaoApplyWindow.show();
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
					 * 新增弹出窗口
					 */
					/*
					 * addFormWindow : function() { var me = this; var win =
					 * this.createCientWindow({ title : '新增产品信息', hiddenTabPanel :
					 * true, idName : 'productId', getLoadDetailInfoArray :
					 * me.getLoadDetailInfoArray, listeners : { "createTabs" :
					 * function(a, b) { me.createWindowTabs(a, b); },
					 * "closeWindow" : function(_win) { Ext.MessageBox.show({
					 * title : "提示", msg : "操作成功", icon : Ext.MessageBox.INFO,
					 * buttons : Ext.MessageBox.OK, fn : function(buttonId) { if
					 * (buttonId === "ok") { me.store.reload(); _win.close(); } }
					 * }); } } }); win.show(); },
					 */

					/**
					 * 修改 弹出窗口
					 */
					formWindowUp : function(idParams, effected) {
						var me = this;
						/*var idParams = {
							orderId : orderId
						};*/
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
					createWindowTabs : function(_win, obj) {
						_win.addTabClientPanel(Ext.create(
								"FMS.app.order.module.OrderState", {
									title : '状态更新',
									itemId : 'orderStateGrid',
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
					},
					// 设置主表信息
					getMain : function() {
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
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]
						}, {
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'userName',
								fieldLabel : '用户姓名',
								emptyText : '用户姓名',
								maxLength : 30,
								readOnly : true,
							    style:'background:#E6E6E6'
							}, {
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
						}, {
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'vinNo',
								fieldLabel : 'VIN号',
								emptyText : 'VIN号',
								readOnly : true,
							    style:'background:#E6E6E6'
							}, {
								name : 'associationNo',
								fieldLabel : '大通订单号',
								emptyText : '大通订单号',
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]
						}, {

							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [ {
								name : 'shangXianDateStr',
								fieldLabel : '上线时间',
								readOnly : true,
							    style:'background:#E6E6E6'
							}, {
								name : 'baoJiaoDateStr',
								fieldLabel : '报交时间',
								readOnly : true,
							    style:'background:#E6E6E6'
							} ]

						}, {
							xtype : 'container',
							layout : 'hbox',
							defaultType : 'textfield',
							items : [{
								name : 'planArriveDateStr',
								fieldLabel : '到达时间',
								readOnly : true,
							    style:'background:#E6E6E6'
							
							}]
						} ];
					},
					getDownExcelImportPlan:function(){
						var me = this;
						var url = StaticSetting.absUrl + '/file/downExcelTpl/importPlan.xlsx';
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
					},getDownExcelImportReal:function(){
						var me = this;
						var url = StaticSetting.absUrl + '/file/downExcelTpl/importReal.xlsx';
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
					}
				});