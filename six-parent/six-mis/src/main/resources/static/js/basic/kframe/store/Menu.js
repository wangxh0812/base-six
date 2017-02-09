/**
 * kinjoYang 2014-03
 */
Ext.define('FMS.basic.kframe.store.Menu', {
    extend: 'Ext.data.TreeStore',
    model: 'FMS.basic.kframe.model.Menu',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api:{
            read: StaticSetting.absUrl+'/menu/getMenus'
        },
        reader: {
        	type:'json',
        	root:'data',
        	successProperty:'success'
        }
    },
    nodeParam: 'id',
    root: {
        id: '',
        expanded: false
    },
    listeners:{
        load:function(_this, node, dd, successful, eOpts){
            var items = [];
            for(var i=0,j=dd.length;i<j;i++){
                var row = dd[i].data;
                items.push({
                    title : row.text,
                    id : row.id,
                    xtype : "menuTreeWidget",
                    listeners:{
                        beforeexpand:function(){
                            var staticStore = FMS.basic.kframe.statics.Stores.menu;
                            var key = this.id;
                            var _store = this.store;
                            var ss = _store.setRootNode({
                                id:key,
                                expanded:true
                            });
                            staticStore[key] = ss;
                        }
                    }
                });
            };
            var wast = Ext.getCmp("SystemMenu");
            wast.add(items);
            var firstPanel = wast.down("panel");
            var fkey = firstPanel.id;
            var fs = firstPanel.store.setRootNode({
                id:fkey,
                expanded:true
            });
            FMS.basic.kframe.statics.Stores.menu[fkey] = fs;
        }
    }
});
