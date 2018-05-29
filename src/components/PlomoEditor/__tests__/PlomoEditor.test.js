import React from 'react';
import PlomoEditor from '../index.js';
import { shallow, mount } from 'enzyme';

describe('PlomoEditor', () => {
  xit('renders the editor', () => {
    const component = shallow(<PlomoEditor />);
    expect(component).toMatchSnapshot();
  });
});
