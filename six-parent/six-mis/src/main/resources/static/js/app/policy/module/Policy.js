Ext.define('FMS.app.policy.module.Policy', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSapppolicymodulePolicy',
	requires : [ 'FMS.app.policy.store.Policy', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.SelectionForm','FMS.basic.module.Company',
	             'FMS.app.companyContacts.module.CompanyContacts','FMS.app.select.module.AutoBrandModule',
	             'FMS.app.select.module.AutoSeriesModule','FMS.app.select.module.AutoModelsModule','Plugin.ux.IFrame'],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.app.policy.store.Policy');
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
			text : '车主',
			dataIndex : 'customerName',
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
			width : 150
		}, {
			text : '服务期限（年）',
			dataIndex : 'servicePeriod',
			width : 90
		}, {
			text : '服务售价（元）',
			dataIndex : 'servicePrice',
			width : 90
		}, {
			text : '结算金额（元）',
			dataIndex : 'settlementAmount',
			width : 90
		}, {
			text : '备注',
			dataIndex : 'remark',
			width : 200
		}, {
			text : '主数据状态',
			dataIndex : 'statusName',
			width : 80
		}, {
			text : '经销商简称',
			dataIndex : 'companyShortName',
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
		}
		/*{
			xtype : 'toolbar',
			dock : 'top',
			itemId : 'toolbar2',
			items : ["经销商简称：", {
            	itemId : 'companyShortName',
            	name : 'companyShortName'
            }, "合同号码：", {
            	xtype : 'textfield',
            	itemId : 'contractNo',
            	name : 'contractNo'
            }, "保单号：", {
            	xtype : 'textfield',
            	itemId : 'policyNo',
            	name : 'policyNo'
            }, "是否已生成保单号：", {
                fieldLabel: '',
             	 name: 'flag',
                xtype : 'ExtPluginFormCombobox',
                tCode : 'c_yn',
                itemId : 'flag',
                width :100,
                typeAhead :false,
                emptyText: '是否已生成保单号'
			}, "保存日期起期：", {
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
            },
			   "车主：", filed1, "车辆状态：", {
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
			}, "服务期限：",filed2, {
				text : "查询",
				iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
//							companyShortName : this.ownerCt.ownerCt.getComponent("toolbar1").getComponent("companyShortName").getValue(),
							contractNo: this.ownerCt.getComponent("contractNo").getValue(),
							policyNo: this.ownerCt.getComponent("policyNo").getValue(),
//							flag: this.ownerCt.ownerCt.getComponent("toolbar1").getComponent("flag").getValue(),
//							saveDatetimeBegin: Ext.Date.format(this.ownerCt.getComponent("saveDatetimeBegin").getValue(),"Y-m-d"),
//							saveDatetimeEnd: Ext.Date.format(this.ownerCt.getComponent("saveDatetimeEnd").getValue(),"Y-m-d"),
							customerName: filed1.getValue(),
//							servicePeriod: filed2.getValue(),
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
		}*/];
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
	}
	
});