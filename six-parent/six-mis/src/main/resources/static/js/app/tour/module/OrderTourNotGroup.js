Ext.define('FMS.app.tour.module.OrderTourNotGroup', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSapptourmoduleOrderTourNotGroup',
			requires : ['FMS.app.tour.store.OrderTourNotGroup','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','Plugin.form.SelectionForm'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.tour.store.OrderTourNotGroup');
				if(!Ext.isEmpty(this.idParams)){
					Ext.apply(_store.proxy.extraParams, this.idParams);
				}
				Ext.apply(this, {
							store : _store,
							gridDockedItems : this.getGridDockedItems(this.idParams),
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
							text : '产品',
							dataIndex : 'productId',
							width : 100
						}];
			},
			// 按钮栏
			getGridDockedItems : function(obj) {
				var me = this;
				return [{
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
				        xtype: 'toolbar',
				        items: {
				        	iconCls: 'icon-save',
				            defaultType: 'button',
				            scale: 'small',
				            text: '保存',  // todo
				            handler: function(){
				            	var records = me.down("grid").getSelectionModel().getSelection();
				                len = records.length;
				                if (len <= 0) {
				        			Ext.MessageBox.show({
				        						title : 'Error',
				        						msg : '至少选择一个订单',
				        						icon : Ext.MessageBox.INFO
				        					});
				        			return false;
				        		} else {
				        			var str = '';
					            	for(var i = 0;i < records.length;i++){
					            		str = str + records[i].get('orderId') + ',';
					            	}
					            	str = str.substr(str,str.length-1);
					            	
				        			Ext.Ajax.request({
				                        url: StaticSetting.absUrl + '/mis/orderTour/save_tour_group',
				                        params: {
				                            orderIds :str,
				                            tourGroupId:obj.tourGroupId
				                        },
				                        success: function(response){
				                        	var jsonResult = Ext.JSON.decode(response.responseText);
											if(jsonResult.success){
												Ext.MessageBox.show({
													title : '提示',
													msg : '操作成功!',
													icon : Ext.MessageBox.INFO,
													buttons : Ext.MessageBox.OK
												});
												me.store.reload(obj);
											}
											else
												Ext.MessageBox.show({
													title : '错误',
													msg : jsonResult.msg,
													icon : Ext.MessageBox.ERROR,
													buttons : Ext.MessageBox.OK
												});
				                        }
				        			   });
				        		}
				            }
				        }
				    }]
				}];
			}
		});