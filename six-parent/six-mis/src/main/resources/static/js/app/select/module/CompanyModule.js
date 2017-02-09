Ext.define('FMS.app.select.module.CompanyModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleCompanyModule',
	requires : ['FMS.basic.store.Company'],
	initComponent : function() {
		var _store = Ext.create('FMS.basic.store.Company');
		Ext.apply(_store.proxy.extraParams, this.idParams);
		Ext.apply(this, {
					store : _store,
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()
				});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [{
					text : '经销商全称',
					dataIndex : 'companyCnname',
					width : 250
				}, {
					text : '经销商编码',
					dataIndex : 'companyCode',
					width : 150
				},{
					text : '机构等级',
					dataIndex : 'companyGradeName',
					width : 250
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
			items : ["名称：", filed1, "编码：", filed2, {
				fieldLabel: '等级',
             	name: 'companyGrade',
                xtype : 'ExtPluginFormCombobox',
                tCode : 'c_company_grade',
                itemId : 'companyGrade',
                typeAhead :false
			}, {
		        text: "查询",
		        iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							companyCnname : filed1.getValue(),
							companyCode : filed2.getValue(),
							companyGrade : this.ownerCt.getComponent("companyGrade").getValue()
						}
					});
				}
			} ]
		} ];
	},
	// 新增弹出窗口
	getWindowColumns : function() {return [];}
	
});