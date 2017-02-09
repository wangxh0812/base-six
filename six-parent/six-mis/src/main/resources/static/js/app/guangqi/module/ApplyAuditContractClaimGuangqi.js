Ext.define('FMS.app.guangqi.module.ApplyAuditContractClaimGuangqi', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappguangqimoduleApplyAuditContractClaimGuangqi',
	requires : [ 'FMS.app.contractClaim.store.ContractClaim4Audit', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.SelectionForm','FMS.app.select.module.ApplyAuditModule'],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.app.contractClaim.store.ContractClaim4Audit');
		_store.on('beforeload', function(_store, options) {
					var new_params = Ext.Object.fromQueryString("riskCode=3");
					Ext.apply(_store.proxy.extraParams, new_params);
				});
		Ext.apply(this, {
					store : _store,
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()

				});
		this.applyVType();
		this.editRows = this.openLookUp;
		this.callParent(arguments);
	},
	getGridColumns : function() {
		return [ {
			text : '合同号码',
			dataIndex : 'contractNo',
			width : 100
		}, {
			text : '保单号',
			dataIndex : 'policyNo',
			width : 150
		}, {
			text : '主数据状态',
			dataIndex : 'contractStatusName',
			width : 80
		}, {
			text : '车主',
			dataIndex : 'customerName',
			width : 60
		}, {
			text : '品牌',
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
			text : '车辆状态',
			dataIndex : 'autoStatusName',
			width : 100
		}, {
			text : '服务类型',
			dataIndex : 'serviceTypeName',
			width : 120
		}, {
			text : '服务期限',
			dataIndex : 'servicePeriodName',
			width : 60
		}, {
			text : '服务生效日期',
			dataIndex : 'serviceBeginDate',
			width : 90
		}, {
			text : '服务终止日期',
			dataIndex : 'sericeEndDate',
			width : 90
		}, {
			text : '报案编码',
			dataIndex : 'claimNo',
			width : 150
		}, {
			text : '报案日期',
			dataIndex : 'reportDate',
			width : 90
		}, {
			text : '结案编码',
			dataIndex : 'claimCloseNo',
			width : 150
		}, {
			text : '结案状态',
			dataIndex : 'statusName',
			width : 90
		}, {
			text : '结案日期',
			dataIndex : 'claimCloseDate',
			width : 90
		}, {
			text : '结案金额（元）',
			dataIndex : 'closeAmount',
			width : 80
		}, {
			text : '经销商简称',
			dataIndex : 'companyShortName',
			width : 80
		}, {
			text : '事故类型',
			dataIndex : 'accidentTypeName',
			width : 100
		}, {
			text : '工时定损金额',
			dataIndex : 'workingHourLoss',
			width : 100
		}, {
			text : '维修工时单价',
			dataIndex : 'maintenancePerHourPrice',
			width : 100
		}, {
			text : '代步车日租金',
			dataIndex : 'feePerDay',
			width : 80
		}, {
			text : '代步车使用天数',
			dataIndex : 'carRentalDay',
			width : 80
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
			itemId : 'toolbar1',
			items : [{
				xtype : 'button',
				text : '查看',
				iconCls : 'icon-search',
				handler : function() {
					_this.openLookUp();
				}

			}, {
				xtype : 'button',
				text : '审批详情',
				iconCls : 'icon-search',
				handler : function() {
					_this.openCorrectDetail();
				}
			}, {
				xtype : 'button',
				text : '审批',
				iconCls : 'icon-accept',
				handler : function() {
					_this.openAudit();
				}
			}, "保单号：", {
            	itemId : 'policyNo',
            	name : 'policyNo',
            	xtype : 'textfield',
            	width :120
            }, 
			"车辆识别代码（VIN码）：", filed2, {
            	xtype : 'button',
				text : "查询",
				iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							policyNo : this.ownerCt.getComponent("policyNo").getValue(),
							status: 1,
							autoVinNo: filed2.getValue()
						}
					});
				}
			},{
				text : '高级搜索',
				iconCls : 'icon-search',
				handler : function(){
					_this.advancedSearch();
				}
			}]
		}];
	},
	
	// 查看
	openLookUp : function() {
		var me = this;
		var selection = this.down("grid").getSelectionModel().getSelection();
		if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
						title : '警告',
						msg : '只允许查看一条数据',
						icon : Ext.MessageBox.INFO
					});
			return false;
		}
		var claimId = selection[0].data.claimId;
		if(claimId == null || claimId == '') {
			Ext.MessageBox.show({
				title : '警告',
				msg : '此单无索赔详情',
				icon : Ext.MessageBox.WARNING,
				buttons : Ext.MessageBox.OK
			});
			return false;
		}
		var idParams = {
				claimId : claimId,
				businessId : claimId
		};
		var win = this.createCientWindow({
					title : '合同索赔信息',
					idName : 'claimId',
					idParams : idParams,
					hiddenButtons : true,
					getLoadDetailInfoArray : me.getLoadDetailInfoArray
				});
		win = this.createWindowTabs(win,{
			idParams : idParams,
			allowUpdate : true
		});
		win.loadAndRenderDetailInfo(idParams, win);
		win.show();
	},
	
	//审批
	openAudit : function() {
		var me = this;
		var selection = this.down("grid").getSelectionModel().getSelection();
		if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
						title : '警告',
						msg : '只允许查看一条数据',
						icon : Ext.MessageBox.INFO
					});
			return false;
		}
		var claimId = selection[0].data.claimId;
		var contractId = selection[0].data.contractId;
		var idParams = {
				claimId : claimId,
				businessId : claimId,
				contractId :contractId,
				store : me.store
		};
		var win = this.createCientWindow({
					title : '审批索赔信息',
					idName : 'claimId',
					idParams : idParams,
//					hiddenButtons : true,
					getLoadDetailInfoArray : me.getLoadDetailInfoArray
				});
		win = this.createWindowTabs(win,{
			idParams : idParams
		});
		win.loadAndRenderDetailInfo(idParams, win);
		win.show();
	},
	
	//创建详情弹出窗口
	createCientWindow : function(obj){
		var me = this;
		var saveUrl = StaticSetting.absUrl + '/mis/contractClaim/save';
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindowClaim",obj);
		_win.addBaseClientForm({
			fieldSetTitle: '合同索赔基本资料',
			collapsible: true,
			formItemId : 'contractClaimBaseForm',
			formUrl : saveUrl,
			submitParams : obj.idParams,
			formItems : this.getClientBaseInfo(),
			width : 1000,
			hiddenFormButten : true
		});
		return _win;
	},
	
	createWindowTabs : function(_win, obj) {
		_win.addTabClientPanel(Ext.create('Plugin.grid.UploadGrid4Batch', {
					title : '索赔文件',
					height : 300,
					itemId : 'customerUploadGrid',
					store : Ext.create("FMS.basic.store.myFile"),
					storeParams : {
						businessId : obj.idParams.businessId,
						businessType : obj.idParams.businessType
					},
					allowUpdate : obj.allowUpdate,
					imageFormUrl : StaticSetting.absUrl + '/mis/myFile/fileUpload',
					imageFormParams : obj.idParams,
					fileFormUrl : StaticSetting.absUrl + '/mis/myFile/uploadDoucument',
					fileFormParams : obj.idParams,
					getGridColumns : this.getUploadFileGridColumn
				}));
		return _win;
	},
	
	// 上传文件
	getUploadFileGridColumn : function() {
		return [{
					text : '文件名',
					dataIndex : 'fileName'
				}, {
					text : '文件类型',
					dataIndex : 'fileBusinessTypeName'
				}, {
					text : '文件格式',
					dataIndex : 'fileType',
					renderer : function(val) {
						if (val == '1') {
							return "图片";
						} else if (val == '2') {
							return "文件";
						} else if (val == '3') {
							return "视频";
						}
						return val;
					}
				}, {
					text : '后缀名',
					dataIndex : 'suffix'
				}];
	},
	
	//form加载url
	getLoadDetailInfoArray : function(){
		return {
			baseForm : {
				name : '合同基本资料',
				url : StaticSetting.absUrl + '/mis/contractClaim/getContractClaim',
				formItemId : 'contractClaimBaseForm'
			},
			tabForm : []
		};
	},
	
	// 查看审批详情
	openCorrectDetail : function() {
		var me = this;
		var selection = this.down("grid").getSelectionModel().getSelection();
		if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
						title : '警告',
						msg : '只允许查看一条数据',
						icon : Ext.MessageBox.INFO
					});
			return false;
		}
		var contractId = selection[0].data.contractVoId;
		var auditPanel = Ext.create("FMS.app.select.module.ApplyAuditModule",{
			idParams : {
				contractId : contractId,
				auditType : 2
			}
		});	
		var auditWindow = Ext.create("Ext.window.Window",{
			title : '查看审批详情',
			modal : true,
			border : false,
			floating : true,
			width : 800,
			height : 400,
			anchor : '100%',
			layout : 'card', 
			items : [auditPanel],
			buttons : [{
				text : '关闭',
				iconCls : 'icon-cancel',
				handler : function(){
					auditWindow.close();
				}
			}]
		});
		auditWindow.show();
	},
	
	getClientBaseInfo : function(){
		var me = this;
		return [{
            xtype: 'fieldset',
            itemId : 'companyFieldSet',
            layout: 'form',
            collapsible: true,
            //collapsed : true,
            title : '出单经销商信息',
            width : 1000,
            items: [{
            	xtype : 'form',
            	layout : 'form',
            	itemId : 'companyInfo',
            	border : false,
            	items : [{
      	    	  xtype: 'container',
    	          layout: 'hbox',
    	          itemId : 'companyContainer',
    	          defaultType: 'textfield',
    	          items:[{
			            	fieldLabel:'经销商全称',
			                emptyText: '经销商全称',
			                readOnly : true,
			                itemId : 'companyName',
			                name: 'companyName'
			            }, {
    		            	fieldLabel:'联系人',
    		                emptyText: '联系人',
    		                readOnly : true,
    		                itemId : 'contactsName',
    		                name: 'contactsName'
    		            }, {
    		            	fieldLabel:'联系电话',
    		                emptyText: '联系电话',
    		                readOnly : true,
    		                itemId : 'companyTelephone',
    		                name: 'companyTelephone'
    		            }]
            	}]
		      }]
		  	},{
	            xtype: 'fieldset',
	            itemId : 'customerFieldSet',
	            layout: 'form',
	            collapsible: true,
	            //collapsed : true,
	            title : '车主信息',
	            items: [{
	            	xtype : 'form',
	            	layout : 'form',
	            	itemId : 'customerInfo',
	            	border : false,
	            	items : [{
	      	    	  xtype: 'container',
	    	          layout: 'hbox',
	    	          itemId : 'customerContainer1',
	    	          defaultType: 'textfield',
	    	          items:[{
	    		            	fieldLabel:'车主',
	    		                emptyText: '车主',
	    		                readOnly : true,
	    		                itemId : 'customerName',
	    		                name: 'customerName'
	    		            }, {
	    		            	fieldLabel:'证件类型',
	    		                itemId : 'customerIdType',
	    		                xtype : 'ExtPluginFormCombobox',
	    		                tCode : 'c_user_notype',
	    		                typeAhead :false,
	    		                editable : false,
	    		                name: 'customerIdType',
    		    			    readOnly : true
	    		            }, {
	    		            	fieldLabel:'证件号码',
	    		                emptyText: '证件号码',
	    		                readOnly : true,
	    		                itemId : 'customerIdNo',
	    		                name: 'customerIdNo'
	    		            }]
	            	}]
			      }]
			  	}, {
		            xtype: 'fieldset',
		            itemId : 'autoFieldSet',
		            layout: 'form',
		            collapsible: true,
		            //collapsed : true,
		            title : '车辆信息',
		            items: [{
		            	xtype : 'form',
		            	layout : 'form',
		            	itemId : 'autoInfo',
		            	border : false,
		            	items : [{
		      	    	  xtype: 'container',
		    	          layout: 'hbox',
		    	          itemId : 'autoContainer1',
		    	          defaultType: 'textfield',
		    	          items:[{
		    		            	fieldLabel:'首次购车日期',
		    		                emptyText: '首次购车日期',
		    		                itemId : 'firstBuyDate',
		    		                name: 'firstBuyDate',
	    		    			    maxLength: 20,
	    		    			    xtype: 'datefield',
	    		    			    format: 'Y-m-d',
	    		    			    readOnly : true
		    		            }, {
		    		            	fieldLabel:'车辆状态',
		    		                itemId : 'autoStatus',
		    		                name: 'autoStatus',
		    		                xtype : 'ExtPluginFormCombobox',
		    		                tCode : 'c_auto_status',
		    		                typeAhead :false,
		    		                editable : false,
		    		                emptyText: '车辆状态',
	    		    			    readOnly : true
		    		            }]
		            	}, {
			      	    	  xtype: 'container',
			    	          layout: 'hbox',
			    	          itemId : 'autoContainer2',
			    	          defaultType: 'textfield',
			    	          items:[{
		    		            	fieldLabel:'车牌号码',
		    		                emptyText: '车牌号码',
		    		                itemId : 'autoNo',
		    		                name: 'autoNo',
		    		                readOnly : true
		    		            },{
		    		            	fieldLabel:'发动机号码',
		    		                emptyText: '发动机号码',
		    		                itemId : 'autoEngineNo',
		    		                name: 'autoEngineNo',
		    		                readOnly : true
		    		            }, {
		    		            	fieldLabel:'车辆识别代码（VIN码）',
		    		                emptyText: '车辆识别代码（VIN码）',
		    		                itemId : 'autoVinNo',
		    		                name: 'autoVinNo',
		    		                readOnly : true
			    		        }]
			            	}, {
				      	    	  xtype: 'container',
				    	          layout: 'hbox',
				    	          itemId : 'autoContainer3',
				    	          defaultType: 'textfield',
				    	          items:[{
			    		            	fieldLabel:'品牌',
			    		                emptyText: '品牌',
			    		                itemId : 'autoBrandName',
			    		                name: 'autoBrandName',
			    		                readOnly : true
			    		            }, {
			    		            	fieldLabel:'车系',
			    		                emptyText: '车系',
			    		                itemId : 'autoSeriesName',
			    		                name: 'autoSeriesName',
			    		                readOnly : true
				    		        }, {
			    		            	fieldLabel:'车型',
			    		                emptyText: '车型',
			    		                itemId : 'autoModelsName',
			    		                name: 'autoModelsName',
			    		                readOnly : true
			    		            }]
				            	}]
				      }]
				  	}, {
			            xtype: 'fieldset',
			            itemId : 'serviceFieldSet',
			            layout: 'form',
			            collapsible: true,
			            //collapsed : true,
			            title : '服务信息',
			            width : 1000,
			            items: [{
			            	xtype : 'form',
			            	layout : 'form',
			            	itemId : 'serviceInfo',
			            	border : false,
			            	items : [{
			      	    	  xtype: 'container',
			    	          layout: 'hbox',
			    	          itemId : 'serviceContainer1',
			    	          defaultType: 'textfield',
			    	          items:[{
		    		            	fieldLabel:'服务类型',
		    		                itemId : 'serviceType',
		    		                xtype : 'ExtPluginFormCombobox',
		    		                tCode : 'c_service_type_guangqi',
		    		                typeAhead :false,
		    		                editable : false,
		    		                name: 'serviceType',
	    		    			    readOnly : true
		    		            }, {
		    		            	fieldLabel:'服务期限',
		    		                itemId : 'servicePeriod',
		    		                xtype : 'ExtPluginFormCombobox',
		    		                tCode : 'c_service_period',
		    		                typeAhead :false,
		    		                editable : false,
		    		                name: 'servicePeriod',
	    		    			    readOnly : true
		    		            }, {
		    		            	fieldLabel:'代步车日租金',
		    		                emptyText: '代步车日租金',
		    		                itemId : 'feePerDay',
		    		                name: 'feePerDay',
	    		    			    readOnly : true
		    		            }]
			            	}, {
					      	    	  xtype: 'container',
					    	          layout: 'hbox',
					    	          itemId : 'serviceContainer2',
					    	          defaultType: 'textfield',
					    	          items:[{
				    		            	fieldLabel:'服务起始日期',
				    		                emptyText: '服务起始日期',
				    		                itemId : 'serviceBeginDate',
				    		                name: 'serviceBeginDate',
			    		    			    maxLength: 20,
			    		    			    xtype: 'datefield',
			    		    			    format: 'Y-m-d',
			    		    			    readOnly : true
				    		            }, {
				    		            	fieldLabel:'服务终止日期',
				    		                emptyText: '服务终止日期',
				    		                itemId : 'sericeEndDate',
				    		                name: 'sericeEndDate',
			    		    			    maxLength: 20,
			    		    			    xtype: 'datefield',
			    		    			    format: 'Y-m-d',
			    		    			    readOnly : true
				    		            }, {
						  	            	fieldLabel : '合同号码',
						  	            	emptyText: '合同号码',
							            	itemId : 'contractNo',
							            	name : 'contractNo',
							            	readOnly : true
							            }]
					            	}]
					      }]
					  	}, {
				            xtype: 'fieldset',
				            itemId : 'otherFieldSet',
				            layout: 'form',
				            collapsible: true,
				            //collapsed : true,
				            title : '其他信息',
				            width : 1000,
				            items: [{
				            	xtype : 'form',
				            	layout : 'form',
				            	itemId : 'otherInfo',
				            	border : false,
				            	items : [{
						      	    	  xtype: 'container',
						    	          layout: 'hbox',
						    	          itemId : 'otherContainer1',
						    	          defaultType: 'textfield',
						    	          items:[{
					    		            	fieldLabel:'主数据状态',
					    		                xtype : 'ExtPluginFormCombobox',
					    		                tCode : 'c_contract_status',
					    		                emptyText : '主数据状态',
					    		                typeAhead :false,
					    		                editable : false,
					    		                name: 'contractStatus',
								            	readOnly : true
					    		            }, {
							  	            	fieldLabel : '合同主键',
								            	itemId : 'contractId',
								            	name : 'contractId',
								            	hidden : true
								            }]
						            	}]
						      }]
						  	}, {
					            xtype: 'fieldset',
					            itemId : 'reportFieldSet',
					            layout: 'form',
					            collapsible: true,
					            //collapsed : true,
					            title : '报案信息',
					            width : 1000,
					            items: [{
					            	xtype : 'form',
					            	layout : 'form',
					            	itemId : 'reportInfo',
					            	border : false,
					            	items : [{
							      	    	  xtype: 'container',
							    	          layout: 'hbox',
							    	          itemId : 'reportContainer1',
							    	          defaultType: 'textfield',
							    	          items:[{
								  	            	fieldLabel : '报案经销商全称',
								  	            	emptyText: '报案经销商全称',
									            	itemId : 'reportCompanyName',
									            	name : 'reportCompanyName',
									            	readOnly : true
									            }, {
								  	            	fieldLabel : '报案人（经销商人员）',
								  	            	emptyText: '报案人（经销商人员）',
									            	itemId : 'reportName',
									            	name : 'reportName',
									            	readOnly : true
									            }, {
								  	            	fieldLabel : '报案人联系电话',
								  	            	emptyText: '报案人联系电话',
									            	itemId : 'reportPhone',
									            	name : 'reportPhone',
									            	readOnly : true
									            }, {
									            	fieldLabel:'经销商主键',
									                readOnly : true,
									                itemId : 'reportCompanyId',
									                name: 'reportCompanyId',
									                hidden : true
									            }, {
									            	fieldLabel:'经销商编码',
									                readOnly : true,
									                itemId : 'reportCompanyCode',
									                name: 'reportCompanyCode',
									                hidden : true
									            }, {
									            	fieldLabel:'经销商简称',
									                readOnly : true,
									                itemId : 'reportCompanyShortName',
									                name: 'reportCompanyShortName',
									                hidden : true
									            }]
							            	}, {
								      	    	  xtype: 'container',
								    	          layout: 'hbox',
								    	          itemId : 'reportContainer2',
								    	          defaultType: 'textfield',
								    	          items:[{
							    		            	fieldLabel:'报案日期',
							    		                emptyText: '报案日期',
							    		                itemId : 'reportDate',
							    		                name: 'reportDate',
						    		    			    maxLength: 20,
						    		    			    xtype: 'datefield',
						    		    			    readOnly : true,
						    		    			    format: 'Y-m-d'
							    		            }, {
							    		            	fieldLabel:'事故类型',
							    		                itemId : 'accidentType',
							    		                name: 'accidentType',
							    		                xtype : 'ExtPluginFormCombobox',
							    		                tCode : 'c_insurance_type_guangqi',
							    		                typeAhead :false,
							    		                editable : false,
							    		                readOnly : true,
							    		                emptyText: '事故类型'
							    		            }, {
							    		            	fieldLabel:'工时定损金额',
							    		                emptyText: '工时定损金额',
							    		                itemId : 'workingHourLoss',
							    		                name: 'workingHourLoss',
							    		                regex :  /^\d+((\.\d{0,2}){0,1})$/,
							    		                regexText:"请输入数字",
							    		                readOnly : true/*,
							    		                listeners : {
										            		change : function(scope, evt, opts) {
										            			var workingHourLoss = scope.getValue();
																var maintenancePerHourPrice = scope.ownerCt.ownerCt.getComponent('reportContainer3').getComponent('maintenancePerHourPrice').getValue();
																if(workingHourLoss != '' && workingHourLoss != null && maintenancePerHourPrice != '' && maintenancePerHourPrice != null) {
																	var carRentalDay =  workingHourLoss/(maintenancePerHourPrice*6).toFixed(2);
																	scope.ownerCt.ownerCt.getComponent('reportContainer3').getComponent('carRentalDay').setValue(carRentalDay);
																}
															}
							    		                }*/
								    		        }]
								            	}, {
									      	    	  xtype: 'container',
									    	          layout: 'hbox',
									    	          itemId : 'reportContainer3',
									    	          defaultType: 'textfield',
									    	          items:[{
								    		            	fieldLabel:'维修工时单价',
								    		                emptyText: '维修工时单价',
								    		                itemId : 'maintenancePerHourPrice',
								    		                name: 'maintenancePerHourPrice',
								    		                regex :  /^\d+((\.\d{0,2}){0,1})$/,
								    		                regexText:"请输入数字",
								    		                readOnly : true/*,
								    		                listeners : {
											            		change : function(scope, evt, opts) {
											            			var workingHourLoss = scope.ownerCt.ownerCt.getComponent('reportContainer2').getComponent('workingHourLoss').getValue();
																	var maintenancePerHourPrice = scope.getValue();
																	if(workingHourLoss != '' && workingHourLoss != null && maintenancePerHourPrice != '' && maintenancePerHourPrice != null) {
																		var carRentalDay =  workingHourLoss/(maintenancePerHourPrice*6).toFixed(2);
																		scope.ownerCt.ownerCt.getComponent('reportContainer3').getComponent('carRentalDay').setValue(carRentalDay);
																	}
																}
								    		                }*/
									    		        }, {
								    		            	fieldLabel:'代步车使用天数',
								    		                emptyText: '代步车使用天数',
								    		                itemId : 'carRentalDay',
								    		                name: 'carRentalDay',
								    		                readOnly : true,
								    		                regex :  /^\d*$/,
								    		                regexText:"请输入数字"
									    		        }, {
								    		            	fieldLabel:'报案编码',
								    		                emptyText: '系统生成，无需填写',
								    		                itemId : 'claimNo',
								    		                name: 'claimNo',
								    		                readOnly : true
									    		      }]
									            }]
							      }]
							  	}, {
						            xtype: 'fieldset',
						            itemId : 'claimCloseFieldSet',
						            layout: 'form',
						            collapsible: true,
						            //collapsed : true,
						            title : '结案信息',
						            width : 1000,
						            items: [{
						            	xtype : 'form',
						            	layout : 'form',
						            	itemId : 'claimCloseInfo',
						            	border : false,
						            	items : [{
							      	    	  xtype: 'container',
							    	          layout: 'hbox',
							    	          itemId : 'claimCloseContainer1',
							    	          defaultType: 'textfield',
							    	          items:[{
						    		            	fieldLabel:'代步车提供商',
						    		                emptyText: '代步车提供商',
						    		                itemId : 'provider',
						    		                name: 'provider',
					    		    			    allowBlank: false,
					    		    			    listeners: {
					    		    			    	"change": function (val) {
					    		    			    		this.ownerCt.ownerCt.getComponent("claimCloseContainer3").getComponent("claimCloseDate").setValue(new Date());
					    		    			    		var container = this.ownerCt.ownerCt.ownerCt.ownerCt;
					    		    			    		var feePerDay = container.getComponent("serviceFieldSet").getComponent("serviceInfo")
					    		    			    						.getComponent("serviceContainer1").getComponent("feePerDay").getValue();
					    		    			    		var carRentalDay = container.getComponent("reportFieldSet").getComponent("reportInfo")
					    		    			    							.getComponent("reportContainer3").getComponent("carRentalDay").getValue();
					    		    			    		var closeAmount = feePerDay*carRentalDay;
					    		    			    		this.ownerCt.ownerCt.getComponent("claimCloseContainer3").getComponent("closeAmount").setValue(closeAmount.toFixed(2));
					    		    			    		this.ownerCt.ownerCt.getComponent("claimCloseContainer2").getComponent("statusName").setValue('已结案');
					    		    			    		this.ownerCt.ownerCt.getComponent("claimCloseContainer2").getComponent("status").setValue(3);
					    		    			    	}
					    		    			    }
						    		            }/*, {
						    		            	fieldLabel:'租车券编码',
						    		                emptyText: '租车券编码',
						    		                itemId : 'carRentalNo',
						    		                name: 'carRentalNo',
						    		                allowBlank: false
							    		      }*/]
							            }, {
								      	    	  xtype: 'container',
								    	          layout: 'hbox',
								    	          itemId : 'claimCloseContainer2',
								    	          defaultType: 'textfield',
								    	          items:[{
									  	            	fieldLabel : '结案状态',
										            	itemId : 'statusName',
										            	name : 'statusName',
										            	readOnly : true
										            }, {
									  	            	fieldLabel : '结案编码',
									  	            	emptyText: '系统生成,无需填写',
										            	itemId : 'claimCloseNo',
										            	name : 'claimCloseNo',
						    		    			    readOnly : true
										            }, {
									  	            	fieldLabel : '结案状态',
									  	            	emptyText: '结案状态',
										            	itemId : 'status',
										            	name : 'status',
										            	hidden : true
										            }]
								            	}, {
									      	    	  xtype: 'container',
									    	          layout: 'hbox',
									    	          itemId : 'claimCloseContainer3',
									    	          defaultType: 'textfield',
									    	          items:[{
								    		            	fieldLabel:'结案日期',
								    		                emptyText: '结案日期',
								    		                itemId : 'claimCloseDate',
								    		                name: 'claimCloseDate',
							    		    			    maxLength: 20,
							    		    			    xtype: 'datefield',
							    		    			    format: 'Y-m-d'/*,
							    		    			    readOnly : true*/
								    		            }, {
								    		            	fieldLabel:'结案金额（元）',
								    		                emptyText: '结案金额（元）',
								    		                itemId : 'closeAmount',
								    		                name: 'closeAmount',
								    		                readOnly : true
									    		      }]
									            }]
								      }]
								  	}];
	},
	
	applyVType : function(){
		Ext.apply(Ext.form.field.VTypes, {
			//验证方法
			dateRange : function(val, field) {
				var validStatus = true;//验证状态
				if(new Date(val) > field.dateRange.today){
					validStatus =  false;
					Ext.MessageBox.show({
						title : '警告',
						msg : "日期不能大于今天!",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
				}
				
				return validStatus;
			},
			//验证提示信息
			dateRangeText : '日期不能大于今天'
		});
	},
	
	//高级搜索
	advancedSearch : function(){
		var me = this;
		var _form = Ext.create("Ext.form.Panel",{
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
					fieldLabel : '保单号',
					name : 'policyNo'
				},{
					fieldLabel : '经销商简称',
					name : 'companyShortName'
				},{
	            	xtype : 'datefield',
	            	fieldLabel : '报案日期起期',
	            	format : 'Y-m-d',
	            	name : 'reportDateBegin',
	            	itemId : 'reportDateBegin'
	            },{
	            	xtype : 'datefield',
	            	fieldLabel : '报案日期止期',
	            	format : 'Y-m-d',
	            	name : 'reportDateEnd',
	            	itemId : 'reportDateEnd'
	            },{
					fieldLabel : '车辆识别代码（VIN码）',
					name : 'autoVinNo'
				},{
					fieldLabel : '车主',
					name : 'customerName'
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