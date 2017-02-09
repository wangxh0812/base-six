/**
 * kinjoYang 2014-03
 */
Ext.define('FMS.basic.kframe.view.menu.Tree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.menuTreeWidget',
    store:'FMS.basic.kframe.store.tree.Trees',
    useArrows: true,
    rootVisible: false
});