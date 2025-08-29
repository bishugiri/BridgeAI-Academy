import React, { useMemo, useState, useEffect } from "react";
import "./GenerativeAI.css";

// ---------- Sample Data ----------

const MODULES = [
  {
    id: "m1",
    title: "Module 1 · Introduction to AI",
    level: "Beginner",
    duration: "1.5 hours",
    price: "Free",
    updated: "2025-08-14",
    tag: "AI for Everyone",
    outcome: "Explain AI in simple terms and spot real uses around you.",
    whatYouLearn: [
      "Simple definition of AI",
      "AI in daily life (Nepal context)",
      "Myths vs reality",
      "Write one personal AI use case",
    ],
    lessons: [
      { title: "What is AI?", duration: "15m", description: "A friendly introduction with everyday examples." },
      { title: "AI in Daily Life (Nepal)", duration: "20m", description: "Banking, agriculture, e‑commerce, social media." },
      { title: "Myths vs Reality", duration: "15m", description: "Debunk hype and set practical expectations." },
      { title: "Activity: My AI Opportunity", duration: "20m", description: "Define one AI use case for your work or study." },
    ],
  },
  {
    id: "m2",
    title: "Module 2 · How AI Works (The Basics)",
    level: "Beginner",
    duration: "2 hours",
    price: "Free",
    updated: "2025-08-15",
    tag: "AI for Everyone",
    outcome: "Understand data, models, and simple learning types.",
    whatYouLearn: [
      "Data, algorithms, models",
      "Supervised vs unsupervised",
      "Everyday applications of these ideas",
    ],
    lessons: [
      { title: "Data, Algorithms & Models", duration: "25m" },
      { title: "Supervised vs Unsupervised", duration: "25m" },
      { title: "Everyday AI Systems", duration: "20m" },
    ],
  },
];

// ---------- Main GenerativeAI Page ----------

export default function GenerativeAI() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedModule, setSelectedModule] = useState(null);
  const [expandedModules, setExpandedModules] = useState(new Set());

  // Scroll to top when component mounts (page reload)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = MODULES.filter((m) =>
      [m.title, m.tag, m.outcome, ...m.whatYouLearn]
        .filter(Boolean)
        .some((t) => t.toLowerCase().includes(q))
    );
    if (level !== "All") list = list.filter((m) => m.level === level);
    if (activeTab !== "all") list = list.filter((m) => (m.tag || "").toLowerCase() === activeTab);
    return list.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
  }, [query, level, sortBy, activeTab]);

  const toggleModuleExpansion = (moduleId) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  if (selectedModule) {
    return <GenerativeAIModulePage module={selectedModule} onBack={() => setSelectedModule(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b">
      {/* Hero Section */}
      <section className="hero-section py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Main Heading */}
              <div>
                <h1 className="hero-title text-5xl md:text-6xl font-bold text-white mb-4">
                  Bridge AI Academy
                  <div className="w-16 h-1 bg-white my-3"></div>
                  Learning
                </h1>
                <p className="hero-subtitle text-xl text-white/90 max-w-lg">
                  Practical, affordable AI training for Nepal. Explore modules, learn at your pace, and apply AI in real life.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="tag-blue">Local use-cases</span>
                <span className="tag-orange">Hands-on projects</span>
                <span className="tag-white">Beginner-friendly</span>
              </div>
            </div>

            {/* Information Card */}
            <div className="relative">
              <div className="info-card bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: "📚", label: "Modules", value: "2+ live" },
                    { icon: "⏱️", label: "Avg. per module", value: "~2 hours" },
                    { icon: "📊", label: "Levels", value: "Beginner → Advanced" },
                    { icon: "📅", label: "Updated", value: "Weekly" }
                  ].map((item, index) => (
                    <div 
                      key={item.label}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600 mb-1">{item.label}</div>
                        <div className="font-bold text-gray-900 text-lg">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[280px] relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules, outcomes, topics..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Dropdowns */}
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="duration">Duration</option>
              <option value="level">Level</option>
            </select>

            {/* Filters Button */}
            <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* Module Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-blue-600 mb-6">
              Available Learning Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our curated collection of AI learning modules
            </p>
          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filtered.map((m, index) => (
              <div 
                key={m.id} 
                className="group cursor-pointer h-full"
                onClick={() => setSelectedModule(m)}
              >
                <div className="module-card module-card-enhanced overflow-hidden h-full flex flex-col w-full">
                  {/* Header */}
                  <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200 flex-shrink-0">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
                          {m.tag} · Updated {new Date(m.updated).toLocaleDateString()}
                        </div>
                        <h3 className="module-title text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300">
                          {m.title}
                        </h3>
                      </div>
                      <div className="badge-orange px-4 py-2 text-sm font-semibold">
                        {m.level}
                      </div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="px-8 py-6 flex-1 flex flex-col">
                    <div className="flex gap-4 mb-6">
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-lg">⏱️</span>
                        <span className="text-gray-700 font-medium">{m.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-lg">💰</span>
                        <span className="text-gray-700 font-medium">{m.price}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      <strong>Outcome:</strong> {m.outcome}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {m.whatYouLearn.slice(0, 3).map((w, i) => (
                        <span 
                          key={i} 
                          className="feature-tag-enhanced"
                        >
                          {w}
                        </span>
                      ))}
                    </div>

                    {/* Accordion */}
                    <div className="accordion-enhanced flex-1">
                      <button 
                        className="accordion-trigger-enhanced"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModuleExpansion(m.id);
                        }}
                      >
                        <span>View lessons</span>
                        <span className={`transition-transform duration-300 ${expandedModules.has(m.id) ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {expandedModules.has(m.id) && (
                        <div className="px-6 pb-4 bg-white">
                          <ul className="space-y-3">
                            {m.lessons.map((l, i) => (
                              <li key={i} className="lesson-item lesson-item-enhanced">
                                <div className="flex-1">
                                  <div className="lesson-item-title text-sm mb-1">{l.title}</div>
                                  {l.description && <div className="text-xs text-gray-600 leading-relaxed">{l.description}</div>}
                                </div>
                                {l.duration && (
                                  <span className="lesson-item-duration px-2 py-1 rounded-lg">
                                    {l.duration}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center gap-4 mt-8 flex-shrink-0">
                      <button 
                        className="btn-primary flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModule(m);
                        }}
                      >
                        <span>Start Module</span>
                        <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </button>
                      <button className="btn-ghost border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300">
                        Syllabus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Stay Updated with New Modules
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl">
                Get notified when we add more Nepal‑focused AI content and advanced learning modules.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto max-w-md">
              <input 
                placeholder="your@email.com" 
                className="flex-1 min-w-[250px] px-6 py-4 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 placeholder-gray-500 text-gray-800 shadow-sm"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- GenerativeAI Module Detail Page ----------

function GenerativeAIModulePage({ module, onBack }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <section className="bg-gradient-to-r py-6">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="btn-primary"
          >
            ← Back to Modules
          </button>
          <div>
            <div className="text-xs text-blue-200 mb-2">
              {module.tag} · Updated {new Date(module.updated).toLocaleDateString()}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight text-white">{module.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Level", value: module.level },
            { label: "Duration", value: module.duration },
            { label: "Price", value: module.price },
            { label: "Lessons", value: module.lessons.length }
          ].map((stat, index) => (
            <div key={stat.label} className="card-content text-center">
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="font-bold text-lg text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Outcome */}
        <div className="module-details-section mb-8">
          <h2 className="module-details-title mb-4">What you'll achieve</h2>
          <p className="module-details-description">{module.outcome}</p>
        </div>

        {/* What you'll learn */}
        <div className="module-details-section mb-8">
          <h2 className="module-details-title mb-4">What you'll learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.whatYouLearn.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons */}
        <div className="module-details-section mb-8">
          <h2 className="module-details-title mb-4">Course content</h2>
          <div className="space-y-4">
            {module.lessons.map((lesson, index) => (
              <div key={index} className="lesson-item">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                  </div>
                  <div>
                    <div className="lesson-item-title text-lg">{lesson.title}</div>
                    {lesson.description && <div className="text-sm text-gray-600 mt-1">{lesson.description}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="lesson-item-duration font-medium">{lesson.duration}</span>
                  <button className="play-button-enhanced">
                    <span className="text-white text-lg">▶</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="module-details-btn text-lg px-12 py-4">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}
