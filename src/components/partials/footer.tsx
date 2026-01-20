import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#424242] text-[#959595]">
      <div className="outer-container">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 md:grid-cols-4 lg:py-8">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">LocalSpot</h2>
            <p className="font-medium">
                The UK&apos;s largest directory of car boot sales, markets, and local events.
            </p>
            <div className="mt-4 flex space-x-4 rtl:space-x-reverse">
              <div className="bg-[#555555] text-white rounded-full  h-[2em] w-[2em] flex items-center justify-center">f</div>
              <div className="bg-[#555555] text-white rounded-full  h-[2em] w-[2em] flex items-center justify-center">i</div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white capitalize">Quick Links</h2>
            <ul className="font-medium grid gap-2">
              <li><a href="/search/car-boot" className="hover:underline hover:text-white">Find Bootsales</a></li>
              <li><a href="/upcoming-car-boot-sales" className="hover:underline hover:text-white">Upcoming Car Boot Sales</a></li>
              <li><a href="/popular-car-boot-sales" className="hover:underline hover:text-white">Popular Car Boot Sales</a></li>
              <li><a href="#" className="hover:underline hover:text-white">List Your Sale</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white capitalize">Support</h2>
            <ul className="font-medium grid gap-2">
              <li><a href="#" className="hover:underline hover:text-white">Help center</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:underline hover:text-white">About LocalBoot</a></li>
              <li><a href="#" className="hover:underline hover:text-white">How It Works</a></li>
              <li><a href="#" className="hover:underline hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white capitalize">Legal</h2>
            <ul className="font-medium grid gap-2">
              <li><a href="#" className="hover:underline hover:text-white">Terms and conditions</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Disclaimer</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Accessibility</a></li>
            </ul>
          </div>
        </div>
        <hr/>
        <div className="px-4 py-6 md:flex-row items-center md:justify-between flex-col flex w-full">
          <span className="text-sm sm:text-center">
            © 2025 <Link href="/" className="hover:underline">LocalSpot</Link>. All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-5 md:mt-0 rtl:space-x-reverse">
            <a href="#" className="hover:text-gray-900">
              Sitemap
            </a>
            <a href="#" className="hover:text-gray-900">
              Security
            </a>
            <a href="#" className="hover:text-gray-900">
              Data Protection
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
