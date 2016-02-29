import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import CategoryList from '../Category-list.jsx';

describe('renders Categorylist', () => {
  it('renders component', () => {
    let wrapper = mount(<CategoryList />);
    console.log(wrapper.debug());
  });
});