Ext.define('FMS.basic.store.User', {
	extend : 'Ext.data.Store',
	model : 'FMS.basic.model.User',
	autoLoad : true,
	listeners : {
		'load' : function(store,records,successful,eOpts ){
			if(successful == false) {  
                Ext.Msg.alert("错误",store.proxy.reader.jsonData.msg);  
            }
		}
	},
	//autoSync : true,
	pageSize : 30,
	proxy : {
		type : 'ajax',
		api : {
			create : StaticSetting.absUrl + '/user/save',
			read : StaticSetting.absUrl + '/user/getlist',
			update : StaticSetting.absUrl + '/user/save',
			destroy : StaticSetting.absUrl + '/user/dele'
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
		}
	}
});
