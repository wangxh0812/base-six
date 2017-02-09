Ext.define('FMS.app.configure.store.DaysConfig',{
	extend:'Ext.data.Store',
	model:'FMS.app.configure.model.DaysConfig',
	autoLoad : true,
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
			create:StaticSetting.absUrl + '/mis/days/save',
			read:StaticSetting.absUrl + '/mis/days/getlist',
			update:StaticSetting.absUrl + '/mis/days/save',
			destroy:StaticSetting.absUrl + '/mis/days/dele'
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