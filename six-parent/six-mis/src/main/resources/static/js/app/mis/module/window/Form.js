Ext.define('FMS.app.mis.module.window.Form', {
	extend : 'Ext.form.Panel',
	alias : 'widget.FMSappForm',
	frame: true,
    bodyPadding: 5,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 90,
        msgTarget: 'qtip'
    },

    

    buttons: [{
        text: '重置',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
        text: '保存',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
            	var customerId=null;
            	if(!Ext.getCmp('customerName')){
            		customerId = {customerId : Ext.getCmp('customerId').getValue()};
            	}
            	//Ext.applyIf(form,customeform);
            	// console.log(form);
            	form.submit({
            		params : customerId,
            		submitEmptyText: false,
            		success: function(form, action) {
            			if(action.result.data){
            				Ext.getCmp('customerId').setValue(action.result.data[0].customerId);
            			}
            			Ext.Msg.alert('保存成功');
            		},
            		failure: function(form, action) {
            			Ext.Msg.alert('操作失败');
            		}
            	});
                //Ext.MessageBox.alert('Submitted Values', form.getValues(true));
            }
        }
    }]

})