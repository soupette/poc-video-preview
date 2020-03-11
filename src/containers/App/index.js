/**
 *
 * App
 *
 */

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import client from '../../utils/contentful';
import Video from '../Video';

function App() {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    client.getEntry('7CmhtUsw7DiSHC5DSQnzje').then(data => {
      console.log(data);
      // console.log(data.fields.video.fields.file);
      setVideo(data.fields.video.fields.file);
    });
  }, []);

  if (!video) {
    return 'loading...';
  }

  return (
    <div>
      <Container>
        <Row>
          <Col lg="6">
            <Video
              videoUrl={video.url}
              thumbnailHandler={thumbnail => console.log(thumbnail)}
              // width={120}
              // height={80}
              snapshotAtTime={130}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

App.defaultProps = {};
App.propTypes = {};

export default App;
