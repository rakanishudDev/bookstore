import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
import Layout from '../components/Layout'
import { AppStateProvider } from '../utilis/AppStateProvider'


export default function App({ Component, pageProps: {session, ...pageProps} }) {

  return (
    <SessionProvider session={session}>
      <AppStateProvider>
        <Layout><Component {...pageProps} /></Layout>
      </AppStateProvider>
    </SessionProvider>)
}
