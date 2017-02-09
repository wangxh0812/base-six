Ext.define('FMS.app.statistics.module.ContractDetailSearch', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappstatisticsmoduleContractDetailSearch',
	requires : [ 'FMS.app.statistics.store.ContractDetailSearch', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.MultiSelectionForm',
	             'Plugin.ux.IFrame','FMS.app.select.module.CompanyShortModule','FMS.app.select.module.CompanyStatisticsModule',
	             'FMS.app.select.module.AutoBrandModule', 'Plugin.form.SelectionForm'],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.app.statistics.store.ContractDetailSearch');
		_store.on('beforeload', function(_store, options) {
			var new_params = Ext.Object.fromQueryString("riskCode=1");
			Ext.apply(_store.proxy.extraParams, new_params);
		});
		Ext.apply(this, {
			store : _store,
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.editRows = this.openEdit;
		this.callParent(arguments);
	},
	getGridColumns : function() {
		return [ {
			text : '保存日期',
			dataIndex : 'saveDatetime',
			width : 100
		}, {
			text : '经销商全称',
			dataIndex : 'companyName',
			width : 200
		}, {
			text : '车主',
			dataIndex : 'customerName',
			width : 100
		}, {
			text : '证件类型',
			dataIndex : 'customerIdTypeName',
			width : 100,
		}, {
			text : '证件号码',
			dataIndex : 'customerIdNo',
			width : 100
		}, {
			text : '联系方式',
			dataIndex : 'customerPhone',
			width : 100
		}, {
			text : '首次购车日期',
			dataIndex : 'firstBuyDate',
			width : 100
		}, {
			text : '车辆状态',
			dataIndex : 'autoStatusName',
			width : 100,
		}, {
			text : '车牌号码',
			dataIndex : 'autoNo',
			width : 100
		}, {
			text : '发动机号码',
			dataIndex : 'autoEngineNo',
			width : 100
		}, {
			text : '车辆识别代码（VIN码）',
			dataIndex : 'autoVinNo',
			width : 100
		}, {
			text : '品牌',
			dataIndex : 'autoBrandName',
			width : 100
		}, {
			text : '车系',
			dataIndex : 'autoSeriesName',
			width : 100
		}, {
			text : '车型',
			dataIndex : 'autoModelsName',
			width : 180
		}, {
			text : '车型六位码',
			dataIndex : 'autoModelsCode',
			width : 180
		}, {
			text : '车辆发票金额（元）',
			dataIndex : 'fapiaoAmount',
			width : 100
		}, {
			text : '购置费用（元）',
			dataIndex : 'gouzhishuiAmount',
			width : 100
		}, {
			text : '价税合计（元）',
			dataIndex : 'jiashuiAmount',
			width : 100
		}, {
			text : '车险保险公司',
			dataIndex : 'insuranceCodeName',
			width : 100
		}, {
			text : '服务类型',
			dataIndex : 'serviceTypeName',
			width : 150,
		}, {
			text : '服务售价（元）',
			dataIndex : 'servicePrice',
			width : 90
		}, {
			text : '结算金额（元）',
			dataIndex : 'settlementAmount',
			width : 90
		}, {
			text : '服务起始时间',
			dataIndex : 'serviceBeginDate',
			width : 100
		}, {
			text : '服务期限',
			dataIndex : 'servicePeriod',
			width : 100
		}, {
			text : '服务终止日期',
			dataIndex : 'sericeEndDate',
			width : 100
		}, {
			text : '销售人员',
			dataIndex : 'salesName',
			width : 100
		}, {
			text : '合同号码',
			dataIndex : 'contractNo',
			width : 100
		}, {
			text : '附加服务',
			dataIndex : 'additionalService',
			width : 100
		}, {
			text : '备注',
			dataIndex : 'remark',
			width : 200
		}, {
			text : '主数据状态',
			dataIndex : 'statusName',
			width : 80,
		}];
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
							text : '导出',
							iconCls : 'icon-excel',
							handler : function() {
								me.getDownWindow();
						}
					},"->", "经销商简称：",field1
					,"保存日期起期:",{
						xtype : 'datefield',
		            	fieldLable : '',
		            	format : 'Y-m-d',
		            	width :100,
		            	name : 'saveDatetimeBegin',
		            	itemId : 'saveDatetimeBegin'
					},"保存日期止期:",{
						xtype : 'datefield',
		            	fieldLable : '',
		            	format : 'Y-m-d',
		            	width :100,
		            	name : 'saveDatetimeEnd',
		            	itemId : 'saveDatetimeEnd'
					},{
						text : "查询",
						itemId : 'search',
						iconCls : 'icon-search',
						handler : function() {
							me.store.load({
								params : {
									companyShortName : field1.getValue(),
									saveDatetimeBegin: Ext.Date.format(this.ownerCt.getComponent("saveDatetimeBegin").getValue(),"Y-m-d"),
									saveDatetimeEnd: Ext.Date.format(this.ownerCt.getComponent("saveDatetimeEnd").getValue(),"Y-m-d")
								}
							});
						}
					},{
						text : '高级搜索',
						iconCls : 'icon-search',
						handler : function(){
							me.advancedSearch();
						}
					}]
				}];
	},
	
	/**
	 * 导出
	 */
	getDownWindow : function(){
		var _form = Ext.create("Ext.form.Panel",{
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [/*{
            		xtype : 'ExtPluginMultiSelectionForm',
					grid : "FMSappselectmoduleCompanyShortModule",
					hiddenFields : [{fieldName:'companyIds',storeName:'companyId'}],
					textField : "companyShorten",
					itemId : 'customerSelectForm',
					textFeildName : "经销商简称",
					windowTitle : '选择经销商',
					windowWidth : 600,
					textFieldConfig : {
						width : 400
					}
				},*/{
            		xtype : 'ExtPluginMultiSelectionForm',
					grid : "FMSappselectmoduleCompanyStatisticsModule",
					hiddenFields : [{fieldName:'companyCodes',storeName:'companyCode'}],
					textField : "companyShorten",
					itemId : 'customerSelectForm',
					textFeildName : "经销商简称",
					windowTitle : '选择经销商',
					windowWidth : 600,
					textFieldConfig : {
						width : 400
					}
				},{
					fieldLabel : '险种',
					name : 'riskCode',
					value : 1,
					hidden : true
				},{
	                fieldLabel: '主数据状态',
	             	name: 'status',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_contract_status',
	                itemId : 'status',
	                typeAhead :false,
	                emptyText: '主数据状态'
				},{
	            	xtype : 'datefield',
	            	fieldLabel : '保存日期起期',
	            	format : 'Y-m-d',
	            	name : 'saveDatetimeBegin',
	            	itemId : 'saveDatetimeBegin'
	            },{
	            	xtype : 'datefield',
	            	fieldLabel : '保存日期止期',
	            	format : 'Y-m-d',
	            	name : 'saveDatetimeEnd',
	            	itemId : 'saveDatetimeEnd'
	            },{
					fieldLabel : '合同号码',
					name : 'contractNo'
				},{
					fieldLabel : '车主',
					name : 'customerName'
				},{
	                 fieldLabel: '车辆状态',
	              	 name: 'autoStatus',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_auto_status',
	                 itemId : 'autoStatus',
	                 typeAhead :false,
	                 emptyText: '车辆状态'
				},{
	                 fieldLabel: '服务类型',
	              	 name: 'serviceType',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_service_type',
	                 itemId : 'serviceType',
	                 width :120,
	                 //forceSelection : true,
	                 //editable : false,
	                 typeAhead :false,
	                 emptyText: '服务类型'
				},{
	                fieldLabel: '服务期限',
	             	name: 'servicePeriod',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_service_period',
	                itemId : 'servicePeriod',
	                width :120,
	                //forceSelection : true,
	                //editable : false,
	                typeAhead :false,
	                emptyText: '服务期限'
				},{
            		xtype : 'ExtPluginSelectionForm',
					grid : "FMSappselectmoduleAutoBrandModule",
					hiddenFields : [{fieldName:'autoBrandId',storeName:'autoBrandId'}],
					textField : "autoBrandName",
					itemId : 'autoBrandNameForm',
					textFeildName : "品牌",
					windowTitle : '选择品牌',
					windowWidth : 800,
					textFieldConfig : {
//						width : 400
					}
				}]
		});
		var downWindow = Ext.create("Ext.window.Window", {
			modal : true,
			border : false,
			floating : true,
			width : 450,
			layout : 'form',
			title : '筛选导出',
			items : [_form],
			buttons : [{
				text : '导出',
				handler : function(){
					if (!_form.getForm().isValid()) {
			    		Ext.MessageBox.show({
							title : '警告',
							msg : "请根据提示正确输入相关信息!",
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
						return false;
			    	}
					var resultJson = _form.getForm().getValues();
					var url = StaticSetting.absUrl + '/contractDetailExport/export?'+Ext.Object.toQueryString(resultJson);
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
				}
			}]
		});
		downWindow.show();
	},
	
	//高级搜索
	advancedSearch : function(){
		var me = this;
		var _form = Ext.create("Ext.form.Panel",{
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
            		xtype : 'ExtPluginMultiSelectionForm',
					grid : "FMSappselectmoduleCompanyStatisticsModule",
					hiddenFields : [{fieldName:'companyCodes',storeName:'companyCode'}],
					textField : "companyShorten",
					itemId : 'customerSelectForm',
					textFeildName : "经销商简称",
					windowTitle : '选择经销商',
					windowWidth : 600,
					textFieldConfig : {
						width : 400
					}
				}, {
	                fieldLabel: '主数据状态',
	             	name: 'status',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_contract_status',
	                itemId : 'status',
	                typeAhead :false,
	                emptyText: '主数据状态'
				},{
	            	xtype : 'datefield',
	            	fieldLabel : '保存日期起期',
	            	format : 'Y-m-d',
	            	name : 'saveDatetimeBegin',
	            	itemId : 'saveDatetimeBegin'
	            },{
	            	xtype : 'datefield',
	            	fieldLabel : '保存日期止期',
	            	format : 'Y-m-d',
	            	name : 'saveDatetimeEnd',
	            	itemId : 'saveDatetimeEnd'
	            },{
	                 fieldLabel: '车辆状态',
	              	 name: 'autoStatus',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_auto_status',
	                 itemId : 'autoStatus',
	                 typeAhead :false,
	                 emptyText: '车辆状态'
				},{
	                 fieldLabel: '服务类型',
	              	 name: 'serviceType',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_service_type',
	                 itemId : 'serviceType',
	                 width :120,
	                 //forceSelection : true,
	                 //editable : false,
	                 typeAhead :false,
	                 emptyText: '服务类型'
				},{
	                fieldLabel: '服务期限',
	             	name: 'servicePeriod',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_service_period',
	                itemId : 'servicePeriod',
	                width :120,
	                //forceSelection : true,
	                //editable : false,
	                typeAhead :false,
	                emptyText: '服务期限'
				},{
            		xtype : 'ExtPluginSelectionForm',
					grid : "FMSappselectmoduleAutoBrandModule",
					hiddenFields : [{fieldName:'autoBrandId',storeName:'autoBrandId'}],
					textField : "autoBrandName",
					itemId : 'autoBrandNameForm',
					textFeildName : "品牌",
					windowTitle : '选择品牌',
					windowWidth : 800,
					textFieldConfig : {
//						width : 400
					}
				}]
		});
		var searchWindow = Ext.create("Ext.window.Window", {
			modal : true,
			border : false,
			floating : true,
			width : 450,
			layout : 'form',
			title : '高级搜索',
			items : [_form],
			buttons : [{
				text : "确定",
				handler : function(){
					var formParams = _form.getForm().getValues();
					me.store.load({
						params : formParams
					});
					searchWindow.close();
				}
			},{
				text : "取消",
				handler : function(){
					searchWindow.close();
				}
			}]
		});
		searchWindow.show();
	}
	
});