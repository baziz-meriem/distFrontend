import NavBar from "@/components/shared/NavMenu";
import Contact from "@/components/homePage/Contact";
import Footer from "@/components/shared/Footer";
import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact — Exaview</title>
        <meta
          name="description"
          content="Get in touch about Exaview and distributor operations."
        />
      </Head>
      <div className="min-h-screen bg-creem-green">
        <NavBar />
        <div className="pt-28">
          <Contact />
        </div>
        <Footer />
      </div>
    </>
  );
}
