var express = require('express');
var router = express.Router();

var quizControl = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SuperQUIZ',errors: []});
});

router.param('quizId',quizControl.load);

router.get('/quizes/',quizControl.index);
router.get('/quizes/:quizId(\\d+)',quizControl.show);
router.get('/quizes/:quizId(\\d+)/answer',quizControl.answer);
router.get('/quizes/new',quizControl.new);
router.post('/quizes/create',quizControl.create);
router.get('/quizes/:quizId(\\d+)/edit', quizControl.edit);
router.put('/quizes/:quizId(\\d+)', quizControl.update);
router.delete('/quizes/:quizId(\\d+)',quizControl.destroy);
router.get('/author',function(req,res){
	res.render('author');
});
router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.get('/quizes/:quizId(\\d+)/comments',commentController.create);

module.exports = router;
