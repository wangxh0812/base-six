/**
 * kinjoYang 2014-03
 */
//总体布局
Ext.define('FMS.view.Viewport', {
	extend : 'Ext.Viewport',
	layout : 'fit',
	hideBorders : true,
	requires : [ 'FMS.basic.kframe.view.MainPanel' ],
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			items : [ {
				id : 'mainPanel',
				layout : 'fit',
				items : [this.getItems()]
			} ]
		});
		me.callParent(arguments);
	},
	
	getItems:function(){
		var xwl=this.getParameter("xwl");
		//首页
		if(xwl==null){
			items={
			    id:"moduleTab",
				region:"center",
				deferredRender:false,
				xtype:"tabpanel",
				bodyStyle:"background-color:#FFF;background-image:none",
				items:[{
						xtype : 'panel',
						id : 'HomePage',
						title : '首页',
						iconCls : 'icon-apphome',
						items :[Ext.create("FMS.app.HomePage")]
					}]
			}
			return items;
		}
		return Ext.create('FMS.basic.kframe.view.MainPanel');
	},
	
	getParameter:function (name) {
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	  var r = window.location.search.substr(1).match(reg);
	  if (r != null)
	     return unescape(r[2]);
	     return null;
	}
		
});
