export const Spinner = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-black text-center">
    <svg
      className="animate-spin h-32 w-32 text-indigo-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
    >
      <circle
        className="text-white/10"
        cx="50"
        cy="50"
        r="42"
        stroke="currentColor"
        stroke-width="8"
        fill="none"
      />
      <path
        d="M50 8a42 42 0 0 1 42 42"
        stroke="currentColor"
        stroke-width="8"
        stroke-linecap="round"
        fill="none"
      />
    </svg>
  </div>
)
