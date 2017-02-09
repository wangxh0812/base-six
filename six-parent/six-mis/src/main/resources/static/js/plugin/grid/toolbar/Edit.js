/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.grid.toolbar.Edit', {
	extend : 'Ext.button.Button',
	alias : 'widget.ExtPluginGridEdit',
	iconCls : 'icon-edit',
	defaultType : 'button',
	scale : 'small',
	requires : [ 'Plugin.window.Window' ],
	disabled : true,
	handler : function(a, b, c) {
		if (this.customParameter.addHandler) {
			var flag = this.customParameter.addHandler.call(this);
			if (!flag)
				return flag;
		}
		var grid = this.up('grid');
		var _store = this.store;
		var selection = grid.getSelectionModel().getSelection();
		if (selection.length > 1 || selection.length <= 0) {
			Ext.MessageBox.show({
				title : 'Error',
				msg : '只允许编辑一条数据',
				icon : Ext.MessageBox.INFO
			});
			return false;
		}
		var view = Ext.widget('ExtPluginWindow', {
			customParameter : this.customParameter,
			windowParameter : this.windowParameter,
			grid : grid,
			selection : selection,
			listeners : {
				update : function(form) {
					_store.sync({
						success : function(batch,options){
							Ext.messagebox.msg('成功', '保存成功!');
							form.getForm().reset();
							form.up("window").close();
							//_store.reload();
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
							form.getForm().reset();
							form.up("window").close();
						//	_store.reload();
						}
					});
					
				}
			},
			title : '修改'
		});
		// view;
	},
	initComponent : function(a, b, c, d) {
		this.text = '修改';
		this.callParent(arguments);
	}
});