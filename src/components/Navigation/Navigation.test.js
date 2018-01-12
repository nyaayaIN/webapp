import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import Navigation from './Navigation';

describe('Navigation', () => {
  const minProps = {
    about: '',
    contact: '',
    blog: '',
  };
  it('should render without error', () => {
    const nav = shallow(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Navigation {...minProps} />
      </App>,
    );
  });
  it('should test fetch response was not successful ', () => {
    const nav = shallow(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Navigation {...minProps} />
      </App>,
    );

    nav.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(
          mockResponse(
            400,
            'Test Error',
            '{"status":400, "statusText": Test Error!}',
          ),
        ),
      );
  });

  it('should test fetch response was successful ', () => {
    const nav = shallow(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Navigation {...minProps} />
      </App>,
    );

    nav.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(
          mockResponse(200, 'Test Pass', '{"status":200, "statusText": OK}'),
        ),
      );
  });
});
