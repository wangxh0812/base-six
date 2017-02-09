Ext.define('FMS.app.guangqi.module.CorrectGuangqi', {
	// extend : 'Plugin.grid.Grid',
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappguangqimoduleCorrectGuangqi',
	requires : [ 'FMS.app.applyAudit.store.ApplyAudit', 'Plugin.combo.Combotree','Plugin.form.combobox.Module','Plugin.combo.LinkCombo',
	             'Plugin.form.cascadeCombobox.Module','Plugin.form.CascadeForm','Plugin.form.SelectionForm','Plugin.ux.IFrame'],
	// layout: 'form',
	// layout : 'anchor',
	initComponent : function() {
		var _store = Ext.create('FMS.app.contract.store.Contract');
		_store.on('beforeload', function(_store, options) {
					var new_params = Ext.Object.fromQueryString("status=correct&&riskCode=3");
					Ext.apply(_store.proxy.extraParams, new_params);
				});
		Ext.apply(this, {
					store : _store,
					gridDockedItems : this.getGridDockedItems(),
					gridColumns : this.getGridColumns()

				});
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
		var filed3 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			itemId : 'toolbar1',
//			defaultType: 'textfield',
			items : [{
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
			},{
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
			},"保单号：", {
				xtype : 'textfield',
            	itemId : 'policyNo',
            	name : 'policyNo'
            },"合同号码：", filed1, "车主：", filed2, {
				text : "查询",
				iconCls : 'icon-search',
				handler : function() {
					_this.store.load({
						params : {
							policyNo : this.ownerCt.getComponent("policyNo").getValue(),
							contractNo: filed1.getValue(),
							customerName: filed2.getValue()
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
	
	//提交退回修改
	contractCorrect : function(selection){
		var me = this;
		var url = StaticSetting.absUrl + "/mis/contract/contractCorrect";
		me.correctReason(selection,url);
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
	                 tCode : 'c_service_type_guangqi',
	                 itemId : 'serviceType',
	                 width :120,
	                 //forceSelection : true,
	                 //editable : false,
	                 typeAhead :false,
	                 emptyText: '服务类型'
				},{
					fieldLabel : '保单号',
					name : 'policyNo'
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