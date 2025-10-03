import Footer from "@/components/Frontend/Footer";
import Navbar from "@/components/Frontend/Navigation/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen py-12 bg-slate-50">
        <main className="my-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
