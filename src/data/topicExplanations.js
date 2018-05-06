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
    console.info(`Fetching Explanations for Topic - ${id}`);
    client
      .db('nyaaya')
      .collection('explanations')
      .find({ topics: { $in: [id] } })
      .toArray()
      .then(explanations => {
        req.data = explanations.map(explanation => ({
          id: explanation._id,
          title: explanation.title.EN,
          slug: explanation.slug,
          content: explanation.content.EN.html,
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
