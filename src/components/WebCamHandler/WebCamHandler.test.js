import React from 'react';
import { mount } from 'enzyme';
import WebCamHandler from './WebCamHandler';
import WebcamView from '../WebcamView/WebcamView';
import ToggleListPanel from '../ToggleListPanel/ToggleListPanel';

jest.mock('../ToggleListPanel/ToggleListPanel', () => jest.fn(() => null));
jest.mock('../WebcamView/WebcamView', () => jest.fn(({ children = null }) => children));

describe('<WebCamHandler />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount((
      <WebCamHandler />
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();

    wrapper.unmount();
    wrapper = null;
  });

  test('it should render ListPanelContainer and WebcamView', () => {
    expect(WebcamView).toHaveBeenCalled();
    expect(ToggleListPanel).toHaveBeenCalled();
  });

  test('it should the correct props to WebcamView', () => {
    const state = {
      activeSource: 'foo',
      position: {
        x: 200,
        y: 300,
      },
    };

    wrapper.setState(state);

    expect(WebcamView.mock.calls[1][0]).toMatchObject(state);

    const { afterPositionChange } = WebcamView.mock.calls[1][0];

    afterPositionChange();

    expect(wrapper.state('position')).toEqual({});
  });

  test('onListItemClick should set the activeSource', () => {
    const source = 'foo';
    wrapper.instance().onListItemClick(source);

    expect(wrapper.state('activeSource')).toBe(source);
  });

  test('onPositionChange should set the position', () => {
    const position = {
      x: 10,
      y: 20,
    };
    wrapper.instance().onPositionChange(position);

    expect(wrapper.state('position')).toEqual(position);
  });
});
