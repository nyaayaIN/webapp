import mongodb from 'mongodb';
import config from '../config';

export default async (req, res, next) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      console.error(err);
      req.data.error = err;
      next();
    }

    console.info(`Fetching Category Information for - ${req.params.cat}`);
    const getMatchingCategory = client
      .db('nyaaya')
      .collection('categories')
      .findOne({ slug: req.params.cat })
      .then(cat => cat._id)
      .catch(error => {
        console.error(error);
        req.data.error = error;
        next();
      });
    getMatchingCategory.then(id => {
      console.info(`Fetching Featured Topics for Category - ${id}`);
      client
        .db('nyaaya')
        .collection('topics')
        .find({
          $and: [
            { featured: true },
            { state: 'published' },
            { category: new mongodb.ObjectID(id) },
          ],
        })
        .toArray()
        .then(topics => {
          req.data = topics.map(topic => ({
            id: topic._id,
            name: req.cookies.hindi_nyaaya ? topic.name.HI : topic.name.EN,
            summary: req.cookies.hindi_nyaaya
              ? topic.summary.HI.html
              : topic.summary.EN.html,
            url: `/topic/${topic.slug}`,
            image: topic.topicImage.public_id,
          }));
          client.close();
          next();
        })
        .catch(error => {
          console.error(error);
          req.data.error = error;
          next();
        });
    });
  });
};
