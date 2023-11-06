const db = require("../models");
const Tweet = db.tweets;

exports.findAll = (req, res) => {
    const title = req.query.title, author = req.query.author, content = req.query.content, likes = req.query.likes;
    const condition = title ? {
        title: {
            $regex: new RegExp(title),
            $options: "i"
        }
    } : author ? {
        author: {
            $regex: new RegExp(author),
            $options: "i"
        }
    } : content ? {
        content: {
            $regex: new RegExp(content),
            $options: "i"
        }
    } : likes ? {
        likes: {
            $regex: new RegExp(likes),
            $options: "i"
        }
    } : {};

    Tweet.find(condition)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tweets."
            });
        });
}

exports.createTweet = (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.author) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const tweet = new Tweet({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        likes: 0
    });

    Tweet
        .save(tweet)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tweet."
            });
        });
};
