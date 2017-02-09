Ext.define('FMS.app.question.module.Subject', {
			extend : 'Plugin.grid.Show',
			alias : 'widget.FMSappquestionmoduleSubject',
			requires : ['FMS.app.question.store.Subject','Plugin.ux.IFrame',
					'Plugin.form.combobox.Module','Plugin.form.SelectionForm'],
			initComponent : function() {
				var _store = Ext.create('FMS.app.question.store.Subject');
				if(!Ext.isEmpty(this.idParams)){
					Ext.apply(_store.proxy.extraParams, this.idParams);
				}
				Ext.apply(this, {
							store : _store,
							gridDockedItems : this.getGridDockedItems(),
							gridColumns : this.getGridColumns()
						});
				this.callParent(arguments);
			},

			getGridColumns : function() {
				return [{
							text : '题目',
							dataIndex : 'question',
							width : 250
						}, {
							text : 'A',
							dataIndex : 'answerA',
							width : 100
						}, {
							text : 'B',
							dataIndex : 'answerB',
							width : 100
						}, {
							text : 'C',
							dataIndex : 'answerC',
							width : 100
						}, {
							text : 'D',
							dataIndex : 'answerD',
							width : 100
						}, {
							text : 'E',
							dataIndex : 'answerE',
							width : 100
						}, {
							text : '正确答案',
							dataIndex : 'correct',
							width : 100
						}];
			},

			// 按钮栏
			getGridDockedItems : function() {
				var me = this;
				var field1 = new Ext.form.Field();
				var field2 = new Ext.form.Field();
				var field3 = new Ext.form.Field();
				return [{
							xtype : 'toolbar',
							dock : 'top',
							items : [{
										xtype : 'ExtPluginGridAdd',
										customParameter : {
											items : me.getWindowColumns()
										}
									}, {
										xtype : 'ExtPluginGridEdit',
										customParameter : {
											items : me.getWindowColumns()
										}
									}, {
										xtype : 'ExtPluginGridDel'
									},{
										xtype : 'button',
										text : '导出',
										iconCls : 'icon-add'
									}]
								} ];
			},
			getWindowColumns : function() {
				return [{
							fieldLabel : '逻辑ID',
							name : 'pointGoodsId',
							hidden : true
						}, 			
						{
							fieldLabel : '题目',
							name : 'question',
							emptyText : '题目',
							maxLength : 150,
							allowBlank : false
						}, {
							fieldLabel : 'A',
							name : 'answerA',
							maxLength : 100
						}, {
							fieldLabel : 'B',
							name : 'answerB',
							maxLength : 100
						}, {
							fieldLabel : 'C',
							name : 'answerC',
							maxLength : 100
						}, {
							fieldLabel : 'D',
							name : 'answerD',
							maxLength : 100
						}, {
							fieldLabel : 'E',
							name : 'answerE',
							maxLength : 100
						}, {
							fieldLabel : '正确答案',
							name : 'correct',
							emptyText : '正确答案',
							maxLength : 50
						}];
			}
		});