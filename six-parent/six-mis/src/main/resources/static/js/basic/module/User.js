Ext.define('FMS.basic.module.User', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSbasicmoduleUser',
	requires : [ 'FMS.basic.store.User', 'Plugin.form.combobox.Module',
			'Plugin.combo.Combotree','Plugin.form.SelectionForm','FMS.app.select.module.CompanyModule','Plugin.ux.IFrame' ],
	initComponent : function() {
		Ext.apply(this, {
			store : Ext.create('FMS.basic.store.User'),
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.callParent(arguments);
	},
	getGridColumns : function() {
		return [ {
			text : '登录账号',
			dataIndex : 'account',
			width : 150
		}, {
			text : '姓名',
			dataIndex : 'realName',
			width : 200
		}, {
			text : '电话',
			dataIndex : 'tel',
			width : 200
		}, {
			text : '邮箱',
			dataIndex : 'email',
			width : 250
		}, {
			text : '状态',
			dataIndex : 'status',
			width : 100,
			renderer : function(val) {
				if (val == "1") {
					return '有效';
				}
				return '无效';
			}
		}, /*{
			text : '最后登录时间',
			dataIndex : 'lastLoginTime',
			width : 150
		},*/ {
			text : '最后登录IP',
			dataIndex : 'lastLoginIp',
			width : 150
		}, {
			text : '最后更新时间',
			dataIndex : 'updateTime',
			width : 150
		}, {
			text : '所属公司',
			dataIndex : 'companyName',
			flex : 1
		}];
	},
	// 按钮栏
	getGridDockedItems : function() {
		var _this = this;
		var filed1 = new Ext.form.Field();
		var filed2 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {
				xtype : 'ExtPluginGridAdd',
				customParameter : {
					items : _this.getWindowColumns()
				}
			}, {
				xtype : 'ExtPluginGridEdit',
				customParameter : {
					items : _this.getWindowColumns()
				}
			}, {
				xtype : 'ExtPluginGridDel'
			},{
				text : '重置密码',
				iconCls : 'icon-help',
				handler : function() {

					var selection = _this.down("grid").getSelectionModel()
							.getSelection();
					if (selection.length > 1 || selection.length <= 0) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '只允许编辑一条数据!',
									icon : Ext.MessageBox.WARNING
								});
						return false;
					}
					var userId=selection[0].getData().userId;
					  Ext.MessageBox.show({
                          title: "警告",
                          msg: "您确定要重置密码吗？重置密码将把密码设置为登录帐号！",
                          icon: Ext.MessageBox.WARNING, //INFO WARNING  QUESTION ERROR  
                          buttons: Ext.MessageBox.OKCANCEL, //CANCEL OKCANCEL NO OK YES YESNO YESNOCANCEL 
                          fn: function(buttonId) {
                              if (buttonId === "ok") {
                            	  _this.resetPass(userId);
                              }
                          }
					  });
					
				}
			
			}, {
				text : '模板',
				iconCls : 'icon-excel',
				handler : function() {
					_this.getDownExcelTpl();
				}
			}, {
				xtype : 'button',
				text : '导入',
				iconCls : 'icon-add',
				handler : function() {
					_this.getImportWindow();
				}
			}, "->", "用户账号：", filed1, "用户名称：", filed2, {
		        text: "查询",
		        iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							account : filed1.getValue(),
							realName : filed2.getValue()
						}
					});
				}
			} ]
		} ];
	},
	
	resetPass:function(userId){
		var me=this;
		Ext.Ajax.request({
            url: StaticSetting.absUrl+"/user/resetPass",
            jsonData : {userId:userId
            },
            method: 'POST',
            success: function (response, options) {
            	var resultJSON = Ext.JSON.decode(response.responseText);
            	if(resultJSON.success){
            		Ext.MessageBox.show({
            			title : '提示',
            			msg : '操作成功!',
            			icon : Ext.MessageBox.INFO,
            			buttons : Ext.MessageBox.OK
            		});
            		
            	} else{
            		Ext.MessageBox.show({
            			title : '警告',
            			msg : resultJSON.msg,
            			icon : Ext.MessageBox.WARNING,
            			buttons : Ext.MessageBox.OK
            		});
            	}
            	
            }
		})
	},
	
	// 新增弹出窗口
	getWindowColumns : function() {
		return [ {
			name : 'account',
			fieldLabel : '登录账号',
			allowBlank : false
		}, {
			name : 'realName',
			fieldLabel : '姓名',
			allowBlank : false
		}, {
			name : 'tel',
			fieldLabel : '电话'
		}, {
			name : 'email',
			fieldLabel : '邮箱'
		}, {
			name : 'status',
			xtype : 'ExtPluginFormCombobox',
			tCode : 'c_status',
			fieldLabel : '状态'
		},{
			xtype : 'ExtPluginSelectionForm',
			grid : "FMSappselectmoduleCompanyModule",
			hiddenFields : ['companyId'],
			textField : {
				fieldName : "companyName",
				storeName : 'companyCnname'
			},
			textFeildName : "经销商",
			windowTitle : '选择经销商',
			margins: '0 0 5 0',
			windowWidth : 800
    	} /*{
				xtype : 'ExtPluginSelectionForm',
				grid : "FMSappselectmoduleSaleTeamModule",
				hiddenFields : ['saleTeamId'],
				textField : 'saleTeamName',
				textFeildName : "所属团队",
				windowTitle : '选择团队',
				windowWidth : 600
			}*/
    	
    	/*, {
			name : 'companyName',
			keyName : 'companyId',
			xtype : 'combotree',
			fieldLabel : '所属公司',
			rootId : '',
			storeUrl : StaticSetting.absUrl + '/company/getCompanyTree',
			id : 'cmbucJS',
			selectMode : 'all',
			treeHeight : 300,
			expanded : true
		}, {
			name : 'companyId',
			hidden : true
		}*/];
	},
	
	getDownExcelTpl:function(){
		var me = this;
		var url = StaticSetting.absUrl + '/file/downExcelTpl/AdminUser.xlsx';
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
	},
	
	getImportWindow : function(){	
		var _this = this;
		var importWindow = Ext.create("Plugin.window.UploadWindowDaibu", {
			title : '选择文件',
			hiddenType : true,
			formUrl : StaticSetting.absUrl + '/user/upload',
			onUploadFile : function(_form) {
				var formParams = {};
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
								msg : "导入成功！",
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
							msg : "导入失败:["
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
	}
});
