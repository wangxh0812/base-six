Ext.define('Plugin.grid.GridTree', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ExtPluginGridTree',
    requires: [
        'Plugin.grid.Grid',
        'Plugin.tree.PanelTree'
    ],
    closable: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {
        var _this = this;
        var items = [];
        if(this.gridColumns){
            items.push({
                region: 'south',
                collapsible: false,
                split: true,
                layout: {
                    type: 'border',
                    padding: 2
                },
                flex: 1,
                items:[{
                    region: 'center',
                    xtype: 'ExtPluginGrid',
                    title:'角色列表',
                    columns : this.gridColumns,
                    dockedItems: this.gridDockedItems,
                    store:this.store,
                    listeners: {
                        itemdblclick : this.editRows,
                        selectionchange : function(selModel, selected){
                            _this.changeBtn.call(this,selModel, selected,_this.proxyParameter);
                        }
                    }
                },
                {
                    region: 'east',
                    xtype: 'ExtPluginTreePanelTree',
                    flex: this.treeParameter.width?0:1,
                    title: '当前角色可访问的菜单',
                    width: this.treeParameter.width || null,
                    treeStore : this.treeParameter.store,
                    proxyParameter:_this.proxyParameter
                }]
            });
        }    
        Ext.apply(this, {
            items: items
        });
        this.callParent(arguments);
    },
    editRows : function(selModel, selected){
        var editBtn = this.down("ExtPluginGridEdit");
        editBtn.handler();
    },
    changeBtn : function(selModel, selected, proxyParameter){
        if(!proxyParameter)proxyParameter={};
        var xid = proxyParameter.key || "xid";
        var uid = proxyParameter.userId || "id";
        var selLen = selected.length,
            editBtn = this.down("ExtPluginGridEdit"),
            delBtn = this.down("ExtPluginGridDel");
        if(selLen <= 0){
            editBtn.disable();
            delBtn.disable();
        }else if(selLen == 1){
            editBtn.enable();
            delBtn.enable();
        }else{
            editBtn.disable();
            delBtn.enable();
        }
        var panel = this.up("ExtPluginGridTree"),
            tree = panel.down("ExtPluginTreePanelTree"),
            store = tree.getStore(),
            proxy = store.getProxy(),
            grid = panel.down("ExtPluginGrid"),
            selection = selected,
            len = selection.length;
        if(len==1){
            var id = selection[0].get(uid);
            var pp = {expanded:true};
            pp[xid] = id;
            proxy.setExtraParam(xid,id);
            store.setRootNode({
                expanded:true
            });
            //store.read();
        }else{
            /*
            Ext.MessageBox.show({
                title: Dic.massageTitle,
                msg: Dic.massageText,
                icon: Ext.MessageBox.INFO
            });
            */
        }
    }
});
