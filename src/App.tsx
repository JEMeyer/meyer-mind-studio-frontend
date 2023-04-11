import styled from 'styled-components';
import GoogleAuth from './auth/GoogleAuth';
import ImageGenerator from './components/ImageGenerator';

function App() {
  return (
    <div className="App">
      <Container>
        <Banner>
          <AppName>Meyer Mind Studio</AppName>
          <GoogleAuth />
        </Banner>
        <Main>
          {/* <Carousel /> */}
          <ImageGenerator /> 
        </Main>
      </Container>
      {/* 
      */}
    </div>
  );
}

export default App;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Banner = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1e1e1e;
`;

const AppName = styled.h1`
  color: white;
  font-size: 24px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

