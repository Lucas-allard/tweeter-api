const tweets = require('../controllers/tweet.controller.js');

module.exports = (app) => {
    const router = require('express').Router();
    router.post('/', tweets.createTweet);
    router.get('/', tweets.findAll);
    // router.get('/:id', tweets.findOne);
    // router.put('/:id', tweets.updateTodo);
    // router.delete('/:id', tweets.deleteTodo);

    app.use('/api/tweets', router);
}