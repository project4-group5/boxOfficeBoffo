// imported the styles
import '../styles/footer.css';

// footer component
const Footer = () => {
  return (
    // footer element
    <footer>
      {/* wrapper container */}
      <div className="wrapper">
        {/* footer content */}
        <p>Created at <a href="https://junocollege.com/">Juno College</a></p>
      </div>
    </footer>
  )
}

export default Footer;