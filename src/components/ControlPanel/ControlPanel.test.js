import React from 'react';
import { mount } from 'enzyme';
import ControlPanel from './ControlPanel';

const props = {
  onPositionChange: jest.fn(),
};

describe('<ControlPanel />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount((
      <ControlPanel {...props} />
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
    wrapper = null;
  });

  test('it should render the panel', () => {
    expect(wrapper.find('h2').text()).toBe('Click in cirlce and drag');
    expect(wrapper.find('svg circle').length).toBe(1);
  });

  test('it should calculate the distance correctly (click)', () => {
    const svg = wrapper.find('svg circle');

    expect(wrapper.state('startPosition')).toEqual({});

    svg.simulate('mousedown', {
      pageX: 10,
      pageY: 20,
    });

    expect(wrapper.state('startPosition')).toEqual({
      x: 10,
      y: 20,
    });

    svg.simulate('mouseup', {
      pageX: 30,
      pageY: 10,
    });

    expect(props.onPositionChange.mock.calls[0][0]).toEqual({
      x: -20,
      y: 10,
    });
    expect(wrapper.state('startPosition')).toEqual({});
  });

  test('it should calculate the distance correctly (touch)', () => {
    const svg = wrapper.find('svg circle');

    expect(wrapper.state('startPosition')).toEqual({});

    svg.simulate('touchStart', {
      touches: [
        {
          clientX: 10,
          clientY: 20,
        },
      ],
    });

    expect(wrapper.state('startPosition')).toEqual({
      x: 10,
      y: 20,
    });

    svg.simulate('mouseup', {
      changedTouches: [
        {
          clientX: 30,
          clientY: 10,
        },
      ],
    });

    expect(props.onPositionChange.mock.calls[0][0]).toEqual({
      x: -20,
      y: 10,
    });
    expect(wrapper.state('startPosition')).toEqual({});
  });
});
