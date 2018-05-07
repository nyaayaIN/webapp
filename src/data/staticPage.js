import mongodb from 'mongodb';
import config from '../config';

export default async (req, res, next) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      console.error(err);
      req.data.error = err;
      next();
    }
    console.info(`Fetching Localization Strings for ${req.params.page}`);
    client
      .db('nyaaya')
      .collection('staticpages')
      .findOne({ slug: req.params.page })
      .then(page => {
        req.data = page.keys.reduce(
          (obj, k, i) => ({ ...obj, [k]: page.content.EN[i] }),
          {},
        );
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
