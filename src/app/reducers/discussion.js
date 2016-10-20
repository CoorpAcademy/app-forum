import set from 'lodash/fp/set';

export default (state = {}, action) => set('authentication', process.env.API_PASSWORD || 'Bearer test', state);
