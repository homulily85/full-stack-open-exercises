require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.static('dist'));
app.use(express.json());

morgan.token('post-info', function(req) {
  if (req.method === 'POST') {
    return `${JSON.stringify(req.body)}`;
  } else {
    return '';
  }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-info', {
  skip: function(req) {
    return req.method !== 'POST';
  },
}));

app.use(morgan('tiny', {
  skip: function(req) {
    return req.method === 'POST';
  },
}));

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => res.json(result));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(p => {
    if (!p) {
      res.status(404).end();
    } else {
      res.json(p);
    }
  }).catch(error => next(error));

});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(p => {
    if (!p) {
      res.status(404).end();
    } else {
      res.json(p);
    }
  }).catch(e => next(e));
});

app.post('/api/persons', (req, res, next) => {
  new Person({name: req.body.name, number: req.body.number}).save().
    then(p => res.json(p)).
    catch(e => next(e));
});

app.put('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(p => {
    if (!p) {
      return res.status(404).end();
    } else {
      p.name = req.body.name;
      p.number = req.body.number;
      return p.save().then(p => res.json(p));
    }
  }).catch(e => next(e));
});

app.get('/info', (req, res) => {
  Person.find({}).then(result =>
    res.send(`<p>Phonebook has info for ${result.length} people</p> <p>${new Date()}</p>`));

});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).end();
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});