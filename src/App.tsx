import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Page from "./components/page";
import useQuery from "./hooks/useQuery";
import { useEffect } from "react";
import Footer from "./components/footer";
import FlexDiv from "./components/atoms/flexDiv";
import useSharedContent from "./hooks/useSharedVideo";

function App() {
  const query = useQuery();
  const itemId = query.get("itemId") || "";
  const itemType = query.get("itemType") || "";
  const { fetchSharedContent } = useSharedContent();

  useEffect(() => {
    if (itemId && itemType) {
      fetchSharedContent(itemId, itemType);
    }
  }, [itemId, itemType, fetchSharedContent]);

  return (
    <div className="App">
      <Container>
        <Header />
        <Page />
        <FlexDiv flexGrow={1} />
        <Footer />
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
