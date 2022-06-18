import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Meta(params) {
    const router = useRouter()

    const route = params.route ?? router.pathname
    const description = params.description ?? 'CJT Devs Site Template'
    const title = params.title ?? 'CJT Devs Site Template'
    const image = `${process.env.NEXT_PUBLIC_URL}/${params.image ?? 'images/preview.png'}`
    const url = params.url ?? `${process.env.NEXT_PUBLIC_URL}${route}`

    return (
        <Head>
            <meta
                property="og:url"
                content={url}
            />
            <meta key="ogtype" property="og:type" content="article" />
            <meta key="ogtitle" property="og:title" content={title} />
            <meta
                key="ogdescription"
                property="og:description"
                content={description}
            />
            <meta key="ogimage" property="og:image" content={image} />
            <meta key="description" name="description" content={description} />
            <meta key="twititle" name="twitter:title" content={title} />
            <meta
                key="twidescription"
                name="twitter:description"
                content={description}
            />
            <meta key="twiimage" name="twitter:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />
            <title>{title}</title>
        </Head>
    )
}
