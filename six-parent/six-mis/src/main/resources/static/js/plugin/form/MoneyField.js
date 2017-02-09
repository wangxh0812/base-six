Ext.define('Plugin.form.MoneyField', {
	extend : 'Ext.form.NumberField',
	alias : 'widget.PluginformMoneyField',
	allowNegative : false,  //是否可以输入负数  
    allowDecimals : true,   //是否可以输入小数点  
    decimalPrecision : 2,   //小数点位数 
    baseChars : "0123456789,",  
    autoStripChars: true, 
	initComponent : function(a, b, c, d) {
		this.callParent(arguments);
		this.on('invalid', this.inputIsvalid);
	},
	/** 
     * @params t: Ext.form.Field 
     * @params msg: erro msg 
     */  
    inputIsvalid: function(t, msg) {  
        if(!Ext.isEmpty(t.getValue())) {  
            var val = msg.substring(0, msg.indexOf(" "));  
            if(val.indexOf(',') > -1) {  
                t.setValue(val.replace(',',''));  
            }  
        }  
    }
});