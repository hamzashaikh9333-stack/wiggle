import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DownloaderPage } from './features/downloader/DownloaderPage';
import './styles/variables.css';
import './styles/global.css';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <DownloaderPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
