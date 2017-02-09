/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.grid.toolbar.Del', {
	extend : 'Ext.button.Button',
	alias : 'widget.ExtPluginGridDel',
	iconCls : 'icon-remove',
	defaultType : 'button',
	scale : 'small',
	disabled : true,
	handler : function(a, b, c) {
		var selection = this.up("ExtPluginGrid").getSelectionModel()
				.getSelection();
		if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
				title : '警告',
				msg : '只允许删除一条数据',
				icon : Ext.MessageBox.WARNING
			});
			return false;
		}
		var panelStore = this.up("panel").getStore();
		if (selection) {
			Ext.MessageBox.show({
	                title: "警告",
	                msg: "您确定要删除该记录么?",
	                icon: Ext.MessageBox.WARNING,
	                buttons: Ext.MessageBox.OKCANCEL,
	                fn: function(buttonId) {
	                    if (buttonId === "ok") {
	                    	panelStore.remove(selection);
	                    	panelStore.sync({
								success : function(batch,options){
									Ext.messagebox.msg('成功', '删除成功!');
									panelStore.reload();
								},
								failure : function(batch,options){
									Ext.MessageBox.show({
		                                    title: "错误",
		                                    msg: batch.operations[0].request.scope.reader.jsonData["msg"],
		                                    icon: Ext.MessageBox.ERROR,
		                                    buttons: Ext.MessageBox.OK,
		                                    fn: function(buttonId) {
		                                        if (buttonId === "ok") {
		                                        	
		                                        }
		                                    }
									});
									panelStore.reload();
								}
							});
							
	                    }
	                }
			});
			
		}
		
		// panelStore.on('load', function(store, records, successful, eOpts) {
		// alert(successful);
		// });
	},
	initComponent : function(a, b, c, d) {
		this.text = '删除';
		this.callParent(arguments);
	}
});