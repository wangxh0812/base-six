Ext.define('FMS.app.homePage.module.ResourceLibrary', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSapphomePagemoduleResourceLibrary',
			requires : [ 'FMS.app.homePage.store.ResourceLibrary', 'Plugin.ux.IFrame',
			 			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm',
			 			'Plugin.window.UploadWindow4ResourceLib'
			 			],
			 	initComponent : function() {
			 		var _store = Ext.create('FMS.app.homePage.store.ResourceLibrary');
			 		_store.on('beforeload', function(_store, options) {
						var new_params = Ext.Object.fromQueryString("businessId=&businessType=1");
						Ext.apply(_store.proxy.extraParams, new_params);
					});
			 		Ext.apply(this, {
			 			store : _store,
			 			gridDockedItems : this.getGridDockedItems(),
			 			gridColumns : this.getGridColumns()
			 		});
			 		this.callParent(arguments);
			 	},

			 	getGridColumns : function() {
			 		return [{
						text : '文件名',
						dataIndex : 'fileName',
						width : 200
			 		},{
						text : '文件类型',
						dataIndex : 'fileType',
						width : 100,
						renderer : function(val) {
							if (val == '1') {
								return "图片";
							} else if (val == '2') {
								return "文件";
							} else if (val == '3') {
								return "视频";
							}
							return val;
						}
			 		},{
						text : '文件业务类型',
						dataIndex : 'fileBusinessTypeName',
						width : 100
			 		},{
						text : '经销商全称',
						dataIndex : 'companyCnname',
						width : 100
			 		},{
						text : '经销商编码',
						dataIndex : 'companyCode',
						width : 100
			 		}];
			 	},

			 	// 按钮栏
			 	getGridDockedItems : function() {
			 		var me = this;
			 		
			 		return [{
			 					xtype : 'toolbar',
			 					dock : 'top',
			 					items : [{
					 						xtype : 'button',
											text : '上传',
											iconCls : 'icon-add',
											handler : function() {
												me.getImportWindow();
											}
			 							}, {
											text : '下载',
											iconCls : 'icon-home',
											handler : function() {
												var selection = me.down("grid").getSelectionModel().getSelection();
												if (selection.length > 1|| selection.length <= 0) {
													Ext.MessageBox.show({
																title : '警告',
																msg : '只允许编辑一条数据',
																icon : Ext.MessageBox.WARNING
															});
													return false;
												}

												var _fileId = selection[0].data["fileId"];

												if (_fileId == ''|| _fileId == null) {
													Ext.MessageBox.show({
																title : '警告',
																msg : '文件不存在',
																icon : Ext.MessageBox.WARNING
															});
													return false;
												}
												var url = StaticSetting.absUrl+ '/mis/myFile/downloadFile?fileId=' + _fileId;
												var downloadForm = Ext.create("Ext.form.Panel",{
																	border : 0,
																	layout : 'fit',
																	renderTo : Ext.getBody(),
																	items : [ {
																		xtype : 'PluginuxIFrame',
																		src : url,
																		listeners : {
																			'load' : function() {
																				Ext.messagebox.msg('提示','如未下载，表示文件不存在/已损坏，请与管理员联系!');
																			}
																		}
																	} ]
																});							
									        }
										},{
											xtype : 'ExtPluginGridDel'
										} ]
			 				}];
			 	},
			 	
			 	getImportWindow : function(){	
					var _this = this;
					var importWindow = Ext.create("Plugin.window.UploadWindow4ResourceLib", {
						title : '上传文件',
						hiddenType : false,
						fieldTitle : '文件类型',
						tCode : 'c_document_type',
						formUrl : StaticSetting.absUrl + '/mis/myFile/uploadDoucument',
						onUploadFile : function(_form) {
							var fileBusinessType = _form.getComponent("type");
							var companyId = _form.getComponent("companyId");
							var formParams = {businessType:'1',fileBusinessType:fileBusinessType.getValue(),companyId:companyId.getComponent(companyId.hiddenFields).getValue()};
							_form.getForm().submit({
								waitTitle : '提示',
								waitMsg : '正在保存数据请稍后...',
								params : formParams,
								method : "GET",
								success : function(form,action) {
									var flag = action.result.success;
									if (flag) {
										Ext.MessageBox.show({
											title : "提示",
											msg : "上传成功！",
											icon : Ext.MessageBox.INFO,
											buttons : Ext.MessageBox.OK
										});
										importWindow.close();
										_this.store.reload();
									}
								},
								failure : function(form,action) {
									importWindow.close();
									_this.store.reload();
									
									/*Ext.MessageBox.show({
										title : "错误",
										msg : "上传失败:["
												+ action.result.msg
												+ "]",
										icon : Ext.MessageBox.ERROR,
										buttons : Ext.MessageBox.OK
									});*/
								}
							});
						}
						
					});
					importWindow.show();
			 	}
 });
