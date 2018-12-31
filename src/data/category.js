import mongodb from 'mongodb';
import config from '../config';

export default async (req, res, next) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      console.error(err);
      req.data.error = err;
      next();
    }
    console.info(`Fetching Category Information for - ${req.params.slug}`);
    client
      .db('nyaaya')
      .collection('categories')
      .findOne({ slug: req.params.slug })
      .then(cat => {
        console.info(`Found category ${cat._id}`);
        return {
          id: cat._id,
          name: req.cookies.hindi_nyaaya ? cat.name.HI : cat.name.EN,
          description: req.cookies.hindi_nyaaya
            ? cat.description.HI.html
            : cat.description.EN.html,
        };
      })
      .then(cat => {
        console.info(`Fetching Topics for ${cat.id}`);
        client
          .db('nyaaya')
          .collection('topics')
          .find({
            $and: [
              { state: 'published' },
              { category: new mongodb.ObjectID(cat.id) },
            ],
          })
          .sort({ 'name.EN': 1 })
          .toArray()
          .then(topics => {
            req.data = {
              id: cat.id,
              name: cat.name,
              description: cat.description,
              topics: topics.map(topic => ({
                id: topic._id,
                name: req.cookies.hindi_nyaaya ? topic.name.HI : topic.name.EN,
                summary: req.cookies.hindi_nyaaya
                  ? topic.summary.HI.html
                  : topic.summary.EN.html,
                image: topic.topicImage.public_id,
                url: `/topic/${topic.slug}`,
              })),
            };
            client.close();
            next();
          })
          .catch(error => {
            console.error(error);
            req.data.error = error;
            next();
          });
      })
      .catch(error => {
        console.error(error);
        req.data.error = error;
        client.close();
        next();
      });
  });
};
