Ext.define('Plugin.tree.PanelTree', {
    extend:'Ext.tree.Panel',
    requires: [
        'Ext.panel.Panel',
        'Ext.window.MessageBox'
    ],
    alias: 'widget.ExtPluginTreePanelTree',
    rootVisible: false,
    useArrows: true,
    frame: true,
    dockedItems: [{
        xtype: 'toolbar',
        items: {
        	iconCls: 'icon-save',
            defaultType: 'button',
            scale: 'small',
            text: '保存',  // todo
            handler: function(){
                var tree = this.up("ExtPluginTreePanelTree"),
                    store = tree.getStore(),
                    proxy = store.getProxy(),
                    panel = this.up("ExtPluginGridTree"),
                    grid = panel.down("ExtPluginGrid"),
                    selection = grid.getSelectionModel().getSelection(),
                    len = selection.length;
                if(len==1){
                    var uid = this.up("ExtPluginTreePanelTree").proxyParameter.userId;
                    var id = selection[0].get(uid);
                    //proxy.setExtraParam("xid",id);
                    var records = tree.getView().getChecked(),
                        names = [];
                    records.shift(); // delete root
                    Ext.Array.each(records, function(rec){
                        names.push(rec.get('id'));
                    });
                    Ext.Ajax.request({
                        url: proxy.api.update,
                        params: {
                            ids :names.join(","),
                            opId : id
                        },
                        success: function(response){
                        	var jsonResult = Ext.JSON.decode(response.responseText);
							if(jsonResult.success)
								Ext.MessageBox.show({
									title : '提示',
									msg : '操作成功!',
									icon : Ext.MessageBox.INFO,
									buttons : Ext.MessageBox.OK
								});
							else
								Ext.MessageBox.show({
									title : '错误',
									msg : jsonResult.msg,
									icon : Ext.MessageBox.ERROR,
									buttons : Ext.MessageBox.OK
								});
                        }
                    });
                }else{
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '必须选择1项',
                        icon: Ext.MessageBox.INFO
                    });
                }  
                //proxy.setExtraParam("xId",);
                /*
                var records = this.up("ExtPluginTreePanelTree").getView().getChecked(),
                    names = [];
                Ext.Array.each(records, function(rec){
                    names.push(rec.get('text'));
                });
                Ext.MessageBox.show({
                    title: 'Selected Nodes',
                    msg: names.join('<br />'),
                    icon: Ext.MessageBox.INFO
                });
                */
            }
        }
    }],
    initComponent: function() {
        var _this = this;
        //var tListeners = _this.treeListeners;
        Ext.apply(this, {
            store: _this.treeStore,
            listeners: {
                checkchange : function(node, checked) {
                    if (checked == true) {
                        node.checked = checked;
                        //获得父节点
                        pNode = node.parentNode;
                        //当checked == true通过循环将所有父节点选中
                        for (; pNode != null; pNode = pNode.parentNode) {
                            pNode.set("checked", true);
                        }
                    }
                    //当该节点有子节点时，将所有子节点选中删除
                    if (!node.get("leaf")){
                        if(!checked){
                            node.cascadeBy(function(node){
                                node.set('checked', false);
                            });
                        }else{
                            node.cascadeBy(function(node){
                                node.set('checked', true);
                                node.expand();
                            });
                        }
                    }
                    //var callback = tListeners.checkchange;
                    //if(callback)callback.call(this,node, checked);
                }
            }
        });
        this.callParent(arguments);
    }
});