/*
 *
 * Video reducer
 *
 */
import { fromJS } from 'immutable';
const NUMBER_OF_FRAME = 10;
const initialState = fromJS({
  dataLoaded: false,
  metadataLoaded: false,
  seeked: false,
  snapshots: [],
  width: null,
  height: null,
  snapshotAtTime: 0,
  videoUrl: null,
  videoDuration: null,
  currentStep: 0,
  snapshotsToTake: 1,
  step: 1,
});

const videoReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_LOADED':
      return state.update('dataLoaded', () => true);
    case 'METADATA_LOADED':
      const divider = action.duration % NUMBER_OF_FRAME;
      const step = Math.floor(action.duration / divider);

      return state
        .update('metadataLoaded', () => true)
        .update('videoDuration', () => Math.round(action.duration))
        .update('step', () => {
          const divider = action.duration % NUMBER_OF_FRAME;
          const step = Math.floor(action.duration / divider);
          console.log({ divider, step });

          return step;
        })
        .update('snapshotsToTake', () => Math.floor(action.duration / step));
    case 'SEEKED':
      return state.update('seeked', () => true);
    case 'SET_SNAPSHOT':
      return state.update('snapshots', list => list.push(action.snapshot));
    case 'UPDATE_CURRENT_STEP':
      console.log('kk');
      return state.update('currentStep', value => value + 1);
    default:
      return state;
  }
};

export default videoReducer;
export { initialState };
