"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "@/styles/style.scss";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <html lang="en">
      <head>
        <title>
          Egamlio - Esports and Gaming Courses Website NextJS Template
        </title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={poppins.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            {children}
            <Footer />
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
