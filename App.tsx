import React, { useState, useEffect } from "react";
import { Topic } from "./types";
import TheorySection from "./TheorySection";
import SentenceBuilderGame from "./SentenceBuilderGame";
import DialogueGame from "./DialogueGame";
import VocabularyFlashcards from "./VocabularyFlashcards";
import AIExplanationPanel from "./AIExplanationPanel";
import { playClickSound } from "./audio";
import {
  GraduationCap,
  Brain,
  Gamepad2,
  Trophy,
  CheckCircle,
  Calendar,
  Sun,
  Clock,
  Sparkles,
  Flame,
  MessageSquare,
  BookOpen
} from "lucide-react";

type View = "home" | "theory" | "practice" | "dialogues" | "vocabulary" | "ai-tutor";

export default function App() {
  const [activeView, setActiveView] = useState<View>("home");
  const [selectedTopic, setSelectedTopic] = useState<Topic>(Topic.GRAMMAR);
  
  // Persistence state
  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem("esp_arm_score");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [streak, setStreak] = useState<number>(3); // simulated active streak

  useEffect(() => {
    localStorage.setItem("esp_arm_score", score.toString());
  }, [score]);

  const handleIncrementScore = (points: number) => {
    setScore(prev => prev + points);
  };

  const selectModule = (topic: Topic) => {
    playClickSound();
    setSelectedTopic(topic);
    setActiveView("theory");
  };

  const handleViewNavigation = (view: View) => {
    playClickSound();
    setActiveView(view);
  };

  // Responsive control for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-slate-800 font-sans flex flex-col lg:flex-row" id="app_frame">
      
      {/* 1. Desktop Left Sidebar Navigation */}
      <aside className="w-72 bg-white border-r-4 border-sky-100 hidden lg:flex flex-col p-6 h-screen sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => { setActiveView("home"); setIsMobileMenuOpen(false); }}>
          <div className="w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
            E
          </div>
          <div>
            <span className="text-xl font-black text-sky-900 tracking-tight block">ARM-ESP</span>
            <span className="text-4xs font-black text-sky-500 uppercase tracking-widest leading-none">Aprende Español</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-2.5 flex-1 overflow-y-auto pr-1">
          <div className="text-4xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-2">Գլխավոր</div>
          
          <button
            onClick={() => { handleViewNavigation("home"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl font-bold transition-all text-left text-sm cursor-pointer ${
              activeView === "home"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-200"
                : "bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-900 border border-slate-100"
            }`}
          >
            <span className="text-lg">🏠</span> Գլխավոր Էջ
          </button>

          <div className="text-4xs font-bold text-slate-400 uppercase tracking-wider mt-4 mb-1.5 pl-2">Դասընթացներ</div>

          <button
            onClick={() => { setSelectedTopic(Topic.GRAMMAR); setActiveView("theory"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl font-semibold transition-all text-left text-xs cursor-pointer ${
              activeView === "theory" && selectedTopic === Topic.GRAMMAR
                ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-100"
                : "bg-white hover:bg-sky-50 text-slate-500 hover:text-slate-800 border border-slate-100/50"
            }`}
          >
            <span className="text-base text-indigo-500">📚</span> Կառուցվածք
          </button>

          <button
            onClick={() => { setSelectedTopic(Topic.TIME); setActiveView("theory"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl font-semibold transition-all text-left text-xs cursor-pointer ${
              activeView === "theory" && selectedTopic === Topic.TIME
                ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-100"
                : "bg-white hover:bg-sky-50 text-slate-500 hover:text-slate-800 border border-slate-100/50"
            }`}
          >
            <span className="text-base text-emerald-500">🕒</span> Ժամանակ
          </button>

          <button
            onClick={() => { setSelectedTopic(Topic.NUMBERS); setActiveView("theory"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl font-semibold transition-all text-left text-xs cursor-pointer ${
              activeView === "theory" && selectedTopic === Topic.NUMBERS
                ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-100"
                : "bg-white hover:bg-sky-50 text-slate-500 hover:text-slate-800 border border-slate-100/50"
            }`}
          >
            <span className="text-base text-amber-500">🔢</span> Թվեր և Տարիք
          </button>

          <button
            onClick={() => { setSelectedTopic(Topic.WEATHER); setActiveView("theory"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl font-semibold transition-all text-left text-xs cursor-pointer ${
              activeView === "theory" && selectedTopic === Topic.WEATHER
                ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-100"
                : "bg-white hover:bg-sky-50 text-slate-500 hover:text-slate-800 border border-slate-100/50"
            }`}
          >
            <span className="text-base text-cyan-500">☀️</span> Եղանակ
          </button>

          <button
            onClick={() => { setSelectedTopic(Topic.MONTHS); setActiveView("theory"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl font-semibold transition-all text-left text-xs cursor-pointer ${
              activeView === "theory" && selectedTopic === Topic.MONTHS
                ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-100"
                : "bg-white hover:bg-sky-50 text-slate-500 hover:text-slate-800 border border-slate-100/50"
            }`}
          >
            <span className="text-base text-teal-500">📅</span> Օրացույց & Ամիսներ
          </button>

          <div className="text-4xs font-bold text-slate-400 uppercase tracking-wider mt-4 mb-1.5 pl-2">Գործիքներ & AI</div>

          <button
            onClick={() => { handleViewNavigation("dialogues"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl font-bold transition-all text-left text-sm cursor-pointer ${
              activeView === "dialogues"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-200"
                : "bg-white hover:bg-sky-50 text-slate-600 hover:text-slate-900 border border-slate-100"
            }`}
          >
            <span className="text-lg">💬</span> Երկխոսություն
          </button>

          <button
            onClick={() => { handleViewNavigation("vocabulary"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl font-bold transition-all text-left text-sm cursor-pointer ${
              activeView === "vocabulary"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-200"
                : "bg-white hover:bg-sky-50 text-slate-600 hover:text-slate-900 border border-slate-100"
            }`}
          >
            <span className="text-lg">🎲</span> Բառախաղ
          </button>

          <button
            onClick={() => { handleViewNavigation("ai-tutor"); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl font-bold transition-all text-left text-sm cursor-pointer ${
              activeView === "ai-tutor"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-200"
                : "bg-white hover:bg-sky-50 text-slate-600 hover:text-slate-900 border border-slate-100"
            }`}
          >
            <span className="text-lg">🧠</span> AI-Ուսուցիչ
          </button>
        </nav>

        {/* Decorative dynamic Streak Indicator */}
        <div className="bg-orange-50 p-4 rounded-2xl border-2 border-orange-100 mt-auto shrink-0">
          <p className="text-xs font-bold text-orange-600 uppercase mb-2 flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>Ակտիվություն՝ {streak} օր</span>
          </p>
          <div className="flex gap-1" title="Daily streak completion meter">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < streak ? "bg-orange-400" : "bg-orange-200"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </aside>

      {/* 2. Responsive Mobile/Tablet Top Header */}
      <div className="lg:hidden bg-white border-b-2 border-sky-50 sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleViewNavigation("home")}>
          <div className="w-8 h-8 bg-orange-400 text-white rounded-lg flex items-center justify-center font-bold text-lg">
            E
          </div>
          <span className="font-extrabold text-sky-900 text-base tracking-tight">ARM-ESP</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Streak */}
          <div className="flex items-center gap-1 text-xs bg-orange-50 text-orange-600 font-bold px-2 py-1 rounded-lg border border-orange-100">
            🔥 {streak}
          </div>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition duration-150 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlapping Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[53px] bottom-0 bg-slate-900/45 backdrop-blur-xs z-50 flex flex-col justify-start">
          <div className="bg-white p-5 border-b-4 border-sky-100 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { handleViewNavigation("home"); setIsMobileMenuOpen(false); }}
                className="p-3 rounded-2xl font-bold bg-sky-500 text-white text-xs text-center"
              >
                🏠 Գլխավոր
              </button>
              <button
                onClick={() => { handleViewNavigation("dialogues"); setIsMobileMenuOpen(false); }}
                className="p-3 rounded-2xl font-bold bg-purple-500 text-white text-xs text-center"
              >
                💬 Երկխոսություն
              </button>
              <button
                onClick={() => { handleViewNavigation("vocabulary"); setIsMobileMenuOpen(false); }}
                className="p-3 rounded-2xl font-bold bg-teal-500 text-white text-xs text-center"
              >
                🎲 Բառախաղ
              </button>
              <button
                onClick={() => { handleViewNavigation("ai-tutor"); setIsMobileMenuOpen(false); }}
                className="p-3 rounded-2xl font-bold bg-indigo-600 text-white text-xs text-center"
              >
                🧠 AI-Ուսուցիչ
              </button>
            </div>
            
            <div className="border-t border-slate-100 pt-3">
              <span className="text-4xs font-bold text-slate-400 uppercase block mb-2">Թեմաներ</span>
              <div className="flex flex-wrap gap-2">
                {[Topic.GRAMMAR, Topic.TIME, Topic.NUMBERS, Topic.WEATHER, Topic.MONTHS].map(topic => (
                  <button
                    key={topic}
                    onClick={() => { setSelectedTopic(topic); setActiveView("theory"); setIsMobileMenuOpen(false); }}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 capitalize"
                  >
                    {topic === Topic.GRAMMAR ? "Կառուցվածք" : topic === Topic.TIME ? "Ժամանակ" : topic === Topic.NUMBERS ? "🔢 Թվեր" : topic === Topic.WEATHER ? "☀️ Եղանակ" : "📅 Ամիսներ"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Horizontal Sticky Header with active status and score badge */}
        <header className="h-20 bg-white border-b-2 border-sky-50 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <h1 className="text-xl md:text-2xl font-black text-sky-900 truncate">
            {activeView === "home" && "Aprende Español (Իսպաներենի դասընթաց)"}
            {activeView === "theory" && "Տեսական Բաժին"}
            {activeView === "practice" && "Կառուցիր Նախադասություններ"}
            {activeView === "dialogues" && "Արտահայտությունների խաղ"}
            {activeView === "vocabulary" && "Բառախաղ և Մարզում"}
            {activeView === "ai-tutor" && ""}
          </h1>

          <div className="flex items-center gap-4">
            {/* Elegant gem score badge from Design HTML */}
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full border-2 border-yellow-200 shadow-xs">
              <span className="text-yellow-600">💎</span>
              <span className="font-bold text-yellow-800 tracking-tight text-xs sm:text-sm font-mono">{score.toLocaleString()}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 shadow-sm items-center justify-center hidden sm:flex">
              <span className="text-lg">🧑‍🎓</span>
            </div>
          </div>
        </header>

        {/* Scrollable layout container with custom padding */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-8 max-w-6xl w-full mx-auto">
          {activeView === "home" && (
            <div className="space-y-12 animate-in fade-in duration-300">
              
              {/* Welcoming Display Typography Hero */}
              <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-sky-100 text-sky-700 rounded-full tracking-wider uppercase border border-sky-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ինտերակտիվ ուսուցում
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-sky-950 tracking-tight leading-tight">
                  Սովորեք կառուցել <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">իսպաներեն</span> նախադասություններ
                </h2>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
                  Մոռացեք ձանձրալի աղջուսակները։ Բացահայտեք իսպաներենի բառակարգի (SVO) գաղտնիքները հայերենի համեմատությամբ՝ խաղերի և AI-ի միջոցով։
                </p>
              </div>

              {/* Core Categories Bento Grid with Vibrant theme cards */}
              <div className="space-y-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Ընտրեք Դասը</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="lessons_bento_grid">
                  
                  {/* 1. Grammar Card */}
                  <div
                    onClick={() => selectModule(Topic.GRAMMAR)}
                    className="cursor-pointer group bg-white border-2 border-sky-100 p-6 rounded-[32px] hover:rounded-[36px] hover:border-sky-400 shadow-xl shadow-sky-900/5 transition-all duration-350 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition duration-200">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <span className="text-4xs font-extrabold uppercase font-mono text-sky-500 tracking-widest block">STRUCTURA DE GRAMÁTICA</span>
                      <h4 className="text-lg font-bold text-sky-950 mt-1 mb-2 group-hover:text-sky-600 transition-colors">
                        Նախադասության Կառուցվածք
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Ինպե՞ս են դասավորվում բայերն ու ածականները իսպաներեն նախադասությունների մեջ հայերենի համեմատությամբ։
                      </p>
                    </div>
                    <div className="text-xs text-sky-500 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 duration-200">
                      <span>Սկսել դասը</span> &rarr;
                    </div>
                  </div>

                  {/* 2. Numbers Card */}
                  <div
                    onClick={() => selectModule(Topic.NUMBERS)}
                    className="cursor-pointer group bg-white border-2 border-amber-100 p-6 rounded-[32px] hover:rounded-[36px] hover:border-amber-400 shadow-xl shadow-sky-900/5 transition-all duration-350 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition duration-200">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <span className="text-4xs font-extrabold uppercase font-mono text-amber-500 tracking-widest block">NÚMEROS Y EDADES</span>
                      <h4 className="text-lg font-bold text-amber-950 mt-1 mb-2 group-hover:text-amber-600 transition-colors">
                        Թվեր և Տարիք
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Սովորեք հաշվել և ճիշտ կառուցել տարիքի արտահայտությունները՝ օգտագործելով «Tener» (ունենալ) բայը։
                      </p>
                    </div>
                    <div className="text-xs text-amber-500 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 duration-200">
                      <span>Սկսել դասը</span> &rarr;
                    </div>
                  </div>

                  {/* 3. Time Card */}
                  <div
                    onClick={() => selectModule(Topic.TIME)}
                    className="cursor-pointer group bg-white border-2 border-emerald-100 p-6 rounded-[32px] hover:rounded-[36px] hover:border-emerald-400 shadow-xl shadow-sky-900/5 transition-all duration-350 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition duration-200">
                        <Clock className="w-6 h-6" />
                      </div>
                      <span className="text-4xs font-extrabold uppercase font-mono text-emerald-500 tracking-widest block">HORAS Y MINUTOS</span>
                      <h4 className="text-lg font-bold text-emerald-950 mt-1 mb-2 group-hover:text-emerald-600 transition-colors">
                        Ժամանակ և Ժամեր
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Ինչպե՞ս հարցնել ժամը և ասել «Es la una» (ժամը 1-ն է) կամ «Son las [թիվ]» մնացյալ ժամերի համար:
                      </p>
                    </div>
                    <div className="text-xs text-emerald-500 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 duration-200">
                      <span>Սկսել դասը</span> &rarr;
                    </div>
                  </div>

                  {/* 4. Weather Card */}
                  <div
                    onClick={() => selectModule(Topic.WEATHER)}
                    className="cursor-pointer group bg-white border-2 border-cyan-100 p-6 rounded-[32px] hover:rounded-[36px] hover:border-cyan-400 shadow-xl shadow-sky-900/5 transition-all duration-350 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition duration-200">
                        <Sun className="w-6 h-6" />
                      </div>
                      <span className="text-4xs font-extrabold uppercase font-mono text-cyan-500 tracking-widest block">EL CLIMA Y HACER</span>
                      <h4 className="text-lg font-bold text-cyan-950 mt-1 mb-2 group-hover:text-cyan-600 transition-colors">
                        Եղանակ և Նախադասություններ
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Իմացեք, թե ինչու է իսպաներենում «ցուրտ է»-ն ասվում «Hace frío» (անում է ցուրտ), այլ ոչ թե լինել բայով։
                      </p>
                    </div>
                    <div className="text-xs text-cyan-500 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 duration-200">
                      <span>Սկսել դասը</span> &rarr;
                    </div>
                  </div>

                  {/* 5. Calendar months */}
                  <div
                    onClick={() => selectModule(Topic.MONTHS)}
                    className="cursor-pointer group bg-white border-2 border-teal-100 p-6 rounded-[32px] hover:rounded-[36px] hover:border-teal-400 shadow-xl shadow-sky-900/5 transition-all duration-350 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition duration-200">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <span className="text-4xs font-extrabold uppercase font-mono text-teal-500 tracking-widest block">CALENDARIO Y MESES</span>
                      <h4 className="text-lg font-bold text-teal-950 mt-1 mb-2 group-hover:text-teal-600 transition-colors">
                        Ամիսներ և Օրացույց
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Սովորեք ամիսների անվանումները, շաբաթվա օրերը և թե ինչպես գրել իսպաներեն ամսաթվերը ճիշտ ձևով:
                      </p>
                    </div>
                    <div className="text-xs text-teal-500 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 duration-200">
                      <span>Սկսել դասը</span> &rarr;
                    </div>
                  </div>

                  {/* 6. Dialogues Menu */}
                  <div
                    onClick={() => handleViewNavigation("dialogues")}
                    className="cursor-pointer group bg-white border-2 border-purple-100 p-6 rounded-[32px] hover:rounded-[36px] hover:border-purple-400 shadow-xl shadow-sky-900/5 transition-all duration-350 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition duration-200">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <span className="text-4xs font-extrabold uppercase font-mono text-purple-500 tracking-widest block">CHARLAS Y DIÁLOGOS</span>
                      <h4 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-purple-600 transition-colors">
                        Երկխոսություն & Զրույց
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Ինտերակտիվ երկխոսություն սրճարանում, որտեղ դուք ընտրում եք զրույցը շարունակելու ճիշտ տարբերակները:
                      </p>
                    </div>
                    <div className="text-xs text-purple-500 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 duration-200">
                      <span>Սկսել խաղը</span> &rarr;
                    </div>
                  </div>

                </div>
              </div>

              {/* Practical Exercises & AI Interactive modules section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {/* Practice Memory / Word flash matching cards */}
                <span
                  onClick={() => handleViewNavigation("vocabulary")}
                  className="cursor-pointer group bg-gradient-to-tr from-sky-600 to-indigo-600 text-white p-8 rounded-[40px] shadow-xl shadow-sky-900/10 hover:shadow-sky-900/20 active:scale-98 transition duration-250 relative overflow-hidden flex flex-col justify-between min-h-[190px]"
                >
                  <div className="space-y-2">
                    <span className="text-4xs text-sky-100 font-bold uppercase tracking-widest font-mono">MODULE DE JUEGO</span>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight">Բառապաշարի Զույգերի Խաղ</h3>
                    <p className="text-xs md:text-sm text-sky-50 leading-relaxed max-w-sm">
                      Մարզեք ձեր հիշողությունը՝ միացնելով իսպաներեն թեմատիկ բառերը իրենց հայերեն թարգմանությունների հետ։
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs md:text-sm font-black text-yellow-300 group-hover:translate-x-1.5 transition duration-250 mt-4 self-start">
                    <span>Խաղալ Բառախաղը</span>
                    <span>&rarr;</span>
                  </div>
                </span>

                {/* General AI Consultant help tab */}
                <span
                  onClick={() => handleViewNavigation("ai-tutor")}
                  className="cursor-pointer group bg-gradient-to-tr from-orange-400 to-pink-500 text-white p-8 rounded-[40px] shadow-xl shadow-sky-900/10 hover:shadow-sky-900/20 active:scale-98 transition duration-250 relative overflow-hidden flex flex-col justify-between min-h-[190px]"
                >
                  <div className="space-y-2">
                    <span className="text-4xs text-orange-100 font-bold uppercase tracking-widest font-mono">ASISTENTE CON IA</span>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight">Անձնական AI Ուսուցիչ</h3>
                    <p className="text-xs md:text-sm text-orange-50 leading-relaxed max-w-sm">
                      Տվեք ձեր ցանկացած հարցը իսպաներենի քերականության մասին և ստացեք մանրամասն բացատրություն հայերենով:
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs md:text-sm font-black text-yellow-250 group-hover:translate-x-1.5 transition duration-250 mt-4 self-start">
                    <span>Բացել AI-օգնականը</span>
                    <span>&rarr;</span>
                  </div>
                </span>
              </div>

              {/* Quick Grammar SVO rule cheat sheet banner */}
              <div className="bg-orange-50 rounded-3xl p-6 border-2 border-orange-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wide block">💡 Վարպետի Կանոն</span>
                  <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                    Իսպաներենում ածականները գրվում են գոյականներից <strong>հետո</strong> (օր.՝ <em>un coche blanco</em> - սպիտակ մեքենա), իսկ նախադասությունները կառուցվում են խիստ <strong>SVO (Ենթակա-Ստորոգյալ-Լրացում)</strong> կառույցով։
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* THEORY SCREEN */}
          {activeView === "theory" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <button
                onClick={() => handleViewNavigation("home")}
                className="cursor-pointer px-5 py-2.5 font-bold text-sky-600 hover:text-sky-800 bg-white border-2 border-sky-100 hover:border-sky-300 rounded-xl text-xs md:text-sm inline-flex items-center gap-1.5 transition duration-200 shadow-xs"
              >
                &larr; Հետ դեպի Դասերը
              </button>
              <TheorySection
                selectedTopic={selectedTopic}
                onSelectTopic={(topic) => setSelectedTopic(topic)}
                onStartPractice={() => handleViewNavigation("practice")}
              />
            </div>
          )}

          {/* PRACTICE GAME SCREEN */}
          {activeView === "practice" && (
            <SentenceBuilderGame
              selectedTopic={selectedTopic}
              onBackToTheory={() => handleViewNavigation("theory")}
              onIncrementScore={handleIncrementScore}
            />
          )}

          {/* DIALOGUES SIMULATOR */}
          {activeView === "dialogues" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <button
                onClick={() => handleViewNavigation("home")}
                className="cursor-pointer px-5 py-2.5 font-bold text-sky-600 hover:text-sky-800 bg-white border-2 border-sky-100 rounded-xl text-xs md:text-sm inline-flex items-center gap-1.5 transition shadow-xs"
              >
                &larr; Հետ դեպի Գլխավոր
              </button>
              <DialogueGame onIncrementScore={handleIncrementScore} />
            </div>
          )}

          {/* VOCABULARY MEMORY MATCH GAME */}
          {activeView === "vocabulary" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <button
                onClick={() => handleViewNavigation("home")}
                className="cursor-pointer px-5 py-2.5 font-bold text-sky-600 hover:text-sky-800 bg-white border-2 border-sky-100 rounded-xl text-xs md:text-sm inline-flex items-center gap-1.5 transition shadow-xs"
              >
                &larr; Հետ դեպի Գլխավոր
              </button>
              <VocabularyFlashcards onIncrementScore={handleIncrementScore} />
            </div>
          )}

          {/* FREEFORM AI TUTOR SCREEN */}
          {activeView === "ai-tutor" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <button
                onClick={() => handleViewNavigation("home")}
                className="cursor-pointer px-5 py-2.5 font-bold text-sky-600 hover:text-sky-800 bg-white border-2 border-sky-100 rounded-xl text-xs sm:text-sm inline-flex items-center gap-1.5 transition shadow-xs"
              >
                &larr; Հետ դեպի Գլխավոր
              </button>
              <AIExplanationPanel />
            </div>
          )}
        </main>

        {/* Humble footer conforming to the theme */}
        <footer className="bg-white border-t-2 border-sky-50 py-6 mt-12 text-center text-xs text-sky-800">
          <p className="font-mono">
            &copy; 2026 ARM-ESP - An Armenian to Spanish Structural Grammar Hub.
          </p>
        </footer>
      </div>
    </div>
  );
}
