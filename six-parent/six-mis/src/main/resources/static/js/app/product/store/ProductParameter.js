Ext.define('FMS.app.product.store.ProductParameter',{
	extend:'Ext.data.Store',
	model:'FMS.app.product.model.ProductParameter',
	autoLoad : true,
	//autoSync : true,
	pageSize : 30,
	listeners : {
		'load' : function(store,records,successful,eOpts ){
			if(successful == false) {  
                Ext.Msg.alert("错误",store.proxy.reader.jsonData.msg);  
            }
		}
	},
	pageSize : 30,
	proxy : {
		type : 'ajax',
		api : {
			create:StaticSetting.absUrl + '/mis/productParameter/save',
			read:StaticSetting.absUrl + '/mis/productParameter/getlist',
			update:StaticSetting.absUrl + '/mis/productParameter/save',
			destroy:StaticSetting.absUrl + '/mis/productParameter/dele'
		},
		actionMethods : {
			create : 'POST',
			read : 'GET',
			update : 'POST',
			destroy : 'POST'
		},
		reader : {
			type : 'json',
			root : 'data',
			totalProperty : 'count',
			successProperty : 'success'
		},
		exception : function(proxy, response, options) {
			Ext.MessageBox.alert('Error', response.status + ": "
					+ response.statusText);
		}
	}
});