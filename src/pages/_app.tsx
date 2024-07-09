import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "~/components/Header";
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps} appearance={{
      elements: {
        footer: "hidden",
      },
    }}>
      <Header />
      <Component {...pageProps} />
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
