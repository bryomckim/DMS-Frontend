import React from 'react';
import expect from 'expect';
import request from 'superagent';
import sinon from 'sinon';
import alt from '../../alt';
import CategoryActions from '../../actions/CategoryActions';
import CategoryStore from '../CategoryStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('Category Store tests', () => {
  it('listens for categorySuccessDispatcher Actions', () => {
    let data = ['Music', 'Education', 'Film', 'Programming'];
    let action = CategoryActions.CATEGORY_SUCCESS_DISPATCHER;
    alt.dispatcher.dispatch({action, data});
    expect(CategoryStore.getState().categories.length).toEqual(4);
  });
});
