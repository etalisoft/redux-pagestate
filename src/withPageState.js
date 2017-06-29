import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialize, remove, set } from './actions';
import { selectPageState, selectPageStateKeys } from './selectors';

const withPageState = ({ key, value, paths, removeOnUnmount = false }) => BaseComponent => {
  class WithPageState extends Component {
    componentWillMount() {
      this.props.initialize({ key, value, paths });
      this.setHandler = v => this.props.set({ key, value: v });
    }

    componentWillUnmount() {
      if (removeOnUnmount) {
        this.props.remove({ key });
      }
    }

    getChildContextTypes() {
      return {
        pageState: this.props.keys.some(k => k === key) ? this.props.pageState : value,
        pageStateKey: key,
        setPageState: this.setHandler,
      };
    }

    render() {
      const { pageState, keys, initialize, remove, set, ...other } = this.props;
      return <BaseComponent {...this.getChildContextTypes()} {...other} />;
    }
  }

  WithPageState.propTypes = {
    pageState: PropTypes.any,
    keys: PropTypes.array,
    initialize: PropTypes.func,
    remove: PropTypes.func,
    set: PropTypes.func,
  };

  WithPageState.childContextTypes = {
    pageStateValue: PropTypes.any,
    pageStateKey: PropTypes.string,
    setPageState: PropTypes.func,
  };

  const select = state => ({
    pageState: selectPageState(key)(state),
    keys: selectPageStateKeys(state),
  });

  const boundActions = {
    initialize,
    remove,
    set,
  };

  return connect(select, boundActions)(WithPageState);
};

export default withPageState;
