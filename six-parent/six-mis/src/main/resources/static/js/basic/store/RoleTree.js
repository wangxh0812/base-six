Ext.define('FMS.basic.store.RoleTree', {
    extend: 'Ext.data.TreeStore',
    model: 'FMS.basic.model.RoleTree',
    autoLoad: false,
    listeners : {
		'load' : function(store,records,successful,eOpts ){
			if(successful == false) {  
                Ext.Msg.alert("错误",store.proxy.reader.jsonData.msg);  
            }
		}
	},
    proxy: {
        type: 'ajax',
        api:{
            read:StaticSetting.absUrl+'/user/user_role',
            update:StaticSetting.absUrl+'/user/save_user_role'
        },
        reader: {
            type:'json',
            root:'data',
            successProperty:'success'
        }
    },
    nodeParam: 'opId',
    root: {
        id: 'root',
        expanded: false
    }
});