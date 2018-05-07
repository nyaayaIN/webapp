import express from 'express';

import getCategories from './categories';
import getCategory from './category';
import getFeatured from './featured';
import getStatic from './staticPage';
import getTopic from './topic';
import getTopicExplanations from './topicExplanations';
import getTopicGlossary from './topicGlossary';
import getTopicQna from './topicQna';

const router = express.Router();

function sendResponse(req, res) {
  res.send(req.data ? req.data : {});
}

router.get('/categories', getCategories, sendResponse);
router.get('/category/:slug', getCategory, sendResponse);
router.get('/topics/featured/:cat', getFeatured, sendResponse);
router.get('/static_pages/:page', getStatic, sendResponse);
router.get('/topic/:slug', getTopic, sendResponse);
router.get('/topic/:id/explanations', getTopicExplanations, sendResponse);
router.get('/topics/featured/:cat', getTopicGlossary, sendResponse);
router.get('/topic/:id/qna', getTopicQna, sendResponse);

export default router;