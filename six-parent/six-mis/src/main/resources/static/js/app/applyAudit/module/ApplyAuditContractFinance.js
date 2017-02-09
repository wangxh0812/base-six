Ext.define('FMS.app.applyAudit.module.ApplyAuditContractFinance', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappapplyAuditmoduleApplyAuditContractFinance',
	requires : [ 'FMS.app.applyAudit.store.ApplyAudit', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.SelectionForm','Plugin.ux.IFrame'],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.app.contract.store.Contract');
		_store.on('beforeload', function(_store, options) {
					var new_params = Ext.Object.fromQueryString("status=finance&&riskCode=1");
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
			width : 150
		}, {
			text : '主数据状态',
			dataIndex : 'statusName',
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
			text : '保存日期',
			dataIndex : 'saveDatetime',
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
			text : '服务售价（元）',
			dataIndex : 'servicePrice',
			width : 80
		}, {
			text : '结算金额（元）',
			dataIndex : 'settlementAmount',
			width : 80
		}, {
			text : '经销商简称',
			dataIndex : 'companyShortName',
			width : 80
		}, {
			text : '备注',
			dataIndex : 'remark',
			width : 300
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
			itemId : 'toolbar1',
			defaultType: 'textfield',
			items : [{
				xtype : 'button',
				text : '查看',
				iconCls : 'icon-search',
				handler : function() {
					_this.openLookUp();
				}

			},{
				xtype : 'button',
				text : '审批通过',
				iconCls : 'icon-accept',
				handler : function(){
					var selection = _this.down("grid").getSelectionModel().getSelection();
					if (selection.length <= 0) {
						Ext.MessageBox.show({
							title : '警告',
							msg : '请至少选择一条数据',
							icon : Ext.MessageBox.INFO
						});
						return false;
					} else {
						Ext.MessageBox.show({
							title: "警告",
							msg: "您确定要使所选合同审批通过么?",
							icon: Ext.MessageBox.WARNING,
							buttons: Ext.MessageBox.OKCANCEL,
							fn: function(buttonId) {
								if (buttonId === "ok") {
									Ext.MessageBox.show({
										title: "警告",
										msg: "是否将全部内容作为投保依据提交？",
										icon: Ext.MessageBox.WARNING,
										buttons: Ext.MessageBox.OKCANCEL,
										fn: function(buttonId) {
											if (buttonId === "ok") {
												_this.openContractAudit(selection); 
											}
										}
									});
								}
							}
						});
					}
				}
			}, {
				xtype : 'button',
				text : '退回修改',
				iconCls : 'icon-cancel',
				handler : function(){
					var selection = _this.down("grid").getSelectionModel().getSelection();
					if (selection.length > 1 || selection.length <= 0) {
						Ext.MessageBox.show({
							title : '警告',
							msg : '只允许操作一条数据',
							icon : Ext.MessageBox.INFO
						});
						return false;
					} else {
						Ext.MessageBox.show({
							title: "警告",
							msg: "您确定要退回修改么?",
							icon: Ext.MessageBox.WARNING,
							buttons: Ext.MessageBox.OKCANCEL,
							fn: function(buttonId) {
								if (buttonId === "ok") {
									_this.contractCorrect(selection); 
								}
							}
						});
					}
				}
			}, {
				xtype : 'button',
				text : '退费',
				iconCls : 'icon-cancel',
				handler : function(){
					var selection = _this.down("grid").getSelectionModel().getSelection();
					if (selection.length > 1 || selection.length <= 0) {
						Ext.MessageBox.show({
							title : '警告',
							msg : '只允许操作一条数据',
							icon : Ext.MessageBox.INFO
						});
						return false;
					}
					var contractNo = selection[0].data.contractNo;
					Ext.MessageBox.show({
		                title: "警告",
		                msg: "您确定要将合同\""+contractNo+"\"退费么?",
		                icon: Ext.MessageBox.WARNING,
		                buttons: Ext.MessageBox.OKCANCEL,
		                fn: function(buttonId) {
		                    if (buttonId === "ok") {
		                    	_this.openRefuse(selection[0].data.contractId);
		                    }
		                }
					});
				}
			},{
				xtype : 'button',
				text : '下载',
				iconCls : 'icon-home',
				handler : function() {
					var selection = _this.down("grid").getSelectionModel().getSelection();
					if (selection.length <= 0) {
						Ext.MessageBox.show({
							title : '警告',
							msg : '至少编辑一条数据',
							icon : Ext.MessageBox.INFO
						});
						return false;
					}
					var businessIds = new Array();
					for(var i=0;i<selection.length;i++) {
						businessIds[i] = selection[i].data["contractId"];
						if (businessIds[i] == ''|| businessIds[i] == null) {
							Ext.MessageBox.show({
								title : '警告',
								msg : '第'+(i+1)+'项文件不存在',
								icon : Ext.MessageBox.WARNING
							});
							return false;
						}
					}
					var url = StaticSetting.absUrl+ '/mis/contract/downloadFile?businessIds=' + businessIds;
					var downloadForm = Ext.create("Ext.form.Panel",{
										border : 0,
										layout : 'fit',
										renderTo : Ext.getBody(),
										items : [ {
											xtype : 'PluginuxIFrame',
											src : url,
											listeners : {
												'load' : function() {
													Ext.messagebox.msg('提示','如未下载，表示文件不存在/已损坏，请与管理员联系!');
												}
											}
										} ]
									});							
		        }
			}]
		},
		{
			xtype : 'toolbar',
			dock : 'top',
			itemId : 'toolbar2',
			items : [/*"->",*/ "经销商简称：", filed3, /*"保存日期起期：", {
            	xtype : 'datefield',
            	fieldLable : '',
            	format : 'Y-m-d',
            	width :100,
            	name : 'saveDatetimeBegin',
            	itemId : 'saveDatetimeBegin'
            },  "保存日期止期：", {
            	xtype : 'datefield',
            	fieldLable : '',
            	format : 'Y-m-d',
            	width :100,
            	name : 'saveDatetimeEnd',
            	itemId : 'saveDatetimeEnd'
            },*/
			 "合同号码：", filed1, "车主：", filed2, /*"车辆状态：", {
                 fieldLabel: '',
              	 name: 'autoStatus',
                 xtype : 'ExtPluginFormCombobox',
                 tCode : 'c_auto_status',
                 itemId : 'autoStatus',
                 width :120,
                 typeAhead :false,
                 emptyText: '车辆状态'
			}, "服务类型：", {
                 fieldLabel: '',
              	 name: 'serviceType',
                 xtype : 'ExtPluginFormCombobox',
                 tCode : 'c_service_type',
                 itemId : 'serviceType',
                 width :120,
                 //forceSelection : true,
                 //editable : false,
                 typeAhead :false,
                 emptyText: '服务类型'
			},*/ {
				text : "查询",
				iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
//							servicePeriod : this.ownerCt.ownerCt.getComponent("toolbar1").getComponent("servicePeriod").getValue(),
							companyShortName : filed3.getValue(),
//							saveDatetimeBegin: Ext.Date.format(this.ownerCt.getComponent("saveDatetimeBegin").getValue(),"Y-m-d"),
//							saveDatetimeEnd: Ext.Date.format(this.ownerCt.getComponent("saveDatetimeEnd").getValue(),"Y-m-d"),
							contractNo: filed1.getValue(),
							customerName: filed2.getValue()
//							autoStatus: this.ownerCt.getComponent("autoStatus").getValue(),
//							serviceType: this.ownerCt.getComponent("serviceType").getValue()
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
		var contractId = selection[0].data.contractId;
		var idParams = {
			contractId : contractId
		};
		var win = this.createCientWindow({
					title : '查看合同信息',
					idName : 'contractId',
					idParams : idParams,
					hiddenButtons : true,
					getLoadDetailInfoArray : me.getLoadDetailInfoArray,
					listeners : {
						"closeWindow" : function(_win) {

						}
					}
				});
		win = this.createWindowTabs(win,{
			idParams : idParams,
			allowUpdate : true
		});
		win.loadAndRenderDetailInfo(idParams, win);
		win.show();
	},
	
	createWindowTabs : function(_win, obj) {
		obj.idParams.businessId = obj.idParams.contractId;
		obj.idParams.businessType = 4;
		_win.addTabClientPanel(Ext.create('Plugin.grid.UploadGridChudan', {
					title : '上传合同',
					height : 300,
					itemId : 'contractUploadGrid',
					store : Ext.create("FMS.basic.store.myFile"),
					storeParams : {
						businessId : obj.idParams.businessId,
						businessType : 4
					},
					allowUpdate : obj.allowUpdate,
					tCode : window.tCode,
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
	
	//form加载url
	getLoadDetailInfoArray : function(){
		return {
			baseForm : {
				name : '合同基本资料',
				url : StaticSetting.absUrl + '/mis/contract/getContract',
				formItemId : 'contractBaseForm'
			},
			tabForm : []
		};
	},
	
	//创建合同详情弹出窗口
	createCientWindow : function(obj){
		var me = this;
		var saveUrl = StaticSetting.absUrl + '/mis/contract/save';
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindowNotLoadTab",obj);
		_win.addBaseClientForm({
			fieldSetTitle: '合同基本资料',
			collapsible: true,
			formItemId : 'contractBaseForm',
			formUrl : saveUrl,
			submitParams : obj.idParams,
			formItems : this.getClientBaseInfo(obj.hiddenButtons,obj.serviceBeginDate),
			width : 1000,
			hiddenFormButten : true
		});
		return _win;
	},
	
	getClientBaseInfo : function(hiddenButtons,serviceBeginDate){
		var me = this;
		return [{
            xtype: 'fieldset',
            itemId : 'companyFieldSet',
            layout: 'form',
            collapsible: true,
            //collapsed : true,
            title : '甲方信息',
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
    	     				xtype : 'ExtPluginSelectionForm',
    	     				itemId : 'companySelectionForm',
    	     				grid : "FMSbasicmoduleCompany",
    	     				hiddenFields : ['companyId','companyCode','companyShortName'],
    	     				textField : "companyName",
    	     				textFeildName : "经销商全称",
    	     				idParams : {
//    	     					isWork : '1'
    	     				},
    	     				windowTitle : '选择经销商',
    	     				textFieldConfig : {
    							allowBlank: false
    						},
    	     				selectedCallBack : function(record){
    	     					var companyId = this.getComponent("companyId");
    	     					var companyCode = this.getComponent("companyCode");
    	     					var companyShortName = this.getComponent("companyShortName");
    	     					var companyTelephone = this.ownerCt.getComponent("companyTelephone");
    	     					companyId.setValue(record.get("companyId"));
    	     					companyCode.setValue(record.get("companyCode"));
    	     					companyShortName.setValue(record.get("companyShorten"));
    	     					companyTelephone.setValue(record.get("companyTelephone"));
    	     				},
    	     				windowWidth : 950
    	            	},{
    		            	fieldLabel:'联系电话',
    		                emptyText: '联系电话',
    		                readOnly : true,
    		                itemId : 'companyTelephone',
    		                name: 'companyTelephone'
    		            },/*{
    		            	fieldLabel:'经销商简称',
    		                emptyText: '经销商简称',
    		                hidden : true,
    		                readOnly : true,
    		                itemId : 'companyShortName',
    		                name: 'companyShortName'
    		            },*/{
    	     				xtype : 'ExtPluginSelectionForm',
    	     				itemId : 'contactSelectionForm',
    	     				grid : "FMSappcompanyContactsmoduleCompanyContacts",
    	     				hiddenFields : ['companyContactsId'],
    	     				textField : "contactsName",
    	     				textFeildName : "业务联系人",
    	     				idParams : {
//    	     					isWork : '1'
    	     				},
    	     				windowTitle : '选择业务联系人',
    	     				textFieldConfig : {
//    							allowBlank: false
    						},
    	     				selectedCallBack : function(record){
    	     					var companyContactsId = this.getComponent("companyContactsId");
    	     					var contactsName = this.getComponent("contactsName");
    	     					companyContactsId.setValue(record.get("contactsId"));
    	     					contactsName.setValue(record.get("contactsName"));
    	     				},
    	     				windowWidth : 950
    	            	}]
            	}]
		      }]
		  	},{
	            xtype: 'fieldset',
	            itemId : 'customerFieldSet',
	            layout: 'form',
	            collapsible: true,
	            //collapsed : true,
	            title : '乙方信息',
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
	    		                itemId : 'customerName',
	    		                name: 'customerName'
	    		            }, {
	    		            	fieldLabel:'联系方式',
	    		                emptyText: '联系方式',
	    		                itemId : 'customerPhone',
	    		                name: 'customerPhone'
	    		            }]
	            	}, {
		      	    	  xtype: 'container',
		    	          layout: 'hbox',
		    	          itemId : 'customerContainer2',
		    	          defaultType: 'textfield',
		    	          items:[{
		    		            	fieldLabel:'证件类型',
		    		                itemId : 'customerIdType',
		    		                xtype : 'ExtPluginFormCombobox',
		    		                tCode : 'c_user_notype',
		    		                typeAhead :false,
		    		                editable : false,
		    		                name: 'customerIdType',
		    		                listeners: {
	    		    			    	"change": function (val) {
	    		    			    		var customerIdType = val.getValue();
	    		    			    		var customerIdNo = this.ownerCt.getComponent("customerIdNo");
	    		    			    		if(customerIdType == 0) {
	    		    			    			customerIdNo.regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	    		    			    		} else if(customerIdType == 1) {
	    		    			    			customerIdNo.regex = /^[a-zA-Z0-9]{5,17}$/;
	    		    			    		} else {
	    		    			    			customerIdNo.regex = /^.*$/;
	    		    			    		}
	    		    			    	}
	    		    			    }
		    		            }, {
		    		            	fieldLabel:'证件号码',
		    		                emptyText: '证件号码',
		    		                itemId : 'customerIdNo',
		    		                name: 'customerIdNo',
		    		                regexText:"证件格式有误"
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
	    		    			    dateRange:{today:new Date()},
	    		    				vtype:'dateRange',
	    		    			    xtype: 'datefield',
	    		    			    format: 'Y-m-d',
//	    		    			    allowBlank : false,
	    		    			    listeners: {
	    		    			    	"change": function (val) {
	    		    			    		var dayLeft = Ext.util.Format.date(Ext.Date.add(new Date(val.getValue()),Ext.Date.DAY,30),"Y-m-d");
	    		    			    		if(new Date(dayLeft) < new Date()) {
	    		    			    			Ext.MessageBox.show({
	    		    								title : '警告',
	    		    								msg : "抱歉，当前只支持新车，您不符合购买条件。",
	    		    								buttons : Ext.MessageBox.OK,
	    		    								icon : Ext.MessageBox.WARNING
	    		    							});
	    		    			    			
	    		    			    		} else {
	    		    			    			this.ownerCt.getComponent("autoStatus").setValue('1');
	    		    			    			this.ownerCt.ownerCt.getComponent("autoContainer2").getComponent("autoNo").setValue("无");
	    		    			    		}
	    		    			    	}
	    		    			    }
		    		            }, {
		    		            	fieldLabel:'车辆状态',
		    		                itemId : 'autoStatus',
		    		                name: 'autoStatus',
		    		                xtype : 'ExtPluginFormCombobox',
		    		                tCode : 'c_auto_status',
		    		                typeAhead :false,
		    		                editable : false,
		    		                emptyText: '车辆状态'
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
		    		                value: '无',
			    		            regex : /(^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$)|无/,
		    		                regexText:"请输入正确车牌号格式"
		    		            },{
		    		            	fieldLabel:'发动机号码',
		    		                emptyText: '发动机号码',
		    		                itemId : 'autoEngineNo',
		    		                name: 'autoEngineNo',
		    		                regex : /^[A-Z\d]*$/,
		    		                regexText:"请输入大写字母和数字"
		    		            }, {
		    		            	fieldLabel:'车辆识别代码（VIN码）',
		    		                emptyText: '车辆识别代码（VIN码）',
		    		                itemId : 'autoVinNo',
		    		                name: 'autoVinNo',
		    		                labelWidth: 150,
		    		                width: 300,
		    		                regex : /^[A-Z\d]{17}$/,
		    		                regexText:"请输入17位大写字母和数字"
			    		        }]
			            	}, {
				      	    	  xtype: 'container',
				    	          layout: 'hbox',
				    	          itemId : 'autoContainer3',
				    	          items:[{
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
				    				textFeildName : "品牌",
				    				windowTitle : '选择品牌',
				    				margins: '0 0 5 0',
				    				windowWidth : 800,
				    				textFieldConfig : {
//		    							allowBlank: false
		    						},
				    				selectedCallBack : function(record){
				     					this.ownerCt.getComponent("autoSeries").idParams = {autoBrandId : record.get("autoBrandId")};
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
				    				windowTitle : '请先选择品牌后再选择车系',
				    				margins: '0 0 5 0',
				    				windowWidth : 800,
				    				textFieldConfig : {
//		    							allowBlank: false
		    						},
				    				selectedCallBack : function(record){
				     					this.ownerCt.getComponent("autoModels").idParams = {autoSeriesId : record.get("autoSeriesId")};
				     				}
				    	    	}, {
				    				xtype : 'ExtPluginSelectionForm',
				    				grid : "FMSappselectmoduleAutoModelsModule",
				    				itemId : 'autoModels',
				    				hiddenFields : [{
				    					fieldName : "autoModelsId",
				    					storeName : 'autoModelsId'
				    				}],
				    				textField : {
				    					fieldName : "autoModelsName",
				    					storeName : 'autoModelsName'
				    				},
				    				textFeildName : "车型",
				    				windowTitle : '请先选择车系后再选择车型',
				    				margins: '0 0 5 0',
				    				windowWidth : 800/*,
				    				listeners: {
				    					'click' : function() {
				    						Ext.MessageBox.show({
    		    								title : '警告',
    		    								msg : "抱歉，当前只支持新车，您不符合购买条件。",
    		    								buttons : Ext.MessageBox.OK,
    		    								icon : Ext.MessageBox.WARNING
    		    							});
					    				}
				    				}*/
				    	    	}]
				            	}, {
					      	    	  xtype: 'container',
					    	          layout: 'hbox',
					    	          itemId : 'autoContainer4',
					    	          defaultType: 'textfield',
					    	          items:[{
				    		            	fieldLabel:'车辆发票金额（元）',
				    		                emptyText: '车辆发票金额（元）',
				    		                itemId : 'fapiaoAmount',
				    		                name: 'fapiaoAmount',
				    		                labelWidth: 120,
				    		                width: 280,
					    		            regex : /^\d*$/,
				    		                regexText:"请输入整数位"
				    		            },{
				    		            	fieldLabel:'购置费用（元）',
				    		                emptyText: '购置费用（元）',
				    		                itemId : 'gouzhishuiAmount',
				    		                name: 'gouzhishuiAmount',
				    		                labelWidth: 120,
				    		                width: 280,
				    		                regex : /^\d*$/,
				    		                regexText:"请输入整数位"
				    		            }, {
					    	        	  	xtype: 'textfield',
				    		            	fieldLabel:'车船税',
				    		                itemId : 'vehicleTax',
				    		                name: 'vehicleTax'
				    		            }]
					            	}, {
						      	    	  xtype: 'container',
						    	          layout: 'hbox',
						    	          itemId : 'autoContainer5',
						    	          items:[{
					    		            	fieldLabel:'车险保险公司',
					    		                itemId : 'insuranceCode',
					    		                xtype : 'ExtPluginFormCombobox',
					    		                tCode : 'c_insurance_code',
					    		                typeAhead :false,
					    		                editable : false,
					    		                name: 'insuranceCode'
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
		    		                tCode : 'c_service_type',
		    		                typeAhead :false,
		    		                editable : false,
		    		                name: 'serviceType',
		    		                listeners : {
		    		                	change : function(scope, evt, opts) {
		    		                		var serviceType = scope.getValue();
		    		                		
		    		                		//自动带出结算金额
											var container = this.ownerCt.ownerCt.ownerCt.ownerCt;
											var servicePeriod = this.ownerCt.getComponent('servicePeriod').getValue();
											var autoStatus = container.getComponent('autoFieldSet').getComponent('autoInfo')
															.getComponent('autoContainer1').getComponent('autoStatus').getValue();
											var feeRateComp = this.ownerCt.getComponent('feeRate');
											Ext.Ajax.request({
									            url: StaticSetting.absUrl + "/mis/product/getlist",
									            params : {
									            	page : '1',
									            	limit : '30',
									            	serviceType : serviceType,
									            	period : servicePeriod,
									            	autoStatus : autoStatus
									            },
									            method: 'GET',
									            //async: false,
									            success: function (response, options) {
									            	var resultJSON = Ext.JSON.decode(response.responseText);
									            	if(resultJSON.count > 0){
									            		var feeRate = resultJSON.data[0].feeRate ;
									            		feeRateComp.setValue(feeRate);
									            		var fapiaoAmount = container.getComponent('autoFieldSet').getComponent('autoInfo')
																		.getComponent('autoContainer4').getComponent('fapiaoAmount').getValue();
									            		var settlementAmount = parseFloat(fapiaoAmount==''?0:fapiaoAmount) * parseFloat(feeRate);
									            		container.getComponent('serviceFieldSet').getComponent('serviceInfo').getComponent('serviceContainer2')
									            		.getComponent('settlementAmount').setValue(settlementAmount.toFixed(4));
									            	} else{
									            		Ext.MessageBox.show({
									            			title : '警告',
									            			msg : '无此产品参数配置',
									            			icon : Ext.MessageBox.WARNING,
									            			buttons : Ext.MessageBox.OK
									            		});
									            	}
									            },
									            failure: function (response, options) {
									                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
									            }
									        });
		    		                	}
		    		                }
		    		            }, {
		    		            	fieldLabel:'服务期限',
		    		                itemId : 'servicePeriod',
		    		                xtype : 'ExtPluginFormCombobox',
		    		                tCode : 'c_service_period',
		    		                typeAhead :false,
		    		                editable : false,
		    		                name: 'servicePeriod',
		    		                listeners : {
		    		                	change : function(scope, evt, opts) {
		    		                		var servicePeriod = parseInt(scope.getValue());
		    		                		var serviceBeginDate = this.ownerCt.ownerCt.getComponent('serviceContainer3').getComponent('serviceBeginDate').getValue();
		    		                		var sericeEndDate = this.ownerCt.ownerCt.getComponent('serviceContainer3').getComponent('sericeEndDate');
		    		                		sericeEndDate.setValue(Ext.util.Format.date(Ext.Date.add(new Date(serviceBeginDate),Ext.Date.YEAR,+servicePeriod),"Y-m-d"));
		    		                		var servicePeriodType = scope.rawValue.substring(1,2);
		    		                		if(servicePeriodType == '天') {
		    		                			servicePeriodType = '1';
		    		                		} else if(servicePeriodType == '月') {
		    		                			servicePeriodType = '2';
		    		                		} else if(servicePeriodType == '年') {
		    		                			servicePeriodType = '3';
		    		                		}
		    		                		this.ownerCt.getComponent('servicePeriodType').setValue(servicePeriodType);
		    		                		
		    		                		//自动带出结算金额
											var container = this.ownerCt.ownerCt.ownerCt.ownerCt;
											var serviceType = this.ownerCt.getComponent('serviceType').getValue();
											var autoStatus = container.getComponent('autoFieldSet').getComponent('autoInfo')
															.getComponent('autoContainer1').getComponent('autoStatus').getValue();
											var feeRateComp = this.ownerCt.getComponent('feeRate');
											Ext.Ajax.request({
									            url: StaticSetting.absUrl + "/mis/product/getlist",
									            params : {
									            	page : '1',
									            	limit : '30',
									            	serviceType : serviceType,
									            	period : servicePeriod,
									            	autoStatus : autoStatus
									            },
									            method: 'GET',
									            //async: false,
									            success: function (response, options) {
									            	var resultJSON = Ext.JSON.decode(response.responseText);
									            	if(resultJSON.count > 0){
									            		var feeRate = resultJSON.data[0].feeRate ;
									            		feeRateComp.setValue(feeRate);
									            		var fapiaoAmount = container.getComponent('autoFieldSet').getComponent('autoInfo')
																		.getComponent('autoContainer4').getComponent('fapiaoAmount').getValue();
									            		var settlementAmount = parseFloat(fapiaoAmount==''?0:fapiaoAmount) * parseFloat(feeRate);
									            		container.getComponent('serviceFieldSet').getComponent('serviceInfo').getComponent('serviceContainer2')
									            		.getComponent('settlementAmount').setValue(settlementAmount.toFixed(4));
									            	} else{
									            		Ext.MessageBox.show({
									            			title : '警告',
									            			msg : '无此产品参数配置',
									            			icon : Ext.MessageBox.WARNING,
									            			buttons : Ext.MessageBox.OK
									            		});
									            	}
									            },
									            failure: function (response, options) {
									                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
									            }
									        });
		    		                	}
		    		                }
		    		            }, {
		    		            	fieldLabel:'服务类型',
		    		                itemId : 'servicePeriodType',
		    		                name: 'servicePeriodType',
		    		                hidden : true
		    		            }, {
		    		            	fieldLabel:'保险费率',
		    		                itemId : 'feeRate',
		    		                name: 'feeRate',
		    		                hidden : true
		    		            }]
			            	}, {
				      	    	  xtype: 'container',
				    	          layout: 'hbox',
				    	          itemId : 'serviceContainer2',
				    	          defaultType: 'textfield',
				    	          items:[{
			    		            	fieldLabel:'服务售价（元）',
			    		                emptyText: '服务售价（元）',
			    		                itemId : 'servicePrice',
			    		                name: 'servicePrice',
			    		                hiddenFields : ['feeRate'],
			    		                regex : /^\d+((\.\d){0,2}){1}$/,
			    		                regexText:"请最多保留两位小数"
			    		            }, {
			    		            	fieldLabel:'结算金额（元）',
			    		                emptyText: '结算金额（元）',
			    		                itemId : 'settlementAmount',
			    		                name: 'settlementAmount',
//			    		                labelWidth: 120,
//			    		                width: 280,
			    		                regex : /^\d+(\.\d{1,4})?$/,
			    		                regexText:"请输入数字"
				    		        }]
				            	}, {
					      	    	  xtype: 'container',
					    	          layout: 'hbox',
					    	          itemId : 'serviceContainer3',
					    	          defaultType: 'textfield',
					    	          items:[{
				    		            	fieldLabel:'服务起始日期',
				    		                emptyText: '服务起始日期',
				    		                itemId : 'serviceBeginDate',
				    		                name: 'serviceBeginDate',
			    		    			    maxLength: 20,
			    		    			    xtype: 'datefield',
			    		    			    format: 'Y-m-d',
			    		    			    value: serviceBeginDate//Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,+1),"Y-m-d")
//			    		    			    allowBlank : false,
				    		            }, {
				    		            	fieldLabel:'服务终止日期',
				    		                emptyText: '服务终止日期',
				    		                itemId : 'sericeEndDate',
				    		                name: 'sericeEndDate',
			    		    			    maxLength: 20,
			    		    			    xtype: 'datefield',
			    		    			    format: 'Y-m-d'
//			    		    			    allowBlank : false,
				    		            }]
					            	}, {
						      	    	  xtype: 'container',
						    	          layout: 'hbox',
						    	          itemId : 'serviceContainer4',
						    	          defaultType: 'textfield',
						    	          items:[{
						  	            	fieldLabel : '销售人员',
							            	itemId : 'salesName',
//							            	allowBlank : false,
							            	name : 'salesName'
							            }, {
						  	            	fieldLabel : '合同号码',
							            	itemId : 'contractNo',
//							            	allowBlank : false,
							            	name : 'contractNo',
							            	readOnly : true,
							            	emptyText: '系统唯一生成,无需填写'
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
				    	            	xtype: 'htmleditor',
				    	            	enableAlignments: false,
				    	            	enableColors: false,
				    	            	enableFont : false,
				    	            	enableFontSize : false,
				    	            	enableFormat : false,
				    	            	enableLinks : false,
				    	            	enableLists : false,
				    	            	enableSourceEdit : false,
				    	              	fieldLabel : '附加服务',
				    	              	name: 'additionalService',
				    	              	value: '无附加服务。',
				    	              	height : 72,
				    	              	width : 830
				    	              }]
				            	}, {
					      	    	  xtype: 'container',
					    	          layout: 'hbox',
					    	          itemId : 'otherContainer2',
					    	          defaultType: 'textfield',
					    	          items:[{
					    	            	xtype: 'htmleditor',
					    	            	enableAlignments: false,
					    	            	enableColors: false,
					    	            	enableFont : false,
					    	            	enableFontSize : false,
					    	            	enableFormat : false,
					    	            	enableLinks : false,
					    	            	enableLists : false,
					    	            	enableSourceEdit : false,
					    	              	fieldLabel : '备注',
					    	              	name: 'remark',
					    	              	value: '无备注。',
					    	              	height : 72,
					    	              	width : 830
					    	              }]
					            	}, {
						      	    	  xtype: 'container',
						    	          layout: 'hbox',
						    	          itemId : 'otherContainer3',
						    	          defaultType: 'textfield',
						    	          items:[{
					    		            	fieldLabel:'主数据状态',
					    		                itemId : 'status',
					    		                xtype : 'ExtPluginFormCombobox',
					    		                tCode : 'c_contract_status',
					    		                emptyText : '系统生成,无需选择',
					    		                typeAhead :false,
					    		                editable : false,
					    		                name: 'status'
					    		            }]
						            	}]
						      }]
						  	}];
	},
	
	//提交审批通过
	openContractAudit : function(selection){
		var me = this;
		var url2 = StaticSetting.absUrl + "/mis/applyAudit/contractAuditList";
		me.visitApplyAuditByAjax(selection,url2);
		var url = StaticSetting.absUrl + "/mis/contract/contractAudit";
		me.auditContractByAjax(selection,url);
	},
	
	auditContractByAjax : function(selection,url){
		var me = this;
		var param = new Array();
		for(var i=0; i<selection.length; i++) {
			param.push({"contractId":selection[i].data.contractId,"status":selection[i].data.status});
		}
		Ext.Ajax.request({
            url: url,
            jsonData : param,
            method: 'POST',
            async: false,
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
            	me.store.reload();
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
	},
	
	//访问后台
	visitContractByAjax : function(contractId,url,extraParams){
		var me = this;
		Ext.Ajax.request({
            url: url,
            params : Ext.isEmpty(extraParams)?{
            	contractId : contractId
            }:Ext.apply({
            	contractId : contractId
            },extraParams),
            method: 'GET',
            async: false,
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
            	me.store.reload();
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
	},
	
	//退费
	openRefuse : function(contractId){
		var me = this;
		var url2 = StaticSetting.absUrl + "/mis/applyAudit/contractAudit";
//		me.visitApplyAuditByAjax(contractId,url2);
		me.refuseReason(contractId,url2);
//		var url = StaticSetting.absUrl + "/mis/contract/contractClaim";
//		me.visitContractByAjax(contractId,url);
	},
	
	visitApplyAuditByAjax : function(selection,url){
		var me = this;
		var param = new Array();
		for(var i=0; i<selection.length; i++) {
			param.push({"contractId":selection[i].data.contractId,"auditStatus":1,"auditProgress":2});
		}
		Ext.Ajax.request({
            url: url,
            jsonData : param,
            method: 'POST',
            async: false,
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
            	me.store.reload();
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
	},
	
	//退费原因
	refuseReason : function(contractId,url){
		var me = this;
		var reasonForm = Ext.create("Ext.form.Panel",{
			border : false,
			layout : 'form',
			defaultType : 'textfield',
			items : [{
				xtype : 'textareafield',
				name : 'reason',
				fieldLabel : '退费原因'
			}]
		});
		var reasonWindow = Ext.create("Ext.window.Window",{
			title : '退费',
			modal : true,
			border : false,
			floating : true,
			width : 550,
			anchor : '100%',
			layout : 'form', 
			items : [reasonForm],
			buttons : [{
				text : '确定',
				handler : function(){
					var reason = reasonForm.getForm().findField("reason").getValue();
					me.visitContractByAjax(contractId,url,{
						auditRemark : reason,
						auditStatus : 2,
						auditProgress : 2
					});
					var url2 = StaticSetting.absUrl + "/mis/contract/contractClaim";
					me.visitContractByAjax(contractId,url2);
					reasonWindow.close();
				}
			},{
				text : '取消',
				handler : function(){
					reasonWindow.close();
				}
			}]
		});
		reasonWindow.show();
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
					fieldLabel : '经销商简称',
					name : 'companyShortName'
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
	
	//提交退回修改
	contractCorrect : function(selection){
		var me = this;
		var url = StaticSetting.absUrl + "/mis/contract/contractCorrect";
		me.correctReason(selection,url);
	},
	
	//退费原因
	correctReason : function(selection,url){
		var me = this;
		var reasonForm = Ext.create("Ext.form.Panel",{
			border : false,
			layout : 'form',
			defaultType : 'textfield',
			items : [{
				xtype : 'textareafield',
				name : 'reason',
				fieldLabel : '退回修改原因'
			}]
		});
		var reasonWindow = Ext.create("Ext.window.Window",{
			title : '请输入退回修改原因',
			modal : true,
			border : false,
			floating : true,
			width : 550,
			anchor : '100%',
			layout : 'form', 
			items : [reasonForm],
			buttons : [{
				text : '确定',
				handler : function(){
					var reason = reasonForm.getForm().findField("reason").getValue();
					me.visitContractByAjax(selection[0].data.contractId,url,{
						remark : reason,
						status : 1
					});
					reasonWindow.close();
				}
			},{
				text : '取消',
				handler : function(){
					reasonWindow.close();
				}
			}]
		});
		reasonWindow.show();
	},
	
	//访问后台
	visitContractByAjax : function(contractId,url,extraParams){
		var me = this;
		Ext.Ajax.request({
            url: url,
            params : Ext.isEmpty(extraParams)?{
            	contractId : contractId
            }:Ext.apply({
            	contractId : contractId
            },extraParams),
            method: 'GET',
            async: false,
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
            	me.store.reload();
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
	}
	
});