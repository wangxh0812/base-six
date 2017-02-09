Ext.define('Plugin.grid.UploadGridProduct', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.PlugingridUploadGridProduct',
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
								tCode : 'c_image_product_type',
								formUrl : _this.imageFormUrl,
								emptyText : '图片支持jpeg,jpg,gif,bmp,png格式',
								onUploadFile : function(_form) {
									var imageType = _form.getComponent("type");
									var formParams = Ext.apply(
											_this.imageFormParams, {
												imgType : imageType.getValue()
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
											Ext.MessageBox.show({
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
								tCode : 'c_document_type',
								formUrl : _this.fileFormUrl,
								onUploadFile : function(_form) {
									var fileType = _form.getComponent("type");
									var formParams = Ext.apply(
											_this.fileFormParams, {
												directoryType : fileType
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
											Ext.MessageBox.show({
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
				}
			},*/ {
				text : '查看/下载',
				iconCls : 'icon-home',
				handler : function() {
					var selection = _this.down("grid").getSelectionModel()
							.getSelection();
					if (selection.length > 1 || selection.length <= 0) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '只允许编辑一条数据',
									icon : Ext.MessageBox.WARNING
								});
						return false;
					}
					var _store = _this.down("grid").store;
					var _index = selection[0].index;
					var _storeLength = _store.data.length;
					
					var _url = selection[0].data["urlFullPath"];
					//var _fileType = selection[0].data["fileType"];
					var _fileType = "1";
					var _fileId = selection[0].data["imageId"];
					if (_fileType == '1') {
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
					} else if (_fileType == '2') {/*
						var url = StaticSetting.absUrl
								+ '/customerFile/downloadFile?customerFileId='
								+ _fileId;
						// document.location = encodeURI(url);
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
					*/} else if (_fileType == '3') {
						var _url = selection[0].data["urlFullPath"];
						// _url = 'http://movie.ks.js.cn/flv/other/1_0.flv';
						var srcValue = StaticSetting.absUrl
								+ '/swf/flvplayer.swf?vcastr_file=' + _url;// +'&BeginSwf=http://10.168.9.50/pic/537314ad917dacf10285bd33';
						var text = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="240" height="180">';
						text += '<param name="movie" value="' + srcValue + '">';
						text += '<param name="quality" value="high">';
						text += '<param name="allowFullScreen" value="true" />';
						text += '<embed src="'
								+ srcValue
								+ '" allowFullScreen="true" quality="high"  pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="320" height="240"></embed>';
						text += '</object>';
						var videoForm = Ext.create("Ext.form.Panel", {
									html : text
								});
						Ext.create("Ext.window.Window", {
									title : '查看视频',
									modal : true,
									autoShow : true,
									border : false,
									floating : true,
									width : 320,
									height : 280,
									anchor : '100%',
									layout : 'fit',
									items : [videoForm]
								});
					} else {
						Ext.MessageBox.show({
									title : '警告',
									msg : '该文件类型尚未提供相关服务!',
									icon : Ext.MessageBox.WARNING
								});
					}

				}
			}, {
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
					var _url = selection[0].data["urlFullPath"];
					var _fileType = selection[0].data["fileType"];
					var _fileId = selection[0].data["imageId"];
					var me = this;
					Ext.MessageBox.show({
		                title: "警告",
		                msg: "您确定要删除该记录么?",
		                icon: Ext.MessageBox.WARNING,
		                buttons: Ext.MessageBox.OKCANCEL,
		                fn: function(buttonId) {
		                    if (buttonId === "ok") {
		                    	Ext.Ajax.request({
						            url: StaticSetting.absUrl + "/mis/image/dele",
						            params : {
						            	imageId : _fileId
						            },
						            method: 'GET',
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
