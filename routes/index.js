var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Unit = require('../models/unit.js');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	router.get('/createunit', isAuthenticated, function(req, res){
		res.render('createunit');
	});

	router.post('/createunit', function(req, res){
		var m_unit = new Unit({
			name: req.body.name,
			content: req.body.content,
			week: req.body.week,
			answer: req.body.answer,
			answer1 : req.body.answer1,
			answer2 : req.body.answer2,
			answer3 : req.body.answer3,
			answer4 : req.body.answer4
		});
		m_unit.save(function (err) {
			if(err){
				throw(err);
			}
		})
		res.redirect('/allunit');
	});

	router.get('/allunit', function(req, res){
		Unit.find({}, function (err, unit) {
			res.json(unit);
		});
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}




