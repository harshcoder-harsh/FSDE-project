export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} LocalLoop. Eco-friendly hyper-local e-commerce.</p>
      </div>
    </footer>
  );
}
