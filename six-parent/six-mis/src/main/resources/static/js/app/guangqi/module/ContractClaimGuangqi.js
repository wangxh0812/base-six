Ext.define('FMS.app.guangqi.module.ContractClaimGuangqi', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappguangqimoduleContractClaimGuangqi',
	requires : [ 'FMS.app.contractClaim.store.ContractClaim', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.SelectionForm','FMS.basic.module.Company',
	             'FMS.app.companyContacts.module.CompanyContacts','FMS.app.select.module.AutoBrandModule',
	             'FMS.app.select.module.AutoSeriesModule','FMS.app.select.module.AutoModelsModule','Plugin.ux.IFrame'],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.app.contractClaim.store.ContractClaim');
		_store.on('beforeload', function(_store, options) {
					var new_params = Ext.Object.fromQueryString("contractStatus=showList&&riskCode=3");
					Ext.apply(_store.proxy.extraParams, new_params);
				});
		Ext.apply(this, {
					store : _store,
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()

				});
		this.editRows = this.openLookUp;
		this.applyVType();
		this.callParent(arguments);
	},
	getGridColumns : function() {
		return [ {
			text : '合同号码',
			dataIndex : 'contractNo',
			width : 150
		}, {
			text : '保单号',
			dataIndex : 'policyNo',
			width : 150
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
			text : '服务生效日期',
			dataIndex : 'serviceBeginDate',
			width : 90
		}, {
			text : '服务终止日期',
			dataIndex : 'sericeEndDate',
			width : 90
		}, {
			text : '主数据状态',
			dataIndex : 'contractStatusName',
			width : 80
		}, {
			text : '报案编码',
			dataIndex : 'claimNo',
			width : 150
		}, {
			text : '报案日期',
			dataIndex : 'reportDate',
			width : 90
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
			width : 90
		}, {
			text : '经销商简称',
			dataIndex : 'companyShortName',
			width : 100
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
		var filed4 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			itemId : 'toolbar1',
			defaultType: 'textfield',
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
				text : '报案',
				iconCls : 'icon-add',
				handler : function() {
					_this.openReport();
				}
			}, {
				xtype : 'button',
				text : '修改',
				iconCls : 'icon-edit',
				handler : function() {
					_this.openEdit();
				}
			}, "->", "车辆识别代码（VIN码）：",  filed1, "车主姓名：", filed2, 
			"保单号：", filed3, "车牌号：", filed4, {
            	xtype : 'button',
				text : "查询",
				iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							autoVinNo: filed1.getValue(),
							customerName: filed2.getValue(),
							policyNo: filed3.getValue(),
							autoNo: filed4.getValue()
						}
					});
				}
			}]
		}];
	},
	
	//修改
	openEdit : function (){
		var me = this;
		var selection = this.down("grid").getSelectionModel().getSelection();
		if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
				title : '警告',
				msg : '只允许编辑一条数据',
				icon : Ext.MessageBox.INFO
			});
			return false;
		}else{
			var status = selection[0].data.status;
			if(status != 2){
				Ext.MessageBox.show({
					title : '警告',
					msg : '仅状态为退回修改时可以修改',
					icon : Ext.MessageBox.INFO,
					buttons : Ext.MessageBox.OK
				});
				return false;
			}
			me.formWindowUp(selection[0].data.contractVoId,selection[0].data.claimId);
		}
	},
	
	/**
	 * 弹出窗口
	 */
	formWindowUp : function(contractVoId,claimId){
		var me = this;
		var idParams = {
			contractVoId : contractVoId,
			claimId : claimId,
			businessId : claimId,
			businessType : 3
		};
		var win = this.createCientWindow({
			title : '合同索赔信息',
			idName : 'claimId',
			idParams : idParams,
//			hiddenButtons : effected,
			width : 1000,
			getLoadDetailInfoArray : me.getLoadDetailInfoArray,
			listeners : {
				"createTabs" : function(a, b) {
					me.createWindowTabs(a, {idParams : idParams});
				},
				"closeWindow" : function(_win){
					Ext.MessageBox.show({
		                    title: "提示",
		                    msg: "操作成功",
		                    icon: Ext.MessageBox.INFO,
		                    buttons: Ext.MessageBox.OK,
		                    fn: function(buttonId) {
		                        if (buttonId === "ok") {
		                        	me.store.reload();
		                        	_win.close();
		                        }
		                    }
					});
					
				}
			}
		});
		if(claimId != '' && claimId != null) {
			win = this.createWindowTabs(win,{
				idParams : idParams
			});
		}
		win.loadAndRenderDetailInfo(idParams,win);
		win.show();
	},
	
	createWindowTabs : function(_win, obj) {
		Ext.Ajax.request({
            url: StaticSetting.absUrl + "/mis/contractClaim/getContractClaim",
            params : {
            	contractVoId : obj.idParams.contractVoId
            },
            method: 'GET',
            async: false,
            success: function (response, options) {
            	var resultJSON = Ext.JSON.decode(response.responseText);
            	if(resultJSON != null){
            		obj.idParams.businessId = resultJSON.claimId;
            		obj.idParams.claimId = resultJSON.claimId;
            		obj.idParams.contractId = resultJSON.contractId;
            	}
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
		_win.addTabClientPanel(Ext.create('Plugin.grid.UploadGridGuangqi', {
					title : '索赔文件',
					height : 300,
					itemId : 'customerUploadGrid',
					store : Ext.create("FMS.basic.store.myFile"),
					storeParams : {
						businessId : obj.idParams.businessId,
						businessType : 3
					},
					allowUpdate : obj.allowUpdate,
					tCode : 'c_document_type_guangqi_claim',
					imageFormUrl : StaticSetting.absUrl + '/mis/myFile/uploadImage',
					imageFormParams : obj.idParams,
					fileFormUrl : StaticSetting.absUrl + '/mis/myFile/uploadDoucument',
					fileFormParams : obj.idParams,
					getGridColumns : this.getUploadFileGridColumn
				}));
		_win.addTabClientPanel(Ext.create('Plugin.grid.UploadGridGuangqi', {
			title : '出单合同',
			height : 300,
			itemId : 'contractUploadGrid',
			store : Ext.create("FMS.basic.store.myFile"),
			storeParams : {
				businessId : obj.idParams.contractId,
				businessType : 3
			},
			allowUpdate : true,
			imageFormUrl : StaticSetting.absUrl + '/mis/myFile/uploadImage',
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
	
	/**
	 * 新增报案
	 */
	openReport : function(){
    	var me = this;
    	var selection = this.down("grid").getSelectionModel().getSelection();
		if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
				title : '警告',
				msg : '只允许编辑一条数据',
				icon : Ext.MessageBox.INFO,
				buttons : Ext.MessageBox.OK
			});
			return false;
		} else if(selection[0].data.status == 1){
			Ext.MessageBox.show({
				title : '警告',
				msg : '已报案，请勿重复报案',
				icon : Ext.MessageBox.INFO,
				buttons : Ext.MessageBox.OK
			});
		} else if(selection[0].data.status == 3 || selection[0].data.status == 4){
			Ext.MessageBox.show({
				title : '警告',
				msg : '已结案/已驳回不能再报案',
				icon : Ext.MessageBox.INFO,
				buttons : Ext.MessageBox.OK
			});
		} else {
			Ext.Ajax.request({
	            url: StaticSetting.absUrl + "/mis/contractClaim/getContractClaim",
	            params : {
	            	contractVoId : selection[0].data.contractVoId,
	            	claimId : selection[0].data.claimId
	            },
	            method: 'GET',
	            //async: false,
	            success: function (response, options) {
	            	var resultJSON = Ext.JSON.decode(response.responseText);
	            	if(resultJSON != null){
//	            		var status = resultJSON.status ;
//	            		var effected = false;
//	        			if(status != "0"){
//	        				effected = true;
//	        				Ext.MessageBox.show({
//	        					title : '警告',
//	        					msg : '此状态下无法进行修改',
//	        					icon : Ext.MessageBox.INFO
//	        				});
//	        				return false;
//	        			}
	        			me.formWindowUp(selection[0].data.contractVoId,selection[0].data.claimId);
	            	}
	            },
	            failure: function (response, options) {
	                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
	            }
	        });
		}
	},
	
	//创建详情弹出窗口
	createCientWindow : function(obj){
		var me = this;
		var saveUrl = StaticSetting.absUrl + '/mis/contractClaim/save';
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindow",obj);
		_win.addBaseClientForm({
			fieldSetTitle: '合同索赔基本资料',
			collapsible: true,
			formItemId : 'contractClaimBaseForm',
			formUrl : saveUrl,
			submitParams : obj.idParams,
			formItems : this.getClientBaseInfo(/*obj.hiddenButtons*/),
			width : 1000,
			hiddenFormButten : true
		});
		return _win;
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
	
	getClientBaseInfo : function(hiddenButtons){
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
								  	            	allowBlank: false,
									            	itemId : 'reportCompanyName',
									            	name : 'reportCompanyName'
									            }, {
								  	            	fieldLabel : '报案人（经销商人员）',
								  	            	emptyText: '报案人（经销商人员）',
								  	            	allowBlank: false,
									            	itemId : 'reportName',
									            	name : 'reportName',
									            	listeners : {
						    		                	change : function(scope, evt, opts) {
															var status = this.ownerCt.getComponent('status');
															status.setValue(1);
														}
						    		                }
									            }, {
								  	            	fieldLabel : '报案人联系电话',
								  	            	emptyText: '报案人联系电话',
								  	            	allowBlank: false,
									            	itemId : 'reportPhone',
									            	name : 'reportPhone',
									            	listeners : {
									            		change : function(scope, evt, opts) {
															var status = this.ownerCt.getComponent('status');
															status.setValue(1);
														}
						    		                }
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
									            }, {
								  	            	fieldLabel : '是否报案',
									            	itemId : 'status',
									            	name : 'status',
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
						    		    			    allowBlank: false,
						    		    			    xtype: 'datefield',
						    		    			    format: 'Y-m-d'
							    		            }, {
							    		            	fieldLabel:'事故类型',
							    		                itemId : 'accidentType',
							    		                name: 'accidentType',
							    		                xtype : 'ExtPluginFormCombobox',
							    		                tCode : 'c_insurance_type_guangqi',
							    		                typeAhead :false,
							    		                editable : false,
							    		                allowBlank: false,
							    		                emptyText: '事故类型'
							    		            }, {
							    		            	fieldLabel:'工时定损金额',
							    		                emptyText: '工时定损金额',
							    		                itemId : 'workingHourLoss',
							    		                allowBlank: false,
							    		                name: 'workingHourLoss',
							    		                regex :  /^\d+((\.\d{0,2}){0,1})$/,
							    		                regexText:"请输入数字",
							    		                listeners : {
										            		change : function(scope, evt, opts) {
										            			var workingHourLoss = scope.getValue();
																var maintenancePerHourPrice = scope.ownerCt.ownerCt.getComponent('reportContainer3').getComponent('maintenancePerHourPrice').getValue();
																if(workingHourLoss != '' && workingHourLoss != null && maintenancePerHourPrice != '' && maintenancePerHourPrice != null) {
																	var carRentalDay =  (workingHourLoss/(maintenancePerHourPrice*6)).toFixed(2);
																	scope.ownerCt.ownerCt.getComponent('reportContainer3').getComponent('carRentalDay').setValue(carRentalDay);
																}
															}
							    		                }
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
								    		                allowBlank: false,
								    		                name: 'maintenancePerHourPrice',
								    		                regex :  /^\d+((\.\d{0,2}){0,1})$/,
								    		                regexText:"请输入数字",
								    		                listeners : {
											            		change : function(scope, evt, opts) {
											            			var workingHourLoss = scope.ownerCt.ownerCt.getComponent('reportContainer2').getComponent('workingHourLoss').getValue();
																	var maintenancePerHourPrice = scope.getValue();
																	if(workingHourLoss != '' && workingHourLoss != null && maintenancePerHourPrice != '' && maintenancePerHourPrice != null) {
																		var carRentalDay =  (workingHourLoss/(maintenancePerHourPrice*6)).toFixed(2);
																		scope.ownerCt.ownerCt.getComponent('reportContainer3').getComponent('carRentalDay').setValue(carRentalDay);
																	}
																}
								    		                }
									    		        }, {
								    		            	fieldLabel:'代步车使用天数',
								    		                emptyText: '代步车使用天数',
								    		                itemId : 'carRentalDay',
								    		                allowBlank: false,
								    		                name: 'carRentalDay',
								    		                regex :  /^\d+((\.\d{0,2}){0,1})$/,
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
									  	            	fieldLabel : '结案状态',
										            	itemId : 'statusName',
										            	name : 'statusName',
										            	readOnly : true
										            }, {
									  	            	fieldLabel : '结案编码',
									  	            	emptyText: '结案编码',
										            	itemId : 'claimCloseNo',
										            	name : 'claimCloseNo',
						    		    			    readOnly : true
										            }]
								            	}, {
									      	    	  xtype: 'container',
									    	          layout: 'hbox',
									    	          itemId : 'claimCloseContainer2',
									    	          defaultType: 'textfield',
									    	          items:[{
								    		            	fieldLabel:'结案日期',
								    		                emptyText: '结案日期',
								    		                itemId : 'claimCloseDate',
								    		                name: 'claimCloseDate',
							    		    			    maxLength: 20,
							    		    			    xtype: 'datefield',
							    		    			    format: 'Y-m-d',
							    		    			    readOnly : true
								    		            }, {
								    		            	fieldLabel:'结案金额（元）',
								    		                emptyText: '结案金额（元）',
								    		                itemId : 'closeAmount',
								    		                name: 'closeAmount',
								    		                readOnly : true
									    		      }]
									            }, {
									      	    	  xtype: 'container',
									    	          layout: 'hbox',
									    	          itemId : 'claimCloseContainer3',
									    	          defaultType: 'textfield',
									    	          items:[{
								    		            	fieldLabel:'代步车提供商',
								    		                emptyText: '代步车提供商',
								    		                itemId : 'provider',
								    		                name: 'provider',
							    		    			    maxLength: 20,
							    		    			    xtype: 'datefield',
							    		    			    format: 'Y-m-d',
							    		    			    readOnly : true
								    		            }/*, {
								    		            	fieldLabel:'租车券编码',
								    		                emptyText: '租车券编码',
								    		                itemId : 'carRentalNo',
								    		                name: 'carRentalNo',
								    		                readOnly : true
									    		      }*/]
									            }]
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
		var contractVoId = selection[0].data.contractVoId;
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
				businessId : claimId,
				contractVoId : contractVoId
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
	}
	
});