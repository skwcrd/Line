const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: "qxR1lv82PRAD2JrpvtbWvT5asRzUAioSBGJJ0bpscVvw80G38UWxIy7S1zSjLgbUY7eBHfjOK24BlD6VQ8621yRQHusq7AIhV5AZnw/LG2J1L8pks8/MdncvtjHYMbIXZ/HHNGACYim+TVuMz7xQIgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "e4ffd6f4322cde7e0afe019f8a79885d"
};

post('/webhook', line.middleware(config), (req, res) => {
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

  var message = event.message.text;

  if (message == "hello" || message == "Hello"){
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: "How are you?"
    })
  }
  else
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}