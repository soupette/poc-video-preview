/**
 *
 * Video
 *
 */
import React, { useEffect, useReducer, useRef } from 'react';
// import PropTypes from 'prop-types';
import Img from './Img';
import Wrapper from './Wrapper';
import reducer, { initialState } from './reducer';
import init from './init';

const ThumbnailsVideo = ({ thumbnailHandler, ...rest }) => {
  const [reducerState, dispatch] = useReducer(reducer, initialState, () =>
    init(initialState, rest),
  );
  const {
    metadataLoaded,
    dataLoaded,
    snapshots,
    snapshotAtTime,
    videoUrl,
    seeked,
    width,
    height,
    step,
    currentStep,
    snapshotsToTake,
  } = reducerState.toJS();
  const canvasRef = useRef();
  const videoRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const wait = async () => {
      return new Promise(resolve => setTimeout(resolve, 100));
    };

    const getSnapshot = async () => {
      try {
        await wait();
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        // resize thumbnail or no ?
        if (!width || !height) {
          canvas.getContext('2d').drawImage(video, 0, 0);
        } else {
          canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        }

        const thumbnail = canvas.toDataURL('image/png');

        // video.src = ''; // setting to empty string stops video from loading

        dispatch({
          type: 'SET_SNAPSHOT',
          snapshot: thumbnail,
        });
        dispatch({
          type: 'UPDATE_CURRENT_STEP',
        });

        // pass the thumbnail url back to parent component's thumbnail handler (if any)
        if (thumbnailHandler) {
          thumbnailHandler(thumbnail);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (dataLoaded && metadataLoaded && videoRef.current) {
      if (!videoRef.current.currentTime || videoRef.current.currentTime < currentStep * step) {
        videoRef.current.currentTime = currentStep * step;
      }

      if (seeked && !snapshots[currentStep]) {
        getSnapshot();
      }
    }
  }, [
    currentStep,
    dataLoaded,
    height,
    metadataLoaded,
    seeked,
    snapshots,
    snapshotAtTime,
    thumbnailHandler,
    width,
    step,
  ]);

  if (snapshots.length !== snapshotsToTake) {
    return (
      <>
        <Wrapper ref={wrapperRef}>
          <canvas className="snapshot-generator" ref={canvasRef} />
          {/* This is where we should set the video icon until we generate the thumbnail */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png"
            alt=""
          />

          <video
            muted
            className="snapshot-generator"
            ref={videoRef}
            src={videoUrl}
            crossOrigin="anonymous"
            onLoadedMetadata={() => {
              dispatch({
                type: 'METADATA_LOADED',
                duration: videoRef.current.duration,
              });
            }}
            onLoadedData={() => {
              dispatch({
                type: 'DATA_LOADED',
              });
            }}
            onSuspend={() => {
              dispatch({
                type: 'SUSPENDED',
              });
            }}
            onSeeked={() => {
              dispatch({
                type: 'SEEKED',
              });
            }}
          ></video>
        </Wrapper>
      </>
    );
  }

  return (
    <Wrapper>
      <Img files={snapshots} />
    </Wrapper>
  );
};

ThumbnailsVideo.defaultProps = {
  height: null,
  snapshotAtTime: 0,
  width: null,
};
ThumbnailsVideo.propTypes = {};

export default ThumbnailsVideo;
