const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BNN_news',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

