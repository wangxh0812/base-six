Ext.define('FMS.app.tour.store.OrderTourNotGroup',{
	extend:'Ext.data.Store',
	model:'FMS.app.tour.model.OrderTour',
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
			//create:StaticSetting.absUrl + '/mis/orderTour/save',
			read:StaticSetting.absUrl + '/mis/orderTour/getlistNotGroup',
			update:StaticSetting.absUrl + '/mis/orderTour/saveToGroup',
			//destroy:StaticSetting.absUrl + '/mis/orderTour/dele'
		},
		actionMethods : {
			//create : 'POST',
			read : 'GET',
			update : 'POST',
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