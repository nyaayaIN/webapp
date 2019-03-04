import express from 'express';
import getCategories from './categories';
import getCategory from './category';
import getFeatured from './featured';
import getLocalization from './localization';
import getTopic from './topic';
import getTopicExplanations from './topicExplanations';
import getTopicGlossary from './topicGlossary';
import getTopicQuestions from './topicQuestions';
import getQna from './qna';

const router = express.Router();

function sendResponse(req, res) {
  res.send(req.data ? req.data : {});
}

router.get('/categories', getCategories, sendResponse);
router.get('/category/:slug', getCategory, sendResponse);
router.get('/topics/featured/:cat', getFeatured, sendResponse);
router.get('/localization/:page', getLocalization, sendResponse);
router.get('/topic/:slug', getTopic, sendResponse);
router.get('/topic/:id/explanations', getTopicExplanations, sendResponse);
router.get('/topic/:id/glossary', getTopicGlossary, sendResponse);
router.get('/topic/:id/questions', getTopicQuestions, sendResponse);
router.get('/question/:slug', getQna, sendResponse);

export default router;
