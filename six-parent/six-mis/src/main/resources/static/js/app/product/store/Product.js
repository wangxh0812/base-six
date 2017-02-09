/**
 * Product store类
 */

Ext.define('FMS.app.product.store.Product',{
	extend:'Ext.data.Store',
	model:'FMS.app.product.model.Product',
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
			create:StaticSetting.absUrl + '/mis/product/save',
			read:StaticSetting.absUrl + '/mis/product/getlist',
			update:StaticSetting.absUrl + '/mis/product/save',
			destroy:StaticSetting.absUrl + '/mis/product/dele'
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