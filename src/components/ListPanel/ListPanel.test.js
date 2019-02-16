import React from 'react';
import { mount } from 'enzyme';
import ListPanel from './ListPanel';

const props = {
  webcams: [
    {
      name: 'foo',
      id: '1',
      source: 'foo-source',
    },
    {
      name: 'bar',
      id: '2',
      source: 'bar-source',
    },
  ],
  onListItemClick: jest.fn(),
};

describe('<ListPanel />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount((
      <ListPanel {...props} />
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
    wrapper = null;
  });

  test('it should render the list', () => {
    expect(wrapper.find('li').length).toBe(2);
    expect(wrapper.find('li button').first().text()).toBe(props.webcams[0].name);
  });

  test('it should call onClick with the source url', () => {
    const item = wrapper.find('li button').first();
    item.simulate('click');

    expect(props.onListItemClick).toHaveBeenCalled();
    expect(props.onListItemClick.mock.calls[0][0]).toBe(props.webcams[0].source);
  });
});
