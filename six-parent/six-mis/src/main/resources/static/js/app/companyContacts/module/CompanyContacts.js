Ext.define('FMS.app.companyContacts.module.CompanyContacts', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappcompanyContactsmoduleCompanyContacts',
	requires : [ 'FMS.app.companyContacts.store.CompanyContacts', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm',
			'Plugin.window.UploadWindow','FMS.app.select.module.CompanyShortModule'
			],
	initComponent : function() {
		var _store = Ext.create('FMS.app.companyContacts.store.CompanyContacts');
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
			text : '经销商编码',
			dataIndex : 'companyCode',
			width : 100
		},{
			text : '经销商简称',
			dataIndex : 'companyShorten',
			width : 150
		},{
			text : '经销商电话',
			dataIndex : 'companyTelephone',
			width : 150
		},{
			text : '业务联系人',
			dataIndex : 'contactsName',
			width : 150
		},{
			text : '业务联系人职务',
			dataIndex : 'contactsResign',
			width : 150
		},{
			text : '业务联系人电话',
			dataIndex : 'contactsPhone',
			width : 150
		},{
			text : '维护时间',
			dataIndex : 'updateTime',
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
		
		return [{
					xtype : 'toolbar',
					dock : 'top',
					items : [{
								xtype : 'ExtPluginGridAdd',
								customParameter : {
									items : me.getWindowColumns2()
								}
							}, {
								xtype : 'ExtPluginGridEdit',
								customParameter : {
									items : me.getWindowColumns()
								}
							}, {
								xtype : 'ExtPluginGridDel'
							},  "->","经销商简称:",field1,"业务联系人:",field2,{
								text : "搜索",
								itemId : 'search',
								iconCls : 'icon-search',
								handler : function() {
									me.store.load({
										params : {
											companyShorten : field1.getValue(),
											contactsName : field1.getValue()
										}
									});
								}
							}]
				}];
	},
	
	getWindowColumns : function() {
		return [ {
			fieldLabel : '逻辑ID',
			name : 'contactsId',
			hidden : true
		},{
			fieldLabel : '经销商编码',
			name : 'companyCode',
			emptyText : '经销商编码',
		    maxLength : 20,
		    readOnly : true
		},{
			fieldLabel : '经销商简称',
			name : 'companyShorten',
			emptyText : '经销商简称',
		    maxLength : 20,
		    readOnly : true
		},{
			fieldLabel : '经销商电话',
			name : 'companyTelephone',
			emptyText : '经销商电话',
		    maxLength : 20,
		    readOnly : true
		},{
			fieldLabel : '业务联系人',
			name : 'contactsName',
			emptyText : '业务联系人',
		    maxLength : 20,
		    allowBlank : false
		},{
			fieldLabel : '业务联系人职务',
			name : 'contactsResign',
			emptyText : '业务联系人职务',
		    maxLength : 20,
		    allowBlank : false
		},{
			fieldLabel : '业务联系人电话',
			name : 'contactsPhone',
			emptyText : '业务联系人电话',
		    maxLength : 11,
		    allowBlank : false
		} ];
	},
	
	getWindowColumns2 : function() {
		return [ {
			fieldLabel : '逻辑ID',
			name : 'contactsId',
			hidden : true
		},{
    		xtype : 'ExtPluginSelectionForm',
			grid : "FMSappselectmoduleCompanyShortModule",
			hiddenFields : ['companyId'],
			textField : "companyShorten",
			itemId : 'customerSelectForm',
			textFeildName : "经销商简称",
			windowTitle : '选择经销商',
			windowWidth : 600,
			textFieldConfig : {
				allowBlank : false,
				width : 485
			}
		},{
			fieldLabel : '业务联系人',
			name : 'contactsName',
			emptyText : '业务联系人',
		    maxLength : 20,
		    allowBlank : false
		},{
			fieldLabel : '业务联系人职务',
			name : 'contactsResign',
			emptyText : '业务联系人职务',
		    maxLength : 20,
		    allowBlank : false
		},{
			fieldLabel : '业务联系人电话',
			name : 'contactsPhone',
			emptyText : '业务联系人电话',
		    maxLength : 11,
		    allowBlank : false
		} ];
	}

});