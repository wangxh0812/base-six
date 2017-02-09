/**
 * CompanyContacts store类
 */

Ext.define('FMS.app.companyContacts.store.CompanyContacts',{
	extend:'Ext.data.Store',
	model:'FMS.app.companyContacts.model.CompanyContacts',
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
			create:StaticSetting.absUrl + '/mis/companyContacts/save',
			read:StaticSetting.absUrl + '/mis/companyContacts/getlist',
			update:StaticSetting.absUrl + '/mis/companyContacts/save',
			destroy:StaticSetting.absUrl + '/mis/companyContacts/dele'
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