/**
 * kinjoYang 2014-03
 */
//菜单面板
Ext.define('FMS.basic.kframe.view.Menu', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.menuWidget',
	id : 'SystemMenu',
	title : '系统菜单',
	width : 300,
	region : 'west',
	// iconCls : 'icon-menu',
	// margins : '0 0 -1 1',
	layout : 'accordion',
	//iconCls : 'icon-menu',
	border : true,
	enableDD : false,
	split : true,
	// minSize : 130,
	// maxSize : 400,
	rootVisible : false,
	containerScroll : true,
	collapsible : true,
	autoScroll : false
});
