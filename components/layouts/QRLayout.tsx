import { FC } from "react";
import Head from "next/head";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const QRLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <main className="container mx-auto mt-3">
        <div className="flex justify-center">
          <h1 className="text-4xl md:text-7xl pb-2">Generador QR</h1>
        </div>
        {children}
      </main>
    </>
  );
};
