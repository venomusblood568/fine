export default function Signup() {
  return (
    <div>
      <div
        style={{ fontFamily: "var(--font-dm-mono)" }}
        className="bg-noise text-white min-h-screen flex items-center justify-center"
      >
        <div className="border border-gray-600 bg-black/30 backdrop-blur p-6 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold tracking-wider mb-4 text-center">
            Sign Up
          </h1>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="bg-transparent border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="bg-transparent border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                id="name"
                placeholder="Password"
                className="bg-transparent border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-secondary hover:bg-secondary-hover text-white py-2 rounded-md font-semibold transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
