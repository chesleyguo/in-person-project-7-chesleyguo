const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Chesley Guo</span>
          </h1>
          <p className="hero-subtitle">
            UC Berkeley Student | Frontend & AI Developer
          </p>
          <p className="hero-description">
            I'm a student at UC Berkeley passionate about software engineering,
            interactive web applications, and artificial intelligence. I enjoy
            building modern, accessible, and data-driven web applications at the
            intersection of design and intelligence.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;