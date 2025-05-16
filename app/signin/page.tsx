export default function Signin() {
  return (
    <div>
      <div
        style={{ fontFamily: "var(--font-dm-mono)" }}
        className="bg-noise text-white min-h-screen flex items-center justify-center"
      >
        <div className="p-6 g-2  border rounded-xl shadow-lg w-full max-w-md ">
          <h1 className="text-4xl font-bold tracking-wider mb-4 text-center">
            Sign In
          </h1>
          <form className="flex flex-col gap-4">
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
              className="mt-4 bg-primary hover:bg-primary-hover text-white py-2 rounded-md font-semibold transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
