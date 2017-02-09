/**
 * kinjoYang 2014-03
 * 数据表格
 */
Ext.define('Plugin.grid.Show', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ExtPluginShow',
    requires: [
        'Plugin.grid.Grid'
    ],
    defaultWidth:248,
    closable: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {
        //var simple = this.simple;
        var gListeners = this.gridListeners;
        var items = [];
        var _this = this;
        var _listeners = this.listeners;
        if(this.gridColumns){
            items.push({
                xtype: 'ExtPluginGrid',
                columns : this.gridColumns,
                dockedItems: this.gridDockedItems,
                store:this.store,
                flex: 1,
                listeners: _listeners || {
                    itemdblclick : function(selModel, selected){
                        var callback = "";
                        if(gListeners)callback = gListeners.itemdblclick;
                        _this.editRows(selModel, selected,callback);
                    },
                    itemclick : function(_this, record, item, index, e, eOpts){
                        //var callback = "";
                        if(gListeners && gListeners.itemclick)gListeners.itemclick.call(this,_this, record, item, index, e, eOpts);
                    },
                    selectionchange : function(selModel, selected){
                        var callback = "";
                        if(gListeners)callback = gListeners.selectionchange;
                        _this.changeBtn(selModel, selected,callback);
                    },
                    select : function(selModel, selected){
                        var callback = "";
                        if(gListeners)callback = gListeners.select;
                        _this.selectRow(selModel, selected,callback);
                    },
                    afterrender : function(selModel, selected){
                        if(gListeners && gListeners.afterrender)gListeners.afterrender.call(this,selModel, selected);
                    }
                }
            });
        }
        Ext.apply(this, {
            items: items
        });
        this.callParent(arguments);
    },
    editRows : function(selModel, selected,callback){
        var editBtn = this.down("ExtPluginGridEdit");
        editBtn.handler();
        if(callback)callback.call(this,selModel, selected);
    },
    changeBtn : function(selModel, selected,callback){
        var selLen = selected.length,
            editBtn = this.down("ExtPluginGridEdit"),
            delBtn = this.down("ExtPluginGridDel"),
            saveBtn = this.down("ExtPluginGridSave");
        if(editBtn){
            if(selLen <= 0){
                editBtn.disable();
            }else if(selLen == 1){
                editBtn.enable();
            }else{
                editBtn.disable();
            }
        }
        if(delBtn){
            if(selLen <= 0){
                delBtn.disable();
            }else if(selLen == 1){
                delBtn.enable();
            }else{
                delBtn.enable();
            }
        }
        if(saveBtn){
            if(selLen <= 0){
                saveBtn.disable();
            }else if(selLen == 1){
                saveBtn.enable();
            }else{
                saveBtn.enable();
            }
        }
        if(callback)callback.call(this,selModel, selected);
    },
    selectRow : function(selModel, selected,callback){
        if(callback)callback.call(this,selModel, selected);
    }
});
