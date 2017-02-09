Ext.define("Plugin.form.CascadeForm", {
	extend : "Ext.form.Panel",
	alias : 'widget.PluginformCascadeForm',
	requires : [ 'Plugin.form.cascadeCombobox.Module' ],
	layout : "column",
	border : 0,
	config : {
		combos : [ "shengValue","shiValue","quValue"]
	},
	constructor : function(config) {
		this.initConfig(config);
		this.callParent([ config ]);
	},
	initComponent : function() {
		var me = this;
		me.items = this.createItems();
		me.callParent();
	},
	createItems : function() {
		var me = this;
		var _combos = this.getCombos();
		var _timestamp = Date.parse(new Date());
		return [{
			layout : 'form',
			border : 0,
			width : 50,
			items : [ {
				xtype : 'label',
				text : Ext.isEmpty(me.fieldLabel)?'地区：':me.fieldLabel
			}
			]
		},{
			layout : 'form',
			border : 0,
			columnWidth : .325,
			items : [ 
			         {
				xtype : 'ExtPluginFormCascadeCombobox',
				id : _combos[0]+_timestamp,
				name : _combos[0],
				code : '000000',
				itemId : 'province',
				emptyText : "请选择省",
				firstCombo : true,
				nextCombo : _combos[1]+_timestamp
			} ]
		
		},{
			layout : 'form',
			border : 0,
			columnWidth : .325,
			items : [ {
				xtype : 'ExtPluginFormCascadeCombobox',
				id : _combos[1]+_timestamp,
				name : _combos[1],
				itemId : 'city',
				emptyText : "请选择市",
				nextCombo : _combos[2]+_timestamp
			} ]
		
		},{
			layout : 'form',
			border : 0,
			columnWidth : .325,
			items : [ {
				xtype : 'ExtPluginFormCascadeCombobox',
				id : _combos[2]+_timestamp,
				name : _combos[2],
				itemId : 'district',
				emptyText : "请选择区/县"
			} ]
		
		}];
	}
});