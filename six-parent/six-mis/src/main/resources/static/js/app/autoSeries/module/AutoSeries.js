Ext.define('FMS.app.autoSeries.module.AutoSeries', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappautoSeriesmoduleAutoSeries',
	requires : [ 'FMS.app.autoSeries.store.AutoSeries', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm',
			'Plugin.window.UploadWindow','FMS.app.select.module.AutoBrandModule'
			],
	initComponent : function() {
		var _store = Ext.create('FMS.app.autoSeries.store.AutoSeries');
		if (!Ext.isEmpty(this.idParams)) {
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
		return [ {
			text : '品牌名称',
			dataIndex : 'autoBrandName',
			width : 100
		},{
			text : '车系名称',
			dataIndex : 'autoSeriesName',
			width : 100
		},{
			text : '创建时间',
			dataIndex : 'createTime',
			width : 150
		},{
			text : '更新时间',
			dataIndex : 'updateTime',
			width : 150
		},{
			text : '操作人',
			dataIndex : 'opUser',
			width : 150
		} ];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var me = this;
		var field1 = Ext.create("Ext.form.field.Text",{
			itemId : 'field1',
			listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                    	this.ownerCt.getComponent("search").handler();
                    }
                }
            }
		});
		
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
							},{
								text : '模板',
								iconCls : 'icon-excel',
								handler : function() {
									me.getDownExcelTpl();
								}
							}, {
								xtype : 'button',
								text : '导入',
								iconCls : 'icon-add',
								handler : function() {
									me.getImportWindow();
								}
							},  "->","品牌名称:",field1,{
								text : "搜索",
								itemId : 'search',
								iconCls : 'icon-search',
								handler : function() {
									me.store.load({
										params : {
											autoBrandName : field1.getValue()
										}
									});
								}
							}]
				}];
	},
	
	getWindowColumns : function() {
		return [ {
			fieldLabel : '逻辑ID',
			name : 'autoSeriesId',
			hidden : true
		},{
			xtype : 'ExtPluginSelectionForm',
			grid : "FMSappselectmoduleAutoBrandModule",
			hiddenFields : ['autoBrandId'],
			textField : "autoBrandName",
			itemId : 'autoBrandSelectForm',
			textFeildName : "品牌名称",
			windowTitle : '选择品牌',
			windowWidth : 600,
			textFieldConfig : {
				allowBlank : false,
				width : 485
			}
		},{
			fieldLabel : '车系名称',
			name : 'autoSeriesName',
			emptyText : '车系名称',
		    maxLength : 20,
			allowBlank : false
		} ];
	},
	
	getDownExcelTpl:function(){
		var me = this;
		var url = StaticSetting.absUrl + '/file/downExcelTpl/AutoSeries.xlsx';
		// document.location = encodeURI(url);
		var downloadForm = Ext.create("Ext.form.Panel", {
			border : 0,
			layout : 'fit',
			renderTo : Ext.getBody(),
			items : [{
				xtype : 'PluginuxIFrame',
				src : url,
				listeners : {
					'load' : function() {
						Ext.messagebox.msg('提示','如未下载，表示文件不存在/已损坏，请与管理员联系!');
					}
				}
			}]
		});
	},
	
	getImportWindow : function(){	
		var _this = this;
		var importWindow = Ext.create("Plugin.window.UploadWindowDaibu", {
			title : '选择文件',
			hiddenType : true,
			formUrl : StaticSetting.absUrl + '/mis/autoSeries/upload',
			onUploadFile : function(_form) {
				var formParams = {};
				_form.getForm().submit({
					waitTitle : '提示',
					waitMsg : '正在保存数据请稍后...',
					params : formParams,
					method : "GET",
					success : function(form,action) {
						var flag = action.result.success;
						if (flag) {
							Ext.MessageBox.show({
								title : "提示",
								msg : "导入成功！",
								icon : Ext.MessageBox.INFO,
								buttons : Ext.MessageBox.OK
							});
							importWindow.close();
							_this.store.reload();
						}
					},
					failure : function(form,action) {
						Ext.MessageBox.show({
							title : "错误",
							msg : "导入失败:["
									+ action.result.msg
									+ "]",
							icon : Ext.MessageBox.ERROR,
							buttons : Ext.MessageBox.OK
						});
					}
				});
			}
			
		});
		importWindow.show();
	}

});