Ext.define('FMS.app.select.module.ProductIncomeModule', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSappselectmoduleProductIncomeModule',
			requires : ['FMS.app.product.store.ProductIncome'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.product.store.ProductIncome');
				Ext.apply(_store.proxy.extraParams, this.idParams);
				Ext.apply(this, {
							store : _store,
							gridDockedItems : this.getGridDockedItems(),
							gridColumns : this.getGridColumns()
						});
				this.callParent(arguments);
			},
			getGridColumns : function() {
				return [{
							header : '产品周期',
							sortable : true,
							dataIndex : 'productCycle',
							field : {
								type : 'textfield'
							}
						}, {
							header : '单位',
							width : 100,
							sortable : true,
							dataIndex : 'cycleUnitName',
							field : {
								type : 'textfield'
							}
						}, {
							header : '投资额上限',
							width : 100,
							sortable : true,
							dataIndex : 'maxInvestment',
							field : {
								type : 'textfield'
							}
						}, {
							header : '最小金额',
							width : 100,
							sortable : true,
							dataIndex : 'minInvestment',
							field : {
								type : 'textfield'
							}
						}, {
							header : '产品利率',
							width : 100,
							sortable : true,
							dataIndex : 'productIncome',
							field : {
								type : 'textfield'
							}
						}, {
							header : '管理费',
							width : 100,
							sortable : true,
							dataIndex : 'managementFee',
							field : {
								type : 'textfield'
							},
							flex : 1
						}];
			},

			// 按钮栏
			getGridDockedItems : function() {
				var me = this;
				var filed1 = new Ext.form.Field();
				var filed2 = new Ext.form.Field();
				return [];
			},
			getWindowColumns : function() {
				return [];
			}

		});