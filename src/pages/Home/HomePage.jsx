import Header from "../../components/header";
import Footer from "../../components/footer";
import GetAllBook from "../../components/getBookData";
import CommonHeader from "../../components/CommonHeader";

const HomePage = () => {
  return (
    <>
      <div>
        <CommonHeader />
        <Header />
        <GetAllBook />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
