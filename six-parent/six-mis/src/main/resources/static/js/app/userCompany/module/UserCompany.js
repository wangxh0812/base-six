Ext.define('FMS.app.userCompany.module.UserCompany', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappuserCompanymoduleUserCompany',
	requires : [ 'FMS.app.userCompany.store.UserCompany', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm','FMS.app.select.module.CompanyShortModule',
			'Plugin.window.UploadWindow', 'FMS.app.select.module.UserModule','FMS.basic.module.Company','Plugin.form.MultiSelectionForm'
			],
	initComponent : function() {
		var _store = Ext.create('FMS.app.userCompany.store.UserCompany');
		if (!Ext.isEmpty(this.idParams)) {
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
			text : '登录账号',
			dataIndex : 'account',
			width : 100
		},{
			text : '登录账号所属机构',
			dataIndex : 'companySelfCnname',
			width : 130
		},{
			text : '关联机构全称',
			dataIndex : 'companyCnname',
			width : 130
		},{
			text : '关联机构编码',
			dataIndex : 'companyCode',
			width : 130
		},{
			text : '关联机构等级',
			dataIndex : 'companyGradeName',
			width : 130
		},{
			text : '关联机构上级单位',
			dataIndex : 'parentName',
			width : 130
		},{
			text : '关联机构品牌',
			dataIndex : 'autoBrandName',
			width : 130
		},{
			text : '创建时间',
			dataIndex : 'createTime',
			width : 100
		},{
			text : '更新时间',
			dataIndex : 'updateTime',
			width : 100
		},{
			text : '操作人',
			dataIndex : 'opUser',
			width : 80
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
							},  "->","登录账号:",field1,{
								text : "搜索",
								itemId : 'search',
								iconCls : 'icon-search',
								handler : function() {
									me.store.load({
										params : {
											account : field1.getValue()
										}
									});
								}
							}]
				}];
	},
	
	getWindowColumns : function() {
		return [ {
			fieldLabel : '逻辑ID',
			name : 'userCompanyId',
			hidden : true
		},{
    		xtype : 'ExtPluginSelectionForm',
			grid : "FMSappselectmoduleUserModule",
			hiddenFields : ['userId','companySelfId','companySelfCnname'],
			textField : "account",
			itemId : 'userSelectForm',
			textFeildName : "登录账号",
			windowTitle : '选择登录账号',
			windowWidth : 600,
			textFieldConfig : {
				allowBlank: false
			},
			selectedCallBack : function(record){
				var userId = this.getComponent("userId");
				var companySelfId = this.getComponent("companySelfId");
				var companySelfCnname = this.getComponent("companySelfCnname");
				userId.setValue(record.get("userId"));
				companySelfId.setValue(record.get("companyId"));
				companySelfCnname.setValue(record.get("companyName"));
			}
		}, {
    		xtype : 'ExtPluginMultiSelectionForm',
			grid : "FMSappselectmoduleCompanyShortModule",
			hiddenFields : [{fieldName:'companyIds',storeName:'companyId'}],
			textField : "companyShorten",
			itemId : 'customerSelectForm',
			textFeildName : "经销商简称",
			windowTitle : '选择经销商(可多选)',
			windowWidth : 600,
			textFieldConfig : {
				allowBlank: false
			}
		}];
	}

});