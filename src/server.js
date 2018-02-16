import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
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
import mockFeatured from './data/featured_mock.json';
import mockStatic from './data/static_mock.json';
import mockTopic from './data/topic_mock.json';

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

app.get('/data/category/:slug', (req, res) => {
  res.send(mockCategory[req.params.slug] || {});
});

app.get('/data/topic/:slug', (req, res) => {
  res.send(mockTopic[req.params.slug] || {});
});

app.get('/data/static_pages/:page', (req, res) => {
  res.send(mockStatic[req.params.page] || {});
});

app.get('/data/featured', (req, res) => {
  res.send(mockFeatured || {});
});

app.get('/data/categories', (req, res) => {
  res.send(mockCategories.data || {});
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
app.get('/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/hindu-law/nullity/', (req, res) => {
  res.redirect('/topic/annulment');
});
app.get('/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/christian-law/nullity/', (req, res) => {
  res.redirect('/topic/annulment');
});
app.get('/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/muslim-law/nullity/', (req, res) => {
  res.redirect('/topic/annulment');
});
app.get('/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/parsi-law/nullity/', (req, res) => {
  res.redirect('/topic/annulment');
});
app.get('/guide-to-marriage-divorce-and-maintenance/separation-and-divorce/law-on-civil-marriages/nullity/', (req, res) => {
  res.redirect('/topic/annulment');
});
// Domestic Violence
app.get('/law-explainers/domestic-violence/', (req, res) => {
  res.redirect('/topic/domestic-violence');
});
// Care for Parents and Elderly
app.get('/law-explainers/special-law-on-maintenance-for-senior-citizens/', (req, res) => {
  res.redirect('/topic/care-for-parents-and-elderly');
});
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
app.get('/law-explainers/28/atrocities-against-scheduled-castes-tribes/', (req, res) => {
  res.redirect('/topic/scheduled-caste-and-scheduled-tribes');
});
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
