var express = require('express');
var router = express.Router();

var quizControl = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SuperQUIZ' });
});

router.param('quizId',quizControl.load);

router.get('/quizes/',quizControl.index);
router.get('/quizes/:quizId(\\d+)',quizControl.show);
router.get('/quizes/:quizId(\\d+)/answer',quizControl.answer);
router.get('/author',function(req,res){
	res.render('author');
});

module.exports = router;
