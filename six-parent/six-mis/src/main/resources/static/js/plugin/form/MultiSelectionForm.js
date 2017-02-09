Ext.define('Plugin.form.MultiSelectionForm', {
	extend : 'Ext.container.Container',
	alias : 'widget.ExtPluginMultiSelectionForm',
	requires : [ 'Ext.form.field.Text'],
	defaultType : 'textfield',
	layout : 'hbox',
	initComponent : function(a, b, c, d) {
		var me = this;
		Ext.apply(me,{
			hiddenFields : me.hiddenFields,
			textField : me.textField,
			textFeildName : me.textFeildName,
			windowTitle : me.windowTitle,
			windowWidth : me.windowWidth,
			grid : me.grid
		});
		var hiddenButton = Ext.isEmpty(me.hiddenButton) ? false : true;
		var _items = [];
		if(Ext.isArray(me.hiddenFields)){
			for(var i=0;i<me.hiddenFields.length;i++){
				var _hiddenFieldName = Ext.isObject(me.hiddenFields[i])?me.hiddenFields[i].fieldName:me.hiddenFields[i];
				var _hiddenFieldDefaultValue = Ext.isEmpty(me.hiddenFieldsDefaultValues)?"":me.hiddenFieldsDefaultValues[i];
				_items.push({
					name : _hiddenFieldName,
					fieldLabel : _hiddenFieldName,
					itemId : _hiddenFieldName,
					value : _hiddenFieldDefaultValue,
					hidden : true
				});
			}
		}else{
			_items.push({
				name : me.hiddenFields,
				fieldLabel : me.hiddenFields,
				itemId : me.hiddenFields,
				value : Ext.isEmpty(me.hiddenFieldsDefaultValues)?"":me.hiddenFieldsDefaultValues,
				hidden : true
			});
		}
		var _textFieldName = Ext.isObject(me.textField)?me.textField.fieldName:me.textField;
		var _textFieldDefaultValue = Ext.isEmpty(me.textFieldDefaultValue)?"":me.textFieldDefaultValue;
		var textConfig = {};
		if(me.textFieldConfig)
			textConfig = me.textFieldConfig;
		textConfig = Ext.apply(textConfig,{
			name : _textFieldName,
			fieldLabel : me.textFeildName,
			itemId : _textFieldName,
			value : _textFieldDefaultValue,
			readOnly : true,
			listeners : {
				"focus" : function(button, e, eOpts) {
					this.ownerCt.getComponent("selectButton").fireEvent("click");
				}
			}
		});	
		_items.push(textConfig);
		_items.push({
			xtype : 'button',
			text : '选择',
			hidden : hiddenButton,
			itemId : 'selectButton',
			listeners : {
				"click" : function() {
					var selectValid = me.selectValid();
					if(!selectValid){
						return false; 
					}
					var idParams = me.getIdParams();
					var gridParams = me.getGridParams();
					var mainWin = Ext.create("Ext.window.Window", {
								modal : true,
								autoScroll : true,
								border : false,
								floating : true,
								title : me.windowTitle,
								width : me.windowWidth | 600,
								height : 450,
								anchor : '100%',
								layout : 'card',
								items : [{
									xtype : me.grid,
									idParams : idParams,
									gridParams : gridParams,
//									editRows : function(selModel, selected, callback){
//										me.onSelected(selected,mainWin);
//									}
								}],
								buttons : [{
									text : '确定',
									handler : function(){
										var selection = mainWin.items.get(0).down("grid").getSelectionModel().getSelection();
										if(selection.length<=0){
											Ext.MessageBox.show({
												title : '警告',
												msg : '请至少选择一条记录!',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.WARNING
											});
											return false;
										}
										me.onSelected(selection,mainWin);
									}
								}]
							});
					mainWin.show();
				}
			}
		});
		Ext.apply(this,{
			items : _items
		});
		this.callParent(arguments);
	},
	getIdParams : function(){
		var me = this;
		var idParams = {};
		if(me.idParams){
			idParams = me.idParams;
		}else if(me.storeParams){
			var _fieldValue = me.getOwnerContainer().getComponent(me.parentContainer).getComponent(me.storeParams.fieldName).getValue();
			if(_fieldValue=="")
				_fieldValue = '-1';
			idParams[me.storeParams.paramName] = _fieldValue;
		}else if(me.getStoreParams && Ext.isFunction(me.getStoreParams)){
			idParams = Ext.callback(me.getStoreParams,me,[me]);
		}
		return idParams;
	},
	getGridParams : function(){
		var me = this;
		var gridParams = {};
		if(me.gridParams){
			gridParams = me.gridParams;
		}
		return gridParams;
	},
	getOwnerContainer : function(){
		var me = this;
		return me.ownerCt;
	},
	selectValid : function(){
		var me = this;
		if(me.selectValidFun && Ext.isFunction(me.selectValidFun)){
			return Ext.callback(me.selectValidFun,me,[me]);
		}else{
			return true;
		}
	},
	onSelected : function(selection,mainWin){
		var me = this;
		if(Ext.isArray(me.hiddenFields)){
			for(var i=0;i<me.hiddenFields.length;i++){
				if(Ext.isObject(me.hiddenFields[i]))
					me.getComponent(me.hiddenFields[i].fieldName).setValue(me.getSelectionValue(selection,me.hiddenFields[i].storeName));
				else
					me.getComponent(me.hiddenFields[i]).setValue(me.getSelectionValue(selection,me.hiddenFields[i]));
			}
		}else{
			me.getComponent(me.hiddenFields).setValue(me.getSelectionValue(selection,me.hiddenFields));
		}
		if(Ext.isObject(me.textField))
			me.getComponent(me.textField.fieldName).setValue(me.getSelectionValue(selection,me.textField.storeName));
		else
			me.getComponent(me.textField).setValue(me.getSelectionValue(selection,me.textField));
		if(me.selectedCallBack)
			Ext.callback(me.selectedCallBack,me,[selection]);
		mainWin.close();
	},

	getSelectionValue : function(selection, fieldName) {
		var value = "";
		for (var i = 0; i < selection.length; i++) {
			value = value + selection[i].get(fieldName) + ",";
		}
		return value.substring(0,value.length-1);
	}
});