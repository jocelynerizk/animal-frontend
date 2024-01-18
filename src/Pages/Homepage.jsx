import NavBar from '../components/heropage/NavBar.jsx';
import Herosection from '../components/heropage/Herosection.jsx';
import Footer from '../components/heropage/Footer.jsx';
import Copyright from '../components/heropage/Copyright.jsx';

const Homepage = () => {
  return (
    <div className="Homepage">

     {/* <QRCodeGenerator /> */}
      {/* <QRCodeScannerFromPaper /> */}

      <NavBar />
      <Herosection />
      <Footer />
      <Copyright />


    </div>
  );
};

export default Homepage;
