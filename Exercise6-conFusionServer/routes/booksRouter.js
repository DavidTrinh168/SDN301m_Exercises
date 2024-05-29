const express = require('express');
const bodyParser = require('body-parser');

const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the books to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the books: ' + req.body.title + ' with details:\n' +
            'ISBN: ' + (req.body.isbn || "N/A") + '\n' +
            'Title: ' + (req.body.title || "N/A") + '\n' +
            'SubTitle: ' + (req.body.subTitle || "N/A") + '\n' +
            'Publish date: ' + (req.body.publish_date || "N/A") + '\n' +
            'Publisher: ' + (req.body.publisher || "N/A") + '\n' +
            'Pages: ' + (req.body.pages || 0) + '\n' +
            'Description: ' + (req.body.description || "N/A") + '\n' +
            'Website: ' + (req.body.website || "N/A")
        );
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /book');
    })
    .delete((req, res, next) => {
        res.end('Deleting all books');
    });

bookRouter.route('/:booksId')
    .get((req, res, next) => {
        res.end('Will send details of the book: ' + req.params.booksId + ' to you!');
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /book/' + req.params.booksId);
    })

    .put((req, res, next) => {
        res.write('Updating the book: ' + req.params.booksId + '\n');
        res.end('Will update the books: ' + req.body.title + ' with details:\n' +
            'ISBN: ' + (req.body.isbn || "N/A") + '\n' +
            'Title: ' + (req.body.title || "N/A") + '\n' +
            'SubTitle: ' + (req.body.subTitle || "N/A") + '\n' +
            'Publish date: ' + (req.body.publish_date || "N/A") + '\n' +
            'Publisher: ' + (req.body.publisher || "N/A") + '\n' +
            'Pages: ' + (req.body.pages || 0) + '\n' +
            'Description: ' + (req.body.description || "N/A") + '\n' +
            'Website: ' + (req.body.website || "N/A")
        );
    })

    .delete((req, res, next) => {
        res.end('Deleting dish: ' + req.params.booksId);
    });

module.exports = bookRouter;