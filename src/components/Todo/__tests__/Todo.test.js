import React from 'react';
import { Todo } from '../index.js';
import { shallow, mount } from 'enzyme';

describe('Todo', () => {
  it('renders a basic todo', () => {
    const blockProps = {onToggle: 'foo', checked: false};
    const component = shallow(<Todo offsetKey="foo" blockProps={blockProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders a checked todo', () => {
    const blockProps = {onToggle: 'foo', checked: true};
    const component = shallow(<Todo offsetKey="foo" blockProps={blockProps} />);
    expect(component).toMatchSnapshot();
  });
});
