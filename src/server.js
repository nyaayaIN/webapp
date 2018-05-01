import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import fetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import config from './config';

import mockCategories from './data/categories_mock.json';
import mockCategory from './data/category_mock.json';
import mockStatic from './data/static_mock.json';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

if (__DEV__) {
  app.enable('trust proxy');
}

//
// Register API middleware
// -----------------------------------------------------------------------------

app.get('/data/static_pages/:page', (req, res) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      res.send(mockStatic[req.params.page]);
    }
    client
      .db('nyaaya')
      .collection('staticpages')
      .findOne({ slug: req.params.page })
      .then(page => {
        const data = {};
        page.keys.forEach((key, i) => {
          data[key] = page.content.EN[i];
        });
        client.close();
        res.send(data);
      })
      .catch(error => {
        console.error(error);
        res.send(mockStatic[req.params.page] || {});
      });
    client.close();
  });
});

app.get('/data/topics/featured/:cat', (req, res) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      res.send([]);
    }
    const getMatchingCategory = client
      .db('nyaaya')
      .collection('categories')
      .findOne({ slug: req.params.cat })
      .then(cat => cat._id)
      .catch(error => {
        console.error(error);
        res.send([]);
        client.close();
      });
    getMatchingCategory.then(id => {
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
          const formattedTopics = topics.map(topic => ({
            id: topic._id,
            name: topic.name.EN,
            url: `/topic/${topic.slug}`,
            image: topic.topicImage.public_id,
          }));
          client.close();
          res.send(formattedTopics);
        })
        .catch(error => {
          console.error(error);
          client.close();
        });
    });
  });
});

app.get('/data/categories', (req, res) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      res.send(mockCategories.data || {});
    }

    client
      .db('nyaaya')
      .collection('categories')
      .find({})
      .sort({ 'name.EN': 1 })
      .toArray()
      .then(categories => {
        const formattedCategories = categories.map(cat => ({
          id: cat._id,
          name: cat.name.EN,
          url: `/category/${cat.slug}`,
          topics: [],
        }));
        client.close();
        res.send(formattedCategories);
      })
      .catch(error => {
        console.error(error);
        res.send(mockCategories.data || {});
      });
    client.close();
  });
});

app.get('/data/category/:slug', (req, res) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      res.send(mockCategory[req.params.slug] || {});
    }
    client
      .db('nyaaya')
      .collection('categories')
      .findOne({ slug: req.params.slug })
      .then(cat => {
        const formattedCategory = {
          id: cat._id,
          name: cat.name.EN,
          description: cat.description.EN.html,
          topics: [],
        };
        client.close();
        res.send(formattedCategory);
      })
      .catch(error => {
        console.error(error);
        res.send(mockCategory[req.params.slug] || {});
      });
    client.close();
  });
});

app.get('/data/category/:id/topics', (req, res) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      res.send([]);
    }
    const categoryId = new mongodb.ObjectID(req.params.id);
    client
      .db('nyaaya')
      .collection('topics')
      .find({ $and: [{ category: categoryId }, { state: 'published' }] })
      .sort({ 'name.EN': 1 })
      .toArray()
      .then(topics => {
        const formattedTopics = topics.map(topic => ({
          id: topic._id,
          name: topic.name.EN,
          url: `/topic/${topic.slug}`,
          image: topic.topicImage.public_id,
        }));
        client.close();
        res.send(formattedTopics);
      })
      .catch(error => {
        console.error(error);
      });
    client.close();
  });
});

app.get('/data/topic/:slug', (req, res) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      res.send(mockCategory[req.params.slug] || {});
    }
    client
      .db('nyaaya')
      .collection('topics')
      .findOne({ slug: req.params.slug })
      .then(topic => {
        const formattedTopic = {
          id: topic._id,
          name: topic.name.EN,
          summary: topic.summary.EN.html,
          image: topic.topicImage.public_id,
        };
        client.close();
        res.send(formattedTopic);
      })
      .catch(error => {
        console.error(error);
        res.send(mockCategory[req.params.slug] || {});
      });
    client.close();
  });
});

app.get('/data/topic/:id/explanations', (req, res) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      console.error(err);
      res.send([]);
    }
    const id = new mongodb.ObjectID(req.params.id);
    client
      .db('nyaaya')
      .collection('explanations')
      .find({ topics: { $in: [id] } })
      .toArray()
      .then(explanations => {
        const formattedExplanations = explanations.map(explanation => ({
          id: explanation._id,
          title: explanation.title.EN,
          slug: explanation.slug,
          content: explanation.content.EN.html,
        }));
        client.close();
        res.send(formattedExplanations);
      })
      .catch(error => {
        console.error(error);
      });
    client.close();
  });
});

app.get('/data/topic/:id/qna', (req, res) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      res.send([]);
    }
    const id = new mongodb.ObjectID(req.params.id);
    client
      .db('nyaaya')
      .collection('questions')
      .find({ topic: id })
      .toArray()
      .then(qnas => {
        const formattedQuestions = qnas.map(qna => ({
          id: qna._id,
          question: qna.question.EN,
          answer: qna.answer.EN.html,
        }));
        client.close();
        res.send(formattedQuestions);
      })
      .catch(error => {
        console.error(error);
      });
    client.close();
  });
});

app.get('/data/topic/:id/glossary', (req, res) => {
  mongodb.MongoClient.connect(config.databaseUrl, (err, client) => {
    if (err) {
      res.send([]);
    }
    const id = new mongodb.ObjectID(req.params.id);
    client
      .db('nyaaya')
      .collection('terms')
      .find({ topic: id })
      .toArray()
      .then(terms => {
        const formattedTerms = terms.map(term => ({
          id: term._id,
          term: term.term.EN,
          definition: term.definition.EN,
        }));
        client.close();
        res.send(formattedTerms);
      })
      .catch(error => {
        console.error(error);
      });
    client.close();
  });
});

//
// Redirects
// -----------------------------------------------------------------------------

// Children accused of Crime
app.get('/children-accused-of-crimes/', (req, res) => {
  res.redirect('/topic/children-accused-of-crime');
});
// Child Labour
app.get('/law-explainers/law-on-child-labour/', (req, res) => {
  res.redirect('/topic/child-labour');
});
// Free and Compulsory Education
app.get('/law-explainers/right-to-education/', (req, res) => {
  res.redirect('/topic/free-and-compulsory-education');
});
// Anti-corruption
app.get('/law-explainers/anti-corruption/', (req, res) => {
  res.redirect('/topic/anti-corruption');
});
// Right to Information
app.get('/law-explainers/right-to-information/', (req, res) => {
  res.redirect('/topic/right-to-information');
});
// Dowry
app.get('/law-explainers/dowry-act/', (req, res) => {
  res.redirect('/topic/dowry');
});
// Annulment
app.get(
  '/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/hindu-law/nullity/',
  (req, res) => {
    res.redirect('/topic/annulment');
  },
);
app.get(
  '/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/christian-law/nullity/',
  (req, res) => {
    res.redirect('/topic/annulment');
  },
);
app.get(
  '/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/muslim-law/nullity/',
  (req, res) => {
    res.redirect('/topic/annulment');
  },
);
app.get(
  '/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/parsi-law/nullity/',
  (req, res) => {
    res.redirect('/topic/annulment');
  },
);
app.get(
  '/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/law-on-civil-marriages/nullity/',
  (req, res) => {
    res.redirect('/topic/annulment');
  },
);
// Domestic Violence
app.get('/law-explainers/domestic-violence/', (req, res) => {
  res.redirect('/topic/domestic-violence');
});
// Care for Parents and Elderly
app.get(
  '/law-explainers/special-law-on-maintenance-for-senior-citizens/',
  (req, res) => {
    res.redirect('/topic/care-for-parents-and-elderly');
  },
);
// Smoking
app.get('/law-explainers/smoking-tobacco/', (req, res) => {
  res.redirect('/topic/smoking');
});
// Drugs and Narcotics
// Manual Scavenging
app.get('/law-explainers/manual-scavenging/', (req, res) => {
  res.redirect('/topic/manual-scavenging');
});
// Scheduled Caste and Scheduled Tribes
app.get(
  '/law-explainers/28/atrocities-against-scheduled-castes-tribes/',
  (req, res) => {
    res.redirect('/topic/scheduled-caste-and-scheduled-tribes');
  },
);
// Arrest
app.get('/crpc/accused/explainer/arrest', (req, res) => {
  res.redirect('/topic/arrest');
});
app.get('/crpc/accused/explainer/arrest', (req, res) => {
  res.redirect('/topic/arrest');
});
// Bail
app.get('/crpc/accused/explainer/bail', (req, res) => {
  res.redirect('/topic/bail');
});
// First Information Report
app.get('/crpc/victim/explainer/about-firs', (req, res) => {
  res.redirect('/topic/first-information-report');
});
// Censorship
app.get('/law-explainers/film-tv-and-internet-censorship/', (req, res) => {
  res.redirect('/topic/censorship');
});
// Online Abuse
app.get('/law-explainers/online-abuse/', (req, res) => {
  res.redirect('/topic/online-abuse');
});
// Defamation
app.get('/law-explainers/defamation/', (req, res) => {
  res.redirect('/topic/defamation');
});
// Online Bank Fraud
app.get('/law-explainers/online-bank-fraud/', (req, res) => {
  res.redirect('/topic/online-bank-fraud');
});
// Will
app.get('/law-explainers/making-a-will/', (req, res) => {
  res.redirect('/topic/will');
});
// Rape
app.get('/law-explainers/rape/', (req, res) => {
  res.redirect('/topic/rape');
});
// Prostitution
app.get('/law-explainers/law-on-sex-work/', (req, res) => {
  res.redirect('/topic/prostitution');
});
// Sexual Harassment at the Workplace
app.get('/law-explainers/sexual-harassment/', (req, res) => {
  res.redirect('/topic/sexual-harassment-at-the-workplace');
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Universal HTTP client
      fetch: createFetch(fetch, {
        baseUrl: config.api.serverUrl,
        cookie: req.headers.cookie,
      }),
    };

    const route = await router.resolve({
      ...context,
      pathname: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];
    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);
    data.app = {
      apiUrl: config.api.clientUrl,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
