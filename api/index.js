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

  const achievmentRouter = require("./routers/achievementRou")
  const chapterRouter = require("./routers/chapterRou")
  const difficultiesRouter = require("./routers/difficultiesRou")
  const progressRouter = require("./routers/progressRou")
  const quizRouter = require("./routers/quizRou")
  const testRouter = require("./routers/testRou")
  const typeQuizRouter = require("./routers/typeQuizRou")
  const accountRouter = require("./routers/userRou")
  
  app.use('/api/achievement',achievmentRouter);
  app.use('/api/chapter', chapterRouter);
  app.use('/api/difficulties', difficultiesRouter);
  app.use('/api/progress', progressRouter);
  app.use('/api/quiz', quizRouter);
  app.use('/api/test', testRouter);
  app.use('/api/typeQuiz', typeQuizRouter);
  app.use('/api/users', accountRouter);

app.listen(port, () => {
  console.log('Sever running on port 8000 ');
});
