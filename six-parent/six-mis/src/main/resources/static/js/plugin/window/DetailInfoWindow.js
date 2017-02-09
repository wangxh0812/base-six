/**
 * 借款申请详情窗口类 created by 徐榕生 parames : hiddenImagePanel : 隐藏Tab证件图片
 * hiddenMulityPanel : 隐藏Tab尽调补充材料
 * 
 * showButton: 显示审核通过/不通过 按钮 auditUrl : 提交审核的后台URL applyId : 提交审核的后台URL参数applyId
 * shtgWindow : 审核通过按钮单击事件 submitCallBack : 审核通过按钮回调函数
 * 
 * showMulityFormButton : 显示尽调补充材料的提交按钮 mulityFormSubmit : 显示尽调补充材料的提交按钮的单击事件
 * method : getMulityForm : 获取尽调补充材料的Form表单 setMulityForm : 设置尽调补充材料的Form表单数据
 * addMainTabPanel : 向主Tab页中添加一个Tab页 addDetailInfoForm : 添加{Tab页：基本信息}内容
 * addImageInfoForm : 添加{Tab页：证件资料}内容 addMulityFilePanel : 添加{Tab页：尽调补充材料}内容
 */
Ext.define('Plugin.window.DetailInfoWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.ExtPluginDetailInfoWindow',
	requires : [ 'Plugin.form.ViewForm', 'Plugin.form.ImageForm', 'Plugin.form.ImageGroupForm' ],
	modal : true,
	border : false,
	floating : true,
	width : 650,
	anchor : '100%',
	layout : 'form',
	initComponent : function() {
		var me = this;
		me.initConfig();
		var _items = me.initTabs();
		this._mainTabPanel = me.createMainTabPanel(_items);
		this.items = this.items || [ me._mainTabPanel ];
		if (me.showButton) {
			if (me.showSHButton)
				this.buttons = this.buttons ? this.buttons.concat(me.createSHButton()) : me.createSHButton();
		} else {
			this.buttons = [];
		}
		this.callParent(arguments);
	},
	/**
	 * 
	 */
	getMulityForm : function() {
		return this.mulityFilePanel.down("panel");
	},
	/**
	 * 
	 */
	setMulityForm : function(obj) {
		this.getMulityForm().getForm().setValues(obj);
	},
	/**
	 * 添加Tab页
	 */
	addMainTabPanel : function(_form) {
		this._mainTabPanel.add(_form);
	},
	/**
	 * 添加{Tab页：基本信息}内容
	 */
	addDetailInfoForm : function(formConfig) {
		this.detailInfoPanel.items.add(Ext.create("Plugin.form.ViewForm", {
			title : formConfig.title || '',
			titleAlign : 'center',
			customParameter : formConfig.customParameter
		}));
		if (formConfig.height) {
			if (this.detailInfoPanel.height < 500)
				this.detailInfoPanel.height = (this.detailInfoPanel.height + formConfig.height);
		}

	},
	/**
	 * 添加{Tab页：证件资料}内容
	 */
	addImageInfoForm : function(formConfig) {
		this.imageInfoPanel.items.add(Ext.create("Plugin.form.ImageForm", {
			titleAlign : 'center',
			border : 0,
			customParameter : formConfig.customParameter
		}));
	},
	/**
	 * 添加{Tab页：}内容
	 */
	addMulityFilePanel : function(container) {
		this.mulityFilePanel.items.add(container);
	},
	// 初始化全局参数
	initConfig : function() {
		Ext.applyIf(this, {
			detailInfoPanel : '',
			imageInfoPanel : '',
			mulityFilePanel : '',
			_mainTabPanel : ''
		});
	},
	// 初始化Tab页
	initTabs : function() {
		var _items = [];
		this.detailInfoPanel = this.createDetailInfoPanel();
		_items.push(this.detailInfoPanel);

//		if (!this.hiddenImagePanel) {
//			this.imageInfoPanel = this.createImageInfoPanel();
//			_items.push(this.imageInfoPanel);
//		}
		if (!this.hiddenMulityPanel) {
			this.mulityFilePanel = this.createMulityFilePanel();
			_items.push(this.mulityFilePanel);
		}
		return _items;
	},
	// 创建Tab页:基本信息
	createDetailInfoPanel : function() {
		return Ext.create("Ext.form.Panel", {
			title : '基本信息',
			height : 50,
			bodyPadding : 5,
			layout : 'form',
			autoScroll : true,
			items : [ this.detailInfoArray ]
		});
	},
//	// 创建Tab页:证件信息
//	createImageInfoPanel : function() {
//		return Ext.create("Ext.form.Panel", {
//			title : '证件图片',
//			autoScroll : true,
//			border : 0,
//			height : 350,
//			items : [ this.imageInfoArray ]
//		});
//	},
	// 创建Tab页:台帐信息
	createMulityFilePanel : function() {
		return Ext.create("Ext.form.Panel", {
			title : '台帐信息',
			autoScroll : true,
			height : 450,
			items : [ this.createMulityFileForm() ]
		});
	},
	// 创建主显示控件：TabPanel
	createMainTabPanel : function(_items) {
		return Ext.create("Ext.tab.Panel", {
			xtype : 'tabpanel',
			activeTab : 0,
			itemId : 'tabPanel',
			items : _items
		});
	},
	// 台帐信息
	createMulityFileForm : function() {
		return Ext.create("Plugin.form.ViewForm", {
			title : this.mulityFileTitle || '台帐信息',
			customParameter : {
				items : [{
					fieldLabel : '合同编号',
					name : 'contractNo',
					readOnly:true
				},{
					fieldLabel : '台账编号',
					name : 'ledgerNumber',
					readOnly:true
				},{
					fieldLabel : '客户姓名',
					name : 'customerName',
					readOnly:true
				},{
					fieldLabel : '是否首次投资',
					name : 'isFirstTime',
					readOnly:true
				},{
	                 fieldLabel: '产品名称',
	              	 name: 'productName',
	              	readOnly:true
	            },{
					fieldLabel : '应付管理费',
					name : 'amountPayable',
					readOnly:true
				},{
					fieldLabel : '总收益',
			
					name : 'totalRevenue',
					readOnly:true
				},{
					fieldLabel : '实付管理费',
					readOnly:true,
					name : 'actualPayment'
				},{
	                 fieldLabel: '到期债权价值',
	              	 name: 'maturityDebtValue',
	              	readOnly:true
	 
	            },{
	                fieldLabel: '到期转让对价',
	             	 name: 'maturityTransferValue',
	             	readOnly:true

	           },{
	               fieldLabel: '大写金额',
	           	 name: 'capitalAmount',
	           	readOnly:true

	         },{
	               fieldLabel: '业绩折算金额',
	           	 name: 'performanceConvertAmount',
	           	readOnly:true

	         },{
	               fieldLabel: '预计投资到期时间',
	           	 name: 'expectedTimeDue',
	           	 readOnly:true

	         }]
			}

		});
	},
	// 创建审核按钮
	createSHButton : function() {
		var me = this;
		return [ {
			text : '审核通过',
			scope : this,
			handler : function() {
				if (this.shtgWindow) {
					Ext.callback(this.shtgWindow);
				} else {
					var msg = null;
					msg = Ext.MessageBox.prompt("提示", "请输入备注信息(选填)!", function(button, text) {
						if (button == 'ok') {
							me.submitStatus(true, text);
							msg.close();
							if (this.submitCallBack)
								Ext.callback(this.submitCallBack);
						}
					}, me, 200);
				}

			}
		}, {
			text : '审核不通过',
			scope : this,
			handler : function() {
				if (this.shbtgWindow) {
					Ext.callback(this.shbtgWindow);
				} else {
					var msg = null;
					msg = Ext.MessageBox.prompt("提示", "请输入备注信息(选填)!", function(button, text) {
						if (button == 'ok') {
							me.submitStatus(false, text);
							msg.close();
						}
					}, me, 200);
				}

			}
		} ];
	},
	// 提交审核
	submitStatus : function(result, text) {
		var me = this;
		Ext.Ajax.request({
			url : me.auditUrl,
			params : {
				applyId : me.applyId,
				status : result ? 1 : 0,
				remark : text
			},
			method : 'GET',
			success : function(response, options) {
				var jsonObj = Ext.JSON.decode(response.responseText);
				if (jsonObj.success) {
					Ext.MessageBox.show({
						title : '提示',
						msg : "操作成功!",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					if (me.submitCallBack)
						Ext.callback(me.submitCallBack);
				} else
					Ext.MessageBox.show({
						title : '错误',
						msg : "操作失败![" + jsonObj.msg + "]",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			},
			failure : function(response, options) {
				Ext.MessageBox.show({
					title : '错误',
					msg : "请求超时或网络故障",
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
		});
	}

});
