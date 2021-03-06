Ext.define('FMS.app.point.module.PointOrderByUser', {
	extend : 'Plugin.grid.Show',
	alias : 'widget.FMSapppointmodulePointOrderByUser',
	requires : [ 'FMS.app.point.store.PointOrder', 'Plugin.ux.IFrame',
			'Plugin.form.combobox.Module', 'Plugin.form.SelectionForm',
			'Plugin.window.UploadWindow', 'Plugin.form.CascadeForm',
			'MyApp.ux.DateTimeField' ],
	initComponent : function() {
		var _store = Ext.create('FMS.app.point.store.PointOrder');
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
			text : '用户名',
			dataIndex : 'userAccount',
			width : 100
		}, {
			text : '商品名称',
			dataIndex : 'goodsName',
			width : 100
		}, {
			text : '兑换数量',
			dataIndex : 'exchangeNum',
			width : 100
		}, {
			text : '兑换积分',
			dataIndex : 'exchangePoint',
			width : 100
		}, {
			text : '兑换时间',
			dataIndex : 'applyTimeStr',
			width : 100
		}, {
			text : '状态',
			dataIndex : 'status',
			width : 100,
			renderer : function(val) {
				if (val == '1')
					return "已兑换";
				if (val == '2')
					return "已发货";
				return val;
			},
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
			items : [ {
				xtype : 'ExtPluginGridEdit',
				customParameter : {
					items : me.getWindowColumns()
				}
			} ]
		} ];
	},
	getWindowColumns : function() {
		return [ {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '逻辑ID',
				name : 'pointOrderId',
				hidden : true
			}, {
				fieldLabel : '用户名',
				name : 'userAccount',
				emptyText : '用户名',
				readOnly : true,
				style : 'background:#E6E6E6'
			}, {
				fieldLabel : '手机号码',
				name : 'userMobilephone',
				emptyText : '手机号码',
				readOnly : true,
				style : 'background:#E6E6E6'
			}

			]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '商品名称',
				name : 'goodsName',
				emptyText : '商品名称',
				readOnly : true,
				style : 'background:#E6E6E6'
			}, {
				fieldLabel : '兑换时间',
				name : 'applyTimeStr',
				readOnly : true,
				style : 'background:#E6E6E6',
				emptyText : '兑换时间'
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '兑换数量',
				name : 'exchangeNum',
				emptyText : '兑换数量',
				readOnly : true,
				style : 'background:#E6E6E6'
			}, {
				name : 'exchangePoint',
				fieldLabel : '兑换积分',
				emptyText : '兑换积分',
				readOnly : true,
				style : 'background:#E6E6E6'
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '每件积分',
				name : 'unitPoint',
				emptyText : '每件积分',
				maxLength : 50,
				readOnly : true,
				style : 'background:#E6E6E6'
			} ]
		}, {

			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '收件人',
				name : 'receiverName',
				emptyText : '收件人',
				readOnly : true,
				style : 'background:#E6E6E6'
			}, {
				name : 'phone',
				fieldLabel : '手机号码',
				emptyText : '手机号码',
				readOnly : true,
				style : 'background:#E6E6E6'
			} ]

		}, {
			xtype : 'container',
			layout : 'anchor',
			defaultType : 'textfield',
			items : [ {

				xtype : 'PluginformCascadeForm',
				name : 'test',
				code : '000000',
				firstCombo : true,
				columnWidth : .90,
				combos : [ 'provinceName', 'cityName', 'districtName' ],
				nextCombo : null,
				fieldLabel : '邮寄地址：',
				readOnly : true,
				style : 'background:#E6E6E6'
			} ]
		}, {
			xtype : 'container',
			layout : 'anchor',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '详细地址',
				name : 'address',
				emptyText : '详细地址',
				width : 300,
				maxLength : 400,
				readOnly : true,
				style : 'background:#E6E6E6'
			} ]
		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '邮编',
				name : 'zipCode',
				emptyText : '邮编',
				readOnly : true,
				style : 'background:#E6E6E6'
			} ]
		}, {

			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '状态',
				name : 'status',
				xtype : 'ExtPluginFormCombobox',
				tCode : 'c_point_order_status',
				allowBlank : false,
				forceSelection : true,
				typeAhead : false,
				editable : false
			}, {
				name : 'deliveryTimeStr',
				fieldLabel : '发货时间',
				emptyText : '发货时间',
				forceSelection : true,
				typeAhead : false,
				editable : false,
				xtype : 'datetimefield',
				format : 'Y-m-d H:i'
			} ]

		}, {
			xtype : 'container',
			layout : 'hbox',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '快递单号',
				name : 'expressNo',
				emptyText : '快递单号',
				maxLength : 30,
				allowBlank : false
			}, {
				fieldLabel : '备注',
				name : 'remark',
				emptyText : '备注',
				maxLength : 30
			} ]
		}

		];
	}
});