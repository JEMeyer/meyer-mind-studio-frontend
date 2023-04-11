import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import Page from './components/page';

function App() {
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
