Ext.define('Plugin.window.UploadAuditWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.ExtPluginUploadAuditWindow',
	requires : [ 'Ext.form.field.File', 'Plugin.form.combobox.Module' ],
	modal : true,
	autoShow : true,
	border : false,
	floating : true,
	width : 650,
	anchor : '100%',
	layout : 'form',
	initComponent : function() {
		var me = this;
		var _form = null;
		_form = Ext.create("Ext.form.Panel", {
			url : me.formUrl || '',
			border : false,
			defaults : {
				anchor : '95%',
				allowBlank : false,
				msgTarget : 'side'
			},
			layout : 'form',
			items : [ 
			          
			         
			{
				xtype : 'filefield',
				emptyText : '选择文件',
				fieldLabel : me.title,
				editable : false,
				name : 'uploadFile',
				buttonText : '',
				buttonConfig : {
					iconCls : 'icon-add'
				}
			} ],
			buttons : [ {
				text : '上传',
				handler : function() {
					if (!_form.getForm().isValid()) {
						Ext.MessageBox.show({
							title : "警告",
							msg : "请根据提示正确输入内容!",
							icon : Ext.MessageBox.WARNING,
							buttons : Ext.MessageBox.OK
						});
						return false;
					}
					if (me.onUploadFile)
						Ext.callback(me.onUploadFile, _form, [ _form ]);
				}
			} ]
		});
		me.items = [ _form ];
		this.callParent(arguments);
	}
});