import React from 'react';
import { mount } from 'enzyme';

import Tile from './Tile';

describe('Tile component', () => {
  it('should render tile with name and url', () => {
  const component = mount(<Tile name="test" url="www.test.com" />, {context: { insertCss: () => {} }});
  expect(component.text()).toEqual('test');
  expect(component.find('Link').prop("to")).toEqual('www.test.com')
  });

  it('should render tile with null values', () => {
  const component = mount(<Tile  />, {context: { insertCss: () => {} }});
  expect(component.text()).toEqual("");
  expect(component.find('Link').prop("to")).toEqual(null)
  });
});


