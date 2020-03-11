/*
 *
 * Video reducer
 *
 */
import { fromJS } from 'immutable';

const initialState = fromJS({
  dataLoaded: false,
  metadataLoaded: false,
  seeked: false,
  snapshot: false,
  width: null,
  height: null,
  snapshotAtTime: 0,
  videoUrl: null,
});

const videoReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_LOADED':
      return state.update('dataLoaded', () => true);
    case 'METADATA_LOADED':
      return state.update('metadataLoaded', () => true);
    case 'SEEKED':
      return state.update('seeked', () => true);
    case 'SET_SNAPSHOT':
      return state.update('snapshot', () => action.snapshot);
    default:
      return state;
  }
};

export default videoReducer;
export { initialState };
