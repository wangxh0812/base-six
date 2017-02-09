Ext.define('FMS.app.daibu.module.ContractDaibu', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappdaibumoduleContractDaibu',
	requires : [ 'FMS.app.daibu.store.ContractDaibu', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.SelectionForm','FMS.basic.module.Company',
	             'FMS.app.companyContacts.module.CompanyContacts','FMS.app.select.module.AutoBrandModule',
	             'FMS.app.select.module.AutoSeriesModule','FMS.app.select.module.AutoModelsModule','Plugin.ux.IFrame','Plugin.window.UploadWindowDaibu'],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.app.daibu.store.ContractDaibu');
		_store.on('beforeload', function(_store, options) {
			var new_params = Ext.Object.fromQueryString("riskCode=2");
			Ext.apply(_store.proxy.extraParams, new_params);
		});
		Ext.apply(this, {
			store : _store,
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.editRows = this.openEdit;
		this.applyVType();
		this.callParent(arguments);
	},
	getGridColumns : function() {
		return [ {
			text : '序号',
			dataIndex : 'id',
			width : 45
		}, {
			text : '专营店品牌',
			dataIndex : 'companyShortName',
			width : 80
		}, {
			text : '区域',
			dataIndex : 'regionName',
			width : 80
		}, {
			text : '省份',
			dataIndex : 'provinceName',
			width : 80
		}, {
			text : '城市',
			dataIndex : 'cityName',
			width : 80
		}, {
			text : '一级网点',
			dataIndex : 'companyShortName2',
			width : 80
		}, {
			text : '二级网点',
			dataIndex : 'companyShortName3',
			width : 80
		}, {
			text : '专营店编号',
			dataIndex : 'companyCode',
			width : 80
		}, /*{
			text : '代步险信息单ID',
			dataIndex : 'contractId',
			width : 120
		}, */{
			text : '被保险人',
			dataIndex : 'customerName',
			width : 80
		}, {
			text : '车辆品牌',
			dataIndex : 'autoBrandName',
			width : 80
		}, {
			text : '车系',
			dataIndex : 'autoSeriesName',
			width : 80
		}, {
			text : '车型',
			dataIndex : 'autoModelsName',
			width : 180
		}, {
			text : '车牌号',
			dataIndex : 'autoNo',
			width : 80
		}, {
			text : 'VIN码',
			dataIndex : 'autoVinNo',
			width : 130
		}, {
			text : '签单日期',
			dataIndex : 'saveDatetime',
			width : 100
		}, {
			text : '起保日期',
			dataIndex : 'insuranceBeginDate',
			width : 100
		}, {
			text : '终保日期',
			dataIndex : 'insuranceEndDate',
			width : 100
		}, {
			text : '商业险保单号',
			dataIndex : 'busiPolicyNo',
			width : 150
		}, {
			text : '保险公司',
			dataIndex : 'insuranceName',
			width : 80
		}, /*{
			text : '商业险签单保费',
			dataIndex : 'signPolicyPremium',
			width : 80
		}, */{
			text : '首次上传日期',
			dataIndex : 'createTime',
			width : 100
		}, {
			text : '最新上传日期',
			dataIndex : 'updateTime',
			width : 100
		}, {
			text : '交车日期',
			dataIndex : 'deliverCarDate',
			width : 100
		}, {
			text : '审核日期',
			dataIndex : 'auditDate',
			width : 100
		}, {
			text : '代步车类型',
			dataIndex : 'daibuTypeName',
			width : 80
		}, {
			text : '代步车服务类型',
			dataIndex : 'daibuServiceTypeName',
			width : 100
		}, {
			text : '代步车保费',
			dataIndex : 'daibuPremium',
			width : 80
		}, {
			text : '代步车日租金',
			dataIndex : 'feePerDay',
			width : 80
		}, {
			text : '驳回原因',
			dataIndex : 'remark',
			width : 150
		}, {
			text : '代步车服务状态',
			dataIndex : 'daibuServiceStatusName',
			width : 100
		}];
	},
	// 按钮栏
	getGridDockedItems : function() {
		var _this = this;
		var startTimeId = Ext.id();
		var endTimeId = Ext.id();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			itemId : 'toolbar1',
			items : [{
				xtype : 'button',
				text : '导入承保信息',
				iconCls : 'icon-add',
				handler : function() {
					_this.getImportWindow("underwrite");
				}
			}, {
				text : '导出进行审核',
				iconCls : 'icon-excel',
				handler : function() {
					_this.getDownWindow();
				}
			}, {
				text : '导入审核结果',
				iconCls : 'icon-excel',
				handler : function() {
					_this.getImportWindow("audit");
				}
			}, {
				xtype : 'ExtPluginGridDel',
				listeners : {
					"click" : function() {
						var selection = _this.down("grid").getSelectionModel().getSelection();
						if (selection.length > 1 || selection.length <= 0) {
							Ext.MessageBox.show({
										title : '警告',
										msg : '只允许删除一条数据',
										icon : Ext.MessageBox.INFO
									});
							return false;
						}
					}
				}
			}, {
				xtype : 'button',
				text : '打印',
				iconCls : 'icon-add',
				handler : function() {
					var selection = _this.down("grid").getSelectionModel().getSelection();
					if (selection.length > 1 || selection.length <= 0) {
						Ext.MessageBox.show({
									title : '警告',
									msg : '只允许打印一条数据',
									icon : Ext.MessageBox.INFO
								});
						return false;
					} else if(selection[0].data.status != '1') {
						window.open(StaticSetting.absUrl + "/mis/contract/printer?contractId="+selection[0].data.contractId+"&riskCode=2");
					} else {
						Ext.MessageBox.show({
			    			title : '警告',
			    			msg : '合同无法打印！',
			    			icon : Ext.MessageBox.WARNING,
			    			buttons : Ext.MessageBox.OK
			    		});
					}
				}
			}]
		},
		{
			xtype : 'toolbar',
			dock : 'top',
			itemId : 'toolbar2',
			items : ["日期类型：", {
                fieldLabel: '',
             	name: 'dateType',
                xtype : 'ExtPluginFormCombobox',
                tCode : 'c_date_type',
                itemId : 'dateType',
                typeAhead :false,
                emptyText: '日期类型'
			}, "开始日期：", {
            	xtype : 'datefield',
            	fieldLabel : '',
            	format : 'Y-m-d',
            	id : startTimeId,
            	dateRange:{begin:startTimeId,end:endTimeId},
            	vtype:'dateRange',
            	name : 'queryBeginDate',
            	itemId : 'queryBeginDate'
            }, "结束日期：", {
            	xtype : 'datefield',
            	fieldLabel : '',
            	format : 'Y-m-d',
            	id : endTimeId,
				dateRange:{begin:startTimeId,end:endTimeId},
				vtype:'dateRange',
            	name : 'queryEndDate',
            	itemId : 'queryEndDate'
            }, {
				text : "查询",
				iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							dateType : this.ownerCt.getComponent("dateType").getValue(),
							queryBeginDate: Ext.Date.format(this.ownerCt.getComponent("queryBeginDate").getValue(),"Y-m-d"),
							queryEndDate: Ext.Date.format(this.ownerCt.getComponent("queryEndDate").getValue(),"Y-m-d")
						}
					});
				}
			},{
				text : '高级搜索',
				iconCls : 'icon-search',
				handler : function(){
					_this.advancedSearch();
				}
			} ]
		}];
	},
	
	//高级搜索
	advancedSearch : function(){
		var me = this;
		var startTimeId = Ext.id();
		var endTimeId = Ext.id();
		var autoBrandId = Ext.id();
		var autoSeriesId = Ext.id();
		var quId = Ext.id();
		var shengId = Ext.id();
		var _form = Ext.create("Ext.form.Panel",{
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
	                fieldLabel: '日期类型',
	             	name: 'dateType',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_date_type',
	                itemId : 'dateType',
	                typeAhead :false,
	                emptyText: '日期类型'
				},{
	            	xtype : 'datefield',
	            	fieldLabel : '开始日期',
	            	format : 'Y-m-d',
	            	id : startTimeId,
					dateRange:{begin:startTimeId,end:endTimeId},
					vtype:'dateRange',
	            	name : 'queryBeginDate',
	            	itemId : 'queryBeginDate'
	            },{
	            	xtype : 'datefield',
	            	fieldLabel : '结束日期',
	            	format : 'Y-m-d',
	            	id : endTimeId,
					dateRange:{begin:startTimeId,end:endTimeId},
					vtype:'dateRange',
	            	name : 'queryEndDate',
	            	itemId : 'queryEndDate'
	            },{
	                fieldLabel: '代步车服务类型',
	             	name: 'daibuServiceType',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_daibuService_type',
	                itemId : 'daibuServiceType',
	                typeAhead :false,
	                emptyText: '代步车服务类型'
				},/*{
					xtype : 'ExtPluginFormCascadeCombobox',
					id : autoBrandId,
					fieldLabel : '车辆品牌',
					name : 'autoBrandName',
					code : '000000',
					emptyText : "车辆品牌",
					firstCombo : true,
					nextCombo : autoSeriesId
				},{
					xtype : 'ExtPluginFormCascadeCombobox',
					fieldLabel : '车系',
					name : 'autoSeriesName',
					id : autoSeriesId,
					emptyText : "车系"
				},*/{
    	  			xtype : 'ExtPluginSelectionForm',
    				grid : "FMSappselectmoduleAutoBrandModule",
    				itemId : 'autoBrand',
    				hiddenFields : [{
    					fieldName : "autoBrandId",
    					storeName : 'autoBrandId'
    				}],
    				textField : {
    					fieldName : "autoBrandName",
    					storeName : 'autoBrandName'
    				},
    				textFeildName : "车辆品牌",
    				windowTitle : '车辆品牌',
    				margins: '0 0 5 0',
    				windowWidth : 800,
    				textFieldConfig : {
//						allowBlank: false
					},
    				selectedCallBack : function(record){
     					this.ownerCt.getComponent("autoSeries").idParams = {autoBrandId : record.get("autoBrandId")};
     					this.ownerCt.getComponent("autoSeries").items.items[1].setValue('');
     				}
    	    	},{
    				xtype : 'ExtPluginSelectionForm',
    				grid : "FMSappselectmoduleAutoSeriesModule",
    				itemId : 'autoSeries',
    				hiddenFields : [{
    					fieldName : "autoSeriesId",
    					storeName : 'autoSeriesId'
    				}],
    				textField : {
    					fieldName : "autoSeriesName",
    					storeName : 'autoSeriesName'
    				},
    				textFeildName : "车系",
    				windowTitle : '选择车系',
    				margins: '0 0 5 0',
    				windowWidth : 800,
    				textFieldConfig : {
//						allowBlank: false
					},
    				selectedCallBack : function(record){
    					var autoBrand = this.ownerCt.getComponent("autoBrand").items.items[1].value;
    					var autoSeries = this.ownerCt.getComponent("autoSeries").items.items[1].value;
    					if(autoBrand == '' || autoBrand == null) {
    						Ext.MessageBox.show({
								title : '警告',
								msg : "请先选择品牌后再选择车系。",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING
							});
    						this.ownerCt.getComponent("autoSeries").items.items[1].setValue('');
    						return;
    					}
     				}
    	    	},{
					fieldLabel : '商业险保单号',
					name : 'busiPolicyNo'
				},{
					fieldLabel : '车牌号',
					name : 'autoEngineNo'
				},{
	                fieldLabel: '代步车服务状态',
	             	name: 'daibuServiceStatus',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_daibuService_status',
	                itemId : 'daibuServiceStatus',
	                typeAhead :false,
	                emptyText: '代步车服务状态'
				},{
					fieldLabel : '被保险人',
					name : 'customerName'
				},{
					fieldLabel : 'VIN码',
					name : 'autoVinNo'
				},{
	                fieldLabel: '代步车类型',
	             	name: 'daibuType',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_daibu_type',
	                itemId : 'daibuType',
	                typeAhead :false,
	                emptyText: '代步车类型'
				},/*{
	                fieldLabel: '专营店品牌',
	             	name: 'companyShortName',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_daibu_type',
	                itemId : 'companyShortName',
	                typeAhead :false,
	                emptyText: '专营店品牌'
				}*/{
     				xtype : 'ExtPluginSelectionForm',
     				itemId : 'companySelectionForm',
     				grid : "FMSbasicmoduleCompany",
     				hiddenFields : ['companyId','companyCode','companyName'],
     				textField : "companyShortName",
     				textFeildName : "专营店品牌",
     				idParams : {
//     					companyGrade : 4
     				},
     				windowTitle : '选择专营店品牌',
     				textFieldConfig : {
//						allowBlank: false
					},
					selectedCallBack : function(record){
     					var companyId = this.getComponent("companyId");
     					var companyCode = this.getComponent("companyCode");
     					var companyName = this.getComponent("companyName");
     					var companyShortName = this.getComponent("companyShortName");
     					companyId.setValue(record.get("companyId"));
     					companyCode.setValue(record.get("companyCode"));
     					companyName.setValue(record.get("companyCnname"));
     					companyShortName.setValue(record.get("companyShorten"));
     				}
            	},/*{
					fieldLabel : '专营店品牌',
					name : 'companyShortName'
				},*//*{
	                 fieldLabel: '区域',
	              	 name: 'regionName',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_auto_status',
	                 itemId : 'regionName',
	                 typeAhead :false,
	                 emptyText: '车辆状态'
				},{
	                 fieldLabel: '省份',
	              	 name: 'provinceName',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_service_type',
	                 itemId : 'provinceName',
	                 width :120,
	                 typeAhead :false,
	                 emptyText: '省份'
				}*/{
					xtype : 'ExtPluginFormCascadeCombobox',
					id : quId,
					fieldLabel : '区域',
					name : 'regionName',
					code : '000000',
					emptyText : "请选择区域",
					firstCombo : true,
					nextCombo : shengId
				},{
					xtype : 'ExtPluginFormCascadeCombobox',
					fieldLabel : '省份',
					name : 'provinceName',
					id : shengId,
					emptyText : "请选择省份"
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
	},
	
	getImportWindow : function(operation){	
		var _this = this;
		var importWindow = Ext.create("Plugin.window.UploadWindowDaibu", {
			title : '选择文件',
			hiddenType : true,
			formUrl : StaticSetting.absUrl + '/mis/contract/uploadDaiBu',
			onUploadFile : function(_form) {
				var formParams = {operation:operation};
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
	},
	
	getDownWindow : function(){
		var autoBrandId = Ext.id();
		var autoSeriesId = Ext.id();
		var startTimeId = Ext.id();
		var endTimeId = Ext.id();
		var quId = Ext.id();
		var shengId = Ext.id();
		var _form = Ext.create("Ext.form.Panel",{
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
	                fieldLabel: '日期类型',
	             	name: 'dateType',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_date_type',
	                itemId : 'dateType',
	                typeAhead :false,
	                emptyText: '日期类型'
				},{
	            	xtype : 'datefield',
	            	fieldLabel : '开始日期',
	            	format : 'Y-m-d',
	            	id : startTimeId,
					dateRange:{begin:startTimeId,end:endTimeId},
					vtype:'dateRange',
	            	name : 'queryBeginDate',
	            	itemId : 'queryBeginDate'
	            },{
	            	xtype : 'datefield',
	            	fieldLabel : '结束日期',
	            	format : 'Y-m-d',
	            	id : endTimeId,
					dateRange:{begin:startTimeId,end:endTimeId},
					vtype:'dateRange',
	            	name : 'queryEndDate',
	            	itemId : 'queryEndDate'
	            },{
	                fieldLabel: '代步车服务类型',
	             	name: 'daibuServiceType',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_daibuService_type',
	                itemId : 'daibuServiceType',
	                typeAhead :false,
	                emptyText: '代步车服务类型'
				},{
					xtype : 'ExtPluginFormCascadeCombobox',
					id : autoBrandId,
					fieldLabel : '车辆品牌',
					name : 'autoBrandName',
					code : '000000',
					emptyText : "车辆品牌",
					firstCombo : true,
					nextCombo : autoSeriesId
				},{
					xtype : 'ExtPluginFormCascadeCombobox',
					fieldLabel : '车系',
					name : 'autoSeriesName',
					id : autoSeriesId,
					emptyText : "车系"
				},{
					fieldLabel : '商业险保单号',
					name : 'busiPolicyNo'
				},{
					fieldLabel : '车牌号',
					name : 'autoEngineNo'
				},{
	                fieldLabel: '代步车服务状态',
	             	name: 'daibuServiceStatus',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_daibuService_status',
	                itemId : 'daibuServiceStatus',
	                typeAhead :false,
	                emptyText: '代步车服务状态'
				},{
					fieldLabel : '被保险人',
					name : 'customerName'
				},{
					fieldLabel : 'VIN码',
					name : 'autoVinNo'
				},{
	                fieldLabel: '代步车类型',
	             	name: 'daibuType',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_daibu_type',
	                itemId : 'daibuType',
	                typeAhead :false,
	                emptyText: '代步车类型'
				},{
	                fieldLabel: '专营店品牌',
	             	name: 'companyShortName',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_daibu_type',
	                itemId : 'companyShortName',
	                typeAhead :false,
	                emptyText: '专营店品牌'
				},/*{
					fieldLabel : '专营店品牌',
					name : 'companyShortName'
				},*/{
	                 fieldLabel: '区域',
	              	 name: 'regionName',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_auto_status',
	                 itemId : 'regionName',
	                 typeAhead :false,
	                 emptyText: '车辆状态'
				},{
	                 fieldLabel: '省份',
	              	 name: 'provinceName',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_service_type',
	                 itemId : 'provinceName',
	                 width :120,
	                 typeAhead :false,
	                 emptyText: '省份'
				},{
					fieldLabel : '险种',
					name : 'riskCode',
					value : 2,
					hidden : true
				}
				]
		});
		var downWindow = Ext.create("Ext.window.Window", {
			modal : true,
			border : false,
			floating : true,
			width : 450,
			layout : 'form',
			title : '导出',
			items : [_form],
			buttons : [{
				text : '导出',
				iconCls :'icon-excel',
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
					var url = StaticSetting.absUrl + '/mis/contract/downloadDaiBu?'+Ext.Object.toQueryString(resultJson);
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
	
	applyVType : function(){
		Ext.apply(Ext.form.field.VTypes, {
			//验证方法
			dateRange : function(val, field) {
				var beginDate = null,//开始日期
					beginDateCmp = null,//开始日期组件
					endDate = null,//结束日期
					endDateCmp = null,//结束日期组件
					validStatus = true;//验证状态
				if(field.dateRange){
					//获取开始时间
					if(!Ext.isEmpty(field.dateRange.begin)){
						beginDateCmp = Ext.getCmp(field.dateRange.begin);
						beginDate = beginDateCmp.getValue();
					}
					//获取结束时间
					if(!Ext.isEmpty(field.dateRange.end)){
						endDateCmp = Ext.getCmp(field.dateRange.end);
						endDate = endDateCmp.getValue();
					}
				}
				//如果开始日期或结束日期有一个为空则校验通过
				if(!Ext.isEmpty(beginDate) && !Ext.isEmpty(endDate)){
					validStatus =  beginDate <= endDate;
				}
				
				return validStatus;
			},
			//验证提示信息
			dateRangeText : '开始日期不能大于结束日期'
		});
	}
});