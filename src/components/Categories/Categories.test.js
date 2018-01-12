import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import Categories from './Categories';

describe('Categories', () => {
  it('should render without throwing an error', () => {
    const cat = shallow(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Categories />
      </App>,
    );
  });

  it('should test fetch response was not successful ', () => {
    const cat = shallow(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Categories />
      </App>,
    );

    cat.fetch = jest
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

  it('should test fetch response was not successful ', () => {
    const cat = shallow(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Categories />
      </App>,
    );

    cat.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(
          mockResponse(200, 'Test Pass', '{"status":200, "statusText": OK}'),
        ),
      );
  });
});
