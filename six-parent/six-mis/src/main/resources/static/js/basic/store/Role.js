Ext.define('FMS.basic.store.Role', {
	extend : 'Ext.data.Store',
	model : 'FMS.basic.model.Role',
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
			create : StaticSetting.absUrl + '/role/save',
			read : StaticSetting.absUrl + '/role/getlist',
			update : StaticSetting.absUrl + '/role/save',
			destroy : StaticSetting.absUrl + '/role/dele'
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
