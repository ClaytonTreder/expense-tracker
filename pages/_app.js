import 'styles/globals.css'
import 'styles/roots.css'
import Layout from 'pages/Layout'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}

export default MyApp
