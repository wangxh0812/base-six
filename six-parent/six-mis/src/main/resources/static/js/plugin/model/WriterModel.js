Ext.define('Plugin.model.WriterModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
       mapping:'id'
    }, 'customerId', 'customerName', 'customerMobile'],
    validations: [{
        type: 'length',
        field: 'customerId',
        min: 1
    }, {
        type: 'length',
        field: 'customerName',
        min: 1
    }, {
        type: 'length',
        field: 'customerMobile',
        min: 1
    }]
});