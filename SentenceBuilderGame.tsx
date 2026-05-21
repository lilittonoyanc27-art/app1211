import React, { useState, useEffect } from "react";
import { Topic, SentenceExercise } from "./types";
import { lessonsData } from "./lessonsData";
import { playClickSound, playSuccessSound, playFailureSound } from "./audio";
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, ArrowRight, BrainCircuit, MessageSquareCode, Sparkles, HelpCircle } from "lucide-react";

interface SentenceBuilderGameProps {
  selectedTopic: Topic;
  onBackToTheory: () => void;
  onIncrementScore: (points: number) => void;
}

export default function SentenceBuilderGame(props: SentenceBuilderGameProps) {
  const lesson = lessonsData[props.selectedTopic];
  const exercises: SentenceExercise[] = lesson.exercises;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [shuffledChips, setShuffledChips] = useState<string[]>([]);
  
  // Custom input toggle for advanced mode
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [customInputText, setCustomInputText] = useState("");

  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [forceShowExplanation, setForceShowExplanation] = useState(false);

  // AI Tutor Integration States
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const currentExercise = exercises[currentIndex];

  // Perfect shuffling
  const shuffleArray = (array: string[]) => {
    // Filter punctuation strings and clean them for standard chips
    const cleaned = array.map(w => w.replace(/[.,!?¿¡]/g, ""));
    const arr = [...cleaned];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    if (currentExercise) {
      setShuffledChips(shuffleArray(currentExercise.wordsInOrder));
      setSelectedChips([]);
      setCustomInputText("");
      setHasChecked(false);
      setIsCorrect(false);
      setForceShowExplanation(false);
      setAiResponse(null);
      setAiError(null);
    }
  }, [currentIndex, props.selectedTopic]);

  if (!currentExercise) {
    return (
      <div className="text-center p-8 bg-white rounded-3xl" id="no_exercise_banner">
        <p className="text-slate-500 font-medium">Այս թեմայի համար վարժություններ դեռ չկան:</p>
        <button onClick={props.onBackToTheory} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl">Անցնել Տեսությանը</button>
      </div>
    );
  }

  const handleChipClick = (word: string, index: number) => {
    if (hasChecked) return;
    playClickSound();
    
    // Append word
    setSelectedChips(prev => [...prev, word]);
    
    // Remove from shuffled pool at that index but keep others
    setShuffledChips(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleRemoveLastSelected = () => {
    if (hasChecked || selectedChips.length === 0) return;
    playClickSound();

    const last = selectedChips[selectedChips.length - 1];
    setSelectedChips(prev => prev.slice(0, -1));
    setShuffledChips(prev => [...prev, last]);
  };

  const handleReset = () => {
    playClickSound();
    setSelectedChips([]);
    setShuffledChips(shuffleArray(currentExercise.wordsInOrder));
    setCustomInputText("");
    setHasChecked(false);
    setIsCorrect(false);
    setForceShowExplanation(false);
    setAiResponse(null);
    setAiError(null);
  };

  const checkAnswer = () => {
    const userAnsClean = isAdvancedMode 
      ? customInputText.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¡¿]/g, "")
      : selectedChips.join(" ").toLowerCase().trim();

    const modelAnsClean = currentExercise.spanish.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¡¿]/g, "");

    const correct = userAnsClean === modelAnsClean;

    setHasChecked(true);
    setIsCorrect(correct);

    if (correct) {
      playSuccessSound();
      props.onIncrementScore(15);
    } else {
      playFailureSound();
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed last exercise
      alert("🎉 Շնորհավորում ենք: Դուք հաջողությամբ յուրացրեցիք այս դասի բոլոր նախադասությունները։");
      props.onBackToTheory();
    }
  };

  // Call the AI Tutor endpoint for personalized grammar and translation review
  const handleAiCheck = async () => {
    playClickSound();
    setIsAiLoading(true);
    setAiError(null);
    setAiResponse(null);

    const userSentenceStr = isAdvancedMode ? customInputText : selectedChips.join(" ");

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spanishCode: currentExercise.spanish,
          armenianText: currentExercise.armenian,
          userSentence: userSentenceStr || "Չի լրացվել",
          themeContext: props.selectedTopic,
          action: "check"
        })
      });

      const data = await response.json();
      if (data.success) {
        setAiResponse(data.text);
      } else {
        setAiError(data.message || "Սերվերի հետ կապի սխալ։");
      }
    } catch (err: any) {
      setAiError("Չհաջողվեց կապ հաստատել AI-ի հետ։ Խնդրում ենք ստուգել ինտերնետային կապը կամ փորձել նորից։");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Get full grammar explanation for the current exercise from AI
  const handleAiFullExplain = async () => {
    playClickSound();
    setIsAiLoading(true);
    setAiError(null);
    setAiResponse(null);

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spanishCode: currentExercise.spanish,
          armenianText: currentExercise.armenian,
          themeContext: props.selectedTopic,
          action: "explain"
        })
      });

      const data = await response.json();
      if (data.success) {
        setAiResponse(data.text);
      } else {
        setAiError(data.message || "Օգնականը անհասանելի է։");
      }
    } catch (err: any) {
      setAiError("AI Կապի սխալ:");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto" id="builder_game_root">
      {/* Top bar control */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <button
          onClick={() => {
            playClickSound();
            props.onBackToTheory();
          }}
          className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xl transition duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Տեսություն</span>
        </button>

        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono tracking-wider uppercase">Առաջընթաց</span>
          <div className="text-sm font-bold text-slate-800 font-mono">
            {currentIndex + 1} / {exercises.length}
          </div>
        </div>
      </div>

      {/* Exercise Card */}
      <div className="bg-slate-50/60 rounded-2xl p-5 md:p-6 border border-slate-100 mb-6 relative overflow-hidden" id="exercise_prompt_card">
        {/* Decorative corner tag */}
        <div className="absolute top-0 right-0 py-1.5 px-3 bg-indigo-50 text-indigo-600 rounded-bl-xl font-bold text-xs uppercase font-mono tracking-wide">
          {props.selectedTopic}
        </div>

        <span className="text-xs text-indigo-500 font-bold uppercase tracking-wide">Թարգմանեք հայերենից</span>
        <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mt-1 leading-snug">
          {currentExercise.armenian}
        </h3>
      </div>

      {/* Mode Selector Toggle */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => {
            playClickSound();
            setIsAdvancedMode(false);
            handleReset();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            !isAdvancedMode
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          Բառային չիպերով
        </button>
        <button
          onClick={() => {
            playClickSound();
            setIsAdvancedMode(true);
            handleReset();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isAdvancedMode
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          Գրավոր (Ավելի դժվար)
        </button>
      </div>

      {/* Built Translation Area */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Իսպաներեն Նախադասությունը</label>
        
        {isAdvancedMode ? (
          <input
            type="text"
            value={customInputText}
            onChange={(e) => setCustomInputText(e.target.value)}
            disabled={hasChecked}
            placeholder="Մուտքագրեք իսպաներեն թարգմանությունը այստեղ..."
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 font-mono text-base text-slate-900 focus:outline-none focus:border-indigo-500 disabled:opacity-85 disabled:bg-slate-100 transition duration-200"
            id="custom_typing_input_field"
          />
        ) : (
          <div
            className={`min-h-[70px] bg-slate-50 border-2 border-dashed rounded-2xl p-4 flex flex-wrap gap-2.5 items-center transition-all ${
              hasChecked
                ? isCorrect
                  ? "border-emerald-300 bg-emerald-50/20"
                  : "border-rose-300 bg-rose-50/20"
                : "border-slate-200 focus-within:border-slate-300"
            }`}
          >
            {selectedChips.length === 0 ? (
              <p className="text-slate-400 text-sm italic py-1 pl-1">
                Սեղմեք ստորև բերված բառերի վրա՝ ճիշտ հերթականությամբ նախադասություն կազմելու համար...
              </p>
            ) : (
              selectedChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={handleRemoveLastSelected}
                  disabled={hasChecked}
                  className="cursor-pointer bg-white border border-slate-200 text-slate-800 font-mono font-bold px-3.5 py-1.5 rounded-xl text-sm shadow-sm hover:border-rose-300 hover:bg-rose-50/10 active:scale-95 transition-all"
                  title="Սեղմեք վերջին բառը ջնջելու համար"
                >
                  {chip}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Available Chips Area / Keyboard */}
      {!isAdvancedMode && !hasChecked && (
        <div className="mb-8 bg-slate-50/40 border border-slate-120 p-5 rounded-2xl">
          <div className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Հասանելի բառերը</div>
          <div className="flex flex-wrap gap-2">
            {shuffledChips.map((word, index) => (
              <button
                key={index}
                onClick={() => handleChipClick(word, index)}
                className="cursor-pointer bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 text-slate-700 font-mono font-bold px-4 py-2 rounded-xl text-sm shadow-xs active:scale-95 transition-all text-center"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Buttons controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between border-t border-slate-100 pt-6">
        <div className="flex gap-2">
          {!hasChecked ? (
            <>
              <button
                onClick={checkAnswer}
                disabled={!isAdvancedMode ? selectedChips.length === 0 : !customInputText.trim()}
                className="cursor-pointer px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold rounded-2xl shadow-md transition duration-200"
                id="btn_check_answer"
              >
                Ստուգել
              </button>
              
              <button
                onClick={handleReset}
                className="cursor-pointer p-3 bg-slate-100 hover:bg-slate-250 text-slate-600 hover:text-slate-900 rounded-2xl transition duration-200"
                title="Մաքրել բոլորը"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-md transition duration-200"
              id="btn_next_exercise"
            >
              <span>{currentIndex === exercises.length - 1 ? "Ավարտել" : "Հաջորդ Նախադասությունը"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* AI & Reveal buttons */}
        <div className="flex gap-2">
          {hasChecked && !isCorrect && (
            <button
              onClick={handleAiCheck}
              disabled={isAiLoading}
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md disabled:opacity-50 transition duration-200"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>AI Իմ սխալի վերլուծություն</span>
            </button>
          )}

          <button
            onClick={() => {
              playClickSound();
              setForceShowExplanation(prev => !prev);
            }}
            className="cursor-pointer px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-xl text-xs sm:text-sm transition duration-200"
          >
            {forceShowExplanation ? "Թաքցնել կառուցվածքը" : "Ցույց տալ Կանոնը"}
          </button>
        </div>
      </div>

      {/* Answer feedback blocks */}
      {hasChecked && (
        <div className="mt-8">
          {isCorrect ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-emerald-50 border border-emerald-205 rounded-2xl p-5" id="success_feedback_panel">
              <div className="md:col-span-1 text-center md:text-left">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              </div>
              <div className="md:col-span-11 space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest">Ճիշտ է ! (+15 Միավոր)</span>
                <p className="text-emerald-900 font-bold font-mono text-base md:text-lg">
                  {currentExercise.spanish}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-rose-50 border border-rose-205 rounded-2xl p-5" id="failure_feedback_panel">
              <div className="md:col-span-1 text-center md:text-left">
                <XCircle className="w-10 h-10 text-rose-500 mx-auto" />
              </div>
              <div className="md:col-span-11 space-y-1">
                <span className="text-xs font-mono font-bold text-rose-600 uppercase tracking-widest">Սխալ թարգմանություն</span>
                <p className="text-slate-500 text-xs">
                  Ձեր տարբերակը: <code className="font-mono bg-rose-100/50 px-1 py-0.5 rounded text-rose-700 text-xs">{isAdvancedMode ? customInputText : selectedChips.join(" ")}</code>
                </p>
                <div className="pt-2">
                  <span className="text-xs text-slate-400 block font-semibold">Ճիշտ պատասխանը`</span>
                  <p className="text-rose-900 font-extrabold font-mono text-base">
                    {currentExercise.spanish}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grammar structural breakdown / Explanatory block */}
      {(hasChecked || forceShowExplanation) && (
        <div className="mt-6 bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-200/60" id="sentence_structure_rules_block">
          <h4 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            Նախադասության կառուցվածքի բացատրություն
          </h4>
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
            {currentExercise.explanation}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-xs text-slate-400">
              💡 Իսպաներենում ածականը հաճախ գրվում է գոյականից հետո, իսկ բայը՝ ենթակային սերտ կից:
            </span>
            <button
              onClick={handleAiFullExplain}
              disabled={isAiLoading}
              className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold transition duration-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ավելի մանրամասն AI-ով</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Tutor Chat Pop-up overlay (or integrated view) */}
      {(isAiLoading || aiResponse || aiError) && (
        <div className="mt-6 border border-purple-100 bg-purple-50/20 rounded-2xl p-5 md:p-6 relative overflow-hidden" id="ai_tutor_feedback_block">
          {/* Top header */}
          <div className="flex items-center gap-2 pb-3 border-b border-purple-100 mb-4 text-purple-800">
            <BrainCircuit className="w-5 h-5 animate-pulse text-purple-600" />
            <span className="font-extrabold text-sm md:text-base tracking-tight">AI Իսպաներենի Անձնական Ուսուցիչ</span>
          </div>

          {isAiLoading && (
            <div className="flex items-center gap-3 text-slate-600 py-4 justify-center">
              <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm italic font-medium">AI Ուսուցիչը վերլուծում է ձեր նախադասությունը...</span>
            </div>
          )}

          {aiError && (
            <div className="text-rose-600 text-sm py-2">
              ⚠️ {aiError}
            </div>
          )}

          {aiResponse && (
            <div className="prose prose-purple max-w-none text-slate-800 text-sm leading-relaxed font-sans mt-2 whitespace-pre-line bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-purple-100/40">
              {aiResponse}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
