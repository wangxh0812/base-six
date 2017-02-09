/**
 * kinjoYang 2014-03
 */
Ext.define('Plugin.form.combobox.Store', {
    extend: 'Ext.data.Store',
    model: 'Plugin.form.combobox.Model',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        actionMethods: {read: 'GET' },
        url: StaticSetting.absUrl+'/common/getCombox',
        reader: {
            type:'json',
            root:'data',
            successProperty:'success'
        }
    }
});
