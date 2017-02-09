Ext.define('FMS.app.question.model.UserQuestion',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'userQuestionId',
    'userId',
    'questionId',
    'questionName',
    'answer',
    'userName'
    ]
});