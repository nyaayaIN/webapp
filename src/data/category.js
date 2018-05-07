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
        req.data = {
          id: cat._id,
          name: cat.name.EN,
          description: cat.description.EN.html,
          topics: [],
        };
        return cat._id;
      })
      .then(id => {
        console.info(`Fetching Topics for ${id}`);
        client
          .db('nyaaya')
          .collection('topics')
          .find({
            $and: [
              { state: 'published' },
              { category: new mongodb.ObjectID(id) },
            ],
          })
          .toArray()
          .then(topics => {
            req.data.topics = topics.map(topic => ({
              id: topic._id,
              name: topic.name.EN,
              image: topic.topicImage.public_id,
              url: `/topic/${topic.slug}`,
            }));
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
