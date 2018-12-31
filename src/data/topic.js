import mongodb from 'mongodb';
import config from '../config';

export default async (req, res, next) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      console.error(err);
      req.data.error = err;
      next();
    }
    console.info(`Fetching Topics Information for - ${req.params.slug}`);
    client
      .db('nyaaya')
      .collection('topics')
      .findOne({ slug: req.params.slug })
      .then(topic => {
        req.data = {
          id: topic._id,
          name: req.cookies.hindi_nyaaya ? topic.name.HI : topic.name.EN,
          summary: req.cookies.hindi_nyaaya
            ? topic.summary.HI.html
            : topic.summary.EN.html,
          sources: topic.sources,
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
