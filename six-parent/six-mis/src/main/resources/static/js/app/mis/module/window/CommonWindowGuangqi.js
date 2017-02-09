Ext.define('FMS.app.mis.module.window.CommonWindowGuangqi', {
	extend : 'Ext.window.Window',
	alias : 'widget.FMSAppMisModulewindowCommonWindowGuangqi',
	requires : ['FMS.app.mis.module.form.CommonForm'],
    width: 900,
    maxHeight : 450,
    modal : true,
    layout : 'form',
    bodyPadding: 5,
	defaults : {
		border : 0
	},
	autoScroll : true,
	initComponent : function(a, b, c, d) {
		this.addEvents('createTabs');
		this.addEvents('closeWindow');
		var me = this;
		me._baseClientForm = Ext.create("Ext.panel.Panel",{
			border : 0
		});
		me._tabClientForm = Ext.create('Ext.tab.Panel', {
			activeTab : 0,
			itemId : 'tabPanel',
			items : this._items || [],
			listeners : {
				tabchange : function(tabPanel,newCard,oldCard,eOpts){
					if(me.onTabActivate)
						Ext.callback(me.onTabActivate,me,[newCard,newCard.child().formItemId]);
				}
			}
		});
		var _items = [me._baseClientForm,me._tabClientForm];
		/*if(!me.hiddenTabPanel)
			_items.push(me._tabClientForm);*/
		me.items = _items;
		if(!me.hiddenButtons){
			me.buttons = me.getButtons();
		}else{
			me.buttons = me.getCloseButtons();
		}
		this.callParent(arguments);
	},
	/*showTabPanel : function(){
		var me = this;
		if(me.items.length<=1)
			me.add(me._tabClientForm);
	},*/
	getButtons : function(){
		var me = this;
		return [{
			text : '暂存',
			scope : this,
			iconCls : 'icon-accept',
			handler : function() {
				if(me.onSave)
					Ext.callback(me.onSave);
				else {
					me.idParams.presave = 1;
					me.windowOnSave(me.idName);
				}
			}
		},{
			text : '保存',
			scope : this,
			iconCls : 'icon-accept',
			handler : function() {
				if(me.onSave)
					Ext.callback(me.onSave);
				else {
					me.idParams.presave = 2;
					me.windowOnSave(me.idName);
				}
			}
		},{
			text : '关闭',
			handler : function(){
				me.close();
			}
		}];
	},
	getCloseButtons : function(){
		var me = this;
		return [{
			text : '关闭',
			handler : function(){
				me.close();
			}
		}];
	},
	addBaseClientForm : function(obj){
		this._baseClientForm.add(this.createCommonForm(obj));
	},
	//为Tab添加一个Panel
	addTabClientPanel : function(grid){
		this._tabClientForm.add(grid);
	},
	addTabClientForm : function(obj){
		this._tabClientForm.add({
			title: obj.tabTitle,
			bodyPadding: 5,
	        autoScroll : true,
	        items : [this.createCommonForm(obj)]
		});
	},
	createCommonForm : function(obj){
		return Ext.create("FMS.app.mis.module.form.CommonForm",obj);
	},
	//加载并显示详细数据
	loadAndRenderDetailInfo : function(idParams,win){
		var me = this;
		this.loadDetailInfo(
			Ext.apply(me.getLoadDetailInfoArray.call(this).baseForm,{
				clientWindow : win,
				idParams : idParams
			})
		);
		for(var i=0;i<me.getLoadDetailInfoArray.call(this).tabForm.length;i++){
			this.loadDetailInfo(
				Ext.apply(me.getLoadDetailInfoArray.call(this).tabForm[i],{
					clientWindow : win,
					idParams : idParams
				})
			);
		}
	},
	loadDetailInfo : function(obj){
		var _currentForm = obj.clientWindow.down("panel[itemId="+obj.formItemId+"]");
		Ext.Ajax.request({
            url: obj.url,
            params : obj.idParams,
            method: 'GET',
            //async:'false',
            success: function (response, options) {
            	var resultJSON = Ext.JSON.decode(response.responseText);
            	_currentForm.getForm().setValues(resultJSON);
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
	},
	/*****************弹出窗口保存功能**************************************/
	//保存窗口
	windowOnSave : function(idName){
		var me = this;
		var baseformItem = me.getLoadDetailInfoArray.call(this).baseForm.formItemId;
		var baseform = me.down('panel[itemId='+baseformItem+']');
		if(me._tabClientForm.items.length <= 0){
			me.saveFormSet(baseform,function(_win,_idParams){
				_win = this.loadTabPanelAndSetValue(_win,_idParams);
	            _win.center();  
			},me,idName);
		}else{
			var saveBaseForm = me.saveFormSet(baseform,false,me,idName);
			if(!saveBaseForm)
				return false;
			
			for(var i=0;i<me.getLoadDetailInfoArray.call(this).tabForm.length;i++){
				var tItemId = me.getLoadDetailInfoArray.call(this).tabForm[i].formItemId;
				var tForm = me.down('panel[itemId='+tItemId+']');
				if (!tForm.getForm().isValid()) {
		    		Ext.MessageBox.show({
						title : '警告',
						msg : "请根据提示正确输入相关信息!",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
					return false;
		    	}
		    	me.saveFormSet(tForm,false,me,idName);
			}
			me.fireEvent("closeWindow",me);
		}
	},
	//private
	//保存客户基本资料信息并根据参数决定是否显示客户详细资料面板
	saveFormSet : function(formPanel,callbackFun,_win,idName){
		var me = this;
		if (!formPanel.getForm().isValid()) {
			Ext.MessageBox.show({
				title : '警告',
				msg : "请根据提示正确输入相关信息!",
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
    		return false;
    	}
		
    	formPanel.getForm().submit({
    		params : formPanel.submitParams,
    		submitEmptyText: false,
    		success: function(form, action) {
    			var resultData = action.result.data;
    			if(callbackFun){
    				var _idParams = {};
    				_idParams[idName] = resultData[0][idName];
    				Ext.callback(callbackFun,me,[_win,_idParams]);
    				//me.loadTabPanelAndSetValue(_win,_idParams);
    			}
    		},
    		failure: function(form, action) {
    			var msg = '操作失败!';
    			if(!Ext.isEmpty(action.result.msg))
    				msg = action.result.msg;
    			Ext.MessageBox.show({
					title : '错误',
					msg : msg,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
    		}
    	});
    	return true;
	},
	loadTabPanelAndSetValue : function(_win,idParams){
		var me = this;
		me.fireEvent("createTabs",_win,{
		 	idParams : idParams
		});
		//me.showTabPanel();
		me.loadDetailInfo(
			Ext.apply(me.getLoadDetailInfoArray.call(this).baseForm,{
				clientWindow : _win,
				idParams : idParams
			})
		);
		return _win;
	}
});