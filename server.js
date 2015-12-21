var express         = require('express'),
    PORT            = process.env.PORT || 3000,
    server          = express(),
    MONGOURI        = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname          = "tododb",
    mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    ejs             = require('ejs'),
    expressLayouts  = require('express-ejs-layouts'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    session         = require('express-session');

var itemSchema = new Schema({
    todo_value: { type: String, required: true },
    created: { type: Date, default: Date.now }
  });
var Item = mongoose.model('Item', itemSchema);

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(session({
  secret: "mysecret",
  resave: true,
  saveUninitialized: false
}));

server.use(express.static('./public'));
server.use(bodyParser.json());
server.use(expressLayouts);
server.use(methodOverride('_method'));


server.get('/items', function(request, response){
  Item.find({}, function(err, items){
    response.json(items);
  })
});


server.post('/items', function(request, response){
  Item.create(request.body, function(err, data){
    Item.find({}, function(err, items){
      response.json(items);
    });
  });
});

server.delete('/items/:item_id', function(request, response){
  Item.remove({
    _id : request.params.item_id
  }, function(err, data){
    Item.find({}, function(err, items){
      response.json(items);
    });
  });
});

mongoose.connect('mongodb://localhost:27017/tododb');
server.listen(3000, function(){
  console.log("Server is listening");
});
