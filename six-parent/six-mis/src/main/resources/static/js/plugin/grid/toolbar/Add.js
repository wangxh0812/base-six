/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.grid.toolbar.Add', {
	extend : 'Ext.button.Button',
	alias : 'widget.ExtPluginGridAdd',
	iconCls : 'icon-add',
	defaultType : 'button',
	scale : 'small',
	requires : [ 'Plugin.window.Window' ],
	handler : function(a, b, c) {
		if (this.customParameter.addHandler) {
			var flag = this.customParameter.addHandler.call(this);
			if (!flag)
				return flag;
		}
		var _store = this.store;
		var grid = this.grid;
		// var view = Ext.widget('ExtPluginWindow', {
		Ext.widget('ExtPluginWindow', {
			customParameter : this.customParameter,
			windowParameter : this.windowParameter,
			grid : grid,
			listeners : {
				create : function(form, data) {
					_store.insert(0, data);
					_store.sync({
						success : function(batch,options){
							Ext.messagebox.msg('成功', '新增保存成功!');
							form.getForm().reset();
							form.up("window").close();
							_store.reload();
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
							_store.reload();
						}
					});
					
				}
			},
			title : '数据新增'
		});
		//_store.reload();
		// view.down('form').loadRecord();
	},
	initComponent : function(a, b, c, d) {
		this.text = '新增';
		this.callParent(arguments);
	}
});