Ext.define('FMS.app.dealer.module.DealerUser', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSappdealermoduleDealerUser',
			requires : ['FMS.app.dealer.store.DealerUser','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','Plugin.form.SelectionForm','Plugin.form.CascadeForm','Plugin.window.UploadWindow','FMS.app.select.module.DealerModule'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.dealer.store.DealerUser');
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
							text : '姓名',
							dataIndex : 'name',
							width : 100
						}, {
							text : '手机',
							dataIndex : 'mobilePhone',
							width : 100
						}, {
							text : '级别',
							dataIndex : 'grade',
							renderer : function(val){
								if(val=='1')
									return "销售";
								if(val=='2')
									return "主管";
								return val;
							},
							width : 100
						},{
							text : '身份证',
							dataIndex : 'certifyCode',
							width : 180
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
									},/*{
										xtype : 'button',
										text : '导入',
										iconCls : 'icon-add',
										handler : function() {
											me.getImportWindow();
										}
									},*/"->", "姓名：", field1, "手机号码：", field2,{
										text : "搜索",
										iconCls : 'icon-search',
										handler : function() {
											me.store.load({
												params : {
													name : field1.getValue(),
													mobilePhone : field2.getValue()
												}
											});
										}
									}]
								} ];
			}/*,
			getImportWindow : function(){	
				var _this = this;
				var importWindow = Ext.create("Plugin.window.UploadWindow", {
					title : '上传文件',
					hiddenType : true,
					formUrl : StaticSetting.absUrl + '/mis/productPrice/upload',
					onUploadFile : function(_form) {
						var formParams = _this.store.proxy.extraParams;
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
				importWindow.show();
			}*/,
			getWindowColumns : function() {
				return [{
							fieldLabel : '逻辑ID',
							name : 'dealerUserId',
							hidden : true
						}, 			
						/*{
		     				xtype : 'ExtPluginSelectionForm',
		     				textFeildName : "经销商名称",
		     				windowTitle : '选择经销商',
		     				grid : "FMSappselectmoduleDealerModule",
		     				itemId : 'dealerSelectForm',
		     				hiddenFields : ['dealerId'],
		     				textFieldConfig : {
		     					allowBlank : false
		     				},
		     				textField : {
		     					fieldName : 'dealerName',
		     					storeName : 'dealerName'
		     				},
		     				windowWidth : 600
		            	}, */{
							fieldLabel : '姓名',
							name : 'name',
							emptyText : '姓名',
							maxLength : 30,
							allowBlank : false
						}, {
							fieldLabel : '身份证号码',
							name : 'certifyCode',
							emptyText : '身份证号码',
							maxLength : 20
						},
						{
							name : 'grade',
							fieldLabel : '级别',
							xtype : 'ExtPluginFormCombobox',
							tCode : 'c_dealerUser_grade',
							margins : '0 0 5 0',
							forceSelection : true,
							typeAhead : false,
							editable : false,
							allowBlank : false
						},
						{
							fieldLabel : '手机号码',
							name : 'mobilePhone',
							emptyText : '手机号码',
							maxLength : 11,
							emptyText : '手机号码',
							allowBlank : false,
							regex : /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/,
							regexText : "不合法的手机号!"
						}];
			}
		});