import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import Wrapper from "@/components/Wrapper/Wrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Wrapper>
      <div>
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </Wrapper>
  );
}
