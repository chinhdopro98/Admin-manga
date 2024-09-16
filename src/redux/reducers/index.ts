import { combineReducers } from 'redux';

import { achievementReducer } from './achievement';
import { authorReducer } from './author';
import { basicReducer } from './basic';
import { categoryReducer } from './category';
import { commentReducer } from './comment';
import { companionReducer } from './companion';
import { groupReducer } from './group';
import { typeReducer } from './type';
import { userReducer } from './user';
import { mangaReducer } from './manga';

const rootReducer = combineReducers({
  basic: basicReducer,
  user: userReducer,
  manga: mangaReducer,
  category: categoryReducer,
  author: authorReducer,
  type: typeReducer,
  group: groupReducer,
  achievement: achievementReducer,
  companion: companionReducer,
  comment: commentReducer,
});

export default rootReducer;
