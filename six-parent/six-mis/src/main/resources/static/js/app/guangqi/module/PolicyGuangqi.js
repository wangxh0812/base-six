Ext.define('FMS.app.guangqi.module.PolicyGuangqi', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappguangqimodulePolicyGuangqi',
	requires : [ 'FMS.app.policy.store.Policy', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.SelectionForm','FMS.basic.module.Company',
	             'FMS.app.companyContacts.module.CompanyContacts','FMS.app.select.module.AutoBrandModule',
	             'FMS.app.select.module.AutoSeriesModule','FMS.app.select.module.AutoModelsModule','Plugin.ux.IFrame'],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.app.policy.store.Policy');
		_store.on('beforeload', function(_store, options) {
			var new_params = Ext.Object.fromQueryString("riskCode=3");
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
			text : '服务生效日期',
			dataIndex : 'serviceBeginDate',
			width : 100
		}, {
			text : '服务终止日期',
			dataIndex : 'sericeEndDate',
			width : 100
		}, {
			text : '商业险保险公司',
			dataIndex : 'insuranceName',
			width : 100
		}, {
			text : '商业险承保险种',
			dataIndex : 'insuranceTypeGuangqiName',
			width : 200
		}, {
			text : '代步车日租金',
			dataIndex : 'feePerDay',
			width : 80
		}, {
			text : '经销商简称',
			dataIndex : 'companyShortName',
			width : 80
		}, {
			text : '备注',
			dataIndex : 'remark',
			width : 300
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
//			defaultType: 'textfield',
			items : [ {
				xtype : 'button',
				text : '修改',
				iconCls : 'icon-edit',
				handler : function() {
					_this.editPolicyNum();
				}
			}, {
				xtype : 'button',
				text : '生成保单号',
				iconCls : 'icon-add',
				handler : function() {
					_this.generateNum();
				}
			},{
				xtype : 'button',
				text : '查看',
				iconCls : 'icon-search',
				handler : function() {
					_this.openLookUp();
				}

			}, "合同号码：", {
            	xtype : 'textfield',
            	itemId : 'contractNo',
            	name : 'contractNo'
            }, "保单号：", {
            	xtype : 'textfield',
            	itemId : 'policyNo',
            	name : 'policyNo'
            }, "车主：", filed1, {
				text : "查询",
				iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							contractNo: this.ownerCt.getComponent("contractNo").getValue(),
							policyNo: this.ownerCt.getComponent("policyNo").getValue(),
							customerName: filed1.getValue()
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
	
	//生成保单号
	generateNum : function(){
		var me = this;
    	var selection = this.down("grid").getSelectionModel().getSelection();
    	if (selection.length <= 0) {
			Ext.MessageBox.show({
				title : '警告',
				msg : '至少编辑一条数据',
				icon : Ext.MessageBox.INFO
			});
			return false;
		}
		if (selection.length >= 1) {
			for(var i=0;i<selection.length;i++) {
				if(selection[i].data.policyNo != '') {
					Ext.MessageBox.show({
		    			title : '警告',
		    			msg : '第'+(i+1)+'条保单号已有，不支持此操作！',
		    			icon : Ext.MessageBox.WARNING,
		    			buttons : Ext.MessageBox.OK
		    		});
					return false;
				}
			}
		}
		var contractIds = new Array();
		for(var i=0;i<selection.length;i++) {
			contractIds[i] = selection[i].data.contractId;
		}
		var _form = Ext.create("Ext.form.Panel",{
			layout : 'form',
			border : false,
			defaultType : 'textfield',
			items : [{
				xtype: 'textfield',
		        name : 'policyNo',
				fieldLabel : '保单号',
				emptyText : '保单号',
				regex : /^[A-Z\d]*$/,
	            regexText:"请输入大写字母和数字",
				allowBlank : false,
				maxLength : 30
			}]
		});
		var downWindow = Ext.create("Ext.window.Window",{
			modal : true,
			border : false,
			floating : true,
			width : 650,
			layout : 'form',
			title : '生成保单号',
			items : [_form],
			buttons : [{
				text : '确认',
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
					var policyNo = resultJson.policyNo;
					Ext.Ajax.request({
						url : StaticSetting.absUrl + "/mis/policy/save",
						jsonData : {
							contractIds : contractIds,
							policyNo : policyNo
			            },
			            method: 'POST',
			            success: function (response, options) {
			            	var resultJSON = Ext.JSON.decode(response.responseText);
			            	if(resultJSON.success){
			            		Ext.MessageBox.show({
			            			title : '提示',
			            			msg : '操作成功!',
			            			icon : Ext.MessageBox.INFO,
			            			buttons : Ext.MessageBox.OK
			            		});
			            		me.store.reload();
			            	} else{
			            		Ext.MessageBox.show({
			            			title : '警告',
			            			msg : resultJSON.msg,
			            			icon : Ext.MessageBox.WARNING,
			            			buttons : Ext.MessageBox.OK
			            		});
			            	}
			            }
					});
					downWindow.close();
				}
			},{
				text : '取消',
				handler : function(){
					downWindow.close();
				}
			}]
		});
		downWindow.show();
	},
	
	//修改保单号
	editPolicyNum : function(){
		var me = this;
    	var selection = this.down("grid").getSelectionModel().getSelection();
    	if (selection.length <= 0) {
			Ext.MessageBox.show({
				title : '警告',
				msg : '至少编辑一条数据',
				icon : Ext.MessageBox.INFO
			});
			return false;
		}
    	if (selection.length >= 1) {
			for(var i=0;i<selection.length;i++) {
				if(selection[i].data.policyNo == '') {
		    		Ext.MessageBox.show({
		    			title : '警告',
		    			msg : '第'+(i+1)+'条保单号不存在!',
		    			icon : Ext.MessageBox.WARNING,
		    			buttons : Ext.MessageBox.OK
		    		});
		    		return false;
		    	}
			}
		}
    	var contractIds = new Array();
		for(var i=0;i<selection.length;i++) {
			contractIds[i] = selection[i].data.contractId;
		}
		var _form = Ext.create("Ext.form.Panel",{
			layout : 'form',
			border : false,
			defaultType : 'textfield',
			items : [{
				xtype: 'textfield',
		        name : 'policyNo',
		        value : selection[0].data.policyNo,
				fieldLabel : '保单号',
				emptyText : '保单号',
				allowBlank : false,
				regex : /^[A-Z\d]*$/,
	            regexText:"请输入大写字母和数字",
				maxLength : 30
			}]
		});
		var downWindow = Ext.create("Ext.window.Window",{
			modal : true,
			border : false,
			floating : true,
			width : 650,
			layout : 'form',
			title : '生成保单号',
			items : [_form],
			buttons : [{
				text : '确认',
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
					var policyNo = resultJson.policyNo;
					Ext.Ajax.request({
						url : StaticSetting.absUrl + "/mis/policy/save",
						jsonData : {
							contractIds : contractIds,
							policyNo : policyNo
			            },
			            method: 'POST',
			            success: function (response, options) {
			            	var resultJSON = Ext.JSON.decode(response.responseText);
			            	if(resultJSON.success){
			            		Ext.MessageBox.show({
			            			title : '提示',
			            			msg : '操作成功!',
			            			icon : Ext.MessageBox.INFO,
			            			buttons : Ext.MessageBox.OK
			            		});
			            		me.store.reload();
			            	} else{
			            		Ext.MessageBox.show({
			            			title : '警告',
			            			msg : resultJSON.msg,
			            			icon : Ext.MessageBox.WARNING,
			            			buttons : Ext.MessageBox.OK
			            		});
			            	}
			            }
					});
					downWindow.close();
				}
			},{
				text : '取消',
				handler : function(){
					downWindow.close();
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
					fieldLabel : '经销商简称',
					name : 'companyShortName'
				},{
					fieldLabel : '合同号码',
	            	name : 'contractNo'
	            },{
					fieldLabel : '保单号',
					name : 'policyNo'
				},{
	                fieldLabel: '是否已生成保单号',
	             	name: 'flag',
	                xtype : 'ExtPluginFormCombobox',
	                tCode : 'c_yn',
	                itemId : 'flag',
	                width :100,
	                typeAhead :false,
	                emptyText: '是否已生成保单号'
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
					fieldLabel : '车主',
					name : 'customerName'
				},{
	                 fieldLabel: '车辆状态',
	              	 name: 'autoStatus',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_auto_status',
	                 itemId : 'autoStatus',
	                 width :120,
	                 typeAhead :false,
	                 emptyText: '车辆状态'
				},{
	                 fieldLabel: '服务类型',
	              	 name: 'serviceType',
	                 xtype : 'ExtPluginFormCombobox',
	                 tCode : 'c_service_type_guangqi',
	                 itemId : 'serviceType',
	                 width :120,
	                 //forceSelection : true,
	                 //editable : false,
	                 typeAhead :false,
	                 emptyText: '服务类型'
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
		var insuranceTypeGuangqi = selection[0].data.insuranceTypeGuangqi;
		var idParams = {
				contractId : contractId,
				presave : null
		};
		var win = this.createCientWindow({
					title : '查看合同信息',
					idName : 'contractId',
					idParams : idParams,
					serviceBeginDate : serviceBeginDate,
					insuranceTypeGuangqi : insuranceTypeGuangqi,
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
		obj.idParams.businessType = 3;
		_win.addTabClientPanel(Ext.create('Plugin.grid.UploadGridGuangqi', {
					title : '上传合同',
					height : 300,
					itemId : 'contractUploadGrid',
					store : Ext.create("FMS.basic.store.myFile"),
					storeParams : {
						businessId : obj.idParams.businessId,
						businessType : 3
					},
					allowUpdate : obj.allowUpdate,
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
	
	//创建合同详情弹出窗口
	createCientWindow : function(obj){
		var me = this;
		var saveUrl = StaticSetting.absUrl + '/mis/contract/save';
		var _win = Ext.create("FMS.app.mis.module.window.CommonWindowGuangqi",obj);
		_win.addBaseClientForm({
			fieldSetTitle: '合同基本资料',
			collapsible: true,
			formItemId : 'contractBaseForm',
			formUrl : saveUrl,
			submitParams : obj.idParams,
			formItems : this.getClientBaseInfo(obj.hiddenButtons,obj.serviceBeginDate,obj.insuranceTypeGuangqi),
			width : 1000,
			hiddenFormButten : true
		});
		return _win;
	},
	
	getClientBaseInfo : function(hiddenButtons,serviceBeginDate,insuranceTypeGuangqi){
		var me = this;
		var chesunChecked = false;
		var ziranChecked = false;
		var xinzengChecked = false;
		var huahenChecked = false;
		var boliChecked = false;
		var engineChecked = false;
		if(insuranceTypeGuangqi!='' && insuranceTypeGuangqi!=null) {
			if(insuranceTypeGuangqi.substring(0,1)==1) {
				chesunChecked = true;
			}
			if(insuranceTypeGuangqi.substring(1,2)==1) {
				ziranChecked = true;
			}
			if(insuranceTypeGuangqi.substring(2,3)==1) {
				xinzengChecked = true;
			}
			if(insuranceTypeGuangqi.substring(3,4)==1) {
				huahenChecked = true;
			}
			if(insuranceTypeGuangqi.substring(4,5)==1) {
				boliChecked = true;
			}
			if(insuranceTypeGuangqi.substring(5,6)==1) {
				engineChecked = true;
			}
		}
		chesunChecked = true;
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
    	            	},{
    	     				xtype : 'ExtPluginSelectionForm',
    	     				itemId : 'contactSelectionForm',
    	     				grid : "FMSappcompanyContactsmoduleCompanyContacts",
    	     				hiddenFields : ['companyContactsId'],
    	     				textField : "contactsName",
    	     				textFeildName : "联系人",
    	     				idParams : {
//    	     					isWork : '1'
    	     				},
    	     				windowTitle : '选择联系人',
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
	    		                name: 'customerPhone'
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
//	    		    			    dateRange:{today:new Date()},
//	    		    				vtype:'dateRange',
	    		    			    xtype: 'datefield',
	    		    			    format: 'Y-m-d',
	    		    			    listeners: {
	    		    			    	"change": function (val) {
//	    		    			    		var dayLeft = Ext.util.Format.date(Ext.Date.add(new Date(val.getValue()),Ext.Date.DAY,30),"Y-m-d");
	    		    			    		var buyDate = new Date(val.getValue()).getTime();
	    		    			    		var day = Math.floor(new Date().getTime() - buyDate)/(1000*60*60*24);
	    		    			    		var contractNo = this.ownerCt.ownerCt.ownerCt.ownerCt.getComponent("serviceFieldSet").getComponent("serviceInfo")
	    		    			    						.getComponent("serviceContainer3").getComponent("contractNo").getValue();
	    		    			    		
	    		    			    		if(contractNo == '' || contractNo == null) {
	    		    			    			if(day <= 30) {
	    		    			    				this.ownerCt.getComponent("autoStatus").setValue('1');
	    		    			    				this.ownerCt.ownerCt.getComponent("autoContainer2").getComponent("autoNo").setValue("无");
	    		    			    			} else {
//	    		    			    				var a = Math.floor(day/365);
	    		    			    				var b = Math.ceil(day/365) + 1;
		    		    			    			this.ownerCt.getComponent("autoStatus").setValue(''+b);
		    		    			    			this.ownerCt.ownerCt.getComponent("autoContainer2").getComponent("autoNo").setValue("");
		    		    			    		}
	    		    			    		}
	    		    			    	}
	    		    			    }
		    		            }, {
	    		                	fieldLabel:'车辆状态',
		    		                itemId : 'autoStatus',
		    		                name: 'autoStatus',
		    		                xtype : 'ExtPluginFormCombobox',
		    		                tCode : 'c_auto_status_guangqi',
		    		                typeAhead :false,
		    		                editable : false,
		    		                allowBlank : false,
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
		    		                allowBlank: false,
		    		                name: 'serviceType',
		    		                value: '3',
		    		                listeners : {
		    		                	change : function(scope, evt, opts) {
		    		                		var serviceType = scope.getValue();
		    		                		
		    		                		//自动带出结算金额
											var container = this.ownerCt.ownerCt.ownerCt.ownerCt;
											var autoBrandId  = container.getComponent('autoFieldSet').getComponent('autoInfo')
												.getComponent('autoContainer3').getComponent('autoBrand').items.items[0].value;
											var feeRateComp = this.ownerCt.getComponent('feeRate');
											if(autoBrandId != '' && autoBrandId != null && autoBrandId != undefined) {
												Ext.Ajax.request({
													url: StaticSetting.absUrl + "/mis/product/getlist",
													params : {
														page : '1',
														limit : '30',
														serviceType : serviceType,
														period : 1,
														autoBrandId : autoBrandId
													},
													method: 'GET',
													//async: false,
													success: function (response, options) {
														var resultJSON = Ext.JSON.decode(response.responseText);
														if(resultJSON.count > 0){
															var feeRate = resultJSON.data[0].feeRate ;
															feeRateComp.setValue(feeRate);
															var feePerDay = container.getComponent('serviceFieldSet').getComponent('serviceInfo')
															.getComponent('serviceContainer1').getComponent('feePerDay').getValue();
															var settlementAmount = parseFloat(feePerDay==''?0:feePerDay) * parseFloat(feeRate);
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
		    		                value: '1'
		    		            }, {
		    		            	fieldLabel:'服务期限类型',
		    		                itemId : 'servicePeriodType',
		    		                name: 'servicePeriodType',
		    		                allowBlank: false,
		    		                value: '3',
		    		                hidden : true
		    		            },
		    		            {
		    		            	fieldLabel:'代步车日租金',
		    		                emptyText: '代步车日租金',
		    		                itemId : 'feePerDay',
		    		                name: 'feePerDay',
		    		                allowBlank: false,
//			    		            regex : /^\d*$/,
//		    		                regexText:"请输入整数位",
		    		                listeners : {
										change : function(scope, evt, opts) {
											//自动带出结算金额
											var feePerDay = scope.getValue();
											var container = this.ownerCt.ownerCt.ownerCt.ownerCt.getComponent('serviceFieldSet')
											.getComponent('serviceInfo');
											var feeRate =  this.ownerCt.getComponent('feeRate').getValue();
											var settlementAmount = parseFloat(feePerDay==''?0:feePerDay) * parseFloat(feeRate==''?0:feeRate);
											container.getComponent('serviceContainer2').getComponent('settlementAmount').setValue(settlementAmount.toFixed(4));
										}
									}
		    		            }
		    		            , {
		    		            	fieldLabel:'保险费率',
		    		                itemId : 'feeRate',
		    		                name: 'feeRate',
		    		                allowBlank: false,
		    		                value: 0.8,
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
			    		                allowBlank : false,
			    		                regex : /^\d+((\.\d{0,2}){0,1})$/,
			    		                regexText:"请最多保留两位小数"
			    		            }, {
			    		            	fieldLabel:'结算金额（元）',
			    		                emptyText: '结算金额（元）',
			    		                itemId : 'settlementAmount',
			    		                name: 'settlementAmount',
			    		                allowBlank: false,
			    		                regex : /^\d+(\.\d{1,4})?$/,
			    		                regexText:"请输入数字"
				    		        }]
				            	}, {
						      	    	  xtype: 'container',
						    	          layout: 'hbox',
						    	          itemId : 'serviceContainer3',
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
						            	}, {
							      	    	  xtype: 'container',
							    	          layout: 'hbox',
							    	          itemId : 'serviceContainer4',
							    	          defaultType: 'textfield',
							    	          items:[{
							    	        	  	xtype: 'textfield',
						    		            	fieldLabel:'投保险种',
						    		                itemId : 'insuranceTypeGuangqi',
						    		                name: 'insuranceTypeGuangqi',
						    		                value : '100000',
						    		                hidden : true
						    		            }, {xtype : 'checkboxgroup',
									    	  			layout : 'hbox',
									    				name:'xianzhong',
									    				width : 900,
									    				allowBlank: false,
									    				fieldLabel: '投保险种',  
									    				items : [{
									    					boxLabel:'车辆损失险',
									    		            name: 'chesun',
									    		            itemId: 'chesun',
									    		            margins:"0 -190 0 0",
									    		            inputValue:'1',
									    		            checked: chesunChecked,
									    		            readOnly: true,
									    		            listeners : {
									    		            	 change : function(scope, evt, opts) {
									    							var value = scope.getValue();
									    							var insuranceTypeGuangqi = scope.ownerCt.ownerCt.down("[itemId=insuranceTypeGuangqi]");
									    							var chesun = scope.ownerCt.down("[itemId=chesun]");
									    							var ziran = scope.ownerCt.down("[itemId=ziran]");
									    							var xinzeng = scope.ownerCt.down("[itemId=xinzeng]");
									    							var huahen = scope.ownerCt.down("[itemId=huahen]");
									    							var boli = scope.ownerCt.down("[itemId=boli]");
									    							var engine = scope.ownerCt.down("[itemId=engine]");
									    							insuranceTypeGuangqi.setValue((chesun.getValue()==true?'1':'0')+
								    										(ziran.getValue()==true?'1':'0')+(xinzeng.getValue()==true?'1':'0')+(huahen.getValue()==true?'1':'0')+
								    										(boli.getValue()==true?'1':'0')+(engine.getValue()==true?'1':'0'));
									    						}
									    					}
									    				}, {
									    					boxLabel:'自燃损失险',
									    		            name: 'ziran',
									    		            itemId: 'ziran',
									    		            margins:"0 -190 0 20",
									    		            inputValue:'1',
									    		            checked: ziranChecked,
									    		            listeners : {
									    		            	change : function(scope, evt, opts) {
									    							var value = scope.getValue();
									    							var insuranceTypeGuangqi = scope.ownerCt.ownerCt.down("[itemId=insuranceTypeGuangqi]");
									    							var chesun = scope.ownerCt.down("[itemId=chesun]");
									    							var ziran = scope.ownerCt.down("[itemId=ziran]");
									    							var xinzeng = scope.ownerCt.down("[itemId=xinzeng]");
									    							var huahen = scope.ownerCt.down("[itemId=huahen]");
									    							var boli = scope.ownerCt.down("[itemId=boli]");
									    							var engine = scope.ownerCt.down("[itemId=engine]");
									    							insuranceTypeGuangqi.setValue((chesun.getValue()==true?'1':'0')+
								    										(ziran.getValue()==true?'1':'0')+(xinzeng.getValue()==true?'1':'0')+(huahen.getValue()==true?'1':'0')+
								    										(boli.getValue()==true?'1':'0')+(engine.getValue()==true?'1':'0'));
									    						}
									    					}
									    				}, {
									    					boxLabel:'新增加设备损失险',
									    		            name: 'xinzeng',
									    		            itemId: 'xinzeng',
									    		            margins:"0 -160 0 20",
									    		            inputValue:'1',
									    		            checked: xinzengChecked,
									    		            listeners : {
									    		            	 change : function(scope, evt, opts) {
									    		            		 var value = scope.getValue();
										    							var insuranceTypeGuangqi = scope.ownerCt.ownerCt.down("[itemId=insuranceTypeGuangqi]");
										    							var chesun = scope.ownerCt.down("[itemId=chesun]");
										    							var ziran = scope.ownerCt.down("[itemId=ziran]");
										    							var xinzeng = scope.ownerCt.down("[itemId=xinzeng]");
										    							var huahen = scope.ownerCt.down("[itemId=huahen]");
										    							var boli = scope.ownerCt.down("[itemId=boli]");
										    							var engine = scope.ownerCt.down("[itemId=engine]");
										    							insuranceTypeGuangqi.setValue((chesun.getValue()==true?'1':'0')+
									    										(ziran.getValue()==true?'1':'0')+(xinzeng.getValue()==true?'1':'0')+(huahen.getValue()==true?'1':'0')+
									    										(boli.getValue()==true?'1':'0')+(engine.getValue()==true?'1':'0'));
									    						}
									    					}
									    				}, {
									    					boxLabel:'车身划痕损失险',
									    		            name: 'huahen',
									    		            itemId: 'huahen',
									    		            margins:"0 -170 0 20",
									    		            inputValue:'1',
									    		            checked: huahenChecked,
									    		            listeners : {
									    		            	change : function(scope, evt, opts) {
									    							var value = scope.getValue();
									    							var insuranceTypeGuangqi = scope.ownerCt.ownerCt.down("[itemId=insuranceTypeGuangqi]");
									    							var chesun = scope.ownerCt.down("[itemId=chesun]");
									    							var ziran = scope.ownerCt.down("[itemId=ziran]");
									    							var xinzeng = scope.ownerCt.down("[itemId=xinzeng]");
									    							var huahen = scope.ownerCt.down("[itemId=huahen]");
									    							var boli = scope.ownerCt.down("[itemId=boli]");
									    							var engine = scope.ownerCt.down("[itemId=engine]");
									    							insuranceTypeGuangqi.setValue((chesun.getValue()==true?'1':'0')+
								    										(ziran.getValue()==true?'1':'0')+(xinzeng.getValue()==true?'1':'0')+(huahen.getValue()==true?'1':'0')+
								    										(boli.getValue()==true?'1':'0')+(engine.getValue()==true?'1':'0'));
									    						}
									    					}
									    				}, {
									    					boxLabel:'玻璃单独破碎险',
									    		            name: 'boli',
									    		            itemId: 'boli',
									    		            margins:"0 -170 0 20",
									    		            inputValue:'1',
									    		            checked: boliChecked,
									    		            listeners : {
									    		            	change : function(scope, evt, opts) {
									    							var value = scope.getValue();
									    							var insuranceTypeGuangqi = scope.ownerCt.ownerCt.down("[itemId=insuranceTypeGuangqi]");
									    							var chesun = scope.ownerCt.down("[itemId=chesun]");
									    							var ziran = scope.ownerCt.down("[itemId=ziran]");
									    							var xinzeng = scope.ownerCt.down("[itemId=xinzeng]");
									    							var huahen = scope.ownerCt.down("[itemId=huahen]");
									    							var boli = scope.ownerCt.down("[itemId=boli]");
									    							var engine = scope.ownerCt.down("[itemId=engine]");
									    							insuranceTypeGuangqi.setValue((chesun.getValue()==true?'1':'0')+
								    										(ziran.getValue()==true?'1':'0')+(xinzeng.getValue()==true?'1':'0')+(huahen.getValue()==true?'1':'0')+
								    										(boli.getValue()==true?'1':'0')+(engine.getValue()==true?'1':'0'));
									    						}
									    					}
									    				}, {
									    					boxLabel:'发动机特别损失险',
									    		            name: 'engine',
									    		            itemId: 'engine',
									    		            margins:"0 -170 0 20",
									    		            inputValue:'1',
									    		            checked: engineChecked,
									    		            listeners : {
									    		            	change : function(scope, evt, opts) {
									    							var value = scope.getValue();
									    							var insuranceTypeGuangqi = scope.ownerCt.ownerCt.down("[itemId=insuranceTypeGuangqi]");
									    							var chesun = scope.ownerCt.down("[itemId=chesun]");
									    							var ziran = scope.ownerCt.down("[itemId=ziran]");
									    							var xinzeng = scope.ownerCt.down("[itemId=xinzeng]");
									    							var huahen = scope.ownerCt.down("[itemId=huahen]");
									    							var boli = scope.ownerCt.down("[itemId=boli]");
									    							var engine = scope.ownerCt.down("[itemId=engine]");
									    							insuranceTypeGuangqi.setValue((chesun.getValue()==true?'1':'0')+
								    										(ziran.getValue()==true?'1':'0')+(xinzeng.getValue()==true?'1':'0')+(huahen.getValue()==true?'1':'0')+
								    										(boli.getValue()==true?'1':'0')+(engine.getValue()==true?'1':'0'));
									    						}
									    					}
									    				}]
							    			}]
							            }, {
							      	    	  xtype: 'container',
							    	          layout: 'hbox',
							    	          itemId : 'serviceContainer5',
							    	          defaultType: 'textfield',
							    	          items:[{
						    		            	fieldLabel:'商业险保险公司',
						    		                itemId : 'insuranceCode',
						    		                xtype : 'ExtPluginFormCombobox',
						    		                tCode : 'c_insurance_code',
						    		                typeAhead :false,
						    		                editable : false,
						    		                allowBlank: false,
						    		                name: 'insuranceCode',
						    		                value:'1',
						    		                listeners: {
					    		    			    	"change": function (val) {
					    		    			    		var insuranceCode = val.getValue();
					    		    			    		if(insuranceCode != 1) {
					    		    			    			Ext.MessageBox.show({
																	title : '警告',
																	msg : '此项目只有人保可选',
																	icon : Ext.MessageBox.WARNING,
																	buttons : Ext.MessageBox.OK
																});
					    		    			    		}
					    		    			    		
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
						    		                value: '人保',
						    		                hidden : true
							    		        }]
							            	}, {
								      	    	  xtype: 'container',
								    	          layout: 'hbox',
								    	          itemId : 'serviceContainer6',
								    	          defaultType: 'textfield',
								    	          items:[{
							    		            	fieldLabel:'商业险保单号',
							    		                emptyText: '商业险保单号',
							    		                itemId : 'busiPolicyNo',
							    		                name: 'busiPolicyNo',
							    		                allowBlank : false,
							    		                regex : /^[A-Z\d]*$/,
							    		                regexText:"请输入大写字母和数字"
							    		            }, {
							    		            	fieldLabel:'商业险起保日期',
							    		                emptyText: '商业险起保日期',
							    		                itemId : 'insuranceBeginDate',
							    		                name: 'insuranceBeginDate',
						    		    			    maxLength: 20,
						    		    			    allowBlank: false,
						    		    			    xtype: 'datefield',
						    		    			    format: 'Y-m-d'
							    		            }]
								            	}, {
								      	    	  xtype: 'container',
								    	          layout: 'hbox',
								    	          itemId : 'serviceContainer7',
								    	          defaultType: 'textfield',
								    	          items:[{
							    		            	fieldLabel:'服务生效日期',
							    		                emptyText: '服务生效日期',
							    		                itemId : 'serviceBeginDate',
							    		                name: 'serviceBeginDate',
						    		    			    maxLength: 20,
						    		    			    allowBlank: false,
						    		    			    xtype: 'datefield',
						    		    			    format: 'Y-m-d',
						    		    			    value: Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,+1),"Y-m-d"),
						    		    			    listeners: {
						    		    			    	"change": function (val) {
						    		    			    		var serviceBeginDate = val.getValue();
						    		    			    		var insuranceBeginDate = this.ownerCt.ownerCt.getComponent("serviceContainer6").getComponent("insuranceBeginDate").getValue();
						    		    			    		var dayLeft = Ext.util.Format.date(Ext.Date.add(new Date(insuranceBeginDate),Ext.Date.DAY,-90),"Y-m-d");
						    		    			    		var dayRight = Ext.util.Format.date(Ext.Date.add(new Date(insuranceBeginDate),Ext.Date.DAY,30),"Y-m-d");
						    		    			    		if(!serviceBeginDate >= new Date(dayLeft) && serviceBeginDate <= new Date(dayRight)) {
						    		    			    			Ext.MessageBox.show({
																		title : '警告',
																		msg : '服务生效日期仅能在商业险起保日期前90天至后30天内',
																		icon : Ext.MessageBox.WARNING,
																		buttons : Ext.MessageBox.OK
																	});
						    		    			    		}
						    		    			    		var sericeEndDate = Ext.util.Format.date(Ext.Date.add(new Date(serviceBeginDate),Ext.Date.DAY,365),"Y-m-d");
						    		    			    		this.ownerCt.getComponent("sericeEndDate").setValue(sericeEndDate);
						    		    			    	}
						    		    			    }
							    		            }, {
							    		            	fieldLabel:'服务终止日期',
							    		                emptyText: '服务终止日期',
							    		                itemId : 'sericeEndDate',
							    		                name: 'sericeEndDate',
						    		    			    maxLength: 20,
						    		    			    allowBlank: false,
						    		    			    xtype: 'datefield',
						    		    			    format: 'Y-m-d',
						    		    			    value: Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,+366),"Y-m-d")
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
												value : 3,
												hidden : true
											}]
						            	}]
						      }]
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
	}
	
});