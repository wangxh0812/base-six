Ext.define('FMS.basic.store.RoleMenuTree', {
    extend: 'Ext.data.TreeStore',
    model: 'FMS.basic.model.RoleMenuTree',
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
            read:StaticSetting.absUrl+'/role/role_menu',
            update:StaticSetting.absUrl+'/role/save_role_menu'
        }
    },
    nodeParam: 'opId',
    root: {
        id: 'root',
        expanded: false
    }
});