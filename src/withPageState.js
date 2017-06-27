import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialize, remove, set } from './actions';
import { selectPageState } from './selectors';

const withPageState = ({ key, value, paths, removeOnUnmount = false }) => BaseComponent => {
  class WithPageState extends Component {
    componentWillMount() {
      this.props.initialize({ key, value, paths });
    }

    componentWillUnmount() {
      if (removeOnUnmount) {
        this.props.remove({ key });
      }
    }

    getChildContextTypes() {
      return {
        pageState: this.props.pageState,
        pageStateKey: key,
        setPageState: this.props.setPageState,
      };
    }

    render() {
      const { pageState, initializePageState, removePageState, setPageState, ...other } = this.props;
      return <BaseComponent {...this.context} {...other} />;
    }
  }

  WithPageState.propTypes = {
    pageState: PropTypes.any,
    initializePageState: PropTypes.func,
    removePageState: PropTypes.func,
    setPageState: PropTypes.func,
  };

  WithPageState.childContextTypes = {
    pageStateValue: PropTypes.any,
    pageStateKey: PropTypes.string,
    setPageState: PropTypes.func,
  };

  const select = state => ({
    pageState: selectPageState(key)(state),
  });

  const boundActions = {
    initializePageState: initialize,
    removePageState: remove,
    setPageState: set,
  };

  return connect(select, boundActions)(WithPageState);
};
