Ext.define('FMS.app.tour.module.TourGuide', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSapptourmoduleTourGuide',
			requires : ['FMS.app.tour.store.TourGuide','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','Plugin.form.SelectionForm'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.tour.store.TourGuide');
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
							text : '姓名',
							dataIndex : 'guideName',
							width : 100
						}, {
							text : '手机号码',
							dataIndex : 'guideMobile',
							width : 100
						}, {
							text : '所在地',
							dataIndex : 'workPlace',
							width : 100
						}, {
							text : '微信号码',
							dataIndex : 'wechat',
							width : 100
						}];
			},

			// 按钮栏
			getGridDockedItems : function() {
				var me = this;
				var field1 = new Ext.form.Field();
				var field2 = new Ext.form.Field();
				var field3 = new Ext.form.Field();
				return [{
							xtype : 'toolbar',
							dock : 'top',
							items : [{
										xtype : 'ExtPluginGridAdd',
										customParameter : {
											items : me.getWindowColumns()
										}
									}, {
										xtype : 'ExtPluginGridEdit',
										customParameter : {
											items : me.getWindowColumns()
										}
									}, {
										xtype : 'ExtPluginGridDel'
									},"->", "姓名：", field1, "手机号码：", field2, "所在地：", field3,{
										text : "搜索",
										iconCls : 'icon-search',
										handler : function() {
											me.store.load({
												params : {
													guideName : field1.getValue(),
													guideMobile : field2.getValue(),
													workPlace : field3.getValue()
												}
											});
										}
									}]
								} ];
			},
			getWindowColumns : function() {
				return [{
							fieldLabel : '逻辑ID',
							name : 'tourGuideId',
							maxLength : 11,
							maxLengthText : '逻辑ID超过最大值',
							hidden : true
						}, 			
						{
							fieldLabel : '姓名',
							name : 'guideName',
							emptyText : '姓名',
							maxLength : 10,
							allowBlank : false
						}, {
							fieldLabel : '手机号码',
							name : 'guideMobile',
							emptyText : '手机号码',
							maxLength : 15,
							allowBlank : false
						}, {
							fieldLabel : '所在地',
							name : 'workPlace',
							emptyText : '所在地',
							maxLength : 30,
							allowBlank : false
						}, {
							fieldLabel : '微信号码',
							name : 'wechat',
							emptyText : '微信号码',
							maxLength : 15,
							allowBlank : false
						}];
			}
		});