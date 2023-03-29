import { combineReducers } from 'redux';

import blogs from './blogs';
import auth from './auth';

export const reducers = combineReducers({ blogs, auth });
