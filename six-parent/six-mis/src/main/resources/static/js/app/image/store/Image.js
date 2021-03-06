Ext.define('FMS.app.image.store.Image', {
	extend : 'Ext.data.Store',
	model : 'FMS.app.image.model.Image',
	autoLoad : true,
	/*autoSync : true,*/
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
			create : StaticSetting.absUrl + '/mis/image/save',
			read : StaticSetting.absUrl + '/mis/image/getlist',
			update : StaticSetting.absUrl + '/mis/image/save',
			destroy : StaticSetting.absUrl + '/mis/image/dele'
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