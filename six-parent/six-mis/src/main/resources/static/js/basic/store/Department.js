Ext.define('FMS.basic.store.Department', {
	extend : 'Ext.data.Store',
	model : 'FMS.basic.model.Department',
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
			create : StaticSetting.absUrl + '/depart/save',
			read : StaticSetting.absUrl + '/depart/getlist',
			update : StaticSetting.absUrl + '/depart/save',
			destroy : StaticSetting.absUrl + '/depart/dele'
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