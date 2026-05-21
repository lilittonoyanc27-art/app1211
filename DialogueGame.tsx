import React, { useState } from "react";
import { dialoguesData, dialogueQuizzes } from "./lessonsData";
import { playClickSound, playSuccessSound, playFailureSound } from "./audio";
import { MessageSquare, RefreshCw, Send, CheckCircle2, AlertCircle, HelpCircle, User, ArrowLeftRight } from "lucide-react";

interface DialogueGameProps {
  onIncrementScore: (points: number) => void;
}

export default function DialogueGame(props: DialogueGameProps) {
  const [activeTab, setActiveTab] = useState<"reader" | "quiz">("reader");
  
  // Dialogue reader states
  const [activeDialogue, setActiveDialogue] = useState(dialoguesData[0]);
  const [selectedExchangeIndex, setSelectedExchangeIndex] = useState<number | null>(null);

  // Dialogue quiz states
  const [activeQuiz, setActiveQuiz] = useState(dialogueQuizzes[0]);
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  const handleSpeech = (text: string) => {
    playClickSound();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextQuizStep = () => {
    playClickSound();
    if (currentQuizStep < activeQuiz.steps.length - 1) {
      setCurrentQuizStep(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsSubmitted(false);
    } else {
      setIsQuizFinished(true);
      props.onIncrementScore(scoreEarned);
    }
  };

  const handleSubmitQuizStep = () => {
    if (selectedOptionIndex === null) return;
    setIsSubmitted(true);
    
    const step = activeQuiz.steps[currentQuizStep];
    if (selectedOptionIndex === step.correctIndex) {
      playSuccessSound();
      setScoreEarned(prev => prev + 20);
    } else {
      playFailureSound();
    }
  };

  const handleResetQuiz = () => {
    playClickSound();
    setCurrentQuizStep(0);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setIsQuizFinished(false);
    setScoreEarned(0);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto" id="dialogue_main_panel">
      {/* Dialogue Header */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="text-xs font-bold px-3 py-1 bg-purple-50 text-purple-600 rounded-full tracking-wider uppercase mb-2 inline-block">
          Ելույթ և Արտահայտություն
        </span>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Երկխոսության մոդուլ
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Սովորեք իսպաներեն կենդանի խոսակցություններ և կառուցվածքային երկխոսություններ հայերեն բացատրություններով:
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-8 w-full max-w-md">
        <button
          onClick={() => {
            playClickSound();
            setActiveTab("reader");
          }}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === "reader"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ընթերցանություն</span>
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab("quiz");
            handleResetQuiz();
          }}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === "quiz"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Ինտերակտիվ Խաղ</span>
        </button>
      </div>

      {/* READER MODE CONTENT */}
      {activeTab === "reader" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="dialogue_reader_view_block">
          {/* Left Column Chat */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-50 p-4 rounded-t-2xl border-x border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{activeDialogue.title}</span>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">5 խոսքեր</span>
            </div>

            <div className="bg-slate-50 border-x border-b border-indigo-50/50 p-4 md:p-6 rounded-b-2xl max-h-[460px] overflow-y-auto space-y-4 shadow-inner">
              {activeDialogue.exchanges.map((exchange, idx) => {
                const isLeft = exchange.speaker === "A";
                return (
                  <div
                    key={exchange.id + idx}
                    onClick={() => {
                      playClickSound();
                      setSelectedExchangeIndex(idx);
                    }}
                    className={`cursor-pointer max-w-[85%] rounded-2xl p-4 transition-all duration-200 shadow-sm ${
                      isLeft
                        ? "bg-white border-l-4 border-indigo-500 rounded-tl-none mr-auto hover:bg-slate-50"
                        : "bg-indigo-600 text-white rounded-tr-none ml-auto hover:bg-indigo-700"
                    } ${selectedExchangeIndex === idx ? "ring-2 ring-indigo-400 scale-102" : ""}`}
                  >
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <span className={`text-xs font-bold ${isLeft ? "text-indigo-600" : "text-indigo-200"}`}>
                        {exchange.speakerNameArm}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeech(exchange.spanish);
                        }}
                        className={`p-1 rounded-full ${
                          isLeft ? "text-slate-400 hover:text-slate-700 hover:bg-slate-100" : "text-indigo-200 hover:text-white hover:bg-indigo-500"
                        }`}
                        title="Արտասանություն"
                      >
                        🔉
                      </button>
                    </div>

                    <p className={`text-sm md:text-base font-bold font-mono tracking-wide ${isLeft ? "text-slate-900" : "text-white"}`}>
                      {exchange.spanish}
                    </p>
                    <p className={`text-xs mt-1.5 ${isLeft ? "text-slate-500" : "text-indigo-100"}`}>
                      {exchange.armenian}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 italic text-center">
              💡 Սեղմեք ցանկացած խոսքի վրա՝ դրա քերականական կառուցվածքն ու բայերի վերլուծությունը աջ կողմում տեսնելու համար:
            </p>
          </div>

          {/* Right Column Analysis */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50/70 border border-slate-150 rounded-2xl p-5 min-h-[300px] flex flex-col justify-between sticky top-4">
              {selectedExchangeIndex !== null ? (
                <div>
                  <div className="flex items-center gap-2 text-indigo-700 border-b border-slate-200 pb-2 mb-4">
                    <HelpCircle className="w-5 h-5" />
                    <span className="font-extrabold text-sm uppercase tracking-wider">Խոսքի Քերականությունը</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-slate-400 block font-bold uppercase font-mono">Իսպաներեն`</span>
                      <p className="font-mono text-base font-bold text-slate-900 mt-0.5">
                        {activeDialogue.exchanges[selectedExchangeIndex].spanish}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block font-bold uppercase font-mono">Հայերեն`</span>
                      <p className="text-sm font-bold text-indigo-700 mt-0.5">
                        {activeDialogue.exchanges[selectedExchangeIndex].armenian}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <span className="text-xs text-slate-400 block font-bold uppercase">Կառուցվածքային վերլուծություն`</span>
                      <p className="text-slate-700 text-sm mt-1 whitespace-pre-line leading-relaxed">
                        {activeDialogue.exchanges[selectedExchangeIndex].explanation || 
                          "Այս նախադասությունը օգտագործում է առօրյա խոսակցական ողջույնի կանոնները: Իսպաներենում բայը տեղադրվում է անմիջապես 'hola'-ից հետո:"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 my-auto">
                  <ArrowLeftRight className="w-10 h-10 text-slate-350 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium text-sm">
                    Սեղմեք սրճարանային երկխոսության խոսքերից մեկի վրա` մանրամասն բացատրությունը տեսնելու համար:
                  </p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-250">
                <p className="text-xs text-slate-400 leading-snug">
                  * Miguel-ի հետ զրույցը ներառում է ժամերի (время), տարիքի (числа) և եղանակի (погода) թեմաները:
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE QUIZ MODE CONTENT */}
      {activeTab === "quiz" && (
        <div className="max-w-2xl mx-auto" id="dialogue_typing_game_view">
          {isQuizFinished ? (
            <div className="text-center p-8 bg-slate-50 border border-slate-150 rounded-3xl" id="quiz_completed_panel">
              <span className="text-2xl">🏆</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Խաղն ավարտվեց:</h3>
              <p className="text-slate-500 text-sm mt-1">Դուք ստացաք {scoreEarned} միավոր ճիշտ պատասխանների համար:</p>
              
              <button
                onClick={handleResetQuiz}
                className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition transition-all cursor-pointer"
              >
                Խաղալ նորից
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Question card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-start gap-4" id="active_quiz_question_bubble">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700 shrink-0 font-mono">
                  M
                </div>
                <div>
                  <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{activeQuiz.steps[currentQuizStep].speaker} ասում է`</span>
                  <p className="font-mono text-base font-bold text-slate-900 mt-0.5">
                    {activeQuiz.steps[currentQuizStep].promptSpanish}
                  </p>
                  <p className="text-xs text-slate-400 italic mt-0.5">
                    ({activeQuiz.steps[currentQuizStep].promptArmenian})
                  </p>
                </div>
              </div>

              {/* Instructions and options */}
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-3">Ընտրեք ճիշտ պատասխանը`</span>
                
                <div className="space-y-3" id="dialogue_quiz_choices_box">
                  {activeQuiz.steps[currentQuizStep].options.map((option, idx) => {
                    const isSelected = selectedOptionIndex === idx;
                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => {
                          playClickSound();
                          setSelectedOptionIndex(idx);
                        }}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex justify-between items-center cursor-pointer ${
                          isSubmitted
                            ? idx === activeQuiz.steps[currentQuizStep].correctIndex
                              ? "border-emerald-500 bg-emerald-50/40 text-emerald-950"
                              : isSelected
                                ? "border-rose-400 bg-rose-50/40 text-rose-950"
                                : "border-slate-100 bg-slate-50/20 text-slate-400"
                            : isSelected
                              ? "border-indigo-600 bg-indigo-50/10 text-slate-900"
                              : "border-slate-200 bg-white hover:border-slate-350 text-slate-700"
                        }`}
                      >
                        <div>
                          <p className="font-mono text-sm md:text-base font-bold">{option.spanish}</p>
                          <p className={`text-xs mt-0.5 ${isSelected ? "text-indigo-600 font-medium" : "text-slate-500"}`}>{option.armenian}</p>
                        </div>
                        {isSubmitted && idx === activeQuiz.steps[currentQuizStep].correctIndex && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-3" />
                        )}
                        {isSubmitted && isSelected && idx !== activeQuiz.steps[currentQuizStep].correctIndex && (
                          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 ml-3" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-xs font-mono text-slate-400">Քայլ {currentQuizStep + 1} / {activeQuiz.steps.length}</span>

                {!isSubmitted ? (
                  <button
                    disabled={selectedOptionIndex === null}
                    onClick={handleSubmitQuizStep}
                    className="cursor-pointer px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 text-white font-bold rounded-xl text-sm transition"
                  >
                    Հաստատել պատասխանը
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuizStep}
                    className="cursor-pointer px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition"
                  >
                    {currentQuizStep === activeQuiz.steps.length - 1 ? "Ավարտել Խաղը" : "Հաջորդ երկխոսությունը"}
                  </button>
                )}
              </div>

              {/* Quiz explanation box post-submission */}
              {isSubmitted && (
                <div className={`p-4 rounded-xl border ${
                  selectedOptionIndex === activeQuiz.steps[currentQuizStep].correctIndex
                    ? "bg-emerald-50/40 border-emerald-100 text-emerald-950"
                    : "bg-rose-50/30 border-rose-100 text-rose-950"
                }`}>
                  <span className="font-bold text-xs uppercase block mb-1">
                    {selectedOptionIndex === activeQuiz.steps[currentQuizStep].correctIndex ? "🎉 Ճիշտ է!" : "💡 Բացատրություն"}
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {activeQuiz.steps[currentQuizStep].options[selectedOptionIndex || 0].explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
