Ext.define('FMS.app.question.model.Subject',{
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		mapping : 'id'
	}, 'subjectId',
    'question',
    'answerA',
    'answerB',
    'answerC',
    'answerD',
    'answerE',
    'correct',
    'isvalid'
    ]
});