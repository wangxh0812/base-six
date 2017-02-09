Ext.define('FMS.basic.model.Department', {
    extend: 'Ext.data.Model',
    fields: [{name:'id',mapping:'id'}, 'departId','departCode','departName','managerAgent','telphone','isvalid','companyId','parentDepart','parentDepartName','createDate','updateDate']
});