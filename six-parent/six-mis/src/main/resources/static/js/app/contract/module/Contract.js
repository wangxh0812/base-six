Ext.define('FMS.app.contract.module.Contract', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappcontractmoduleContract',
	requires : [ 'FMS.app.contract.store.Contract', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.SelectionForm','FMS.basic.module.Company',
	             'FMS.app.companyContacts.module.CompanyContacts','FMS.app.select.module.AutoBrandModule',
	             'FMS.app.select.module.AutoSeriesModule','FMS.app.select.module.AutoModelsModule','Plugin.ux.IFrame'],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.app.contract.store.Contract');
		_store.on('beforeload', function(_store, options) {
			var new_params = Ext.Object.fromQueryString("riskCode=1");
			Ext.apply(_store.proxy.extraParams, new_params);
		});
		Ext.apply(this, {
			store : _store,
			gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.editRows = function() {
			var _this = this;
			var selection = this.down("grid").getSelectionModel().getSelection();
			if(selection[0].data.status == 1 || selection[0].data.status == 8) {
				_this.openEdit();
			} else {
				_this.openLookUp();
			}
		};
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
			text : '主数据状态',
			dataIndex : 'statusName',
			renderer : function(val){
				if(val=='已暂存' || val=='审核未通过') {
					return "<font color = blue>"+val+"</font>";
				}
				return val;
			},
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
			text : '结算金额（元）',
			dataIndex : 'settlementAmount',
			width : 80
		}, {
			text : '服务期限',
			dataIndex : 'servicePeriodName',
			width : 60
		}, {
			text : '经销商简称',
			dataIndex : 'companyShortName',
			width : 80
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
		
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			itemId : 'toolbar1',
			defaultType: 'textfield',
			items : [{
				xtype : 'button',
				text : '新增',
				iconCls : 'icon-add',
				handler : function() {
					_this.addFormWindow();
				}
			}, {
				xtype : 'button',
				text : '修改',
				iconCls : 'icon-edit',
				handler : function() {
					_this.openEdit();
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
						} else {
							Ext.Ajax.request({
					            url: StaticSetting.absUrl + "/mis/contract/getContract",
					            params : {
					            	contractId : selection[0].data.contractId
					            },
					            method: 'GET',
					            //async: false,
					            success: function (response, options) {
					            	var resultJSON = Ext.JSON.decode(response.responseText);
					            	if(resultJSON != null){
					            		var status = resultJSON.status ;
					            		var effected = false;
					        			if(status != "1"){
					        				effected = true;
					        				Ext.MessageBox.show({
					        					title : '警告',
					        					msg : '合同已生成，无法删除',
					        					icon : Ext.MessageBox.INFO
					        				});
					        				return false;
					        			}
					            	}
					            },
					            failure: function (response, options) {
					                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
					            }
					        });
						}
					}
				}
			}, {
				xtype : 'button',
				text : '查看',
				iconCls : 'icon-search',
				handler : function() {
					_this.openLookUp();
				}

			},{
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
						window.open(StaticSetting.absUrl + "/mis/contract/printer?contractId="+selection[0].data.contractId);
					} else {
						Ext.MessageBox.show({
			    			title : '警告',
			    			msg : '暂存的合同无法打印！',
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
			items : [/*"->",*/"保单号：", {
				xtype : 'textfield',
            	itemId : 'policyNo',
            	name : 'policyNo'
            }, "合同号码：", filed1, "车主：", filed2, {
				text : "查询",
				iconCls : 'icon-search',
//				handler : function() {
//					_this.store.load({
//						params : {
//							policyNo : this.ownerCt.getComponent("policyNo").getValue(),
//							contractNo: filed1.getValue(),
//							customerName: filed2.getValue()
//						}
//					});
//				}
	            handler : function() {
					Ext.apply(_this.store.proxy.extraParams,{
						policyNo : this.ownerCt.getComponent("policyNo").getValue(),
						contractNo: filed1.getValue(),
						customerName: filed2.getValue()
					});
					_this.store.load();
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
			Ext.Ajax.request({
	            url: StaticSetting.absUrl + "/mis/contract/getContract",
	            params : {
	            	contractId : selection[0].data.contractId
	            },
	            method: 'GET',
	            //async: false,
	            success: function (response, options) {
	            	var resultJSON = Ext.JSON.decode(response.responseText);
	            	if(resultJSON != null){
	            		var status = resultJSON.status ;
	            		var effected = false;
	        			if(!(status == "1" || status == "8")){
	        				effected = true;
	        				Ext.MessageBox.show({
	        					title : '警告',
	        					msg : '此状态下无法进行修改',
	        					icon : Ext.MessageBox.INFO
	        				});
	        				return false;
	        			}
	        			var autoBrandName = selection[0].data.autoBrandName;
	        			if(autoBrandName == '一汽大众' || autoBrandName == '一汽奥迪') {
	        				window.tCode='c_document_type_chudan_dazhong';
	        			} else if(autoBrandName == '长城') {
	        				window.tCode='c_document_type_chudan_changcheng';
	        			} else {
	        				window.tCode='c_document_type_chudan';
	        			}
	        			me.formWindowUp(selection[0].data.contractId,selection[0].data.serviceBeginDate,effected,selection[0].data.insuranceType,selection[0].data.autoBrandName);
	            	}
	            },
	            failure: function (response, options) {
	                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
	            }
	        });
		}
	},
	
	/**
	 * 修改 弹出窗口
	 */
	formWindowUp : function(contractId,serviceBeginDate,effected,insuranceType,autoBrandName){
		var me = this;
		var idParams = {
			contractId : contractId,
			presave : null
		};
		var allowBlank = false;
		var hiddenAllowBlank = false;
		if(autoBrandName == '长城') {
			allowBlank = true;
			hiddenAllowBlank = true;
		}
		var win = this.createCientWindow({
			title : '修改合同信息',
			idName : 'contractId',
			idParams : idParams,
			hiddenButtons : effected,
			serviceBeginDate : serviceBeginDate,
			insuranceType :insuranceType,
			width : 1000,
			allowBlank : allowBlank,
			hiddenAllowBlank : hiddenAllowBlank,
			getLoadDetailInfoArray : me.getLoadDetailInfoArray,
			listeners : {
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
		win = this.createWindowTabs(win,{
			idParams : idParams,
			allowUpdate : effected
		});
		win.loadAndRenderDetailInfo(idParams,win);
		win.show();
	},
	
	/**
	 * 新增弹出窗口
	 */
    addFormWindow : function(){
    	var me = this;
    	var idParams = {
    			presave : null
    		};
		var win = this.createCientWindow({
			title : '新增合同',
			hiddenTabPanel:true,
			idName : 'contractId',
			idParams : idParams,
			serviceBeginDate : Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,+1),"Y-m-d"),
			insuranceType : '0000',
			width : 1000,
			getLoadDetailInfoArray : me.getLoadDetailInfoArray,
			listeners : {
				"createTabs" : function(a,b){
					me.createWindowTabs(a,b);
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
		win.show();
	},
	
	//创建合同详情弹出窗口
	createCientWindow : function(obj){
		var me = this;
		var saveUrl = StaticSetting.absUrl + '/mis/contract/save';
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindowContract",obj);
		_win.addBaseClientForm({
			fieldSetTitle: '合同基本资料',
			collapsible: true,
			formItemId : 'contractBaseForm',
			formUrl : saveUrl,
			submitParams : obj.idParams,
			formItems : this.getClientBaseInfo(obj.hiddenButtons,obj.serviceBeginDate,obj.insuranceType,obj.allowBlank,obj.hiddenAllowBlank),
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
				url : StaticSetting.absUrl + '/mis/contract/getContract',
				formItemId : 'contractBaseForm'
			},
			tabForm : []
		};
	},
	
	getClientBaseInfo : function(hiddenButtons,serviceBeginDate,insuranceType,allowBlank,hiddenAllowBlank){
		var me = this;
		var chesunChecked = false;
		var daoqiangChecked = false;
		var ziranChecked = false;
		var bujimianpeiChecked = false;
		if(insuranceType!='' && insuranceType!=null) {
			if(insuranceType.substring(0,1)==1) {
				chesunChecked = true;
			}
			if(insuranceType.substring(1,2)==1) {
				bujimianpeiChecked = true;
			}
			if(insuranceType.substring(2,3)==1) {
				daoqiangChecked = true;
			}
			if(insuranceType.substring(3,4)==1) {
				ziranChecked = true;
			}
		}
		chesunChecked = true;
		bujimianpeiChecked = true;
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
    	          itemId : 'companyContainer1',
    	          defaultType: 'textfield',
    	          items:[{
    	     				xtype : 'ExtPluginSelectionForm',
    	     				itemId : 'companySelectionForm',
    	     				grid : "FMSbasicmoduleCompany",
    	     				hiddenFields : ['companyId','companyCode','companyShortName','companyAddress'],
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
    	     					var companyAddress = this.getComponent("companyAddress");
    	     					var companyTelephone = this.ownerCt.ownerCt.getComponent("companyContainer2").getComponent("companyTelephone");
    	     					companyId.setValue(record.get("companyId"));
    	     					companyCode.setValue(record.get("companyCode"));
    	     					companyShortName.setValue(record.get("companyShorten"));
    	     					companyAddress.setValue(record.get("companyAdress"));
    	     					companyTelephone.setValue(record.get("companyTelephone"));
    	     				},
    	     				windowWidth : 950
    	            	},/*{
    		            	fieldLabel:'联系电话',
    		                emptyText: '联系电话',
    		                readOnly : true,
    		                itemId : 'companyTelephone',
    		                name: 'companyTelephone'
    		            },*//*{
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
    							allowBlank: false
    						},
    	     				selectedCallBack : function(record){
    	     					var companyContactsId = this.getComponent("companyContactsId");
    	     					var contactsName = this.getComponent("contactsName");
    	     					companyContactsId.setValue(record.get("contactsId"));
    	     					contactsName.setValue(record.get("contactsName"));
    	     				},
    	     				windowWidth : 950
    	            	}]
            	}, {
	      	    	  xtype: 'container',
	    	          layout: 'hbox',
	    	          itemId : 'companyContainer2',
	    	          defaultType: 'textfield',
	    	          items:[{
		  		            	fieldLabel:'联系电话',
				                emptyText: '联系电话',
				                allowBlank : false,
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
	    		                allowBlank : false,
	    		                itemId : 'customerName',
	    		                name: 'customerName'
	    		            }, {
	    		            	fieldLabel:'联系方式',
	    		                emptyText: '联系方式',
	    		                allowBlank : false,
	    		                itemId : 'customerPhone',
	    		                name: 'customerPhone',
	    		                regex : /^[\d]*$/,
	    		                regexText:"请输入数字"
	    		            }, {
	    		            	fieldLabel:'联系地址',
	    		                emptyText: '联系地址',
	    		                itemId : 'customerAddress',
	    		                name: 'customerAddress'
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
		    		                allowBlank : false,
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
		    		                allowBlank : false,
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
	    		    			    allowBlank : false,
	    		    			    dateRange:{today:new Date()},
	    		    				vtype:'dateRange',
	    		    			    xtype: 'datefield',
	    		    			    format: 'Y-m-d',
//	    		    			    allowBlank : false,
	    		    			    listeners: {
	    		    			    	"change": function (val) {
	    		    			    		var contractNo = this.ownerCt.ownerCt.ownerCt.ownerCt.getComponent("serviceFieldSet").getComponent("serviceInfo")
	    		    			    						.getComponent("serviceContainer4").getComponent("contractNo").getValue();
	    		    			    		var status = this.ownerCt.ownerCt.ownerCt.ownerCt.getComponent("otherFieldSet").getComponent("otherInfo")
	    		    			    		.getComponent("otherContainer3").getComponent("status").getValue();
	    		    			    		if((contractNo == '' || contractNo == null || status == 1) && val.getValue()!= null) {
	    		    			    			var dayNew = Ext.util.Format.date(Ext.Date.add(new Date(val.getValue()),Ext.Date.DAY,30),"Y-m-d");
	    		    			    			dayNew = me.replaceAll(dayNew,'-','/');
	    		    			    			var dayOne = Ext.util.Format.date(Ext.Date.add(new Date(val.getValue()),Ext.Date.YEAR,1),"Y-m-d");
	    		    			    			dayOne = me.replaceAll(dayOne,'-','/');
	    		    			    			var dayTwo = Ext.util.Format.date(Ext.Date.add(new Date(val.getValue()),Ext.Date.YEAR,2),"Y-m-d");
	    		    			    			dayTwo = me.replaceAll(dayTwo,'-','/');
	    		    			    			var dayThree = Ext.util.Format.date(Ext.Date.add(new Date(val.getValue()),Ext.Date.YEAR,3),"Y-m-d");
	    		    			    			dayThree = me.replaceAll(dayThree,'-','/');
	    		    			    			var dayFour = Ext.util.Format.date(Ext.Date.add(new Date(val.getValue()),Ext.Date.YEAR,4),"Y-m-d");
	    		    			    			dayFour = me.replaceAll(dayFour,'-','/');
	    		    			    			var dayFive = Ext.util.Format.date(Ext.Date.add(new Date(val.getValue()),Ext.Date.YEAR,5),"Y-m-d");
	    		    			    			dayFive = me.replaceAll(dayFive,'-','/');
	    		    			    			var autoStatusContainer = this.ownerCt.getComponent("autoStatus");
	    		    			    			if(new Date(dayNew) >= new Date()) {
	    		    			    				autoStatusContainer.setValue('1');
	    		    			    			} else if(new Date(dayOne) >= new Date()) {
	    		    			    				autoStatusContainer.setValue('2');
	    		    			    			} else if(new Date(dayTwo) >= new Date()) {
	    		    			    				autoStatusContainer.setValue('3');
	    		    			    			} else if(new Date(dayThree) >= new Date()) {
	    		    			    				autoStatusContainer.setValue('4');
	    		    			    			} else if(new Date(dayFour) >= new Date()) {
	    		    			    				Ext.Ajax.request({
	    												url: StaticSetting.absUrl + "/user/getUserCompanyInfo",
	    												params : {},
	    												method: 'GET',
	    												//async: false,
	    												success: function (response, options) {
	    													var resultJSON = Ext.JSON.decode(response.responseText);
    														if(resultJSON.autoBrandName == '一汽大众' || resultJSON.autoBrandName == '一汽奥迪') {
    															Ext.MessageBox.show({
    																title : '警告',
    																msg : '大众、奥迪仅支持36个月!',
    																icon : Ext.MessageBox.WARNING,
    																buttons : Ext.MessageBox.OK
    															});
    														} else {
    															autoStatusContainer.setValue('5');
    														}
	    												},
	    												failure: function (response, options) {
	    													Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
	    												}
	    											});
	    		    			    			} else if(new Date(dayFive) >= new Date()) {
	    		    			    				Ext.Ajax.request({
	    												url: StaticSetting.absUrl + "/user/getUserCompanyInfo",
	    												params : {},
	    												method: 'GET',
	    												//async: false,
	    												success: function (response, options) {
	    													var resultJSON = Ext.JSON.decode(response.responseText);
    														if(resultJSON.autoBrandName == '一汽大众' || resultJSON.autoBrandName == '一汽奥迪') {
    															Ext.MessageBox.show({
    																title : '警告',
    																msg : '大众、奥迪仅支持36个月!',
    																icon : Ext.MessageBox.WARNING,
    																buttons : Ext.MessageBox.OK
    															});
    														} else {
    															autoStatusContainer.setValue('6');
    														}
	    												},
	    												failure: function (response, options) {
	    													Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
	    												}
	    											});
	    		    			    			} else {
	    		    			    				Ext.Ajax.request({
	    												url: StaticSetting.absUrl + "/user/getUserCompanyInfo",
	    												params : {},
	    												method: 'GET',
	    												//async: false,
	    												success: function (response, options) {
	    													var resultJSON = Ext.JSON.decode(response.responseText);
    														if(resultJSON.autoBrandName == '一汽大众' || resultJSON.autoBrandName == '一汽奥迪') {
    															Ext.MessageBox.show({
    																title : '警告',
    																msg : '大众、奥迪仅支持36个月!',
    																icon : Ext.MessageBox.WARNING,
    																buttons : Ext.MessageBox.OK
    															});
    														} else {
    															Ext.MessageBox.show({
    				    		    								title : '警告',
    				    		    								msg : "抱歉，首次购车日期仅支持60个月以内",
    				    		    								buttons : Ext.MessageBox.OK,
    				    		    								icon : Ext.MessageBox.WARNING
    				    		    							});
    														}
	    												},
	    												failure: function (response, options) {
	    													Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
	    												}
	    											});
	    		    			    			}
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
		    		                allowBlank : false,
		    		                readOnly : true,
		    		                emptyText: '车辆状态',
		    		                listeners : {
		    		                	change : function(scope, evt, opts) {
		    		                		var autoStatus = scope.getValue();
		    		                		
		    		                		//自动带出结算金额
		    		                		var container = this.ownerCt.ownerCt.ownerCt.ownerCt.getComponent('serviceFieldSet')
											.getComponent('serviceInfo');
		    		                		var serviceType = container.getComponent('serviceContainer1').getComponent('serviceType').getValue();
											var servicePeriod = container.getComponent('serviceContainer1').getComponent('servicePeriod').getValue();
											var feeRateComp = container.getComponent('serviceContainer1').getComponent('feeRate');
											var autoBrandId = this.ownerCt.ownerCt.getComponent('autoContainer3').getComponent('autoBrand').items.items[0].lastValue;
											var fapiaoAmount = this.ownerCt.ownerCt.getComponent('autoContainer4').getComponent('fapiaoAmount').getValue();
											if(serviceType != undefined && servicePeriod != undefined && autoStatus != undefined && autoBrandId != undefined &&
											   serviceType != '' && servicePeriod != '' && autoStatus != '' && autoBrandId != '' &&
											   serviceType != null && servicePeriod != null && autoStatus != null && autoBrandId != null) {
												Ext.Ajax.request({
													url: StaticSetting.absUrl + "/mis/product/getlist",
													params : {
														page : '1',
														limit : '30',
														serviceType : serviceType,
														period : servicePeriod,
														autoStatus : autoStatus,
														autoBrandId : autoBrandId
													},
													method: 'GET',
													//async: false,
													success: function (response, options) {
														var resultJSON = Ext.JSON.decode(response.responseText);
														if(resultJSON.count > 0){
															var feeRate = resultJSON.data[0].feeRate ;
															feeRateComp.setValue(feeRate);
															var settlementAmount = parseFloat(fapiaoAmount==''?0:fapiaoAmount) * parseFloat(feeRate);
															container.getComponent('serviceContainer2').getComponent('settlementAmount').setValue(settlementAmount.toFixed(4));
														} else{
															Ext.MessageBox.show({
																title : '警告',
																msg : '计算保险费率时无此产品参数配置',
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
		    		                }
		    		            }, {
		    		            	fieldLabel:'使用性质',
		    		                itemId : 'carUsage',
		    		                name: 'carUsage',
		    		                xtype : 'ExtPluginFormCombobox',
		    		                tCode : 'c_car_usage',
		    		                typeAhead :false,
		    		                editable : false,
		    		                allowBlank : false,
		    		                emptyText: '使用性质',
		    		                listeners: {
    		                	       render : function(combo) {
    		                	           combo.getStore().on("load", function(s, r, o) {   
    		                	               combo.setValue('3');
    		                	           });   
    		                	       }   
    		                	   }   

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
		    		                allowBlank : false,
			    		            regex : /(^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$)|无/,
		    		                regexText:"请输入正确车牌号格式"
		    		            },{
		    		            	fieldLabel:'发动机号码',
		    		                emptyText: '发动机号码',
		    		                itemId : 'autoEngineNo',
		    		                name: 'autoEngineNo',
		    		                allowBlank : false,
		    		                regex : /^[A-Z\d]*$/,
		    		                regexText:"请输入大写字母和数字"
		    		            }, {
		    		            	fieldLabel:'车辆识别代码（VIN码）',
		    		                emptyText: '车辆识别代码（VIN码）',
		    		                itemId : 'autoVinNo',
		    		                name: 'autoVinNo',
//		    		                labelWidth: 150,
//		    		                width: 300,
		    		                allowBlank : false,
		    		                regex : /^[A-Z\d]{17}$/,
		    		                regexText:"请输入17位大写字母和数字",
		    		                listeners: {
	    		    			    	"blur": function (val) {
	    		    			    		var autoVinNo = val.getValue();
	    		    			    		Ext.Ajax.request({
												url: StaticSetting.absUrl + "/mis/contract/getlist",
												params : {
													page : '1',
													limit : '30',
													autoVinNo : autoVinNo,
													status : 'correct'
												},
												method: 'GET',
												//async: false,
												success: function (response, options) {
													var resultJSON = Ext.JSON.decode(response.responseText);
													if(resultJSON.count > 0){
														Ext.MessageBox.show({
															title : '警告',
															msg : '此VIN码已存在!',
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
			    		        }]
			            	}, {
				      	    	  xtype: 'container',
				    	          layout: 'hbox',
				    	          itemId : 'autoContainer3',
				    	          items:[{
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
				    				textFeildName : "品牌",
				    				windowTitle : '选择品牌',
				    				margins: '0 0 5 0',
				    				windowWidth : 800,
				    				textFieldConfig : {
		    							allowBlank: false
		    						},
				    				selectedCallBack : function(record){
				     					this.ownerCt.getComponent("autoSeries").idParams = {autoBrandId : record.get("autoBrandId")};
				     					this.ownerCt.getComponent("autoSeries").items.items[1].setValue('');
				     					
				     					//自动带出结算金额
	    		                		var container = this.ownerCt.ownerCt.ownerCt.ownerCt.getComponent('serviceFieldSet')
										.getComponent('serviceInfo');
	    		                		var serviceTypeContainer = container.getComponent('serviceContainer1').getComponent('serviceType');
	    		                		var serviceType = serviceTypeContainer.getValue();
	    		                		var servicePeriodContainer = container.getComponent('serviceContainer1').getComponent('servicePeriod');
										var servicePeriod = container.getComponent('serviceContainer1').getComponent('servicePeriod').getValue();
										var feeRateComp = container.getComponent('serviceContainer1').getComponent('feeRate');
										var autoBrandId = record.get("autoBrandId");
										var autoStatus = this.ownerCt.ownerCt.getComponent('autoContainer1').getComponent('autoStatus').getValue();
										var fapiaoAmount = this.ownerCt.ownerCt.getComponent('autoContainer4').getComponent('fapiaoAmount').getValue();
										if(serviceType != undefined && servicePeriod != undefined && autoStatus != undefined && autoBrandId != undefined &&
										   serviceType != '' && servicePeriod != '' && autoStatus != '' && autoBrandId != '' &&
										   serviceType != null && servicePeriod != null && autoStatus != null && autoBrandId != null) {
											Ext.Ajax.request({
												url: StaticSetting.absUrl + "/mis/product/getlist",
												params : {
													page : '1',
													limit : '30',
													serviceType : serviceType,
													period : servicePeriod,
													autoStatus : autoStatus,
													autoBrandId : autoBrandId
												},
												method: 'GET',
												//async: false,
												success: function (response, options) {
													var resultJSON = Ext.JSON.decode(response.responseText);
													if(resultJSON.count > 0){
														var feeRate = resultJSON.data[0].feeRate ;
														feeRateComp.setValue(feeRate);
														var settlementAmount = parseFloat(fapiaoAmount==''?0:fapiaoAmount) * parseFloat(feeRate);
														container.getComponent('serviceContainer2').getComponent('settlementAmount').setValue(settlementAmount.toFixed(4));
													} else{
														Ext.MessageBox.show({
															title : '警告',
															msg : '计算保险费率时无此产品参数配置',
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
										var newcarRegisterFeeContainer = this.ownerCt.ownerCt.ownerCt.getComponent('autoInfo').getComponent('autoContainer6').getComponent('newcarRegisterFee');
										var newcarRegisterFee = newcarRegisterFeeContainer.getValue();
										var autoBrandName = record.get("autoBrandName");
										if(autoBrandName == '一汽奥迪') {
											servicePeriodContainer.setValue('3');
											servicePeriodContainer.readOnly = true;
										} else {
											servicePeriodContainer.setValue('');
											servicePeriodContainer.readOnly = false;
										}
	    								if(autoBrandName == '一汽大众'
					            				&& parseFloat(newcarRegisterFee==''?0:newcarRegisterFee)>1000) {
					            			Ext.MessageBox.show({
			    								title : '警告',
			    								msg : "一汽大众的上牌费不超过1000",
			    								buttons : Ext.MessageBox.OK,
			    								icon : Ext.MessageBox.WARNING
			    							});
					            			newcarRegisterFeeContainer.setValue('');
					            		} else if(autoBrandName == '一汽奥迪' && 
					            				parseFloat(newcarRegisterFee==''?0:newcarRegisterFee)>2000) {
					            			Ext.MessageBox.show({
			    								title : '警告',
			    								msg : "一汽奥迪的上牌费不超过2000",
			    								buttons : Ext.MessageBox.OK,
			    								icon : Ext.MessageBox.WARNING
			    							});
					            			newcarRegisterFeeContainer.setValue('');
					            		} else if(autoBrandName == '上汽通用' && 
					            				parseFloat(newcarRegisterFee==''?0:newcarRegisterFee)>1000) {
					            			Ext.MessageBox.show({
			    								title : '警告',
			    								msg : "上汽通用的上牌费不超过1000",
			    								buttons : Ext.MessageBox.OK,
			    								icon : Ext.MessageBox.WARNING
			    							});
					            			newcarRegisterFeeContainer.setValue('');
					            		}
	    								if(autoBrandName == '一汽大众' || autoBrandName == '一汽奥迪') {
	    									window.tCode='c_document_type_chudan_dazhong';
	    								} else if(autoBrandName == '长城') {
	    			        				window.tCode='c_document_type_chudan_changcheng';
	    			        			} else {
	    			        				window.tCode='c_document_type_chudan';
	    			        			}
	    								var vehicleTaxContainer = this.ownerCt.ownerCt.ownerCt.getComponent('autoInfo').getComponent('autoContainer6').getComponent('vehicleTax');
	    								var gouzhishuiAmountContainer = this.ownerCt.ownerCt.ownerCt.getComponent('autoInfo').getComponent('autoContainer4').getComponent('gouzhishuiAmount');
	    								var fapiaoAmountContainer = this.ownerCt.ownerCt.ownerCt.getComponent('autoInfo').getComponent('autoContainer4').getComponent('fapiaoAmount');
	    								if(autoBrandName == '长城') {
	    									newcarRegisterFeeContainer.allowBlank = true;
	    									newcarRegisterFeeContainer.hide();
	    									vehicleTaxContainer.allowBlank = true;
	    									vehicleTaxContainer.hide();
	    									gouzhishuiAmountContainer.allowBlank = true;
	    									gouzhishuiAmountContainer.hide();
	    									serviceTypeContainer.store.getProxy().setExtraParam('tCode', 'c_service_type_changcheng');
	    									serviceTypeContainer.store.load();
	    									if(parseInt(fapiaoAmountContainer.getValue()==''?0:fapiaoAmountContainer.getValue()) > 280000) {
	    										Ext.MessageBox.show({
													title : '警告',
													msg : '长城品牌的车辆发票金额请勿超过28万',
													icon : Ext.MessageBox.WARNING,
													buttons : Ext.MessageBox.OK
												});
	    										fapiaoAmountContainer.setValue('');
												return ;
	    									}
	    								} else {
	    									if(autoBrandName == '一汽大众' && parseInt(fapiaoAmountContainer.getValue()==''?0:fapiaoAmountContainer.getValue()) > 500000) {
	    										Ext.MessageBox.show({
													title : '警告',
													msg : '一汽大众品牌的车辆发票金额请勿超过50万',
													icon : Ext.MessageBox.WARNING,
													buttons : Ext.MessageBox.OK
												});
	    										fapiaoAmountContainer.setValue('');
												return ;
	    									}
	    									if(autoBrandName == '一汽大众' && parseInt(vehicleTaxContainer.getValue()==''?0:vehicleTaxContainer.getValue()) > 5000) {
	    										Ext.MessageBox.show({
													title : '警告',
													msg : '一汽大众品牌车船税不超过5000元',
													icon : Ext.MessageBox.WARNING,
													buttons : Ext.MessageBox.OK
												});
	    										vehicleTaxContainer.setValue('');
												return ;
	    									}
	    									newcarRegisterFeeContainer.allowBlank = false;
	    									newcarRegisterFeeContainer.show();
	    									vehicleTaxContainer.allowBlank = false;
	    									vehicleTaxContainer.show();
	    									gouzhishuiAmountContainer.allowBlank = false;
	    									gouzhishuiAmountContainer.show();
	    									serviceTypeContainer.store.getProxy().setExtraParam('tCode', 'c_service_type');
	    									serviceTypeContainer.store.load();
	    								}
	    								
	    								var insuranceTypeList = this.ownerCt.ownerCt.ownerCt.getComponent('autoInfo').getComponent('autoContainer5').getComponent('insuranceTypeList');
	    								var daoqiangContainer = insuranceTypeList.getComponent('daoqiang');
	    								var ziranContainer = insuranceTypeList.getComponent('ziran');
	    								if(autoBrandName == '一汽大众') {
	    									daoqiangContainer.checked = true;
	    									daoqiangContainer.setValue("1");
	    									ziranContainer.checked = true;
	    									ziranContainer.setValue("1");
	    								} else {
	    									daoqiangContainer.checked = false;
	    									daoqiangContainer.setValue("0");
	    									ziranContainer.checked = false;
	    									ziranContainer.setValue("0");
	    								}
	    								
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
		    							allowBlank: false
		    						},
		    						selectValid:function(){
				    					if(!this.idParams){
				    						Ext.MessageBox.show({
												title : '警告',
												msg : '请先选择品牌后再选择车系',
												icon : Ext.MessageBox.WARNING,
												buttons : Ext.MessageBox.OK
											});
				    						return false;
				    					}
				    					return true
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
				     					this.ownerCt.getComponent("autoModels").idParams = {autoSeriesId : record.get("autoSeriesId")};
				     					this.ownerCt.getComponent("autoModels").items.items[1].setValue('');
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
				    				windowWidth : 800,
				    				textFieldConfig : {
		    							allowBlank: false
		    						},
		    						selectValid:function(){
				    					if(!this.idParams){
				    						Ext.MessageBox.show({
												title : '警告',
												msg : '请先选择车系后再选择车型',
												icon : Ext.MessageBox.WARNING,
												buttons : Ext.MessageBox.OK
											});
				    						return false;
				    					}
				    					return true
				    				},
				    				selectedCallBack : function(record){
				    					var autoSeries = this.ownerCt.getComponent("autoSeries").items.items[1].value;
				    					var autoModels = this.ownerCt.getComponent("autoModels").items.items[1].value;
				    					if(autoSeries == '' || autoSeries == null) {
				    						Ext.MessageBox.show({
    		    								title : '警告',
    		    								msg : "请先选择车系后再选择车型。",
    		    								buttons : Ext.MessageBox.OK,
    		    								icon : Ext.MessageBox.WARNING
    		    							});
				    						this.ownerCt.getComponent("autoModels").items.items[1].setValue('');
				    						return;
				    					}
				     				}
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
//				    		                labelWidth: 120,
//				    		                width: 280,
				    		                allowBlank: false,
					    		            regex : /^\d*$/,
				    		                regexText:"请输入整数位",
				    		                listeners : {
												change : function(scope, evt, opts) {
													var fapiao = scope.getValue();
													this.ownerCt.getComponent('fapiaoAmountCapital').setValue(me.DX(fapiao));
													var autoBrandName = this.ownerCt.ownerCt.getComponent('autoContainer3').getComponent('autoBrand').items.items[1].lastValue;
													if(autoBrandName == '一汽大众' && parseInt(fapiao==''?0:fapiao) > 500000) {
														Ext.MessageBox.show({
															title : '警告',
															msg : '一汽大众品牌请勿超过50万',
															icon : Ext.MessageBox.WARNING,
															buttons : Ext.MessageBox.OK
														});
														this.setValue('');
														return ;
													}
													if(autoBrandName == '长城' && parseInt(fapiao==''?0:fapiao) > 280000) {
														Ext.MessageBox.show({
															title : '警告',
															msg : '长城品牌请勿超过28万',
															icon : Ext.MessageBox.WARNING,
															buttons : Ext.MessageBox.OK
														});
														this.setValue('');
														return ;
													}
													this.ownerCt.getComponent('gouzhishuiAmount').setValue(Math.round(fapiao/11.7));
													var gouzhishui = this.ownerCt.getComponent('gouzhishuiAmount').getValue();
//													this.ownerCt.getComponent('jiashuiAmount').setValue(parseInt(fapiao==''?0:fapiao) + parseInt(gouzhishui==''?0:gouzhishui));
													//自动带出结算金额
													var fapiaoAmount = scope.getValue();
													var container = this.ownerCt.ownerCt.ownerCt.ownerCt.getComponent('serviceFieldSet')
													.getComponent('serviceInfo');
													var serviceType = container.getComponent('serviceContainer1').getComponent('serviceType').getValue();
													var servicePeriod = container.getComponent('serviceContainer1').getComponent('servicePeriod').getValue();
													var autoStatus = this.ownerCt.ownerCt.getComponent('autoContainer1').getComponent('autoStatus').getValue();
													var autoBrandId = this.ownerCt.ownerCt.getComponent('autoContainer3').getComponent('autoBrand').items.items[0].lastValue;
													if(serviceType != undefined && servicePeriod != undefined && autoStatus != undefined && autoBrandId != undefined &&
													   serviceType != '' && servicePeriod != '' && autoStatus != '' && autoBrandId != '' &&
													   serviceType != null && servicePeriod != null && autoStatus != null && autoBrandId != null) {
														Ext.Ajax.request({
															url: StaticSetting.absUrl + "/mis/product/getlist",
															params : {
																page : '1',
																limit : '30',
																serviceType : serviceType,
																period : servicePeriod,
																autoStatus : autoStatus,
																autoBrandId : autoBrandId
															},
															method: 'GET',
															//async: false,
															success: function (response, options) {
																var resultJSON = Ext.JSON.decode(response.responseText);
																if(resultJSON.count > 0){
																	var feeRate = resultJSON.data[0].feeRate ;
																	var settlementAmount = parseFloat(fapiaoAmount==''?0:fapiaoAmount) * parseFloat(feeRate);
																	container.getComponent('serviceContainer2').getComponent('settlementAmount').setValue(settlementAmount.toFixed(4));
																} else{
																	Ext.MessageBox.show({
																		title : '警告',
																		msg : '计算保险费率时无此产品参数配置',
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
											}
				    		            }, {
				    		            	fieldLabel:'发票金额大写',
				    		                emptyText: '发票金额大写',
				    		                itemId : 'fapiaoAmountCapital',
				    		                name: 'fapiaoAmountCapital',
				    		                readOnly:true
				    		            }, {
				    		            	fieldLabel:'购置费用（元）',
				    		                emptyText: '购置费用（元）',
				    		                itemId : 'gouzhishuiAmount',
				    		                name: 'gouzhishuiAmount',
//				    		                labelWidth: 120,
//				    		                width: 280,
				    		                allowBlank: allowBlank,
				    		                hidden: hiddenAllowBlank,
				    		                regex : /^\d*$/,
				    		                regexText:"请输入整数位",
				    		                readOnly:true
//				    		                listeners : {
//												change : function(scope, evt, opts) {
//													var gouzhishui = scope.getValue();
//													var fapiao = this.ownerCt.getComponent('fapiaoAmount').getValue();
//													var jiashui = this.ownerCt.getComponent('jiashuiAmount');
//													jiashui.setValue(parseInt(fapiao==''?0:fapiao) + parseInt(gouzhishui==''?0:gouzhishui));
//												}
//
//											}
				    		            }/*, {
				    		            	fieldLabel:'价税合计（元）',
				    		                emptyText: '价税合计（元）',
				    		                itemId : 'jiashuiAmount',
				    		                name: 'jiashuiAmount',
//				    		                labelWidth: 120,
//				    		                width: 280,
//				    		                allowBlank: false,
				    		                regex : /^\d*$/,
				    		                regexText:"请输入整数位"
					    		        }*/]
					            	}, {
						      	    	  xtype: 'container',
						    	          layout: 'hbox',
						    	          itemId : 'autoContainer5',
						    	          defaultType: 'textfield',
						    	          items:[{
						    	        	  	xtype: 'textfield',
					    		            	fieldLabel:'投保险种',
					    		                itemId : 'insuranceType',
					    		                name: 'insuranceType',
					    		                value : '1100',
					    		                hidden : true
					    		            }, {xtype : 'checkboxgroup',
								    	  			layout : 'hbox',
								    				name:'isPost',
								    				width : 370,
								    				allowBlank: false,
								    				fieldLabel: '投保险种',
								    				itemId : 'insuranceTypeList',
								    				items : [{
								    					boxLabel:'车损险',
								    		            name: 'chesun',
								    		            itemId: 'chesun',
								    		            margins:"0 -220 0 0",
								    		            inputValue:'1',
								    		            checked: chesunChecked,
								    		            readOnly: true,
								    		            listeners : {
								    		            	 change : function(scope, evt, opts) {
								    							var value = scope.getValue();
								    							var insuranceType = scope.ownerCt.ownerCt.down("[itemId=insuranceType]");
								    							var chesun = scope.ownerCt.down("[itemId=chesun]");
								    							var daoqiang = scope.ownerCt.down("[itemId=daoqiang]");
								    							var ziran = scope.ownerCt.down("[itemId=ziran]");
								    							var bujimianpei = scope.ownerCt.down("[itemId=bujimianpei]");
							    								insuranceType.setValue((chesun.getValue()==true?'1':'0')+(bujimianpei.getValue()==true?'1':'0')+
							    										(daoqiang.getValue()==true?'1':'0')+(ziran.getValue()==true?'1':'0'));
								    						}
								    					}
								    				}, {
								    					boxLabel:'不计免赔',
								    		            name: 'bujimianpei',
								    		            itemId: 'bujimianpei',
								    		            margins:"0 -210 0 20",
								    		            inputValue:'1',
								    		            checked: bujimianpeiChecked,
								    		            readOnly: true,
								    		            listeners : {
								    		            	 change : function(scope, evt, opts) {
								    							var value = scope.getValue();
								    							var insuranceType = scope.ownerCt.ownerCt.down("[itemId=insuranceType]");
								    							var chesun = scope.ownerCt.down("[itemId=chesun]");
								    							var daoqiang = scope.ownerCt.down("[itemId=daoqiang]");
								    							var ziran = scope.ownerCt.down("[itemId=ziran]");
								    							var bujimianpei = scope.ownerCt.down("[itemId=bujimianpei]");
							    								insuranceType.setValue((chesun.getValue()==true?'1':'0')+(bujimianpei.getValue()==true?'1':'0')+
							    										(daoqiang.getValue()==true?'1':'0')+(ziran.getValue()==true?'1':'0'));
								    						}
								    					}
								    				}, {
								    					boxLabel:'盗抢险',
								    		            name: 'daoqiang',
								    		            itemId: 'daoqiang',
								    		            margins:"0 -220 0 20",
								    		            inputValue:'1',
								    		            checked: daoqiangChecked,
								    		            listeners : {
								    		            	 change : function(scope, evt, opts) {
								    							var value = scope.getValue();
								    							var insuranceType = scope.ownerCt.ownerCt.down("[itemId=insuranceType]");
								    							var chesun = scope.ownerCt.down("[itemId=chesun]");
								    							var daoqiang = scope.ownerCt.down("[itemId=daoqiang]");
								    							var ziran = scope.ownerCt.down("[itemId=ziran]");
								    							var bujimianpei = scope.ownerCt.down("[itemId=bujimianpei]");
							    								insuranceType.setValue((chesun.getValue()==true?'1':'0')+(bujimianpei.getValue()==true?'1':'0')+
							    										(daoqiang.getValue()==true?'1':'0')+(ziran.getValue()==true?'1':'0'));
								    						}
								    					}
								    				}, {
								    					boxLabel:'自燃险',
								    		            name: 'ziran',
								    		            itemId: 'ziran',
								    		            margins:"0 -220 0 20",
								    		            inputValue:'1',
								    		            checked: ziranChecked,
								    		            listeners : {
								    		            	 change : function(scope, evt, opts) {
								    							var value = scope.getValue();
								    							var insuranceType = scope.ownerCt.ownerCt.down("[itemId=insuranceType]");
								    							var chesun = scope.ownerCt.down("[itemId=chesun]");
								    							var daoqiang = scope.ownerCt.down("[itemId=daoqiang]");
								    							var ziran = scope.ownerCt.down("[itemId=ziran]");
								    							var bujimianpei = scope.ownerCt.down("[itemId=bujimianpei]");
							    								insuranceType.setValue((chesun.getValue()==true?'1':'0')+(bujimianpei.getValue()==true?'1':'0')+
							    										(daoqiang.getValue()==true?'1':'0')+(ziran.getValue()==true?'1':'0'));
								    						}
								    					}
								    				}]
						    			}, {
					    		            	fieldLabel:'车险保险公司',
					    		                itemId : 'insuranceCode',
					    		                xtype : 'ExtPluginFormCombobox',
					    		                tCode : 'c_insurance_code',
					    		                typeAhead :false,
					    		                editable : false,
					    		                allowBlank: false,
					    		                name: 'insuranceCode',
					    		                listeners: {
				    		    			    	"change": function (val) {
				    		    			    		var insuranceCode = val.getValue();
				    		    			    		var rawValue = val.rawValue;
				    		    			    		var insuranceName = this.ownerCt.getComponent("insuranceName");
				    		    			    		if(insuranceCode != 5) {
				    		    			    			insuranceName.setValue(rawValue);
				    		    			    			insuranceName.hide();
				    		    			    		} else {
				    		    			    			insuranceName.setValue('');
				    		    			    			insuranceName.show();
				    		    			    		}
				    		    			    	}
				    		    			    }
					    		            }, {
					    		            	fieldLabel:'',
					    		                emptyText: '其他时手动填写',
					    		                itemId : 'insuranceName',
					    		                name: 'insuranceName',
					    		                labelWidth: 150,
					    		                width: 150,
					    		                hidden : true
						    		        }]
						            }, {
						      	    	  xtype: 'container',
						    	          layout: 'hbox',
						    	          itemId : 'autoContainer6',
						    	          defaultType: 'textfield',
						    	          items:[{
						    	        	  	xtype: 'textfield',
					    		            	fieldLabel:'上牌费',
					    		                itemId : 'newcarRegisterFee',
					    		                name: 'newcarRegisterFee',
					    		                allowBlank: allowBlank,
					    		                hidden: hiddenAllowBlank,
					    		                regex : /^\d+((\.\d{0,2}){0,1})$/,
					    		                regexText:"上牌费",
					    		                listeners : {
					    							"blur" : function(val) {
					    								var newcarRegisterFee = val.getValue();
					    								var autoBrandName = this.ownerCt.ownerCt.ownerCt.getComponent('autoInfo').getComponent('autoContainer3').getComponent('autoBrand').items.items[1].rawValue;
					    								if(autoBrandName == '一汽大众'
	    							            				&& parseFloat(newcarRegisterFee==''?0:newcarRegisterFee)>1000) {
	    							            			Ext.MessageBox.show({
	    		    		    								title : '警告',
	    		    		    								msg : "一汽大众的上牌费不超过1000",
	    		    		    								buttons : Ext.MessageBox.OK,
	    		    		    								icon : Ext.MessageBox.WARNING
	    		    		    							});
	    							            			val.setValue('');
	    							            		} else if(autoBrandName == '一汽奥迪' && 
	    							            				parseFloat(newcarRegisterFee==''?0:newcarRegisterFee)>2000) {
	    							            			Ext.MessageBox.show({
	    		    		    								title : '警告',
	    		    		    								msg : "一汽奥迪的上牌费不超过2000",
	    		    		    								buttons : Ext.MessageBox.OK,
	    		    		    								icon : Ext.MessageBox.WARNING
	    		    		    							});
	    							            			val.setValue('');
	    							            		} else if(autoBrandName == '上汽通用' && 
	    							            				parseFloat(newcarRegisterFee==''?0:newcarRegisterFee)>1000) {
	    							            			Ext.MessageBox.show({
	    		    		    								title : '警告',
	    		    		    								msg : "上汽通用的上牌费不超过1000",
	    		    		    								buttons : Ext.MessageBox.OK,
	    		    		    								icon : Ext.MessageBox.WARNING
	    		    		    							});
	    							            			val.setValue('');
	    							            		}
					    							}
					    						}
					    		            }, {
						    	        	  	xtype: 'textfield',
					    		            	fieldLabel:'车船税',
					    		                itemId : 'vehicleTax',
					    		                name: 'vehicleTax',
					    		                allowBlank: allowBlank,
					    		                hidden: hiddenAllowBlank,
					    		                regex : /^\d+((\.\d{0,2}){0,1})$/,
					    		                regexText:"请最多保留两位小数",
					    		                listeners : {
													change : function(scope, evt, opts) {
														var vehicleTax = scope.getValue();
														var autoBrandName = this.ownerCt.ownerCt.getComponent('autoContainer3').getComponent('autoBrand').items.items[1].lastValue;
														if(autoBrandName == '一汽大众' && parseInt(vehicleTax==''?0:vehicleTax) > 5000) {
															Ext.MessageBox.show({
																title : '警告',
																msg : '一汽大众品牌车船税不超过5000元',
																icon : Ext.MessageBox.WARNING,
																buttons : Ext.MessageBox.OK
															});
															this.setValue('');
															return ;
														}
													}
												}
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
		    		                allowBlank: false,
		    		                name: 'serviceType',
		    		                listeners : {
		    		                	change : function(scope, evt, opts) {
		    		                		var serviceType = scope.getValue();
		    		                		
		    		                		//自动带出结算金额
											var container = this.ownerCt.ownerCt.ownerCt.ownerCt;
											var servicePeriod = this.ownerCt.getComponent('servicePeriod').getValue();
											var autoStatus = container.getComponent('autoFieldSet').getComponent('autoInfo')
															.getComponent('autoContainer1').getComponent('autoStatus').getValue();
											var autoBrandId = container.getComponent('autoFieldSet').getComponent('autoInfo')
											.getComponent('autoContainer3').getComponent('autoBrand').items.items[0].lastValue;
											var feeRateComp = this.ownerCt.getComponent('feeRate');
											if(servicePeriod != '' && servicePeriod != null && servicePeriod != undefined
													&& autoStatus != '' && autoStatus != null && autoStatus != undefined
													&& autoBrandId != '' && autoBrandId != null && autoBrandId != undefined) {
												Ext.Ajax.request({
													url: StaticSetting.absUrl + "/mis/product/getlist",
													params : {
														page : '1',
														limit : '30',
														serviceType : serviceType,
														period : servicePeriod,
														autoStatus : autoStatus,
														autoBrandId : autoBrandId
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
																msg : '计算保险费率时无此产品参数配置',
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
		    		                }
		    		            }, {
		    		            	fieldLabel:'服务期限',
		    		                itemId : 'servicePeriod',
		    		                xtype : 'ExtPluginFormCombobox',
		    		                tCode : 'c_service_period',
		    		                typeAhead :false,
		    		                editable : false,
		    		                allowBlank: false,
		    		                name: 'servicePeriod',
		    		                listeners : {
		    		                	change : function(scope, evt, opts) {
		    		                		var servicePeriod = parseInt(scope.getValue());
		    		                		var serviceBeginDate = this.ownerCt.ownerCt.getComponent('serviceContainer3').getComponent('serviceBeginDate').getValue();
		    		                		var sericeEndDate = this.ownerCt.ownerCt.getComponent('serviceContainer3').getComponent('sericeEndDate');
		    		                		var _sericeEndDate = Ext.Date.add(serviceBeginDate,Ext.Date.DAY,-1);
		    		                		_sericeEndDate = Ext.util.Format.date(Ext.Date.add(_sericeEndDate,Ext.Date.YEAR,+servicePeriod),"Y-m-d");
		    		                		sericeEndDate.setValue(_sericeEndDate);
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
											var autoBrandId = container.getComponent('autoFieldSet').getComponent('autoInfo')
											.getComponent('autoContainer3').getComponent('autoBrand').items.items[0].lastValue;
											if(serviceType != '' && serviceType != null && serviceType != undefined
													&& autoStatus != '' && autoStatus != null && autoStatus != undefined
													&& autoBrandId != '' && autoBrandId != null && autoBrandId != undefined) {
												Ext.Ajax.request({
													url: StaticSetting.absUrl + "/mis/product/getlist",
													params : {
														page : '1',
														limit : '30',
														serviceType : serviceType,
														period : servicePeriod,
														autoStatus : autoStatus,
														autoBrandId : autoBrandId
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
																msg : '计算保险费率时无此产品参数配置',
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
		    		                }
		    		            }, {
		    		            	fieldLabel:'服务类型',
		    		                itemId : 'servicePeriodType',
		    		                name: 'servicePeriodType',
		    		                allowBlank: false,
		    		                hidden : true
		    		            }, {
		    		            	fieldLabel:'保险费率',
		    		                itemId : 'feeRate',
		    		                name: 'feeRate',
		    		                allowBlank: false,
		    		                hidden : true
		    		            }]
			            	}, {
				      	    	  xtype: 'container',
				    	          layout: 'hbox',
				    	          itemId : 'serviceContainer2',
				    	          defaultType: 'textfield',
				    	          items:[{
			    		            	fieldLabel:'结算金额（元）',
			    		                emptyText: '结算金额（元）',
			    		                itemId : 'settlementAmount',
			    		                name: 'settlementAmount',
//			    		                labelWidth: 120,
//			    		                width: 280,
			    		                allowBlank: false,
			    		                regex : /^\d+(\.\d{1,4})?$/,
			    		                regexText:"请输入数字"
				    		        }, {
			    		            	fieldLabel:'服务售价（元）',
			    		                emptyText: '经销商卖给客户的价格，赠送填写0，非赠送填写实际',
			    		                itemId : 'servicePrice',
			    		                name: 'servicePrice',
			    		                hiddenFields : ['feeRate'],
			    		                allowBlank : false,
			    		                width : 400,
			    		                regex : /^\d+((\.\d{0,2}){0,1})$/,
			    		                regexText:"请最多保留两位小数"
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
			    		    			    allowBlank: false,
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
			    		    			    allowBlank: false,
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
							            	allowBlank : false,
							            	name : 'salesName',
							            	emptyText: '销售人员'
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
				    	            	allowBlank: false,
				    	              	fieldLabel : '附加服务',
				    	              	name: 'additionalService',
				    	              	value: '无',
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
					    	            	allowBlank: false,
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
					    		                name: 'status',
					    		                readOnly : true
					    		            }, {
												fieldLabel : '险种',
												name : 'riskCode',
												itemId :'riskCode',
												value : 1,
												hidden : true
											}, {
												fieldLabel : '合同Id',
												name : 'contractId',
												itemId :'contractId',
												hidden : true
											}]
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
		var contractId = selection[0].data.contractId;
		var serviceBeginDate = selection[0].data.serviceBeginDate;
		var insuranceType = selection[0].data.insuranceType;
		var allowBlank = false;
		var hiddenAllowBlank = false;
		if(selection[0].data.autoBrandName == '长城') {
			allowBlank = true;
			hiddenAllowBlank = true;
		}
		var idParams = {
				contractId : contractId,
				presave : null
		};
		var win = this.createCientWindow({
					title : '查看合同信息',
					idName : 'contractId',
					idParams : idParams,
					serviceBeginDate : serviceBeginDate,
					insuranceType : insuranceType,
					hiddenButtons : true,
					allowBlank : allowBlank,
					hiddenAllowBlank : hiddenAllowBlank,
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
	
	//打印
	print : function(){
		var me = this;
		var selection = this.down("grid").getSelectionModel().getSelection();
		if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
				title : '警告',
				msg : '只允许选择一条数据',
				icon : Ext.MessageBox.INFO
			});
			return false;
		}else{
			Ext.Ajax.request({
	            url: StaticSetting.absUrl + "/mis/contract/printer",
	            params : {
	            	contractId : selection[0].data.contractId
	            },
	            method: 'GET',
	            //async: false,
	            success: function (response, options) {
	            	
	            },
	            failure: function (response, options) {
	                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
	            }
	        });
		}
	},
	
	//高级搜索
	advancedSearch : function(){
		var me = this;
		var _form = Ext.create("Ext.form.Panel",{
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				itemId : 'advancedSearch',
				items : [{
					fieldLabel : '保单号',
					itemId : 'policyNo',
					name : 'policyNo'
				},{
					fieldLabel : '经销商简称',
					itemId : 'companyShortName',
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
					itemId : 'contractNo',
					name : 'contractNo'
				},{
					fieldLabel : '车主',
					itemId : 'customerName',
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
//					me.store.load({
//						params : formParams
//					});
					Ext.apply(me.store.proxy.extraParams,{
						policyNo : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("policyNo").getValue(),
						companyShortName : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("companyShortName").getValue(),
						status : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("status").getValue(),
						saveDatetimeBegin : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("saveDatetimeBegin").getValue(),
						saveDatetimeEnd : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("saveDatetimeEnd").getValue(),
						contractNo : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("contractNo").getValue(),
						customerName : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("customerName").getValue(),
						autoStatus : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("autoStatus").getValue(),
						serviceType : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("serviceType").getValue(),
						servicePeriod : this.ownerCt.ownerCt.getComponent("advancedSearch").getComponent("servicePeriod").getValue()
					});
					me.store.load();
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
	
	DX : function(n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "数据非法";
        var unit = "千百拾亿千百拾万千百拾元角分", str = "";
            n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p+1, 2);
            unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
	},
	
	replaceAll : function(str, sptr, sptr1){
        while (str.indexOf(sptr) >= 0){
           str = str.replace(sptr, sptr1);
        }
        return str;
 }
});