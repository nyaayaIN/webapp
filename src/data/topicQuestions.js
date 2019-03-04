import mongodb from 'mongodb';
import config from '../config';

export default async (req, res, next) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      console.error(err);
      req.data.error = err;
      next();
    }
    const id = new mongodb.ObjectID(req.params.id);
    console.info(`Fetching QnA for Topic - ${id}`);
    client
      .db('nyaaya')
      .collection('questions')
      .find({ topic: id })
      .toArray()
      .then(qnas => {
        req.data = qnas.map(qna => ({
          id: qna._id,
          slug: qna.slug,
          text: req.cookies.hindi_nyaaya ? qna.question.HI : qna.question.EN,
        }));
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
