const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;

mongoose.connect(
    'mongodb+srv://nguyentrunghau220203:hau220203@cluster0.yywfbel.mongodb.net/',
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
      // Các tùy chọn khác nếu cần thiết
    },
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err);
  });

  const accountRouter = require("./routers/userRou")
  const chapterRouter = require("./routers/chapterRou")
  
  app.use('/api/users', accountRouter);

  app.use('/api/chapter', chapterRouter);

app.listen(port, () => {
  console.log('Sever running on port 8000 ');
});
