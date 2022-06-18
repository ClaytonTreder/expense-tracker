import Meta from 'pages/Meta'
import {
    react as AboutComponent,
    attributes as content,
} from 'content/pages/about.md'
import styles from "styles/pages/About.module.css"

export default function About() {
    return (
        <>
            <Meta />
            <div
                style={{
                    backgroundColor: content.backgroundColor,
                    color: content.textColor,
                }}
            >
                <h1>{content.title}</h1>
                <AboutComponent />
            </div>
        </>
    )
}
