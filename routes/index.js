var express = require('express');
var router = express.Router();

var quizControl = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SuperQUIZ',errors: []});
});

router.param('quizId',quizControl.load);
router.param('commentId',commentController.load);

router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout',sessionController.destroy);

router.get('/quizes/',quizControl.index);
router.get('/quizes/:quizId(\\d+)',quizControl.show);
router.get('/quizes/:quizId(\\d+)/answer',quizControl.answer);
router.get('/quizes/new',sessionController.loginRequired, quizControl.new);
router.post('/quizes/create',sessionController.loginRequired, quizControl.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired, quizControl.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizControl.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizControl.destroy);
router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.loginRequired, commentController.publish);
router.get('/author',function(req,res){
	res.render('author',{errors: []});
});


module.exports = router;
