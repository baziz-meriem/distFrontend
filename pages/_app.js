import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/authContext";
import { Router } from "next/router";
import Loading from "@/pages/Loading";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin"],
});

Router.events.on("routeChangeStart", () => {
  // Show loading skeleton when route changes
  document.getElementById("loading-skeleton").style.display = "block";
});

Router.events.on("routeChangeComplete", () => {
  // Hide loading skeleton when route changes are complete
  document.getElementById("loading-skeleton").style.display = "none";
});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <main className={montserrat.className}>
        <DashboardLayout>
          <div id="loading-skeleton" style={{ display: "none" }}>
            <Loading />
          </div>
          <Component {...pageProps} />
        </DashboardLayout>
      </main>
    </AuthProvider>
  );
}
