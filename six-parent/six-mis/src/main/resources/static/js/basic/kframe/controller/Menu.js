/**
 * kinjoYang 2014-03
 */
Ext.define('FMS.basic.kframe.controller.Menu', {
	extend: 'Ext.app.Controller',
	stores: ['FMS.basic.kframe.store.Menu'],
	models: ['FMS.basic.kframe.model.Menu'],
	views:[
    	"FMS.basic.kframe.view.Menu"
    ],
    init:function(){
		this.control({
			'menuWidget' : {
				afterrender : function(wast){
					var treeStroe = this.getStore("FMS.basic.kframe.store.Menu");
					treeStroe.load();
				}
			}
		});
	}
});