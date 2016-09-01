var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    content: String,
    week: Number,
    answer: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String
});

function createunit(n, c, w, a, a1, a2, a3, a4 ) {
    this.name= n;
    this.content= c;
    this.week= w;
    this.answer= a;
    this.answer1= a1;
    this.answer2= a2;
    this.answer3= a3;
    this.answer4= a4;
};

module.exports = mongoose.model('Unit',schema);

