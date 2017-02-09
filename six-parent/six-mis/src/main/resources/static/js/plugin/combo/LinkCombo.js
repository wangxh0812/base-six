/**
 * kinjoYang 2014-03
 * 省市区三级联动插件
 */
Ext.define("Plugin.combo.LinkCombo", {
        extend: "Ext.form.FieldContainer" ,
        alias : 'widget.PlugincomboLinkCombo',
        layout: "hbox" ,
        fieldLabel:"选择地区" ,
        labelWidth: 60 ,
        config:{
            combos:[
                {name:"shengValue" , emptyText:"请选择省"} ,
                {name:"shiValue" , emptyText:"请选择市"} ,
                {name:"quValue" , emptyText:"请选择区/县" , margin:0}
            ] ,
            fields: [
                "code" , "name"
            ] ,
            displayField: "name" ,
            valueField: "code" ,
            filterProperty: {parentField:"parent" , firstValue:"000000"}
        } ,
        constructor: function (config) {
            this.initConfig(config);
            this.callParent([config]);
        },
        initComponent: function(){
            var me = this;
            me.items = this.createItems();
            me.defaults = Ext.apply(this.defaults , {
                displayField: me.getDisplayField() ,
                valueField: me.getValueField()
            });
            me.callParent();
            me.on("render" , me.loadData , me);
        } ,
        createItems: function(){
            var items = [] ,
               combos = this.getCombos() ,
                storeFields = this.getFields();
            Ext.each(combos , function(combo){
                var item = Ext.apply({
                    xtype:"combobox" ,
                    store: Ext.create("Ext.data.JsonStore" , {
                        fields: storeFields ,
                        proxy: {
                            type:"memory"
                        },
                        autoLoad:true
                    }) ,
                    disabled: true ,
                    editable: false,
                    queryMode: 'local',
                    triggerAction: 'all' ,                   
                    listeners:{
                        change: this.onComboChange ,
                        scope: this
                    }
                } , combo);
                items.push(item);
            } , this);
            return items;
        } ,
        loadData: function(){
        	console.log("loadData");
        	this.data  = [
				{"code":"110000","name":"北京市","parent":"000000"},
				{"code":"110200","name":"县","parent":"110000"},
				{"code":"110228","name":"密云县","parent":"110200"},
				{"code":"110229","name":"延庆县","parent":"110200"}
            ];
            this.setComboData();
        } ,
        setComboData: function(combo , filterValue){
            var comboBoxs = this.getNextComboBoxs(combo);
            if (comboBoxs.length == 0) return;
            Ext.each(comboBoxs , function(n){
                n.store.removeAll();
                n.clearValue();
                n.disable();
            });
            var comboBox = comboBoxs[0];
            var fp = this.getFilterProperty();
            var comboData = Ext.Array.filter(this.data , function(n , i){
                return n[fp.parentField] == (filterValue || fp.firstValue);
            } , this);
            comboBox.store.loadData(comboData);
            comboBox.enable();
        } ,
        getNextComboBoxs: function(combo){
            var comboBoxs = [];
            var items = this.items.items;
            var ix = Ext.Array.indexOf(items , combo)+1;
            if (ix == items.length) return comboBoxs;
            comboBoxs = Ext.Array.slice(items , ix);
            return comboBoxs;
        } ,
        onComboChange: function(cb , newvalue , oldvalue){
        	//alert(cb,newvalue);
            this.setComboData(cb , newvalue);
        } ,
        getValue: function(){
            var items = this.items.items;
            var values = {};
            Ext.each(items , function(n){
                if (n.name) values[n.name] = n.getValue();
            });
            return values;
        }
});