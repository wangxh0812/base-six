/**
 * kinjoYang 2014-03
 */
//头部
Ext.define('FMS.basic.kframe.view.Header', {
	//extend : 'Ext.Component',
	extend: 'Ext.panel.Panel',
	initComponent : function() {
		Ext.applyIf(this, {
			//xtype : 'box',
			//cls : 'header',
			region : 'north',
			//html : '<h1>众信在线管理系统</h1>',
			contentEl : 'main_head',
			height : 80
		});
		var ele = document.getElementById("updatePassword");
		ele.onclick = function(){
			//console.log("sdfsf:"+ele.text);
			Ext.create("Plugin.window.UpdatePasswordWindow",{
				url : StaticSetting.absUrl +  '/user/updatepass'
			});
		};
		this.callParent(arguments);
	}
});
