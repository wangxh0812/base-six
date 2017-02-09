Ext.define('FMS.app.member.module.ReceiverAddress', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSappmembermoduleReceiverAddress',
	requires : [ 'FMS.app.member.store.ReceiverAddress', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm',
			'MyApp.ux.DateTimeField' ],
	initComponent : function() {
		var _store = Ext.create('FMS.app.member.store.ReceiverAddress');
		if (!Ext.isEmpty(this.idParams)) {
			Ext.apply(_store.proxy.extraParams, this.idParams);
		}
		Ext.apply(this, {
			store : _store,
			// gridDockedItems : this.getGridDockedItems(),
			gridColumns : this.getGridColumns()
		});
		this.callParent(arguments);
	},

	getGridColumns : function() {
		return [ {
			text : '收件人',
			dataIndex : 'receiverName',
			width : 100
		}, {
			text : '省',
			dataIndex : 'provinceName',
			width : 150
		}, {
			text : '市',
			dataIndex : 'cityName',
			width : 150
		}, {
			text : '区',
			dataIndex : 'districtName',
			width : 150
		}, {
			text : '详细地址',
			dataIndex : 'address',
			width : 150
		}, {
			text : '是否默认',
			dataIndex : 'isDefault',
			renderer : function(val) {
				if (val == '1'){
					return "是";
				}else{
					return "否";
				}
				return val;
			},
			width : 150
		}, {
			text : '联系方式',
			dataIndex : 'phone',
			width : 150
		}, {
			text : '邮编',
			dataIndex : 'zipCode',
			width : 150
		} ];
	},

	// 按钮栏
	getGridDockedItems : function() {
		var me = this;
		var field1 = new Ext.form.Field();
		var field2 = new Ext.form.Field();
		var field3 = new Ext.form.Field();
		return [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [/*
						 * { xtype : 'ExtPluginGridAdd', customParameter : {
						 * items : me.getWindowColumns() } }, { xtype :
						 * 'ExtPluginGridEdit', customParameter : { items :
						 * me.getWindowColumns() } }, { xtype :
						 * 'ExtPluginGridDel' }
						 */]
		} ];
	},
	getWindowColumns : function() {/*
									 * return [{ fieldLabel : '逻辑ID', name :
									 * 'orderStateId', hidden : true }, { xtype :
									 * 'ExtPluginSelectionForm', textFeildName :
									 * "当前状态", windowTitle : '选择状态', grid :
									 * "FMSappselectmoduleOrderStateConfigModule",
									 * itemId : 'orderStateConfigSelectForm',
									 * hiddenFields : [{ fieldName :
									 * 'stateConfigId', storeName :
									 * 'stateConfigId' }], textField : {
									 * fieldName : 'logisticsName', storeName :
									 * 'staus' }, windowWidth : 600, editable :
									 * true }, { fieldLabel : '当前状态', name :
									 * 'staus', emptyText : '当前状态', maxLength :
									 * 15, allowBlank : false },{ fieldLabel :
									 * '上个状态', name : 'originalStatus',
									 * emptyText : '上个状态', }, { fieldLabel :
									 * '实际开始时间', name : 'realBeginDate',
									 * emptyText : '实际开始时间', xtype :
									 * 'datetimefield', format : 'Y-m-d H:i:s',
									 * itemId : 'realBeginDate' }, { fieldLabel :
									 * '实际结束时间', name : 'realEndDate', emptyText :
									 * '结束时间', xtype : 'datetimefield', format :
									 * 'Y-m-d H:i:s', itemId : 'realEndDate' },{
									 * name : 'msg', fieldLabel : '备注',
									 * emptyText : '备注' } ];
									 */
	}
});