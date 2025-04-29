'use client';
import { useState, useRef } from 'react';


export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = inputRef.current ? inputRef.current.value : null;
    fetch('/api/shortUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
      .then((res => res.json()))
      .then((data => {
        setShortUrl(data.shortUrl);
      }))
  }
  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
        .then(() => {
          alert('Short URL copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };


  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="col-span-2 text-4xl font-bold">ULR SHORTERER</h1>
          <p className="col-span-2  ">Short your urls here.</p>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <form onSubmit={handleSubmit} className="gap-4 flex items-center flex-col sm:flex-row">
              <input type="text" ref={inputRef} placeholder="Enter your URL here" className="border-2 border-gray-300 rounded-md p-2 w-full sm:w-[400px]" />
              <button type="submit" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200">Shorten</button>

            </form>

          </div>
            {shortUrl && (
              <div className=" col-span-2 p-4 m-2 gap-2">
                <span>{shortUrl}</span>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="bg-blue-500 text-white rounded-md p-2 mx-2 hover:bg-blue-600 transition duration-200"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

        </footer>
      </div>
    </>
  );
};
