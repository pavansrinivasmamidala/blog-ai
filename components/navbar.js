import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white shadow w-screen h-20">
      <div className="flex items-center">
        <Link href="/">
          <span className=" font-bold text-gray-800 mx-4 text-5xl">Blog-AI</span>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/about">
          <span className="text-gray-800 mx-4 hover:text-gray-600 text-xl">About</span>
        </Link>
        <Link href="/contact">
          <span className="text-gray-800 mx-4 hover:text-gray-600 text-xl">Contact</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
