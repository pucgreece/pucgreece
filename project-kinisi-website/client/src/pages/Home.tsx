import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, ArrowRight, Calendar } from 'lucide-react';

// Asset URLs
const TEAM_PHOTO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663565701015/DsQ7NmS2NqikzXXtSGd5v4/team-photo_783b73dd.jpg';
const CAMP_SITE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663565701015/DsQ7NmS2NqikzXXtSGd5v4/camp-site-photo-oW3KueikbF99GnbKfiCJCS.webp';

// Team members data
const TEAM_MEMBERS = [
  { name: 'Saad Ijazi', role: 'Project Manager', details: '3rd Year, Mechanical Engineering' },
  { name: 'Isabelle Ramirez', role: 'Assistant Project Manager', details: '3rd Year, Social Work' },
  { name: 'Eden Gezehagn', role: 'Finance Manager', details: '4th Year, Mechanical Engineering' },
  { name: 'Iliana Beck', role: 'Health & Environmental Safety Manager', details: '2nd Year, Environmental Engineering' },
  { name: 'Stephanie Guevara', role: 'Communication & Cultural Awareness Manager', details: '2nd Year, Social Work' },
  { name: 'Sara Anees', role: 'Logistics Manager', details: '3rd Year, Mechanical Engineering' },
  { name: 'Mario Hernandez', role: 'CAD Manager', details: '2nd Year, Mechanical Engineering' },
  { name: 'Eesha Bilal', role: 'Technical Procurement Manager', details: '4th Year, Mechanical Engineering' },
];

// Timeline events for calendar
const TIMELINE_EVENTS = [
  { date: '2026-04-01', title: 'Design Finalized', description: 'Contractor engaged, community engagement underway', status: 'completed' },
  { date: '2026-05-11', title: 'Team Departs', description: 'Houston/Dallas to Istanbul to Thessaloniki', status: 'upcoming' },
  { date: '2026-05-12', title: 'Arrival & Orientation', description: 'Meet stakeholders, explore Drama', status: 'upcoming' },
  { date: '2026-05-18', title: 'Active Construction', description: '10 days on site at Camp Drama', status: 'upcoming' },
  { date: '2026-05-26', title: 'Ribbon Cutting', description: 'Inauguration ceremony with residents', status: 'upcoming' },
  { date: '2026-05-27', title: 'Cultural Celebration', description: 'YMCA training, farewell events', status: 'upcoming' },
  { date: '2026-06-01', title: 'Team Returns', description: 'Homeward bound', status: 'upcoming' },
];

// Photo gallery samples
const GALLERY_PHOTOS = [
  { id: 1, url: CAMP_SITE, alt: 'Camp Drama site' },
  { id: 2, url: TEAM_PHOTO, alt: 'Team photo' },
  { id: 3, url: CAMP_SITE, alt: 'Construction site' },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fundingProgress, setFundingProgress] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    helpType: 'Donate',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('equipment');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4)); // May 2026

  // Animate funding progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      const progressSection = document.getElementById('fundraising');
      if (progressSection) {
        const rect = progressSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && fundingProgress === 0) {
          let current = 0;
          const interval = setInterval(() => {
            current += 1;
            if (current <= 51) {
              setFundingProgress(current);
            } else {
              clearInterval(interval);
            }
          }, 15);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fundingProgress]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ firstName: '', lastName: '', email: '', helpType: 'Donate', message: '' });
      setFormSubmitted(false);
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const calendarDays = [];
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);
  
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const getEventForDate = (day: number | null) => {
    if (!day) return null;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return TIMELINE_EVENTS.find(e => e.date === dateStr);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="min-h-screen bg-[#f5efe6]">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#e8e1d9]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#233dff] rounded-full flex items-center justify-center text-white font-bold text-sm">
              PUC
            </div>
            <span className="font-bold text-lg text-[#1A1A1A]">Team Greece</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('mission')} className="text-[#5a5a5a] hover:text-[#233dff] transition">Mission</button>
            <button onClick={() => scrollToSection('camp')} className="text-[#5a5a5a] hover:text-[#233dff] transition">The Camp</button>
            <button onClick={() => scrollToSection('design')} className="text-[#5a5a5a] hover:text-[#233dff] transition">Our Design</button>
            <button onClick={() => scrollToSection('team')} className="text-[#5a5a5a] hover:text-[#233dff] transition">Meet the Team</button>
            <button onClick={() => scrollToSection('timeline')} className="text-[#5a5a5a] hover:text-[#233dff] transition">Timeline</button>
            <button onClick={() => scrollToSection('fundraising')} className="bg-[#233dff] text-white px-6 py-2 rounded-lg hover:bg-[#1a2ba8] transition">Support Project Kinisi</button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#e8e1d9] p-4 space-y-2">
            <button onClick={() => scrollToSection('mission')} className="block w-full text-left py-2 text-[#5a5a5a] hover:text-[#233dff]">Mission</button>
            <button onClick={() => scrollToSection('camp')} className="block w-full text-left py-2 text-[#5a5a5a] hover:text-[#233dff]">The Camp</button>
            <button onClick={() => scrollToSection('design')} className="block w-full text-left py-2 text-[#5a5a5a] hover:text-[#233dff]">Our Design</button>
            <button onClick={() => scrollToSection('team')} className="block w-full text-left py-2 text-[#5a5a5a] hover:text-[#233dff]">Meet the Team</button>
            <button onClick={() => scrollToSection('timeline')} className="block w-full text-left py-2 text-[#5a5a5a] hover:text-[#233dff]">Timeline</button>
            <button onClick={() => scrollToSection('fundraising')} className="block w-full bg-[#233dff] text-white py-2 rounded-lg mt-4">Support Project Kinisi</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={TEAM_PHOTO} alt="Team" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <p className="text-sm md:text-base mb-4 font-medium">PUC Greece x UT Austin</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Movement Restores Everything</h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed">We are building an outdoor recreation space for 445 displaced individuals at Camp Drama, Greece because movement is healing, and everyone deserves a place to belong.</p>
          <Button onClick={() => scrollToSection('fundraising')} className="bg-[#233dff] hover:bg-[#1a2ba8] text-white px-8 py-3 text-lg rounded-lg">
            Support Project Kinisi <ArrowRight className="ml-2" size={20} />
          </Button>
          <p className="text-sm mt-8">A collaboration between Cockrell School of Engineering & Steve Hicks School of Social Work</p>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#1A1A1A]">Why Movement Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#f5efe6] rounded-lg">
              <div className="text-4xl mb-4">▶</div>
              <h3 className="text-2xl font-bold mb-4 text-[#233dff]">A Space to Move</h3>
              <p className="text-[#5a5a5a] leading-relaxed">Camp Drama residents face restricted movement and limited recreation. We are installing certified calisthenics equipment, a volleyball court, and a football field for exercise, play, and breathing room.</p>
            </div>
            <div className="p-8 bg-[#f5efe6] rounded-lg">
              <div className="text-4xl mb-4">∞</div>
              <h3 className="text-2xl font-bold mb-4 text-[#233dff]">Community Rebuilt</h3>
              <p className="text-[#5a5a5a] leading-relaxed">Recreation is essential to human connection. This space brings families, youth, and neighbors together, rebuilding the social fabric that displacement disrupts.</p>
            </div>
            <div className="p-8 bg-[#f5efe6] rounded-lg">
              <div className="text-4xl mb-4">◆</div>
              <h3 className="text-2xl font-bold mb-4 text-[#233dff]">Dignity Restored</h3>
              <p className="text-[#5a5a5a] leading-relaxed">Agency matters. By designing with, not for, the community, we return ownership and normalcy to people who have had so much taken away.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => scrollToSection('fundraising')} className="bg-[#233dff] hover:bg-[#1a2ba8] text-white px-8 py-3 text-lg rounded-lg">
              Support Project Kinisi <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Camp Drama Section */}
      <section id="camp" className="py-20 bg-[#f5efe6]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#1A1A1A]">Camp Drama, Greece</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-[#5a5a5a] mb-6 leading-relaxed">Camp Drama is located in northern Greece and currently houses 445 displaced residents from Syria, Palestine, Sudan, and other regions of Africa and the Middle East.</p>
              <p className="text-lg text-[#5a5a5a] mb-6 leading-relaxed">Greece is one of Europe's main refugee entry points due to its Mediterranean geography. Camps that were meant to be temporary have become long-term settlements, often severely under-resourced.</p>
              <p className="text-lg text-[#5a5a5a] mb-8 leading-relaxed">Our new project site is a 70m x 9m outdoor corridor adjacent to the main residential area, a former playground and volleyball court area that will be completely transformed.</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-[#e8e1d9]">
                  <div className="text-4xl font-bold text-[#233dff] mb-2">445</div>
                  <p className="text-[#5a5a5a]">Residents Served</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#e8e1d9]">
                  <div className="text-4xl font-bold text-[#233dff] mb-2">70m x 9m</div>
                  <p className="text-[#5a5a5a]">Outdoor Space</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#e8e1d9]">
                  <div className="text-4xl font-bold text-[#233dff] mb-2">~$22K</div>
                  <p className="text-[#5a5a5a]">Construction Budget</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#e8e1d9]">
                  <div className="text-4xl font-bold text-[#233dff] mb-2">3</div>
                  <p className="text-[#5a5a5a]">Equipment Units</p>
                </div>
              </div>
            </div>
            <div>
              <img src={CAMP_SITE} alt="Camp Drama" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section id="design" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#1A1A1A]">Engineered for Dignity</h2>
          
          {/* Tabs */}
          <div className="flex gap-4 mb-12 border-b border-[#e8e1d9]">
            <button
              onClick={() => setActiveTab('equipment')}
              className={`pb-4 px-6 font-semibold transition ${activeTab === 'equipment' ? 'text-[#233dff] border-b-2 border-[#233dff]' : 'text-[#5a5a5a]'}`}
            >
              Equipment
            </button>
            <button
              onClick={() => setActiveTab('construction')}
              className={`pb-4 px-6 font-semibold transition ${activeTab === 'construction' ? 'text-[#233dff] border-b-2 border-[#233dff]' : 'text-[#5a5a5a]'}`}
            >
              Construction
            </button>
            <button
              onClick={() => setActiveTab('sustainability')}
              className={`pb-4 px-6 font-semibold transition ${activeTab === 'sustainability' ? 'text-[#233dff] border-b-2 border-[#233dff]' : 'text-[#5a5a5a]'}`}
            >
              Sustainability
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-[#f5efe6] p-8 rounded-lg">
            {activeTab === 'equipment' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Certified Equipment</h3>
                <ul className="space-y-4 text-[#5a5a5a]">
                  <li className="flex items-start">
                    <span className="text-[#233dff] mr-4 font-bold">•</span>
                    <span>3 certified calisthenic units (KA-08 combo station, KA-14 open bars, KA-13 closed bars) from local Greek supplier Ermis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#233dff] mr-4 font-bold">•</span>
                    <span>Non-permanent football goals (2 x 56 euros each) and volleyball net sourced locally in Drama/Thessaloniki</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#233dff] mr-4 font-bold">•</span>
                    <span>Equipment certified to EN-16630:2015 European outdoor fitness standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#233dff] mr-4 font-bold">•</span>
                    <span>Up to 40 people can use the space simultaneously</span>
                  </li>
                </ul>
              </div>
            )}
            {activeTab === 'construction' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Construction Details</h3>
                <p className="text-[#5a5a5a] mb-4">Our construction approach prioritizes community involvement and sustainable practices. Local contractors will oversee the installation with support from our engineering team.</p>
                <p className="text-[#5a5a5a]">All work will be completed within 10 days during our May 18-26 deployment, with careful attention to safety and quality standards.</p>
              </div>
            )}
            {activeTab === 'sustainability' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Sustainability</h3>
                <p className="text-[#5a5a5a] mb-4">This project is designed to have minimal environmental impact while providing maximum community benefit. Equipment is sourced locally to reduce transportation emissions.</p>
                <p className="text-[#5a5a5a]">The outdoor space will be maintained by the camp community, ensuring long-term sustainability and ownership of the facility.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Who's Behind This */}
      <section className="py-20 bg-[#f5efe6]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#1A1A1A]">Who is Behind This</h2>
          <div className="bg-white p-8 rounded-lg border-l-4 border-[#233dff] mb-12">
            <p className="text-xl italic text-[#5a5a5a] mb-4">"This project is not just about building a recreation area, it is about restoring dignity and creating space for community life to exist again."</p>
            <p className="text-[#5a5a5a] font-semibold">PUC Greece Team, UT Austin 2026</p>
          </div>
          
          <p className="text-lg text-[#5a5a5a] mb-8 leading-relaxed">PUC (Projects with Underserved Communities) is a formal program at UT Austin with years of deployed projects across the globe. This is not a club trip, it is an accredited academic program combining rigorous engineering design with ethical, community-first social work principles.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-[#e8e1d9]">
              <h4 className="font-bold text-[#233dff] mb-2">UT Austin</h4>
              <p className="text-[#5a5a5a]">Cockrell School of Engineering & Steve Hicks School of Social Work</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#e8e1d9]">
              <h4 className="font-bold text-[#233dff] mb-2">YMCA Thessaloniki</h4>
              <p className="text-[#5a5a5a]">Cultural Advisor & Programming Partner</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#e8e1d9]">
              <h4 className="font-bold text-[#233dff] mb-2">Ermis</h4>
              <p className="text-[#5a5a5a]">Greek Certified Equipment Supplier</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#e8e1d9]">
              <h4 className="font-bold text-[#233dff] mb-2">Camp Drama</h4>
              <p className="text-[#5a5a5a]">Site Management & Community Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#1A1A1A]">Meet Team Greece</h2>
          <div className="mb-12">
            <img src={TEAM_PHOTO} alt="Team Greece" className="w-full rounded-lg shadow-lg mb-8" />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="bg-[#f5efe6] p-6 rounded-lg border border-[#e8e1d9]">
                <h4 className="font-bold text-[#1A1A1A] mb-2">{member.name}</h4>
                <p className="text-[#233dff] font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-[#5a5a5a] text-sm">{member.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-20 bg-[#f5efe6]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#1A1A1A]">Project Photo Album</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {GALLERY_PHOTOS.map((photo) => (
              <div key={photo.id} className="relative overflow-hidden rounded-lg shadow-lg h-64 group cursor-pointer">
                <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
              </div>
            ))}
          </div>
          <p className="text-center text-[#5a5a5a] mt-8 text-lg">More photos coming as we progress through construction</p>
        </div>
      </section>

      {/* Timeline Section with Interactive Calendar */}
      <section id="timeline" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#1A1A1A]">What Happens Next</h2>
          
          {/* Calendar */}
          <div className="max-w-2xl mx-auto bg-white border border-[#e8e1d9] rounded-lg p-8 mb-12">
            <div className="flex items-center justify-between mb-8">
              <button onClick={previousMonth} className="text-[#233dff] hover:text-[#1a2ba8] font-bold">&larr;</button>
              <h3 className="text-2xl font-bold text-[#1A1A1A]">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <button onClick={nextMonth} className="text-[#233dff] hover:text-[#1a2ba8] font-bold">&rarr;</button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-bold text-[#5a5a5a] text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, idx) => {
                const event = getEventForDate(day);
                return (
                  <button
                    key={idx}
                    onClick={() => day && setSelectedDate(day.toString())}
                    className={`aspect-square rounded-lg border transition ${
                      !day
                        ? 'bg-gray-50'
                        : event
                        ? 'bg-[#233dff] text-white border-[#233dff] hover:bg-[#1a2ba8]'
                        : 'bg-white border-[#e8e1d9] hover:border-[#233dff]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="bg-[#f5efe6] p-6 rounded-lg border-l-4 border-[#233dff]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#233dff] font-semibold text-sm mb-2">{event.date}</p>
                    <h4 className="text-xl font-bold text-[#1A1A1A] mb-2">{event.title}</h4>
                    <p className="text-[#5a5a5a]">{event.description}</p>
                  </div>
                  {event.status === 'completed' && (
                    <div className="text-[#233dff] font-bold text-lg">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundraising Section */}
      <section id="fundraising" className="py-20 bg-[#233dff] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Be Part of the Movement</h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">We are a team of students who believe engineering should serve humanity. Whether you donate $5 or $500, follow our journey, or simply share our story, you are part of Project Kinisi.</p>

          {/* Fundraising Progress */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Fundraising Progress</p>
              <p className="font-bold text-lg">{fundingProgress}%</p>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500"
                style={{ width: `${fundingProgress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-4">{fundingProgress}% of our $25,855 goal reached, help us close the gap</p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur p-8 rounded-lg">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white"
                required
              />
              <select
                name="helpType"
                value={formData.helpType}
                onChange={handleFormChange}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white"
              >
                <option value="Donate" className="text-black">Donate</option>
                <option value="Stay Updated" className="text-black">Stay Updated</option>
                <option value="Share Our Story" className="text-black">Share Our Story</option>
                <option value="Partner With Us" className="text-black">Partner With Us</option>
              </select>
              <textarea
                name="message"
                placeholder="Tell us anything, we would love to hear from you. (Optional)"
                value={formData.message}
                onChange={handleFormChange}
                rows={4}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-white text-[#233dff] font-bold py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Support Project Kinisi
              </button>
            </form>

            {formSubmitted && (
              <div className="mt-6 p-4 bg-white/20 rounded-lg text-center">
                <p className="font-semibold">Thank you for your interest in Project Kinisi</p>
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div className="max-w-2xl mx-auto mt-12 space-y-3 text-center text-sm">
            <p>🔒 We respect your privacy. No spam, ever.</p>
            <p>💳 Donations processed securely via giveUT</p>
            <p>📬 You will receive a personal update when the space is complete</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#233dff] rounded-full flex items-center justify-center text-white font-bold text-xs">
                  PK
                </div>
                <span className="font-bold">Project Kinisi</span>
              </div>
              <p className="text-[#999]">Movement Restores Everything</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-[#999]">
                <li><button onClick={() => scrollToSection('mission')} className="hover:text-white transition">Mission</button></li>
                <li><button onClick={() => scrollToSection('camp')} className="hover:text-white transition">The Camp</button></li>
                <li><button onClick={() => scrollToSection('design')} className="hover:text-white transition">Design</button></li>
                <li><button onClick={() => scrollToSection('team')} className="hover:text-white transition">Team</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Affiliated With</h4>
              <p className="text-[#999]">UT Austin PUC Program</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <button onClick={() => scrollToSection('fundraising')} className="text-[#233dff] hover:text-white transition font-semibold">
                Support Project Kinisi
              </button>
            </div>
          </div>
          <div className="border-t border-[#333] pt-8 text-center text-[#999]">
            <p>© 2026 PUC Greece, Project Kinisi. Movement Restores Everything.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
