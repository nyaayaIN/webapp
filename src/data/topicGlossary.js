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
    console.info(`Fetching Glossary for Topic - ${id}`);
    client
      .db('nyaaya')
      .collection('terms')
      .find({ topic: id })
      .toArray()
      .then(terms => {
        req.data = terms.map(term => ({
          id: term._id,
          term: term.term.EN,
          definition: term.definition.EN,
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
