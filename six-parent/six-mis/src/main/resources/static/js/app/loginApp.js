/**
 * 
 */

Ext.Loader.setConfig({
			enabled : true
		});
Ext.application({
			name : 'FMS',
			appFolder : 'js',
			requires : ['FMS.login']
		});

Ext.onReady(function() {
		Ext.create('FMS.login').show();
		Ext.create('Ext.util.KeyMap',{
					target:Ext.getCmp('form'),
					key:Ext.EventObject.ENTER,
					fn:enterLogin
				});
				
			// enter事件
				function enterLogin() {
					var form = Ext.getCmp('form');
					var key = window.event ? evt.keycode : evt.which;
					Ext.Msg.alert(evt.which);
					if (key == 13 && form.getValue('account') !== ''
							&& form.getValue('password') !== ''
							&& Ext.getCmp('CheckCode').getValue() !== '') {
						form.submit();
					} else if (key == 13 && form.getValue('account') !== ''
							&& Ext.getCmp('account').focus()) {
						Ext.getCmp('password').focus(true, true);
					} else if (key == 13 && form.findField('password') !== ''
							&&Ext.getCmp('password').focus()) {
						Ext.getCmp('CheckCode').focus(true, true);
					}
				}
				
		});