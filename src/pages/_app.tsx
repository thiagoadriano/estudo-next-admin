import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {AppProvider} from "../data/context/appContext";
import {AuthProvider} from "../data/context/authContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
      </AuthProvider>
  )
}
