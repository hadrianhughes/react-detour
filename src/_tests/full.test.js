import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { createWaitForElement } from 'enzyme-wait';
import { useDetour, DetourProvider } from '../index';
import apiFetch from '../api';

jest.mock('../api');
apiFetch.mockResolvedValue({ data: 'remote-data' });

const testApiString = 'http://my-api.com';

const TestComponent = () => {
  const result = useDetour('/remote')

  return (
    result ? (
      <div id="test-div">{result.data}</div>
    ) : null
  );
};

describe('DetourProvider component', () => {
  it('Should accept a `children` prop and render the children inside itself', () => {
    const wrapper = mount(
      <DetourProvider>
        <div id="render-me"></div>
      </DetourProvider>
    );

    expect(wrapper.find(DetourProvider)).toBeTruthy();
    expect(
      wrapper
        .find(DetourProvider)
        .find('div#render-me')
    ).toBeTruthy();
  });

  it('Should accept an api prop which is used for contacting the API when a non-existing data property is accessed', (done) => {
    const wrapper = mount(
      <DetourProvider api={testApiString}>
        <TestComponent />
      </DetourProvider>
    );

    setTimeout(() => {
      wrapper.setProps({});
      expect(wrapper.find('#test-div').text()).toBe('remote-data');
      done();
    }, 1000);
  });
});
