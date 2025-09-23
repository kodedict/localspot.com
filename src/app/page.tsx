
import HomePage from '@/components/page/Homepage';
import Footer from '@/components/partials/footer';
import Navbar from '@/components/partials/nav';

export const metadata = {
  title: "Car Boot Sales in United Kingdom",
  description: "Discover top-rated car boot sales in United Kingdom.",
};

export default function Home() {
  return (
    <>
      <Navbar/>
      <HomePage/>
      <Footer/>
    </>
  );
}