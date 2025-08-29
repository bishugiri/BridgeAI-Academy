import React, { useState, useEffect } from 'react';
import './App.css';
import GenerativeAI from './components/GenerativeAI.jsx';
import Contact from './components/ContactPage.jsx';

function App() {
  // Add a simple test to see if React is rendering
  console.log('App component is rendering');
  
  const [currentPage, setCurrentPage] = useState(() => {
    // Get saved page from localStorage, default to 'home'
    const savedPage = localStorage.getItem('currentPage');
    return savedPage || 'home';
  });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentToolSlide, setCurrentToolSlide] = useState(0);
  
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    // Save page to localStorage for persistence
    localStorage.setItem('currentPage', page);
    setActiveDropdown(null);
  };

  const nextToolSlide = () => {
    setCurrentToolSlide((prev) => (prev === 1 ? 0 : prev + 1));
  };

  const prevToolSlide = () => {
    setCurrentToolSlide((prev) => (prev === 0 ? 1 : prev - 1));
  };

  const goToToolSlide = (index) => {
    setCurrentToolSlide(index);
  };

  // Auto-advance slides every 5 seconds
  React.useEffect(() => {
    // No longer needed since we only have one slide
    return () => {};
  }, []);

  // Scroll detection for scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside or scrolling
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.dropdown')) {
        setActiveDropdown(null);
      }
    };

    const handleScroll = () => {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeDropdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Header/Navigation */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div 
                className="cursor-pointer"
                onClick={() => navigateToPage('home')}
              >
                <img src="/logo.png" alt="BRIDGE AI" className="h-8 w-auto" />
              </div>
            </div>
          
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">About</a>
              <a href="#community" className="text-gray-300 hover:text-white transition-colors duration-200">Community</a>
              <a href="#events" className="text-gray-300 hover:text-white transition-colors duration-200">Events</a>
              <a 
                onClick={() => navigateToPage('contact')} 
                className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Contact
              </a>
              <div className="relative dropdown">
                <button 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  onClick={() => toggleDropdown('learning')}
                >
                  Learning ▼
                </button>
                {activeDropdown === 'learning' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <a onClick={() => navigateToPage('generative-ai')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">✨ Generative AI & LLMs</a>
                    <a href="#ai-ml-pathfinder" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">🗺️ AI/ML Learning Pathfinder</a>
                    <a href="#ai-basics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">⚙️ AI Basics</a>
                    <a href="#learning-paths" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">🎓 Learning Paths</a>
                  </div>
                )}
              </div>
              <div className="relative dropdown">
                <button 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  onClick={() => toggleDropdown('tools')}
                >
                  Tools ▼
                </button>
                {activeDropdown === 'tools' && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <a href="#coding-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">💻 Coding Tools</a>
                    <a href="#interview-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">🎯 Interview Prep</a>
                    <a href="#email-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">📧 Email Tools</a>
                    <a href="#resume-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">📄 Resume Tools</a>
                    <a href="#presentation-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">📊 Presentation Tools</a>
                    <a href="#research-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">🔍 Research Tools</a>
                    <a href="#excel-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">📈 Excel Tools</a>
                    <a href="#automation-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">⚙️ Automation Tools</a>
                    <a href="#image-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">🖼️ Image Tools</a>
                    <a href="#meeting-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">📅 Meeting Tools</a>
                    <a href="#design-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">🎨 Design Tools</a>
                    <a href="#video-tools" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">🎥 Video Tools</a>
                  </div>
                )}
              </div>
              <div className="relative dropdown">
                <a href="#blog" className="text-gray-300 hover:text-white transition-colors duration-200">Blog ▼</a>
              </div>
            </nav>
            
            <div className="flex items-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                Book A Meeting
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Navigation */}
      {currentPage !== 'home' && (
        <div className="page-navigation">
          <button 
            className="back-btn"
            onClick={() => setCurrentPage('home')}
          >
            ← Back to Home
          </button>
        </div>
      )}

      {/* Conditional Page Rendering */}
      {currentPage === 'generative-ai' ? (
        <GenerativeAI />
      ) : currentPage === 'contact' ? (
        <Contact />
      ) : (
        <>
          {/* Hero Slider Section */}
          <section className="hero-slider min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"></div>
            </div>
            
            <div className="slider-container w-full relative z-10">
              {/* Single Home Slide */}
              <div className="slide slide-1 active">
                <div className="hero-grid grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Left Side - Content */}
                  <div className="hero-content text-center lg:text-left">
                    <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      Master the Future of Technology
                    </h1>
                    <p className="hero-subtitle text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                      Stay ahead of the curve with our cutting-edge AI courses, hands-on projects, 
                      and industry connections. Build real-world skills that employers demand.
                    </p>
                    <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button className="cta-primary bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Explore Courses →
                      </button>
                      <button className="cta-secondary bg-transparent border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10">
                        View Projects ▶️
                      </button>
                    </div>
                  </div>
                  
                  {/* Right Side - Image with seamless background integration */}
                  <div className="hero-image flex justify-center lg:justify-end">
                    <div className="relative group">
                      {/* Main image with background blending */}
                      <div className="relative overflow-hidden rounded-3xl">
                        <img 
                          src="/hero-image.jpg" 
                          alt="AI Technology and Learning" 
                          className="hero-img w-full max-w-md lg:max-w-lg xl:max-w-xl object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Gradient overlay that matches background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-blue-900/30 to-indigo-900/40"></div>
                        
                        {/* Subtle border glow that matches background colors */}
                        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                        
                        {/* Floating elements that blend with background */}
                        <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-sm"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-purple-500/20 rounded-full blur-sm"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-indigo-500/20 rounded-full blur-md"></div>
                      </div>
                      
                      {/* Background extension for seamless blending */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 rounded-3xl blur-xl opacity-50 -z-10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="main-content bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
            {/* Growing AI Community Section */}
            <section className="community-stats py-16">
              <h2 className="zigzag-title text-4xl font-bold text-center text-white mb-12">Growing AI Community</h2>
              <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                <div className="stat-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="stat-icon text-4xl mb-3">👥</div>
                  <div className="stat-number text-3xl font-bold text-white mb-2">700+</div>
                  <div className="stat-label text-gray-300">Community Members</div>
                </div>
                <div className="stat-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="stat-icon text-4xl mb-3">📅</div>
                  <div className="stat-number text-3xl font-bold text-white mb-2">50+</div>
                  <div className="stat-label text-gray-300">Events Hosted</div>
                </div>
                <div className="stat-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="stat-icon text-4xl mb-3">💬</div>
                  <div className="stat-number text-3xl font-bold text-white mb-2">1000+</div>
                  <div className="stat-label text-gray-300">Discussions</div>
                </div>
                <div className="stat-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="stat-icon text-4xl mb-3">🎯</div>
                  <div className="stat-number text-3xl font-bold text-white mb-2">95%</div>
                  <div className="stat-label text-gray-300">Success Rate</div>
                </div>
              </div>
            </section>

            {/* Why Choose BridgeAI Section - Zigzag Design */}
            <section className="features-zigzag py-20">
              <div className="zigzag-container max-w-7xl mx-auto px-4">
                <h2 className="zigzag-title text-4xl font-bold text-center text-white mb-6">Why Choose BridgeAI?</h2>
                <p className="zigzag-subtitle text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
                  Experience learning like never before with our comprehensive AI-powered platform
                </p>
                
                <div className="zigzag-features">
                  {/* Feature 1 - Left */}
                  <div className="zigzag-feature left mb-16" data-aos="fade-right" data-aos-delay="100">
                    <div className="feature-content bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <div className="feature-icon-wrapper flex justify-center mb-6">
                        <div className="feature-icon text-6xl">🧠</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">AI-Powered Learning</h3>
                      <p className="text-gray-300 text-center leading-relaxed">Personalized learning paths adapted to your pace and style with intelligent recommendations.</p>
                    </div>
                  </div>

                  {/* Feature 2 - Right */}
                  <div className="zigzag-feature right mb-16" data-aos="fade-left" data-aos-delay="200">
                    <div className="feature-content bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <div className="feature-icon-wrapper flex justify-center mb-6">
                        <div className="feature-icon text-6xl">👥</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">Expert Mentorship</h3>
                      <p className="text-gray-300 text-center leading-relaxed">Get guidance from industry professionals and AI experts throughout your learning journey.</p>
                    </div>
                  </div>

                  {/* Feature 3 - Left */}
                  <div className="zigzag-feature left mb-16" data-aos="fade-right" data-aos-delay="300">
                    <div className="feature-content bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <div className="feature-icon-wrapper flex justify-center mb-6">
                        <div className="feature-icon text-6xl">📚</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">Rich Content Library</h3>
                      <p className="text-gray-300 text-center leading-relaxed">Access comprehensive resources including videos, articles, and hands-on projects.</p>
                    </div>
                  </div>

                  {/* Feature 4 - Right */}
                  <div className="zigzag-feature right mb-16" data-aos="fade-left" data-aos-delay="400">
                    <div className="feature-content bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <div className="feature-icon-wrapper flex justify-center mb-6">
                        <div className="feature-icon text-6xl">📅</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">Live Events</h3>
                      <p className="text-gray-300 text-center leading-relaxed">Join workshops, webinars, and networking sessions with fellow AI enthusiasts and learners.</p>
                    </div>
                  </div>

                  {/* Feature 5 - Left */}
                  <div className="zigzag-feature left mb-16" data-aos="fade-right" data-aos-delay="500">
                    <div className="feature-content bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <div className="feature-icon-wrapper flex justify-center mb-6">
                        <div className="feature-icon text-6xl">🌍</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">Global Community</h3>
                      <p className="text-gray-300 text-center leading-relaxed">Connect with AI enthusiasts worldwide and build your professional network in tech.</p>
                    </div>
                  </div>

                  {/* Feature 6 - Right */}
                  <div className="zigzag-feature right mb-16" data-aos="fade-left" data-aos-delay="600">
                    <div className="feature-content bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <div className="feature-icon-wrapper flex justify-center mb-6">
                        <div className="feature-icon text-6xl">📈</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">Career Growth</h3>
                      <p className="text-gray-300 text-center leading-relaxed">Build practical AI skills and industry-recognized certifications for professional advancement.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Popular Learning Paths Section */}
            <section className="learning-paths py-20">
              <h2 className="text-4xl font-bold text-center text-white mb-6">Popular Learning Paths</h2>
              <p className="section-subtitle text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
                Choose your path and start your AI journey today
              </p>
              
              <div className="paths-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                <div className="path-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="path-icon text-6xl text-center mb-6">🧠</div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">AI Basics Learning Path</h3>
                  <p className="text-gray-300 text-center mb-6 leading-relaxed">Complete beginner's guide to AI fundamentals, machine learning concepts, and practical applications.</p>
                  <div className="path-meta flex justify-center gap-4 mb-6">
                    <span className="duration bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">5.5 hours</span>
                    <span className="difficulty beginner bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Beginner</span>
                  </div>
                  <button className="start-learning w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300">Start Learning →</button>
                </div>
                
                <div className="path-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="path-icon text-6xl text-center mb-6">&lt;/&gt;</div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">AI/ML Learning Pathfinder</h3>
                  <p className="text-gray-300 text-center mb-6 leading-relaxed">Your comprehensive guide to mastering AI and Machine Learning with hands-on projects.</p>
                  <div className="path-meta flex justify-center gap-4 mb-6">
                    <span className="duration bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Self-Paced</span>
                    <span className="difficulty intermediate bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">Intermediate</span>
                  </div>
                  <button className="start-learning w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300">Start Learning →</button>
                </div>
                
                <div className="path-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="path-icon text-6xl text-center mb-6">⚡</div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">AI Expert Learning Path</h3>
                  <p className="text-gray-300 text-center mb-6 leading-relaxed">Comprehensive 1-year AI degree path covering advanced concepts and industry applications.</p>
                  <div className="path-meta flex justify-center gap-4 mb-6">
                    <span className="duration bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">4 Years</span>
                    <span className="difficulty advanced bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">Advanced</span>
                  </div>
                  <button className="start-learning w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300">Start Learning →</button>
                </div>
              </div>
              
              <div className="view-all-container text-center mt-12">
                <button className="view-all-btn bg-transparent border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10">View All Learning Paths →</button>
              </div>
            </section>

            {/* Coding Tools Section */}
            <section id="coding-tools" className="coding-tools py-20">
              <h2 className="text-4xl font-bold text-center text-white mb-6">AI-Powered Coding Tools</h2>
              <p className="section-subtitle text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
                Supercharge your development workflow with cutting-edge AI coding assistants
              </p>
              
              <div className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                <div className="tool-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="tool-icon text-6xl text-center mb-6">💻</div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Code Generator</h3>
                  <p className="text-gray-300 text-center mb-6 leading-relaxed">Generate production-ready code snippets, functions, and complete modules using natural language descriptions.</p>
                  <div className="tool-features flex flex-wrap justify-center gap-2 mb-6">
                    <span className="feature-tag bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Multi-language</span>
                    <span className="feature-tag bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">AI-powered</span>
                    <span className="feature-tag bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Real-time</span>
                  </div>
                  <button className="try-tool-btn w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300">Try Now →</button>
                </div>
                
                <div className="tool-card">
                  <div className="tool-icon">🔍</div>
                  <h3>Code Analyzer</h3>
                  <p>AI-powered code review that identifies bugs, suggests optimizations, and ensures best practices.</p>
                  <div className="tool-features">
                    <span className="feature-tag">Bug Detection</span>
                    <span className="feature-tag">Performance</span>
                    <span className="feature-tag">Security</span>
                  </div>
                  <button className="try-tool-btn">Try Now →</button>
                </div>
                
                <div className="tool-card">
                  <div className="tool-icon">📝</div>
                  <h3>Documentation Writer</h3>
                  <p>Automatically generate comprehensive documentation, README files, and API documentation from your code.</p>
                  <div className="tool-features">
                    <span className="feature-tag">Auto-generate</span>
                    <span className="feature-tag">Multiple formats</span>
                    <span className="feature-tag">Smart parsing</span>
                  </div>
                  <button className="try-tool-btn">Try Now →</button>
                </div>
                
                <div className="tool-card">
                  <div className="tool-icon">🧪</div>
                  <h3>Test Generator</h3>
                  <p>Create comprehensive test suites, unit tests, and integration tests automatically for your codebase.</p>
                  <div className="tool-features">
                    <span className="feature-tag">Unit Tests</span>
                    <span className="feature-tag">Integration</span>
                    <span className="feature-tag">Coverage</span>
                  </div>
                  <button className="try-tool-btn">Try Now →</button>
                </div>
                
                <div className="tool-card">
                  <div className="tool-icon">🔧</div>
                  <h3>Code Refactorer</h3>
                  <p>Intelligent code refactoring suggestions to improve readability, performance, and maintainability.</p>
                  <div className="tool-features">
                    <span className="feature-tag">Smart suggestions</span>
                    <span className="feature-tag">Performance</span>
                    <span className="feature-tag">Clean code</span>
                  </div>
                  <button className="try-tool-btn">Try Now →</button>
                </div>
                
                <div className="tool-card">
                  <div className="tool-icon">🚀</div>
                  <h3>Deployment Assistant</h3>
                  <p>AI-powered deployment automation with intelligent error handling and rollback capabilities.</p>
                  <div className="tool-features">
                    <span className="feature-tag">Auto-deploy</span>
                    <span className="feature-tag">Monitoring</span>
                    <span className="feature-tag">Rollback</span>
                  </div>
                  <button className="try-tool-btn">Try Now →</button>
                </div>
              </div>
              
              <div className="tools-cta text-center mt-16">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Coding Experience?</h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of developers who've already accelerated their workflow with AI-powered tools.</p>
                <button className="cta-primary bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">Get Access to All Tools →</button>
              </div>
            </section>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* Bridge AI Academy Column */}
          <div className="footer-column">
            <h3 className="footer-brand">Bridge AI Academy</h3>
            <p className="footer-slogan">Learn. Unlearn. Build.</p>
            <p className="footer-description">
              Empowering Nepal's next generation of AI professionals with world-class training and hands-on experience.
            </p>
            <div className="social-icons">
              <a href="#facebook" className="social-icon facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#threads" className="social-icon threads">
                <i className="fa-brands fa-threads"></i>
              </a>
              <a href="#linkedin" className="social-icon linkedin">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          {/* Contact Column */}
          <div className="footer-column">
            <h4>Contact</h4>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              <div>
                <p>Kathmandu Tech Hub</p>
                <p>New Baneshwor, Kathmandu</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone contact-icon"></i>
              <p>+977 98X-XXXXXXX</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope contact-icon"></i>
              <p>hello@bridgeai.academy</p>
            </div>
            <button className="whatsapp-btn">Join WhatsApp Group</button>
          </div>
          
          {/* Quick Links Column */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="quick-links">
              <li><a href="#programs">Programs</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div className="footer-column">
            <h4>Stay Updated</h4>
            <p>Get the latest news about AI, our programs, and industry insights.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
              />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2025 IB Analytics. All rights reserved.</p>
          <div className="legal-links">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
