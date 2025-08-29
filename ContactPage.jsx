import React from "react";
import "./ContactPage.css";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="contact-wrapper">
      {/* ===== Hero ===== */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div data-aos="fade-up" data-aos-delay="100">
              <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">Contact our team</h1>
              <p className="hero-desc" data-aos="fade-up" data-aos-delay="300">
                Questions about courses, partnerships, or enterprise training?
                Reach out—we typically reply within one business day.
              </p>

              {/* Socials */}
              <div className="social-links" data-aos="fade-up" data-aos-delay="400">
                <a href="#" className="social-btn">
                  <Facebook size={16} /> Facebook
                </a>
                <a href="#" className="social-btn">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="#" className="social-btn">
                  <Twitter size={16} /> X / Twitter
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-card" data-aos="fade-left" data-aos-delay="500">
              <div className="stat" data-aos="fade-up" data-aos-delay="600">
                <p className="stat-number">24h</p>
                <p className="stat-label">Avg. response</p>
              </div>
              <div className="stat" data-aos="fade-up" data-aos-delay="700">
                <p className="stat-number">1k+</p>
                <p className="stat-label">Learners</p>
              </div>
              <div className="stat" data-aos="fade-up" data-aos-delay="800">
                <p className="stat-number">20+</p>
                <p className="stat-label">Partners</p>
              </div>
              <p className="stat-footer" data-aos="fade-up" data-aos-delay="900">
                <Clock size={14} /> Sun–Fri · 10:00–17:00 NPT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Main Content ===== */}
      <section className="content-section">
        <div className="content-grid">
          {/* Info Card */}
          <div className="info-card" data-aos="fade-right" data-aos-delay="200">
            <h2>Contact Information</h2>
            <p>Visit us or drop a line—let’s build something great.</p>

            <div className="info-list">
              <p data-aos="fade-up" data-aos-delay="500">
                <span style={{
                  color: '#3b82f6', 
                  marginRight: '15px', 
                  fontSize: '18px', 
                  display: 'inline-block',
                  width: '24px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>📍</span>
                <span>
                  <strong>Purano Baneshwor</strong><br />
                  Kathmandu 44600, Nepal
                </span>
              </p>
              <p data-aos="fade-up" data-aos-delay="600">
                <span style={{
                  color: '#3b82f6', 
                  marginRight: '15px', 
                  fontSize: '18px', 
                  display: 'inline-block',
                  width: '24px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>📞</span>
                <span>
                  <strong>+977-9800000000</strong><br />
                  Mon-Fri 10:00 AM - 6:00 PM
                </span>
              </p>
              <p data-aos="fade-up" data-aos-delay="700">
                <span style={{
                  color: '#3b82f6', 
                  marginRight: '15px', 
                  fontSize: '18px', 
                  display: 'inline-block',
                  width: '24px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>✉️</span>
                <span>
                  <strong>hello@bridgeai.com</strong><br />
                  support@bridgeai.com
                </span>
              </p>
            </div>

            <div className="social-links" data-aos="fade-up" data-aos-delay="800">
              <a href="#" className="social-pill">
                <Facebook size={16} />
              </a>
              <a href="#" className="social-pill">
                <Linkedin size={16} />
              </a>
              <a href="#" className="social-pill">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Form Card */}
          <div className="form-card" data-aos="fade-left" data-aos-delay="300">
            <h2>Send us a message</h2>
            <p>Tell us about your query—courses, B2B training, or partnerships.</p>
            <form>
              <input type="text" placeholder="e.g. Indra Giri" required data-aos="fade-up" data-aos-delay="400" />
              <input type="email" placeholder="you@example.co" required data-aos="fade-up" data-aos-delay="500" />
              <textarea placeholder="Your Message" rows="5" required data-aos="fade-up" data-aos-delay="600" />
              <button type="submit" className="btn-blue" data-aos="fade-up" data-aos-delay="700">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
