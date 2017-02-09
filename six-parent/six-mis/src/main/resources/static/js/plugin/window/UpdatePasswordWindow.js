Ext.define('Plugin.window.UpdatePasswordWindow', {
			extend : 'Ext.window.Window',
			alias : 'widget.ExtPluginUpdatePasswordWindow',
			modal : true,
			autoShow : true,
			border : false,
			floating : true,
			width : 400,
			anchor : '100%',
			layout : 'form',
			initComponent : function() {
				var me = this;
				me.title = me.title || '修改密码', me.mainForm = Ext.create(
						"Ext.form.Panel", {
							layout : 'form',
							defaultType : 'textfield',
							items : [{
										fieldLabel : '原密码',
										name : 'oldPass',
										allowBlank : false,
										inputType : 'password'
									}, {
										fieldLabel : '新密码',
										name : 'password',
										allowBlank : false,
										inputType : 'password'
									}, {
										fieldLabel : '确认密码',
										allowBlank : false,
										name : 'confirmPassword',
										inputType : 'password'
									}]
						});
				me.items = [me.mainForm];
				me.buttons = [{
					text : '确定',
					handler : function() {
						var oldPassValue = me.mainForm.getForm()
								.findField("oldPass").getValue();
						var newPassword = me.mainForm.getForm()
								.findField("password").getValue();
						var confirmPassword = me.mainForm.getForm()
								.findField("confirmPassword").getValue();
						if (newPassword != confirmPassword) {
							Ext.MessageBox.show({
										title : '错误',
										msg : "请保证两次密码输入一致!",
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
							me.mainForm.getForm().reset();
							return;
						}
						Ext.Ajax.request({
									url : me.url,
									params : {
										oldPass : oldPassValue,
										password : newPassword
									},
									method : 'GET',
									success : function(response, options) {

										var resultObj = Ext.JSON
												.decode(response.responseText);
										if (resultObj.success)
											Ext.MessageBox.show({
														title : '成功',
														msg : "操作成功",
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
										else
											Ext.MessageBox.show({
														title : '错误',
														msg : resultObj.msg,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
										me.close();
									},
									failure : function(response, options) {
										Ext.MessageBox.show({
													title : '错误',
													msg : "连接服务器失败",
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
										me.close();
									}
								});

					}
				}, {
					text : '取消',
					handler : function() {
						me.close();
					}
				}]
				this.callParent(arguments);
			}
		});
