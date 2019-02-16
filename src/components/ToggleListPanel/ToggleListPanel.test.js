import React from 'react';
import { mount } from 'enzyme';
import ToggleListPanel from '../ToggleListPanel/ToggleListPanel';

const props = {
  children: [
    {
      label: 'foo',
      content: <div>foo</div>,
    },
    {
      label: 'bar',
      content: <div>bar</div>,
    }
  ],
};

describe('<ToggleListPanel />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount((
      <ToggleListPanel {...props} />
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
    wrapper = null;
  });

  test('it should render the correct buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(2);
    expect(buttons.first().text()).toBe('foo');
  });

  test('the first tab should be active by default', () => {
    expect(wrapper.find('.panel-content').text().includes('foo')).toBeTruthy();
  });

  test('setActivePanel should change the active tab', () => {
    wrapper.instance().setActivePanel(1);
    expect(wrapper.find('.panel-content').text().includes('bar')).toBeTruthy();
  });
});
