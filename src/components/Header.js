// imported the styles
import '../styles/header.css';

// Header component
const Header = () => {
  return (
    // header element
    <header>
      {/* wrapper container */}
      <div className="wrapper">
        {/* title of app */}
        <h1>
          Box Office Boffo
        </h1>
      </div>
    </header>
  )
}

export default Header;