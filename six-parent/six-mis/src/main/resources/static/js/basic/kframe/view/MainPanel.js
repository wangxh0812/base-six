/**
 * kinjoYang 2014-03
 */
//tab显示窗口
Ext.define('FMS.basic.kframe.view.MainPanel', {
	extend : 'Ext.panel.Panel',
	requires: [ ],
    customSetting:{
		tabId:"content-panel"
	},
	initComponent : function() {
		Ext.apply(this, {
			id : 'content-panel',
			hideMode:"offsets",
			layout : 'fit',
			bodyStyle:"background-color:#FFF;background-image:none",
			autoScroll:true,
			moduleLoaded: true,
			items : []
		});
		
		this.callParent(arguments);
		this.addTab();
	},
	
	addTab:function(){
		var me=this;
		var xwl=this.getParameter("xwl");
		
		Ext.Ajax.request({
            url: StaticSetting.absUrl + "/menu/getlist",
            params : {
				menuId : xwl
			},
            method: 'GET',
            //async: false,
            success: function (response, options) {
            	var resultJSON = Ext.JSON.decode(response.responseText);
            	if(resultJSON != null){
            		var record=resultJSON.data[0];
            		tabId = record.menuId,
    				tabTitle = record.menuName,
    				iconCls = record.iconClass,
    				tabLink = record.menuLink,
            		aliasName = tabLink.split(".").join("");
            		panel = Ext.getCmp(tabId);
            		if(!panel){
            			var tabObj= me;
            			Ext.require(tabLink,function(){
            				var aliasName = tabLink.split(".").join("");
            			  	panel={
            					/*title:tabTitle,*/
            					iconCls : iconCls,
            					autoScroll : false,
            					xtype:aliasName,
            					closable:false,
            					autoScroll:true
            				};
            				tabObj.openTab(panel,tabId);
            			});
            		}else{
            			var main = Ext.getCmp(_cusSetting.tabId);
            		}
            	}
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
	},
	
	openTab:function(panel,id){
		var _cusSetting = this.customSetting,
			o = (typeof panel == "string" ? panel : id || panel.id),
			main = Ext.getCmp(_cusSetting.tabId);
			tab = main.getComponent(o);
		if(tab){
//			main.setActiveTab(tab);
		}else if(typeof panel!= "string"){
			panel.id = o;
			var p = main.add(panel);
//			main.setActiveTab(p);
		}
	},
	
	getParameter:function (name) {
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	  var r = window.location.search.substr(1).match(reg);
	  if (r != null)
	     return unescape(r[2]);
	     return null;
	}
	
});
