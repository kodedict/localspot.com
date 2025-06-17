import Navbar from "../components/partials/nav";
import Footer from "../components/partials/footer";


const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default GuestLayout