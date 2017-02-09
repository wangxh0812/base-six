Ext.define("Plugin.form.Picker", {
    extend : "Ext.form.field.Picker",
    alias : 'widget.ExtPluginFormPicker',
    requires : ["Plugin.lov.lovStore"],
    _idValue : '',
    _txtValue : '',
    matchFieldWidth: false,
    initComponent : function() {
      this.callParent();
      var self = this;
      //var showName = self.name;
      var hideId = self.keyId;
      var store = Ext.create('Plugin.lov.lovStore', {
            proxy : {
              type : 'ajax',
              url : self.storeUrl,
              reader: {
                type:'json',
                root:'data',
                successProperty:'success'
              }
            }
        });
      store.getProxy().setExtraParam('lCode',self.lCode);
      var  columns = [
        { text: "代号",  dataIndex: "lovCode" },
        { text: "名称",  dataIndex: "lovName" , flex: 1}
      ];
      self.picker = new Ext.window.Window({
          height: 350,
          width: 450,
          layout: 'fit',
          closable: false,
          draggable:false,
          resizable:false,
          items: {  
              xtype: 'ExtPluginShow',
              border: false,
              gridColumns: columns,
              serchItems:[{
                name:"lovCode",
                fieldLabel:"代号"
              },{
                name:"lovName",
                fieldLabel:"名称"
              }],
              store: store,
              listeners : {
                itemdblclick: function(view,rec){
                  var data = rec.getData();
                  //var keyId = self.keyId;
                  var hidden = self.up('panel').down("[name='"+hideId+"']");
                  //var hiddenKey = hidden.name;
                  hidden.setValue(data["lovId"]);
                  self.setValue(self._idValue = self._txtValue = data["lovName"]);// 显示值
                  self.collapse();
                  self.fireEvent('select',self,rec);
                }
              }
          }
      });
      return true;
      self.picker.on({
         'itemclick' : function(view,rec) {
             if(rec&&((self.selectMode == 'leaf' && rec.isLeaf() == true) || self.selectMode == 'all')){
                  self._idValue = rec.get('id');
                  self.valuefield = rec.get('id');
                  self.setValue(self._txtValue=rec.get('text'));// 显示值
                  self.collapse();
                  self.fireEvent('select',self,rec);
             }
         }
      });
    },
    getValue : function(){//获取id值
        return this._idValue;
    },
    getTextValue : function(){//获取text值
        return this._txtValue;
    },
    reLoad:function(id,url){
        var store=this.picker.getStore();
        var root=this.picker.getRootNode();
        store.proxy.url =url;
        root.set('id',id);
        store.load();
    },
    alignPicker : function() {
      var me = this, picker, isAbove, aboveSfx = '-above';
      if (this.isExpanded) {
           picker = me.getPicker();
           if (me.matchFieldWidth) {
              picker.setWidth(me.bodyEl.getWidth());
           }
           if (picker.isFloating()) {
               picker.alignTo(me.inputEl, "", me.pickerOffset);
               isAbove = picker.el.getY() < me.inputEl.getY();
               me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls+ aboveSfx);
               picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls+ aboveSfx);
           }
      }
    }
});