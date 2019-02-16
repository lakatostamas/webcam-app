import React from 'react';
import { mount } from 'enzyme';
import WebcamView from '../WebcamView/WebcamView';

const props = {
  position: {
    x: 10,
    y: 20,
  },
  activeSource: 'foo',
  afterPositionChange: jest.fn(),
};

window.WebCam = {
  getCameraNode: jest.fn(() => document.createElement('p')),
  setSource: jest.fn(),
  move: jest.fn(),
};


describe('<WebCamView />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount((
      <WebcamView afterPositionChange={() => {}} />
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
    wrapper = null;
  });

  test('it should call getCameraNode', () => {
    expect(window.WebCam.getCameraNode).toHaveBeenCalled();
  });

  test('it should call move', () => {
    wrapper.setProps(props);

    expect(window.WebCam.move).toHaveBeenCalled();
    expect(window.WebCam.move.mock.calls[0][0]).toEqual(props.position.x);
    expect(window.WebCam.move.mock.calls[0][1]).toEqual(props.position.y);
  });

  test('it should not set the same source twice', () => {
    wrapper.setProps(props);

    expect(window.WebCam.setSource).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      activeSource: 'foo',
    });

    expect(window.WebCam.setSource).toHaveBeenCalledTimes(1);
  });
});
