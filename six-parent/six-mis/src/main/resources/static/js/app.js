/**
 * 初始化整体配置
 * kinjoYang 2014-03
 */
// 动态加载
Ext.Loader.setConfig({
	enabled : true
});
Ext.Loader.setPath({
	'FMS.app' : StaticSetting.absUrl + '/js/app',
	'FMS.basic' : StaticSetting.absUrl + '/js/basic'
});
Ext.application({
	name : 'FMS',// finance manager system
	appFolder : StaticSetting.absUrl + "/js",
	paths: {
        'Plugin': StaticSetting.absUrl+'/js/plugin'
    },
	controllers : [ 'FMS.basic.kframe.controller.Menu','FMS.basic.kframe.controller.tree.Tree'],
    requires:['FMS.basic.kframe.statics.Stores'],
	autoCreateViewport : true
});
//为form表单中必填项添加红色*号标志 
Ext.override(Ext.form.field.Base, {
	// 针对form中的基本组件
	initComponent : function() {
		if (this.allowBlank !== undefined && !this.allowBlank) {
			if (this.fieldLabel) {
				this.fieldLabel = "<font color='red'>*</font>" + this.fieldLabel;
			}
		}
		this.callParent(arguments);
	}
});
Ext.override(Ext.container.Container, {
	// 针对form中的容器组件
	initComponent : function() {
		if (this.allowBlank !== undefined && !this.allowBlank) {
			if (this.fieldLabel) {
				this.fieldLabel = "<font color='red'>*</font>" + this.fieldLabel;
			}
		}
		this.callParent(arguments);
	}
});
Ext.Loader.setPath('MyApp.ux', StaticSetting.absUrl + '/js/framework');
Ext.define('MyApp.ux.DateTimeField', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.datetimefield',
    requires: ['MyApp.ux.DateTimePicker'],
    initComponent: function() {
        this.format = this.format;
        this.callParent();
    },
    // overwrite
    createPicker: function() {
        var me = this,
            format = Ext.String.format;
        return Ext.create('MyApp.ux.DateTimePicker', {
              ownerCt: me.ownerCt,
              renderTo: document.body,
              floating: true,
              hidden: true,
              focusOnShow: true,
              minDate: me.minValue,
              maxDate: me.maxValue,
              disabledDatesRE: me.disabledDatesRE,
              disabledDatesText: me.disabledDatesText,
              disabledDays: me.disabledDays,
              disabledDaysText: me.disabledDaysText,
              format: me.format,
              showToday: me.showToday,
              startDay: me.startDay,
              minText: format(me.minText, me.formatDate(me.minValue)),
              maxText: format(me.maxText, me.formatDate(me.maxValue)),
              listeners: {
                  scope: me,
                  select: me.onSelect
              },
              keyNavConfig: {
                  esc: function() {
                      me.collapse();
                  }
              }
          });
    }
});