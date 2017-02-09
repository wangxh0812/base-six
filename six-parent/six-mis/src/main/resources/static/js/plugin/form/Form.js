/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.form.Form', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ExtPluginForm',
	requires : [ 'Ext.form.field.Text' ],
	defaultType : 'textfield',
	/*layout : {
		type : 'vbox',
		padding : '5',
		align : 'center'
	},*/
	layout : 'form',
	bodyPadding: 10,
	border : false,
	initComponent : function(a, b, c, d) {
		this.addEvents('create');
		this.addEvents('update');
		Ext.apply(this, {
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
				ui : 'footer',
				items : [ '->', {
					iconCls : 'icon-save',
					itemId : 'save',
					text : '保存', // edit
					disabled : true,
					hidden : true,
					scope : this,
					handler : this.onSave
				}, {
					iconCls : 'icon-accept',
					itemId : 'create',
					text : '确定', // add
					disabled : false,
					hidden : false,
					scope : this,
					handler : this.onCreate
				}, {
					iconCls : 'icon-cancel',
					text : '取消',
					scope : this,
					handler : this.onCancel
				}, {
					iconCls : 'icon-reload',
					text : '重置',
					scope : this,
					handler : this.onReset
				} ]
			} ]
		});
		Ext.apply(this, this.customParameter);
		this.callParent();

		if (this.onCreated)
			this.onCreated.call(this);
	},
	setActiveRecord : function(record) {
		this.activeRecord = record;
		if (record) {
			this.down('#save').enable().show();
			this.down('#create').disable().hide();
			this.getForm().loadRecord(record);
		} else {
			this.down('#save').disable().hide();
			this.down('#create').enable().show();
			this.getForm().reset();
		}
	},
	onCancel : function() {
		var form = this.getForm();
		form.reset();
		this.up("ExtPluginWindow").close();
	},
	onSave : function() {
		var active = this.activeRecord, form = this.getForm();
		if (!active) {
			return;
		}
		if(!form.isValid()){
			Ext.MessageBox.show({
	            title: "警告",
	            msg: "请检查您的输入确保无误!",
	            icon: Ext.MessageBox.WARNING,
	            buttons: Ext.MessageBox.OK
			});
			return false;
		}
		var onSave = this.customParameter.onSave;
		if (onSave)
			msg = onSave.call(this, form);
		if (typeof msg === "string") {
			Ext.Msg.show({
				title : '系统提示',
				msg : '修改保存失败!'
			}); 
			return false;
		}
		form.updateRecord(active);
		this.fireEvent('update', this, form.getValues());
	},
	onCreate : function() {
		var form = this.getForm();
		if(!form.isValid()){
			Ext.MessageBox.show({
	            title: "警告",
	            msg: "请检查您的输入确保无误!",
	            icon: Ext.MessageBox.WARNING,
	            buttons: Ext.MessageBox.OK
			});
			return false;
		}
		var onCreate = this.customParameter.onCreate;
		if (onCreate){
			var msg = false;
			msg = onCreate.call(this, form);
			if (typeof msg === "string") {
				Ext.messagebox.msg('失败', msg);
				return false;
			}
		}
		this.fireEvent('create', this, form.getValues());
	},
	onReset : function() {
		// this.setActiveRecord(null);
		var selection = this.selection;
		if (selection) {
			this.setActiveRecord(this.selection[0]);
		} else {
			this.setActiveRecord(null);
			this.getForm().reset();
		}
	}
});