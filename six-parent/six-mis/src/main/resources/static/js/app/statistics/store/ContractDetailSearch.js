Ext.define('FMS.app.statistics.store.ContractDetailSearch', {
	extend : 'Ext.data.Store',
	model : 'FMS.app.statistics.model.ContractDetailSearch',
	autoLoad : false,
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
			read : StaticSetting.absUrl + '/mis/contract/getlist4detail'
		},
		actionMethods : {
			read : 'GET'
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