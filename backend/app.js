const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const v1Router = require('./routes/v1');

const app = express();
const mongoose = require('mongoose');
const config = require('config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/v1', v1Router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Mongo Connection
const { connection } = mongoose;
const connect = async () => {
  console.log('connecting db...');
  await mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true });
};

try {
  connect();
} catch (error) {
  console.log(error);
}

connection.on('error', (error) => {
  console.log(`Connection error: '  ${error}`);
});

connection.once('open', () => {
  console.log("we're connected!");
});

module.exports = app;
