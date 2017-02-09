/**
 * kinjoYang 2014-03
 */
Ext.define('FMS.basic.kframe.controller.tree.Tree', {
	extend: 'Ext.app.Controller',
	stores: ['FMS.basic.kframe.store.tree.Trees'],
	models: ['FMS.basic.kframe.model.tree.Tree'],
	views:[
		'FMS.basic.kframe.view.menu.Tree'
	],
	customSetting:{
		tabId:"content-panel"
	},
	init:function(){
		this.control({
			'menuTreeWidget' : {
				itemclick: this.loadMenu
			}
		});
	},
	loadMenu:function(selModel,record){
		if(record.get("leaf")){
			var _cusSetting = this.customSetting,
				tabId = record.get("id"),
				tabTitle = record.get("text"),
				iconCls = record.get("iconClass"),
				tabLink = record.get("link"),
				panel = Ext.getCmp(tabId);
			if(!panel){
				var tabObj= this;
				Ext.require(tabLink,function(){
					var aliasName = tabLink.split(".").join("");
				  	panel={
						title:tabTitle,
						iconCls : iconCls,
						autoScroll : false,
						xtype:aliasName,
						closable:true
						/*,
						loader: {
							scripts : true,
		                    url: StaticSetting.absUrl+tabLink,
		                    contentType: 'html',
		                    loadMask: true,
		                    callback:function(){}
		                },
		                listeners: {
		                    activate: function(tab){
		                        tab.loader.load();
		                    }
		                }*/
					};
					tabObj.openTab(panel,tabId);
				});
			}else{
				var main = Ext.getCmp(_cusSetting.tabId);
				main.setActiveTab(panel);
			}
		}
	},
	openTab:function(panel,id){
		var _cusSetting = this.customSetting,
			o = (typeof panel == "string" ? panel : id || panel.id),
			main = Ext.getCmp(_cusSetting.tabId),
			tab = main.getComponent(o);
		if(tab){
			main.setActiveTab(tab);
		}else if(typeof panel!= "string"){
			panel.id = o;
			var p = main.add(panel);
			main.setActiveTab(p);
		}
	}
});