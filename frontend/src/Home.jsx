import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import PartsGrid from './components/PartsGrid'

function Home() {
  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <PartsGrid />
      </main>
      <Footer />
    </div>
  );
}

export default Home;