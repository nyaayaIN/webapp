import mongodb from 'mongodb';
import config from '../config';

export default async (req, res, next) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      console.error(err);
      req.data.error = err;
      next();
    }
    console.info('Fetching Categories');
    client
      .db('nyaaya')
      .collection('categories')
      .find({})
      .sort({ 'name.EN': 1 })
      .toArray()
      .then(categories => {
        req.data = categories.map(cat => ({
          id: cat._id,
          slug: cat.slug,
          name: cat.name.EN,
          url: `/category/${cat.slug}`,
          topics: [], // left blank intentionally so we can lazy load topics later
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
