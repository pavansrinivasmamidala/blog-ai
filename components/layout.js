import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <div className="max-w-screen mx-auto">
      <Navbar />
      <main>{children}</main>
      <footer className="mt-8">
        {/* footer content here */}
      </footer>
    </div>
  )
}

export default Layout;
