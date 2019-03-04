import mongodb from 'mongodb';
import config from '../config';

export default async (req, res, next) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      console.error(err);
      req.data.error = err;
      next();
    }
    console.info(`Fetching QnA Information for - ${req.params.slug}`);
    client
      .db('nyaaya')
      .collection('questions')
      .findOne({ slug: req.params.slug })
      .then(qna => {
        req.data = {
          id: qna._id,
          slug: qna.slug,
          question: req.cookies.hindi_nyaaya
            ? qna.question.HI
            : qna.question.EN,
          answer: req.cookies.hindi_nyaaya ? qna.answer.HI : qna.answer.EN,
        };
        client.close();
        next();
      })
      .catch(error => {
        console.error(error);
        req.data.error = error;
        next();
      });
    client.close();
  });
};
