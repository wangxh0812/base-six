Ext.define('FMS.app.contractClaim.store.ContractClaim4Audit', {
	extend : 'Ext.data.Store',
	model : 'FMS.app.contractClaim.model.ContractClaim',
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
			create : StaticSetting.absUrl + '/mis/contractClaim/save',
			read : StaticSetting.absUrl + '/mis/contractClaim/getlist4audit',
			update : StaticSetting.absUrl + '/mis/contractClaim/save',
			destroy : StaticSetting.absUrl + '/mis/contractClaim/dele'
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