import  { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBookOpen, FaCalendarAlt, FaUsers} from 'react-icons/fa';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="page-header-section">
        <div className="container-animate-fade-up">
          <span className="badge">About FreshFind</span>
          <h1 className="page-title">Making Local Markets Easier to Discover</h1>
          <p className="page-subtitle">FreshFind brings useful farmers’ market information together so residents can discover nearby markets, explore seasonal produce, and plan their visits with confidence.</p>
        </div>
      </div>

      {/* Our Story */}
      <div className="container section">
        <div className="about-grid animate-fade-up delay-1">
          <div className="about-text">
            <h2>Why freshFind Exists</h2>
            <p>Welcome to fresh find, a simple and accessible platform created to help communities discover nearby farmers' markets and make the most of fresh, seasonal, and locally produced goods.Finding farmers' markets can sometimes be difficult because information about their locations, operating days, opening hours, and available products may be scattered across social media, flyers, community boards, and word of mouth.   FreshFind brings this information together in one convenient place.
             </p>

            <p>FreshFind brings market locations, opening times, and produce information together in one simple platform.</p>

            <p className="highlight-text">FreshFind is a digital space for agriculture that connects farmers, buyers, and agricultural communities. It helps users discover fresh produce, explore market information, learn about farming, and connect with opportunities across the agricultural sector.</p>

          </div>
          <div className="about-image">
            <img src="https://res.cloudinary.com/tummi9le/image/upload/v1790335510/image20.png" alt="Community Market" />
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="mission-section section">
        <div className="container animate-fade-up">
          <h2>Our Mission</h2>
          <p className="mission-text">To make it easier for people to discover local farmers’ markets and make the most of fresh, seasonal produce in their community.</p>
        </div>
      </div>

      {/* What We Do */}
      <div className="container section">
        <div className="section-header animate-fade-up">
          <h2>What We Do</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card animate-fade-up delay-1">
            <div className="feature-icon"><FaSearch /></div>
            <h3>Find Local Markets</h3>
            <p>Discover farmers’ markets around your community.</p>
          </div>
          <div className="feature-card animate-fade-up delay-2">
            <div className="feature-icon"><FaBookOpen /></div>
            <h3>Learn About Produce</h3>
            <p>Explore produce, categories, seasons, and availability.</p>
          </div>
          <div className="feature-card animate-fade-up delay-3">
            <div className="feature-icon"><FaCalendarAlt /></div>
            <h3>Plan Your Visit</h3>
            <p>Check market schedules and decide when to go.</p>
          </div>
          <div className="feature-card animate-fade-up delay-4">
            <div className="feature-icon"><FaUsers /></div>
            <h3>Support Local Communities</h3>
            <p>Make it easier for residents and local farmers to connect.</p>
          </div>
        </div>
      </div>

      {/* Team & CTA */}
      <div className="container section">
        <div className="team-cta-container animate-fade-up">
          <div className="team-info">
            <h2>Meet the Team</h2>
            <p>FreshFind is built by a team focused on creating a simple and accessible way to discover local markets.</p>
            <div className="team-icons">
              <div className="team-icon">
                <img className='team-member' src="https://res.cloudinary.com/tummi9le/image/upload/v1790345855/Image.jpg" alt="Team Member" />
                <span>Ayoleye Ayonitemi</span>
                <span>Developer</span>
              </div>

              <div className="team-icon">
                <img className='team-member' src="https://res.cloudinary.com/tummi9le/image/upload/v1790346862/Image_1.jpg" alt="Team Icon" />
                <span>Adesawe Oreoluwa</span>
                <span>Developer</span>
              </div>

                <div className="team-icon">
                <img className='team-member' src="https://res.cloudinary.com/tummi9le/image/upload/v1790347531/joe.jpg" alt="Team Icon" />
                <span>Nnamdi Henry</span>
                <span>Developer</span>
              </div>

              <div className="team-icon">
                <img className='team-member' src="https://res.cloudinary.com/tummi9le/image/upload/v1790348817/Will.jpg" alt="Team Icon" />
                <span>Amadi Godswill</span>
                <span>Developer</span>
              </div>

              <div className="team-icon">
                <img className='team-member' src="https://res.cloudinary.com/tummi9le/image/upload/v1790352138/AY.jpg" alt="Team Icon" />
                <span>Ayodeji Keshinro</span>
                <span>Developer</span>
              </div>

              <div className="team-icon">
                <img className='team-member' src="https://res.cloudinary.com/tummi9le/image/upload/v1790352401/Dan.jpg" alt="Team Icon" />
                <span>Daniel Olalekan</span>
                <span>Developer</span>
              </div>

              
            
            </div>
          </div>

          <div className="cta-box">
            <h3>Ready to Discover What's Fresh?</h3>
            <Link to="/markets" className="btn btn-primary" style={{marginTop: '1rem'}}>Find a Market</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;