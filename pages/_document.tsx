import React from 'react';
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={this.props.locale || 'en'}>
        <Head>
          {process.env.NODE_ENV === 'production' && (
            <>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-187802373-1"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-187802373-1');`,
                }}
              />
            </>
          )}
        </Head>
        <body className="dark">
          <Main />
          <NextScript />
          <script
            src="//rum-static.pingdom.net/pa-608b3d3c7267e100110002c1.js"
            async
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
