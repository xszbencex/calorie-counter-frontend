import Document, {Head, Html, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="hu">
        <Head>
          <meta name="description" content="Kalória számláló alkalmazás"/>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="icon" href="/favicon.ico"/>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
          <div id="custom-overlays"/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
