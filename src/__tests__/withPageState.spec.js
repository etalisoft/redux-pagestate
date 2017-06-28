import expect from 'expect';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { initialize, remove, set } from '../actions';
import reducer from '../reducer';
import withPageState from '../withPageState';

const makeStore = (initial = {}) => createStore(combineReducers({ pagestate: reducer }), { pagestate: initial });

const renderPage = ({ component, attributes, store: storeConfig, pagestate: pagestateConfig }) => {
  const store = makeStore(storeConfig);
  const Decorated = withPageState(pagestateConfig)(component);
  const dom = TestUtils.renderIntoDocument(
    <Provider store={store}>
      <Decorated {...attributes} />
    </Provider>,
  );
  return { dom, store };
};

describe('withPageState', () => {
  let pathname;

  beforeEach(() => {
    pathname = global.window.location.pathname;
    global.window.location.pathname = '/a';
  });

  afterEach(() => {
    global.window.location.pathname = pathname;
  });

  it('should return a decorator function', () => {
    expect(withPageState).toBeA('function');
  });

  it('should render without error', () => {
    const Page = () => <div />;
    const config = { key: 'a', value: 'A' };
    expect(() => {
      renderPage({ component: Page, pagestate: config });
    }).toNotThrow();
  });

  it('should provide the correct props', () => {
    class Page extends Component {
      render() {
        return <div />;
      }
    }
    const config = { key: 'a', value: 'A' };
    const { dom } = renderPage({
      component: Page,
      attributes: { z: 'Z' },
      pagestate: config,
    });
    const props = TestUtils.findRenderedComponentWithType(dom, Page).props;
    expect(Object.keys(props).sort()).toEqual(['pageState', 'pageStateKey', 'setPageState', 'z']);
    expect(props.pageState).toBeA('string');
    expect(props.pageStateKey).toBeA('string');
    expect(props.setPageState).toBeA('function');
  });

  describe('pageState prop', () => {
    it('should default to the initial config value', () => {
      class Page extends Component {
        render() {
          return <div />;
        }
      }
      const { dom } = renderPage({
        component: Page,
        pagestate: {
          key: 'a',
          value: { name: 'Thing', size: 4 },
        },
      });
      const props = TestUtils.findRenderedComponentWithType(dom, Page).props;
      expect(props.pageState).toMatch({
        name: 'Thing',
        size: 4,
      });
    });

    it('should update with the store', () => {
      class Page extends Component {
        render() {
          return <div />;
        }
      }
      const { dom, store } = renderPage({
        component: Page,
        pagestate: {
          key: 'a',
          value: { name: 'Thing', size: 4 },
        },
      });
      const before = TestUtils.findRenderedComponentWithType(dom, Page).props;
      expect(before.pageState.name).toBe('Thing');
      const action = set({
        key: 'a',
        value: {
          name: 'Stuff',
          size: 3,
        },
      });
      store.dispatch(action);
      const after = TestUtils.findRenderedComponentWithType(dom, Page).props;
      expect(after.pageState.name).toBe('Stuff');
    });
  });

  describe('pageStateKey prop', () => {
    it('should be set to the initial config value', () => {
      class Page extends Component {
        render() {
          return <div />;
        }
      }
      const { dom } = renderPage({
        component: Page,
        pagestate: { key: 'a', value: 'A' },
      });
      const props = TestUtils.findRenderedComponentWithType(dom, Page).props;
      expect(props.pageStateKey).toBe('a');
    });
  });

  describe('setPageState prop', () => {
    it('should update the value', () => {
      class Page extends Component {
        componentDidMount() {
          this.props.setPageState('o.O');
        }

        render() {
          return <div />;
        }
      }
      const { dom } = renderPage({
        component: Page,
        pagestate: { key: 'a', value: 'A' },
      });
      const props = TestUtils.findRenderedComponentWithType(dom, Page).props;
      expect(props.pageState).toBe('o.O');
    });
  });

  it('should remove the pagestate if removeOnUnmount is set', () => {
    class Page extends Component {
      render() {
        return <div />;
      }
    }
    const store = makeStore();
    const Decorated = withPageState({ key: 'a', value: 'A', removeOnUnmount: true })(Page);
    const provider = (
      <Provider store={store}>
        <Decorated />
      </Provider>
    );
    const container = document.createElement('div');
    ReactDOM.render(provider, container);
    expect(store.getState().pagestate).toIncludeKey('a');
    ReactDOM.unmountComponentAtNode(container);
    expect(store.getState().pagestate).toExcludeKey('a');
  });
});
