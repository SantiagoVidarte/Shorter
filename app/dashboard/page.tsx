import { getSession } from "@/app/session";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Dashboard() {
  const session = await getSession();
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
        <p className="text-red-600 mb-4 font-medium">You must be signed in to view this page.</p>
        <Link
          href="/pages/api/auth/route"
          className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const urls = await prisma.shortUrl.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-4xl p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Shortened URLs</h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-700">Short</th>
                <th className="p-3 text-sm font-medium text-gray-700">Original</th>
                <th className="p-3 text-sm font-medium text-gray-700">Clicks</th>
                <th className="p-3 text-sm font-medium text-gray-700">Created At</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((u: any) => (
                <tr
                  key={u.id}
                  className="border-t odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3">
                    <Link
                      href={`${process.env.BASE_URL}/${u.short}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {u.short}
                    </Link>
                  </td>
                  <td className="p-3 break-all text-gray-600">{u.original}</td>
                  <td className="p-3 font-medium text-gray-700">{u.clicks}</td>
                  <td className="p-3 text-gray-500 text-sm">
                    {new Date(u.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
