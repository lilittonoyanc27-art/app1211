import React, { useState } from "react";
import { Topic, LessonData, VocabularyItem } from "./types";
import { lessonsData } from "./lessonsData";
import { BookOpen, Award, CheckCircle, Info, Volume2, HelpCircle } from "lucide-react";
import { playClickSound } from "./audio";

interface TheorySectionProps {
  selectedTopic: Topic;
  onSelectTopic: (topic: Topic) => void;
  onStartPractice: () => void;
}

export default function TheorySection(props: TheorySectionProps) {
  const lesson: LessonData = lessonsData[props.selectedTopic];
  const [activeTab, setActiveTab] = useState<"grammar" | "vocabulary">("grammar");

  const handleSpeech = (text: string) => {
    playClickSound();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Ձեր բրաուզերը չի աջակցում ձայնային արտասանություն:");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 max-w-5xl mx-auto" id="theory_section_container">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
        <div>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full tracking-wider uppercase mb-2 inline-block">
            {lesson.titleEsp}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {lesson.titleArm}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{lesson.descriptionArm}</p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            props.onStartPractice();
          }}
          className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/25 transform active:scale-98 transition duration-200"
          id="btn_start_lesson_practice"
        >
          <Award className="w-5 h-5" />
          <span>Սկսել Խաղը</span>
        </button>
      </div>

      {/* Internal Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-8 w-full max-w-sm">
        <button
          onClick={() => {
            playClickSound();
            setActiveTab("grammar");
          }}
          className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
            activeTab === "grammar"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Քերականություն
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab("vocabulary");
          }}
          className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
            activeTab === "vocabulary"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Բառարան ({lesson.vocabulary.length})
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === "grammar" ? (
        <div className="space-y-6 text-slate-800 leading-relaxed" id="grammar_markdown_render_block">
          {/* Visual Sentence Model */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 md:p-6 mb-8">
            <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-500" />
              Համեմատական Բառակարգի Օրինակ
            </h3>

            {/* Visual breakdown cards */}
            {props.selectedTopic === Topic.GRAMMAR && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs text-slate-500 mb-2 font-mono">ՀԱՅԵՐԵՆ (Ազատ բառակարգ)</div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-3 py-1.5 bg-sky-50 text-sky-800 rounded-lg border border-sky-100 font-medium">Ես `Ենթակա`</span>
                    <span className="px-3 py-1.5 bg-orange-50 text-orange-800 rounded-lg border border-orange-100 font-medium font-mono">խնձոր `Լրացում`</span>
                    <span className="px-3 py-1.5 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-100 font-medium">ուտում եմ `Ստորոգյալ`</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center py-1">
                  <div className="h-6 w-0.5 bg-slate-200 border-dashed"></div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 mb-2 font-mono">ԻՍՊԱՆԵՐԵՆ (SVO - Խիստ բառակարգ)</div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-3 py-1.5 bg-sky-500 text-white rounded-lg font-bold shadow-sm">Yo `S`</span>
                    <span className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg font-bold shadow-sm">como `V`</span>
                    <span className="px-3 py-1.5 bg-orange-500 text-white rounded-lg font-bold shadow-sm">una manzana `O`</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 italic">
                    * Իսպաներենում ածականը դրվում է գոյականից հետո: Օր. «կարմիր խնձոր» &rarr; «manzana roja» (բառացի՝ խնձոր կարմիր)
                  </p>
                </div>
              </div>
            )}

            {props.selectedTopic === Topic.TIME && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200/60">
                    <div className="font-bold text-slate-800 text-sm">Ժամը 1:00 (Եզակի)</div>
                    <div className="text-xl font-extrabold text-indigo-600 mt-1">Es la una</div>
                    <div className="text-xs text-slate-400 mt-1">Es la (լինել-ի եզակի ձև) + una (1)</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/60">
                    <div className="font-bold text-slate-800 text-sm">Ժամը 2-ից սկսած (Հոգնակի)</div>
                    <div className="text-xl font-extrabold text-indigo-600 mt-1">Son las dos</div>
                    <div className="text-xs text-slate-400 mt-1">Son las (լինել-ի հոգնակի ձև) + dos (երկու)</div>
                  </div>
                </div>
              </div>
            )}

            {props.selectedTopic === Topic.WEATHER && (
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Հատուկ ուշադրություն Hacer (անել) բային.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <span className="block font-bold text-amber-900">Hace calor</span>
                    <span className="text-xs text-amber-600">Շոգ է (անվում է շոգ)</span>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-100">
                    <span className="block font-bold text-cyan-900">Hace frío</span>
                    <span className="text-xs text-cyan-600">Ցուրտ է (անվում է ցուրտ)</span>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                    <span className="block font-bold text-indigo-900">Hace sol</span>
                    <span className="text-xs text-indigo-600">Արևոտ է (անվում է արև)</span>
                  </div>
                </div>
              </div>
            )}

            {props.selectedTopic === Topic.NUMBERS && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Ալիքաձև Տարիքային կաղապարը` <span className="text-rose-600">Tener</span> բայով.</p>
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-150 inline-block font-mono text-sm font-semibold">
                  Yo <span className="text-rose-500">tengo</span> veinte años = Ես քսան տարեկան եմ (բառացի՝ ունեմ 20 տարի)
                </div>
              </div>
            )}

            {props.selectedTopic === Topic.MONTHS && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase">Ամսաթվի Կառույցը</p>
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg inline-flex items-center gap-2 font-mono text-sm border border-emerald-150">
                  <span className="font-bold">el</span> (հոդ) + <span className="font-bold">diez</span> (օր) + <span className="font-bold">de</span> + <span className="font-bold">octubre</span> (ամիս) = հոկտեմբերի 10-ը
                </div>
              </div>
            )}
          </div>

          <div className="prose max-w-none text-slate-700 prose-headings:text-slate-900 text-sm md:text-base">
            {lesson.grammarExplanation.split("\n\n").map((para, idx) => {
              if (para.startsWith("###")) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-slate-900 mt-6 mb-3 border-b border-indigo-50 pb-2">
                    {para.replace("###", "").trim()}
                  </h3>
                );
              }
              if (para.startsWith("*")) {
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-2 my-2">
                    {para.split("\n").map((li, lIdx) => (
                      <li key={lIdx} className="text-slate-700">
                        {li.replace(/^\s*\*\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="my-3 leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4" id="vocabulary_lessons_table_list">
          <p className="text-sm text-slate-500 mb-4 italic">
            💡 Սեղմեք բարձրախոսի կոճակը՝ իսպաներեն բառերի ճիշտ արտասանությունը լսելու համար:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.vocabulary.map((vocab: VocabularyItem, index) => (
              <div
                key={index}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-2xl p-4 flex items-start justify-between transition-colors duration-200"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900 font-mono tracking-wide">
                      {vocab.spanish}
                    </span>
                    <button
                      onClick={() => handleSpeech(vocab.spanish)}
                      className="cursor-pointer p-1.5 text-indigo-500 hover:text-indigo-700 hover:bg-white rounded-full transition-colors shadow-sm"
                      title="Լսել արտասանությունը"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Արտասանություն` իսպաներեն</div>
                  
                  <div className="text-sm text-indigo-700 font-semibold mt-2.5">
                    {vocab.armenian}
                  </div>
                  
                  {(vocab.exampleSpanish) && (
                    <div className="mt-3 text-xs bg-white border border-slate-100 p-2.5 rounded-xl space-y-1">
                      <div className="font-mono text-slate-600 italic">Esp: {vocab.exampleSpanish}</div>
                      <div className="text-slate-500 font-sans">Arm: {vocab.exampleArmenian}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
