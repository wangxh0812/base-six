Ext.define('FMS.app.select.module.CompanyShortModule', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappselectmoduleCompanyShortModule',
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
					text : '经销商简称',
					dataIndex : 'companyShorten',
					width : 250
				}, {
					text : '经销商编码',
					dataIndex : 'companyCode',
					width : 100
				}, {
					text : '机构等级',
					dataIndex : 'companyGradeName',
					width : 80
				}, {
					text : '经销商经营品牌',
					dataIndex : 'autoBrandName',
					width : 100
				}];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var _this = this;
		var filed1 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : ["经销商简称：", filed1, {
		        text: "查询",
		        iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							companyShorten : filed1.getValue(),
						}
					});
				}
			} ]
		} ];
	},
	// 新增弹出窗口
	getWindowColumns : function() {return [];}
	
});