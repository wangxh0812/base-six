Ext.define('Plugin.form.cascadeCombobox.Store', {
    extend: 'Ext.data.Store',
    model: 'Plugin.form.cascadeCombobox.Model',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        actionMethods: {read: 'GET' },
        url: StaticSetting.absUrl+'/common/getArea',
        reader: {
            type:'json',
            root:'data',
            successProperty:'success'
        }
    }
});