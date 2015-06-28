var express = require('express');
var router = express.Router();

var quizControl = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SuperQUIZ' });
});

router.get('/quizes/question',quizControl.question);
router.get('/quizes/answer',quizControl.answer);
router.get('/author',function(req,res){
	res.render('author');
});

module.exports = router;
