import getOr from 'lodash/fp/getOr';
import pipe from 'lodash/fp/pipe';
import * as treant from '@coorpacademy/treantjs-core';
import {createDiscussion} from '@coorpacademy/components';
import {
  updateDiscussionTextareaAction,
  resetDiscussionTextareaAction
} from '../actions/ui-discussion';
import {createThreadAction} from '../actions/api-create-thread';

const createMapStateToProps = ({dispatch, api, channel}) => ({state, params}) => {
  const updateDiscussionTextarea = updateDiscussionTextareaAction(dispatch);
  const resetDiscussionTextarea = resetDiscussionTextareaAction(dispatch);
  const createThread = createThreadAction({api, channel}, dispatch);

  const threads = state.api.discussions.threads || [];

  return {
    title: 'Sandbox forum',
    threads,
    value: getOr('', 'ui.discussion.textarea.value', state),
    postDisabled: getOr(true, 'ui.discussion.textarea.postDisabled', state),
    onPost: () => {
      createThread({
        channel,
        message: getOr('', 'ui.discussion.textarea.value', state)
      });
      resetDiscussionTextarea();
    },
    onChange: event => updateDiscussionTextarea(event.target.value)
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
