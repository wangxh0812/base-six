Ext.define('FMS.app.image.model.Image', {
	extend: 'Ext.data.Model',
    fields: [{name:'id',mapping:'id'}, 
              'imageId',
              'businessId',
              'imageName',
              'fileType',
              'imageType',
              'imageTypeName',
              'suffix',
              'imgPath',
              'urlFullPath',
              'isvalid',
              'businessType'
             ]
});
