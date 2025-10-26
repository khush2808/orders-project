import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          Trading Order Form
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          A learning project with Next.js, MobX, and React Hook Form
        </p>
        <Link
          href="/order"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Go to Order Form →
        </Link>
      </div>
    </div>
  );
}
