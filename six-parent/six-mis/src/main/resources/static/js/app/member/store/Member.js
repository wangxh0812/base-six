Ext.define('FMS.app.member.store.Member',{
	extend:'Ext.data.Store',
	model:'FMS.app.member.model.Member',
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
			//create:StaticSetting.absUrl + '/mis/user/save',
			read:StaticSetting.absUrl + '/mis/user/getlist',
			//update:StaticSetting.absUrl + '/mis/user/save',
			//destroy:StaticSetting.absUrl + '/mis/user/dele'
		},
		actionMethods : {
			//create : 'POST',
			read : 'GET'
			//update : 'POST',
			//destroy : 'POST'
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