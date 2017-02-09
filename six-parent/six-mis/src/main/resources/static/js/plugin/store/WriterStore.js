Ext.define('Plugin.store.WriterStore', {
	extend : 'Ext.data.Store',
	model : 'Plugin.model.WriterModel',
	//autoLoad: true,
    //autoSync: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/customer/getlist',
            create: '/customer/save',
            update: '/customer/save',
            destroy: '/customer/dele'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            root: 'data',
            totalProperty :'count'
        },
        listeners: {
            exception: function(proxy, response, operation){
                /*Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });*/
            }
        }
    }
});