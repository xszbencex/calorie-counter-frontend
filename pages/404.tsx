import Error from 'next/error';

export default function Custom404() {
  return (
    <>
      <div>custom error page</div>
      <Error statusCode={404}/>
    </>
  );
}
