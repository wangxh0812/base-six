Ext.define('Plugin.grid.WriterGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.PluginGridWriterGrid',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        this.editing = Ext.create('Ext.grid.plugin.CellEditing',{
        	clicksToEdit : 1
        });
        Ext.apply(this, {
            //iconCls: 'icon-grid',
            frame: true,
            plugins: [this.editing],
            dockedItems: this.getGridDockedItems(),
            columns : this.gridColumns
        });
        if(this.store&&this.storeParams){
        	//this.store.proxy.api.read = this.store.proxy.api.read + '?customerId='+this.storeParams.customerId
        	Ext.apply(this.store.proxy.extraParams, this.storeParams);
        }
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    
    getGridDockedItems : function(){
    	return [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: '新增',
                scope: this,
                handler: this.onAddClick
            }, {
                iconCls: 'icon-remove',
                text: '删除',
                disabled: true,
                itemId: 'delete',
                scope: this,
                handler: this.onDeleteClick
            }]
        }];
    },
    
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function(){
    	if(this.syncFun)
    		Ext.callback(this.syncFun,this,[this]);
    },

    onDeleteClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function(){
        var rec = this.createDefaultRecord;

        this.editing.cancelEdit();
        this.store.insert(0, rec);
        this.editing.startEditByPosition({
            row: 0,
            column: 0
        });
    }
});
