export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Buy <span className="text-eco-primary">Local.</span> Save the <span className="text-eco-primary">Planet.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          LocalLoop connects you with sustainable vendors directly in your neighborhood. Start discovering an eco-friendly way to shop.
        </p>
      </div>
    </div>
  );
}
