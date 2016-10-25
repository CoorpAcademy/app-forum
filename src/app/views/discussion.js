import getOr from 'lodash/fp/getOr';
import pipe from 'lodash/fp/pipe';
import * as treant from '@coorpacademy/treantjs-core';
import {createDiscussion} from '@coorpacademy/components';
import {createUpdatePostAction} from '../actions/ui-update-post';
// import {createThreadAction} from '../actions/create-thread-api';

function refreshStatus(thread) {
  const deleted = thread.status === 'deleted';
  const rejected = thread.status === 'rejected';

  return {
    // editable: thread.userId === user.id && !deleted,
    // rejectable: _.includes(user.role, 'moderator') && !deleted,
    rejected,
    deleted
  };
}

const createThreadActions = channel => thread => {
  // thread = {
  //   ...refreshStatus(thread),
  //   ...thread,
  //   answer: null,
  //   edition: thread.message,
  //   answers: thread.answers || [],
  //   // answerAvatar: user.avatar,
  //   onChangeAnswer(event) {
  //   },
  //   onPostAnswer() {
  //     console.log('plop !!');
  //     const newThread = {
  //       parentId: options.parentId,
  //       channel,
  //       message
  //     };

  //     // createThreadAction({api, newThread}, dispatch));
  //     //   createThread(thread.answer, scope, user, {
  //     //       parentId: thread._id,
  //     //       list: thread.answers
  //     //   });
  //     //   thread.answer = null;
  //   },
  //   onChangeEdition(event) {
  //   },
  //   onPostEdition() {
  //   },
  //   onModerate() {
  //   },
  //   onDelete() {
  //   }
  // };
  thread.onPostAnswer = () => console.log('plop on answer', channel);
  // thread.answers.forEach(createThreadActions(channel));
};

const createMapStateToProps = ({dispatch, channel}) => ({state, params}) => {
  const updatePostAction = createUpdatePostAction(dispatch);
  const threads = state.api.discussions.threads || [];
  threads.forEach(createThreadActions(channel));

  return {
    title: 'Sandbox forum',
    threads,
    value: getOr('', 'ui.discussion.postUpdated.value', state),
    postDisabled: getOr(true, 'ui.discussion.postUpdated.postDisabled', state),
    onPost: () => console.log('plop on ', channel),
    onChange: event => {
      updatePostAction(event.target.value);
    }
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
