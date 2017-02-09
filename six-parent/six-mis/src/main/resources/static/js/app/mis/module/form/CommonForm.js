Ext.define('FMS.app.mis.module.form.CommonForm', {
	extend : 'Ext.form.FieldSet',
	alias : 'widget.FMSAppMisModuleFormCommonForm',
	layout : 'anchor',
	defaults: {
        anchor: '100%'
    },
    /*frame : true,*/
	initComponent : function(a, b, c, d) {
		this.title = this.fieldSetTitle || '';
		
		var _formConfig = {
			fieldDefaults: {
		        labelAlign: 'right',
		        labelWidth: 90,
		        width : 260,
		        bodyPadding: 5
		    },
			method:'post',
			border : false,
			itemId : this.formItemId,
			url : this.formUrl,
			submitParams : this.submitParams,
			items : this.formItems
		};
		if(!this.hiddenFormButten)
			_formConfig = Ext.apply(_formConfig,{
				buttons : this.getFormButtons(this)
			});
		this._form = Ext.create("Ext.form.Panel",_formConfig);
		
		Ext.apply(this, {
			items : [this._form]
		});
		
		this.callParent();
	},
	getFormButtons : function(scope){
		var me = scope;
		return [{
	        text: '重置',
	        handler: function() {
	        	me._form.getForm().reset();
	        }
	    }, {
	        text: '保存',
	        handler: function() {
	        	if (!me._form.getForm().isValid()) {
	        		return Ext.MessageBox.show({
						title : '警告',
						msg : "请根据提示正确输入相关信息!",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
	        	}
	        	me._form.getForm().submit({
            		params : me.submitParams,
            		submitEmptyText: false,
            		success: function(form, action) {
            			Ext.MessageBox.show({
							title : '提示',
							msg : "操作成功!",
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO
						});
            		},
            		failure: function(form, action) {
            			Ext.MessageBox.show({
							title : '错误',
							msg : "操作失败!",
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
            		}
            	});
	        	
	        }
	    }];
	}
})