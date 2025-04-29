"use client";
import { useState, useRef } from "react";
import { FiCopy, FiGithub, FiLinkedin, FiBriefcase } from "react-icons/fi";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortUrl, setShortUrl] = useState("");
  const [copy, setCopy] = useState(false);

  interface ShortUrlResponse {
    shortUrl: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = inputRef.current ? inputRef.current.value : null;
    fetch("/api/shortUrl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json() as Promise<ShortUrlResponse>)
      .then((data) => {
        setShortUrl(data.shortUrl);
      });
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard
        .writeText(shortUrl)
        .then(() => {
          setCopy(true);
          setTimeout(() => {
            setCopy(false);
          }, 2000); // Reset after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <h1 className="text-4xl font-bold">URL SHORTENER</h1>
        <p>Shorten your URLs here.</p>

        <div className="flex flex-col sm:flex-row gap-4 w-full items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 w-full items-center"
          >
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter your URL here"
              className="border-2 border-gray-300 rounded-md p-2 w-full sm:w-[400px]"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white rounded-md px-4 py-2 hover:bg-teal-700 transition duration-200"
            >
              Shorten
            </button>
          </form>
        </div>

        {shortUrl && (
          <div className="flex gap-2 items-center mt-4">
            <span className="text-teal-400 font-medium">{shortUrl}</span>
            <FiCopy
              onClick={copyToClipboard}
              className="text-teal-500 hover:text-teal-600 cursor-pointer w-6 h-6 transition-colors duration-200"
            />
            {copy && (
              <span className="text-teal-500 font-semibold text-sm">
                Copied!
              </span>
            )}
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          href="https://vidartec-portfoil.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiBriefcase className="cursor-pointer text-xl hover:text-teal-400" />
        </a>
        <a
          href="https://github.com/SantiagoVidarte"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub className="cursor-pointer text-xl hover:text-teal-400" />
        </a>
        <a
          href="https://www.linkedin.com/in/santiago-martin-vidarte-956266200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiLinkedin className="cursor-pointer text-xl hover:text-teal-400" />
        </a>
      </footer>
    </div>
  );
}
