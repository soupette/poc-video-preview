import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 30px;
  border-radius: 2px;
  background-color: #f6f6f6;

  > img {
    width: 100%;
    // height: 100%;
    object-fit: contain;
    // margin: auto;
  }

  .snaphot-wait {
    width: 100%;
    // height: 100%;
    object-fit: contain;
  }

  .snapshot-generator {
    display: block;
    height: 1px;
    left: 0;
    object-fit: contain;
    position: fixed;
    top: 0;
    width: 1px;
    z-index: -1;
  }
`;

export default Wrapper;
