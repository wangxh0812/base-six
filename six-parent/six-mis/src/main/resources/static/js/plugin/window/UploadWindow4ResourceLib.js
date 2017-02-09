Ext.define('Plugin.window.UploadWindow4ResourceLib', {
	extend : 'Ext.window.Window',
	alias : 'widget.ExtPluginUploadWindow4ResourceLib',
	requires : ['Ext.form.field.File','Plugin.form.combobox.Module','FMS.app.select.module.CompanyModule'],
	modal : true,
	autoShow : true,
	border : false,
	floating : true,
	width : 650,
	anchor : '100%',
	layout : 'form', 
	initComponent : function() {
		var me = this;
		var hiddenType = me.hiddenType | false;
		var _form = Ext.create("Ext.form.Panel",{
			url : me.formUrl||'',
			border : false,
			defaults : { 
				anchor : '95%', 
				allowBlank : false, 
				msgTarget : 'side' 
			},
			layout : 'form',
			items : [ {
				xtype : 'ExtPluginFormCombobox',
				fieldLabel :  me.fieldTitle,
				hidden : hiddenType,
				disabled : hiddenType,
				itemId : 'type',
				name : 'type',
				tCode : me.tCode,
				forceSelection : true,
                typeAhead :false,
                editable : false,
                allowBlank : false,
				width : 100
			}, /*{
            	fieldLabel:'companyId',
                hidden : true,
                itemId : 'companyId',
                name: 'companyId'
            }, */{
				xtype : 'ExtPluginSelectionForm',
				grid : "FMSappselectmoduleCompanyModule",
				hiddenFields : ['companyId'],
				textField : {
					fieldName : "companyCnname",
					storeName : 'companyCnname'
				},
				itemId : 'companyId',
				textFeildName : "经销商",
				windowTitle : '选择经销商',
				margins: '0 0 5 0',
				selectedCallBack : function(record){
 					var companyId = this.getComponent("companyId");
 					companyId.setValue(record.get("companyId"));
 				},
				windowWidth : 800
	    	}, {
				xtype: 'filefield',
	            emptyText: me.emptyText,
	            fieldLabel: me.title,
	            editable : false,
	            name: 'uploadFile',
	            buttonText: '',
	            buttonConfig: {
	                iconCls: 'icon-add'
	            },
					supportMultFn : function($this) {
							// 2.1 为input添加支持多文件选择属性
							/*var typeArray = [ "application/x-shockwave-flash",
									"audio/MP3", "image/*",
									"flv-application/octet-stream" ];*/
							var fileDom = $this.getEl().down('input[type=file]');
							fileDom.dom.setAttribute("multiple", "multiple");
							// fileDom.dom.setAttribute("accept",typeArray.join(","));
						},
						listeners : {
							afterrender : function() {
								// 2.2 渲染后重写
								this.supportMultFn(this);
							},
							change : function() {
								/*
								 * //2.3 获取文件列表 var fileDom =
								 * this.getEl().down('input[type=file]'); var
								 * files = fileDom.dom.files; var fileArr = [];
								 * for(var i = 0; i<files.length; i++){
								 * fileArr.push((i+1)+"、文件名："+files[i].name+",类型:"+files[i].type+",大小:"+files[i].size/1024+"KB"); }
								 */

								// alert(fileArr.join("\n\n"));
								// files[0].name / files[0].type / files[0].size
								// 2.4 选择完后input会还原，所以还需要再次重写
								this.supportMultFn(this);
							}
						}
			}],
			buttons : [{
				text : '上传',
				handler : function(){
					if(!_form.getForm().isValid()){
						Ext.MessageBox.show({
                            title: "警告",
                            msg: "请根据提示正确输入内容!",
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.OK
						});
						return false;
					}
					if(me.onUploadFile)
						Ext.callback(me.onUploadFile,_form,[_form]);
				}
			}]
		});
		me.items = [_form];
		this.callParent(arguments);
	}
});