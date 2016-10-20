import pipe from 'lodash/fp/pipe';
import * as treant from '@coorpacademy/treantjs-core';
import {createDiscussion} from '@coorpacademy/components';

const createMapStateToProps = ({dispatch, api}) => ({state, params}) => {
  return {
    title: 'Sandbox forum',
    threads: state.api.threads || []
  };
};

export {
  createMapStateToProps
};

export default options => {
  const mapStateToProps = createMapStateToProps(options);
  const Discussion = createDiscussion(treant, options);

  return pipe(
    mapStateToProps,
    Discussion
  );
};
