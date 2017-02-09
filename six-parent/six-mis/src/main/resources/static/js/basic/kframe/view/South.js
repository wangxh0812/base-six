/**
 * kinjoYang 2014-03
 */
//底部面板
Ext.define('FMS.basic.kframe.view.South',{
    extend: 'Ext.panel.Panel',
    initComponent : function(){
        Ext.applyIf(this, {
			region : 'south',
			contentEl : 'main_south',
			height : 30
		});
        this.callParent(arguments);
    }
});
