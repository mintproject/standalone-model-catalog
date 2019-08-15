/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { Reducer } from 'redux';
import { RootAction } from './store';
import { User } from 'firebase';
import { UPDATE_PAGE, FETCH_USER, FETCH_USER_PREFERENCES } from './actions';


export interface IdMap<T> {
  [id: string]: T
}

export interface IdNameObject {
  id?: string
  name?: string
}

export interface AppState {
  page: string,
  subpage: string,
  user?: User,
  prefs?: UserPreferences
}

export interface UserPreferences {
  wings: WingsPreferences
}

export interface WingsPreferences {
  server: string,
  export_url: string,
  domain: string,
  username: string,
  password: string,
  storage: string,
  dotpath: string,
  onturl: string,
  api: string
}

const INITIAL_STATE: AppState = {
  page: '',
  subpage: ''
};

const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page!,
        subpage: action.subpage!
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.user!
      };
    case FETCH_USER_PREFERENCES:
      return {
        ...state,
        prefs: action.prefs!
      };
    default:
      return state;
  }
};

export default app;
