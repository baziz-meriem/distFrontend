import Head from "next/head";

import NavBar from "@/components/shared/NavMenu";
import Header from "@/components/homePage/Header";
import HomeHighlights from "@/components/homePage/HomeHighlights";
import HowItWorks from "@/components/homePage/HowItWorks";
import HowHelp from "@/components/homePage/HowHelp";
import Contact from "@/components/homePage/Contact";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Exaview — Vending & distributor operations dashboard</title>
        <meta
          name="description"
          content="Monitor distributors, maps, statistics, reclamations, and teams from one dashboard. Built for operators and field agents."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen overflow-x-hidden bg-creem-green">
        <NavBar />
        <Header />
        <HomeHighlights />
        <HowItWorks />
        <HowHelp />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
