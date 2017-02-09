Ext.define('FMS.basic.module.Company', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSbasicmoduleCompany',
	requires : [ 'FMS.basic.store.Company', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.SelectionForm',
	             'FMS.app.select.module.CompanyModule','FMS.app.select.module.AutoBrandModule','Plugin.ux.IFrame' ],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.basic.store.Company');
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
		return [ {
			text : '经销商全称',
			dataIndex : 'companyCnname',
			width : 200
		}, {
			text : '经销商编码',
			dataIndex : 'companyCode',
			width : 100
		}, {
			text : '经销商简称',
			dataIndex : 'companyShorten',
			width : 100
		}, {
			text : '机构状态',
			dataIndex : 'status',
			width : 60,
			renderer : function(val) {
				if (val == '1') {
					return "正常";
				} else if (val == '2') {
					return "注销";
				} 
				return val;
			}
		}, {
			text : '法人',
			dataIndex : 'companyPerson',
			width : 60
		}, /*{
			text : '省',
			dataIndex : 'companyStateName',
			width : 100
		}, {
			text : '市',
			dataIndex : 'companyCityName',
			width : 100
		}, {
			text : '区/县',
			dataIndex : 'companyDistrictName',
			width : 100
		}, */{
			text : '经销商地址',
			dataIndex : 'companyAdress',
			width : 300
		}, {
			text : '邮编',
			dataIndex : 'companyPostcode',
			width : 90
		}, {
			text : '电话',
			dataIndex : 'companyTelephone',
			width : 110
		}, {
			text : '传真',
			dataIndex : 'companyFax',
			width : 100
		}, {
			text : '上级单位',
			dataIndex : 'parentName',
			width : 200
		}, {
			text : '机构等级',
			dataIndex : 'companyGradeName',
			width : 80
		}, {
			text : '账户名称',
			dataIndex : 'accountName',
			width : 200
		}, {
			text : '账号',
			dataIndex : 'accountNo',
			width : 200
		}, {
			text : '开户行名称',
			dataIndex : 'accountBankName',
			width : 200
		}, {
			text : '经销商经营品牌',
			dataIndex : 'autoBrandName',
			width : 100
		}, {
			text : '创建日期',
			dataIndex : 'createTime',
			width : 100
		}, {
			text : '更新日期',
			dataIndex : 'updateTime',
			width : 100
		}, {
			text : '操作者',
			dataIndex : 'opUser',
			width : 100
		}];
	},
	// 按钮栏
	getGridDockedItems : function() {
		var _this = this;
		var filed1 = new Ext.form.Field();
		var filed2 = new Ext.form.Field();
		var filed3 = new Ext.form.Field();
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
			}, "->", "经销商名称：", filed1, "经销商编码：", filed2, "上级单位：", filed3, {
				text : "查询",
				iconCls : 'icon-search',
//				handler : function() {
//					_this.store.load({
//						params : {
//							companyCnname : filed1.getValue(),
//							companyCode: filed2.getValue(),
//							parentName: filed3.getValue()
//						}
//					});
//				}
				handler : function() {
					Ext.apply(_this.store.proxy.extraParams,{
						companyCnname : filed1.getValue(),
						companyCode: filed2.getValue(),
						parentName: filed3.getValue()
					});
					_this.store.load();
				}
			} ]
		} ];
	},
	// 新增弹出窗口
	getWindowColumns : function() {
		return [ {
			name : 'companyCnname',
			fieldLabel : '经销商全称',
			allowBlank : false
		}, {
			name : 'companyCode',
			fieldLabel : '经销商编码',
			allowBlank : false
		}, {
			name : 'companyShorten',
			fieldLabel : '公司简称'
		}, {
			name : 'companyPerson',
			fieldLabel : '法人'
		},/*{
			xtype : 'PluginformCascadeForm',
			name : 'test',
			code : '000000',
			firstCombo:true,
			columnWidth : .94,
			combos : ['companyStateName','companyCityName','companyDistrictName'],
			nextCombo : null,
			fieldLabel : '地区'
		},*/{
			name : 'companyAdress',
			fieldLabel : '地址'
		}, {
			name : 'companyPostcode',
			fieldLabel : '邮编'
		}, {
			name : 'companyTelephone',
			fieldLabel : '电话'
		}, {
			name : 'companyFax',
			fieldLabel : '传真'
		},{
			name : 'companyGrade',
			xtype : 'ExtPluginFormCombobox',
			tCode : 'c_company_grade',
			fieldLabel : '机构等级'
		},{
			name : 'status',
			xtype : 'ExtPluginFormCombobox',
			tCode : 'c_company_status',
			fieldLabel : '机构状态'
		},{
			xtype : 'ExtPluginSelectionForm',
			grid : "FMSappselectmoduleCompanyModule",
			hiddenFields : [{
				fieldName : "parentId",
				storeName : 'companyId'
			}],
			textField : {
				fieldName : "parentName",
				storeName : 'companyCnname'
			},
			textFeildName : "上级单位",
			windowTitle : '选择上级单位',
			margins: '0 0 5 0',
			windowWidth : 800
    	},{
			name : 'accountName',
			fieldLabel : '账户名称'
		}, {
			name : 'accountNo',
			fieldLabel : '账号'
		}, {
			name : 'accountBankName',
			fieldLabel : '开户行名称'
		}, {
			xtype : 'ExtPluginSelectionForm',
			grid : "FMSappselectmoduleAutoBrandModule",
			hiddenFields : [{
				fieldName : "autoBrandId",
				storeName : 'autoBrandId'
			}],
			textField : {
				fieldName : "autoBrandName",
				storeName : 'autoBrandName'
			},
			textFeildName : "经销商经营品牌",
			windowTitle : '选择经销商经营品牌',
			margins: '0 0 5 0',
			windowWidth : 800
    	}];
	},
	
	getDownExcelTpl:function(){
		var me = this;
		var url = StaticSetting.absUrl + '/file/downExcelTpl/Company.xlsx';
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
			formUrl : StaticSetting.absUrl + '/mis/company/upload',
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