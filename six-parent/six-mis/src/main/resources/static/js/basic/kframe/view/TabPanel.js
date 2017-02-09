/**
 * kinjoYang 2014-03
 */
//tab显示窗口
Ext.define('FMS.basic.kframe.view.TabPanel', {
	extend : 'Ext.tab.Panel',
	requires: ["FMS.app.HomePage"
    ],
	initComponent : function() {
		Ext.apply(this, {
			id : 'content-panel',
			region : 'center',
			defaults : {
				autoScroll : true
				//bodyPadding : 5
			},
			activeTab : 0,
			//border : true,
			border:false,
			// plain: true,
			items : [ {
				xtype : 'panel',
				id : 'HomePage',
				title : '首页',
				iconCls : 'icon-apphome',
				items :[Ext.create("FMS.app.HomePage")]
			} ]
		});
		Ext.apply(this, {
			plugins : Ext.create('Plugin.tab.TabCloseMenu',{
				closeTabText: '关闭当前',  
                closeOthersTabsText: '关闭其他界面',  
                closeAllTabsText: '关闭所有'
			})
		});
		this.callParent(arguments);
	}
});
