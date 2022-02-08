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
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="icon" href="/favicon.ico"/>
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
