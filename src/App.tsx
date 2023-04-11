import GoogleAuth from './auth/GoogleAuth';
import ImageGenerator from './components/ImageGenerator';

function App() {
  return (
    <div className="App">
      <GoogleAuth />
      <ImageGenerator />
    </div>
  );
}

export default App;
