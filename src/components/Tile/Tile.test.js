/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

/* import React from 'react';
import { mount, shallow } from 'enzyme';
import FeaturedTopics from './FeaturedTopics';
import App from '../App';

global.fetch = require('jest-fetch-mock');

const minState = {
  heading: 'test heading',
  linker: 'test Linker',
  FeaturedTopics: [
    {
      id: 'testId',
      name: 'testName',
      url: 'testURl',
      summary: { EN: 'testSummary' },
    },
  ],
  error: false,
};

describe('FeaturedTopics Component', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = mount(<FeaturedTopics />, {
      context: { insertCss: () => {} },
    });
  });

  it('renders the header', async () => {
    fetch('*', minState);
    // expect(setState).to.be.calledOnce;
    await renderedComponent.instance().componentDidMount();
    expect(renderedComponent.find('.center').get(0)).toEqual('test heading');
  });

  it('renders one container class', () => {
    renderedComponent.setState(minState);
    expect(renderedComponent.find('.container').length).toEqual(1);
  });
  it('renders null if state.error true', () => {
    renderedComponent.setState({ error: true });
    renderedComponent.update();
    expect(renderedComponent.html()).toEqual(null);
  });
});
*/
