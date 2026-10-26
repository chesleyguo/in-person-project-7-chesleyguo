const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Chesley Guo</h3>
            <p>UC Berkeley Student | Frontend & AI Developer</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://github.com/chesleyguo" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:chesleyguo@berkeley.edu">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Chesley Guo. UC Berkeley. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;