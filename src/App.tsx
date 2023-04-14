import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import Page from './components/page';
import useQuery from './hooks/useQuery';
import { useEffect } from 'react';
import useSharedVideo from './hooks/useSharedVideo';


function App() {
  const query = useQuery();
  const videoId = query.get('videoId') || '';
  const { fetchSharedVideo } = useSharedVideo();
  

  useEffect(() => {
    if (videoId) {
      fetchSharedVideo(videoId);
    }
  }, [fetchSharedVideo, videoId]);

  return (
    <div className="App">
        <Container>
          <Header />
          <Page />
        </Container>
        <ToastContainer />
    </div>
  );
}

export default App;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
