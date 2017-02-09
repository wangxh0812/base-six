Ext.define('FMS.app.tour.module.OrderTourGroup', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSapptourmoduleOrderTourGroup',
			requires : ['FMS.app.tour.store.OrderTourGroup','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','Plugin.form.SelectionForm'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.tour.store.OrderTourGroup');
				if(!Ext.isEmpty(this.idParams)){
					Ext.apply(_store.proxy.extraParams, this.idParams);
				}
				
				Ext.apply(this, {
							store : _store,
							gridDockedItems : this.getGridDockedItems(),
							gridColumns : this.getGridColumns()
						});
				this.callParent(arguments);
			},

			getGridColumns : function() {
				return [{
							text : '旅游时间',
							dataIndex : 'tourTime',
							width : 100
						},{
							text : '订单号码',
							dataIndex : 'orderNo',
							width : 100
						},{
							text : '总金额',
							dataIndex : 'feeAmount',
							width : 100
						},{
							text : '份数',
							dataIndex : 'units',
							width : 100
						},{
							text : '支付时间',
							dataIndex : 'payTime',
							width : 100
						}];
			},
			// 按钮栏
			getGridDockedItems : function() {
				var me = this;
				return [{
					xtype : 'toolbar',
					dock : 'top',
					items : [{
								xtype : 'button',
								text : '选择订单',
								iconCls : 'icon-add',
								handler : function() {
									me.addFormWindow();
								}
							},{
								xtype : 'ExtPluginGridDel'
							}]
				}];
			},
			addFormWindow : function() {
				var me =  this;
			    var win = this.createCientWindow({
							hiddenTabPanel : true,
							idName : 'tourGroupId',
							height : 570,
							idParams : this.idParams,
							//getLoadDetailInfoArray : me.getLoadDetailInfoArray,
							listeners : {
								"closeWindow" : function(_win) {
									Ext.MessageBox.show({
												title : "提示",
												msg : "操作成功",
												icon : Ext.MessageBox.INFO,
												buttons : Ext.MessageBox.OK,
												fn : function(buttonId) {
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
			
			createCientWindow : function(obj) {
				var me = this;
				var _form = Ext.create('FMS.app.tour.module.OrderTourNotGroup',obj);
        		var _win = Ext.create('Ext.window.Window',{
        			modal : true,
					border : false,
					floating : true,
					title : '订单列表',
					width : 900,
					height : 600,
					anchor : '100%',
					layout : 'form',
					autoScroll : true,
					items : [_form]
        		});
				
				return _win;
			}/*,
			getLoadDetailInfoArray : function() {
				return {
					baseForm : {
						name : '订单资料',
						url : StaticSetting.absUrl + '/mis/orderTour/getlistNotGroup',
						formItemId : 'productForm'
					},
					tabForm : []
				};
			}*/
		});