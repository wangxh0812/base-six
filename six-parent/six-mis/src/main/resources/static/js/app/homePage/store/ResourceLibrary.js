Ext.define('FMS.app.homePage.store.ResourceLibrary', {
	extend : 'Ext.data.Store',
	model : 'FMS.app.homePage.model.ResourceLibrary',
	autoLoad : true,
	//autoSync : true,
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
			read : StaticSetting.absUrl + '/mis/myFile/getlist',
			destroy:StaticSetting.absUrl + '/mis/myFile/dele'
		},
		actionMethods : {
			read : 'GET',
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