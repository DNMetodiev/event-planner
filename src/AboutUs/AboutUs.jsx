import './AboutUs.css';
import aboutUsImage from '../assets/about-us-image.png';
const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="section">
        <h2 className="section-heading">Who We Are</h2>
        <p className="section-content">
          At Event Planner, we are more than just a company – we are a family of creative minds and passionate hearts dedicated to transforming spaces and experiences. Our journey began with a simple belief: that every event should be as unique as the individuals hosting it.
          <br /><br />
          We pride ourselves on our meticulous attention to detail, our boundless creativity, and our unwavering commitment to delivering exceptional events. From intimate gatherings to grand celebrations, our team brings a fresh perspective and an innovative approach to ensure your event is memorable.
          <br /><br />
          Our philosophy is grounded in the power of moments – we create events that not only captivate but also resonate deeply with attendees long after they conclude. We understand the pulse of trends yet appreciate the timeless charm of traditions, blending both to craft events that are both modern and meaningful.
          <br /><br />
          With Event Planner, you're not just planning an event; you're scripting memories that last a lifetime. We're here to guide you through every step, from the initial spark of an idea to the final round of applause. Our team is your team, and together, we'll make your vision come to life in ways you've never imagined.
          <br /><br />
          Join us, and let's create something extraordinary.
        </p>
      </div>
      <div className="image-container">
        <img src={aboutUsImage} alt="Our Team" className="section-image" />
      </div>
    </div>
  );
};

export default AboutUs;