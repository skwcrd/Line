var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//================================
const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: "YaK65TD7bcnnELCUgSWwYQPSBPtoQfmKxkjgOjNL+N98G+EBhggefkNv+a1IOHZeY7eBHfjOK24BlD6VQ8621yRQHusq7AIhV5AZnw/LG2JGyx11frv5IwjK5CIELlxo2D7RzbvLQXws9gzD5vgclwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "7e2e1919a66fbff39da4e46793f2f083"
  
};
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
  .all(req.body.events.map(handleEvent))
  .then((result) => res.json(result))
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});
const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  var message = event.message.text
  var user_id = event.source.userId;
  //console.log(require("util").inspect(event));
  if (message == "hello" || message == "Hello"){
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: "Hello😀"
    })

  }else
  if (message == "สวัสดี" ){
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: "สวัสดีครับ" 
    })
  
  }
  /*else if(message == "count"){
    client.pushMessage(user_id, {type: 'text', text: "1",});

    client.pushMessage(user_id, {type: 'text', text: "2"});

    client.pushMessage(user_id, {type: 'text', text: "3"});
  }*/
  else if(message == "love"){
    client.pushMessage(user_id, {type: 'text', text: "Love You",});
    client.pushMessage(user_id, {type: 'text', text: "❤️"});
  }
  else if(message == "bye bye"){
    client.pushMessage(user_id, {type: 'text', text: "See ya",});
    client.pushMessage(user_id, {type: 'text', text: "Good Luck😉"});
  }
  else if(message == "count"){
    for($i=1;$i<=3;$i++){
      client.pushMessage(user_id, {type: 'text', text:$i});
    }
  }
  else
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: message
  });
}
//================================

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;