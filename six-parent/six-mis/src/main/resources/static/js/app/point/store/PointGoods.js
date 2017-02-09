Ext.define('FMS.app.point.store.PointGoods',{
	extend:'Ext.data.Store',
	model:'FMS.app.point.model.PointGoods',
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
			create:StaticSetting.absUrl + '/mis/goods/save',
			read:StaticSetting.absUrl + '/mis/goods/getlist',
			update:StaticSetting.absUrl + '/mis/goods/save',
			destroy:StaticSetting.absUrl + '/mis/goods/dele'
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