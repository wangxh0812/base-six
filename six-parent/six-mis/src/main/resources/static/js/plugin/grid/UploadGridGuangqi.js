Ext.define('Plugin.grid.UploadGridGuangqi', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.PlugingridUploadGridGuangqi',
	requires : ['Plugin.window.UploadWindow', 'Plugin.ux.IFrame'],
	initComponent : function() {
		if (this.store && this.storeParams) {
			Ext.apply(this.store.proxy.extraParams, this.storeParams);
		};
		this.allowUpdate = this.allowUpdate || false;
		Ext.apply(this, {
					store : this.store,
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.callParent(arguments);
	},
	getGridDockedItems : function() {
		var _this = this;
		return [{
			xtype : 'toolbar',
			dock : 'top',
			items : [{
				text : '上传图片',
				iconCls : 'icon-add',
				hidden : _this.allowUpdate,
				handler : function() {
					var _uploadWindow = Ext.create(
							'Plugin.window.UploadWindow', {
								title : '上传图片',
								fieldTitle : '图片类型',
								tCode : _this.tCode,
								formUrl : _this.imageFormUrl,
								emptyText : '图片支持jpeg,jpg,gif,bmp,png格式',
								onUploadFile : function(_form) {
									var reg = new RegExp("(.*)(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$");
									if(!reg.test(_form.items.items[1].lastValue)) {
										Ext.MessageBox.show({
											title : "错误",
											msg : "格式有误",
											icon : Ext.MessageBox.ERROR,
											buttons : Ext.MessageBox.OK
										});
										return;
									}
									var imageType = _form.getComponent("type");
									var formParams = Ext.apply(
											_this.imageFormParams, {
												fileBusinessType : imageType.getValue()
											});
									_form.getForm().submit({
										waitTitle : '提示',
										waitMsg : '正在保存数据请稍后...',
										params : formParams,
										method : "GET",
										success : function(form, action) {
											var flag = action.result.success;
											if (flag) {
												_uploadWindow.close();
												_this.store.reload();
											}
										},
										failure : function(form, action) {
											_uploadWindow.close();
											_this.store.reload();
											/*Ext.MessageBox.show({
														title : "错误",
														msg : "上传失败:["
																+ action.result
																+ "]",
														icon : Ext.MessageBox.ERROR,
														buttons : Ext.MessageBox.OK
													});*/
										}
									});
								}
							});
				}
			}, /*{
				text : '上传文件',
				iconCls : 'icon-add',
				hidden : _this.allowUpdate,
				handler : function() {
					var _uploadWindow = Ext.create(
							'Plugin.window.UploadWindow', {
								title : '上传文件',
								fieldTitle : '文件类型',
								tCode : _this.tCode,
								formUrl : _this.fileFormUrl,
								emptyText : '文件支持rar,doc,docx,pdf,swf,flv,xlsx,pptx,xls,ppt,zip,7z格式',
								onUploadFile : function(_form) {
									var reg = new RegExp("^(.*)(.PDF|.pdf|.SWF|.swf|.FLV|.flv|.DOCX|.docx|.XLSX|.xlsx" +
											"|.PPTX|.pptx|.DOC|.doc|.XLS|.xls|.PPT|.ppt|.RAR|.rar" +
											"|.ZIP|.zip|.7Z|.7z)$");
									if(!reg.test(_form.items.items[1].lastValue)) {
										Ext.MessageBox.show({
											title : "错误",
											msg : "格式有误",
											icon : Ext.MessageBox.ERROR,
											buttons : Ext.MessageBox.OK
										});
										return;
									}
									var fileType = _form.getComponent("type");
									var formParams = Ext.apply(
											_this.fileFormParams, {
												fileBusinessType : fileType
														.getValue()
											});
									_form.getForm().submit({
										waitTitle : '提示',
										waitMsg : '正在保存数据请稍后...',
										params : formParams,
										method : "GET",
										success : function(form, action) {
											var flag = action.result.success;
											if (flag) {
												_uploadWindow.close();
												_this.store.reload();
											}
										},
										failure : function(form, action) {
											_uploadWindow.close();
											_this.store.reload();
////											Ext.MessageBox.show({
//														title : "错误",
//														msg : "上传失败:["
//																+ action.result.msg
//																+ "]",
//														icon : Ext.MessageBox.ERROR,
//														buttons : Ext.MessageBox.OK
//													});
										}
									});
								}
							});
				}
			}, */{
				text : '查看',
				iconCls : 'icon-home',
				handler : function() {
					var selection = _this.down("grid").getSelectionModel().getSelection();
					if (selection.length > 1|| selection.length <= 0) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '只允许编辑一条数据',
									icon : Ext.MessageBox.WARNING
								});
						return false;
					}
					
					var _fileType = selection[0].data["fileType"];
					if (_fileType == '1') {
						var _fileId = selection[0].data["fileId"];
						var _url = selection[0].data["urlFullPath"];
						var _store = _this.down("grid").store;
						var _index = selection[0].index;
						var _storeLength = _store.data.length;
						var imageId = Ext.id();
						var degree = 0;
						var bigImageArrayForm = Ext.create("Ext.form.Panel", {
									border : 0,
									layout : 'card',
									items : [{
												xtype : 'image',
												id : imageId,
												src : _url
											}]
								});
						Ext.create("Ext.window.Window", {
							title : '图片预览',
							modal : true,
							autoShow : true,
							border : false,
							floating : true,
							width : 600,
							height : 600,
							anchor : '100%',
							layout : 'fit',
							items : [bigImageArrayForm],
							buttons : [{
								text : '查看原图',
								handler : function() {
									window.open(_url); 
								}
							},{
								text : '顺时针旋转90°',
								handler : function() {
									degree = degree + 1;
									_this.rotate(document.getElementById(imageId),90 * degree);
								}

							}, {
								text : '逆时针旋转90°',
								handler : function() {
									degree = degree - 1;
									_this.rotate(document.getElementById(imageId),90 * degree);
								}

							}, {
								text : '上一张',
								handler : function() {
									if (_storeLength == 0) {
										Ext.messagebox.msg('提示', '本相册只有一张图片');
										return;
									}
									if (_index == 0) {
										Ext.messagebox.msg('提示', '这已经是第一张');
										return;
									}
									_index--;
									var imageField = Ext.getCmp(imageId);
									_url =  _store.data.getAt(_index).data.urlFullPath;
									imageField.setSrc(_url);
									//qsoft.PopBigImage.create(imageId,10,0,1,1,true);
								}
							}, {
								text : '下一张',
								handler : function() {
									if (_storeLength == 0) {
										Ext.messagebox.msg('提示', '本相册只有一张图片');
										return;
									}
									if (_index == (_storeLength - 1)) {
										Ext.messagebox.msg('提示', '这已经是最后一张');
										return;
									}
									_index++;
									var imageField = Ext.getCmp(imageId);
									_url =  _store.data.getAt(_index).data.urlFullPath;
									imageField.setSrc(_url);
									//qsoft.PopBigImage.create(imageId,10,0,1,1,true);
								}
							}/*,{
								text : '放大',
								handler : function() {
									qsoft.PopBigImage.create(imageId,10,0,1,1,true);
								}
							}*/]
						});
					} else {
						Ext.MessageBox.show({
							title : '警告',
							msg : '只能预览图片',
							icon : Ext.MessageBox.WARNING
						});
						return false;
					}
				}
			}, /*{
				text : '下载',
				iconCls : 'icon-home',
				handler : function() {
					var selection = _this.down("grid").getSelectionModel().getSelection();
					if (selection.length > 1|| selection.length <= 0) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '只允许编辑一条数据',
									icon : Ext.MessageBox.WARNING
								});
						return false;
					}
					
					var fileId = selection[0].data["fileId"];
					var url = StaticSetting.absUrl+ '/mis/myFile/downloadFile?fileId=' + fileId;
					var downloadForm = Ext.create("Ext.form.Panel",{
						border : 0,
						layout : 'fit',
						renderTo : Ext.getBody(),
						items : [ {
							xtype : 'PluginuxIFrame',
							src : url,
							listeners : {
								'load' : function() {
									Ext.messagebox.msg('提示','如未下载，表示文件不存在/已损坏');
								}
							}
						} ]
					});	

				}
			}, */{
				text : '删除文件',
				hidden : _this.allowUpdate,
				iconCls : 'icon-remove',
				handler : function() {
					var selection = _this.down("grid").getSelectionModel().getSelection();
					if (selection.length > 1 || selection.length <= 0) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '只允许编辑一条数据',
									icon : Ext.MessageBox.WARNING
								});
						return false;
					}
					var fileId = selection[0].data["fileId"];
					var me = this;
					Ext.MessageBox.show({
		                title: "警告",
		                msg: "您确定要删除该记录么?",
		                icon: Ext.MessageBox.WARNING,
		                buttons: Ext.MessageBox.OKCANCEL,
		                fn: function(buttonId) {
		                    if (buttonId === "ok") {
		                    	Ext.Ajax.request({
						            url: StaticSetting.absUrl + "/mis/myFile/deleByFileId",
						            params : {
						            	fileId : fileId
						            },
						            method: 'POST',
						            //async:'false',
						            success: function (response, options) {
						            	var resultJSON = Ext.JSON.decode(response.responseText);
						            	if(resultJSON.success){
						            		Ext.MessageBox.show({
						            			title : '提示',
						            			msg : '操作成功!',
						            			icon : Ext.MessageBox.INFO,
						            			buttons : Ext.MessageBox.OK
						            		});
						            		me.store.reload();
						            	} else{
						            		Ext.MessageBox.show({
						            			title : '警告',
						            			msg : resultJSON.msg,
						            			icon : Ext.MessageBox.WARNING,
						            			buttons : Ext.MessageBox.OK
						            		});
						            	}
						            },
						            failure: function (response, options) {
						                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
						            }
						        });
		                    }
		                }
	                });
				}
			}]
		}];
	},
	
	rotate : function(target, degree) {
		var userAgent = navigator.userAgent, isIE = /msie/i.test(userAgent)
				&& !window.opera, isWebKit = /webkit/i.test(userAgent), isFirefox = /firefox/i
				.test(userAgent);
		if (isWebKit) {
			target.style.webkitTransform = "rotate(" + degree + "deg)";
		} else if (isFirefox) {
			target.style.MozTransform = "rotate(" + degree + "deg)";
		} else if (isIE) {
			// chessDiv.style.filter =
			// "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + degree
			// + ")";
			degree = degree / 180 * Math.PI;
			var sinDeg = Math.sin(degree);
			var cosDeg = Math.cos(degree);

			target.style.filter = "progid:DXImageTransform.Microsoft.Matrix("
					+ "M11=" + cosDeg + ",M12=" + (-sinDeg) + ",M21=" + sinDeg
					+ ",M22=" + cosDeg + ",SizingMethod='auto expand')";
		} else {
			target.style.transform = "rotate(" + degree + "deg)";
		}
	}
});
