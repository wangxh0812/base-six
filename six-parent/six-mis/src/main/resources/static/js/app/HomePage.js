Ext.define("FMS.app.HomePage", {
	extend : 'Ext.container.Container',
	alias : 'widget.FMSappHomePage',
	requires : [],

	initComponent : function() {

		Ext.apply(this, {
			layout : {
				type : 'vbox',
				align : 'center'
			},
			padding : 5,
			anchor : '100%',
			items : [ {
				xtype : 'component', // 或者xtype: 'component',
				width : 1500, // 图片宽度
				height : 20, // 图片高度
				autoEl : {
					tag : 'a', // 指定为img标签
					href : '/download/download.html', // 指定url路径
					target: '_blank',
					html:'GAP系统操作音视频教程'
				}
			} ]
		});

		this.callParent(arguments);
	}

});