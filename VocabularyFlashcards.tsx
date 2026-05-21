import React, { useState, useEffect } from "react";
import { Topic, VocabularyItem } from "./types";
import { lessonsData } from "./lessonsData";
import { playClickSound, playSuccessSound, playFailureSound } from "./audio";
import { Sparkles, RefreshCw, Volume2, HelpCircle, GraduationCap, Award } from "lucide-react";

interface VocabularyFlashcardsProps {
  onIncrementScore: (points: number) => void;
}

interface MatchCard {
  id: string;
  text: string;
  lang: "es" | "hy";
  pairId: number; // to verify match
  isMatched: boolean;
}

export default function VocabularyFlashcards(props: VocabularyFlashcardsProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(Topic.NUMBERS);
  const [activeMode, setActiveMode] = useState<"flashcards" | "matching">("flashcards");

  const vocabList: VocabularyItem[] = lessonsData[selectedTopic].vocabulary;

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Matching game state
  const [matchCards, setMatchCards] = useState<MatchCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [resolvedMatchesCount, setResolvedMatchesCount] = useState(0);
  const [isMatcherWon, setIsMatcherWon] = useState(false);

  useEffect(() => {
    setCardIndex(0);
    setIsFlipped(false);
    if (activeMode === "matching") {
      initializeMatchingGame();
    }
  }, [selectedTopic, activeMode]);

  const handleSpeech = (text: string) => {
    playClickSound();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFlip = () => {
    playClickSound();
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    playClickSound();
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex(prev => (prev + 1) % vocabList.length);
    }, 150);
  };

  const handlePrevCard = () => {
    playClickSound();
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex(prev => (prev - 1 + vocabList.length) % vocabList.length);
    }, 150);
  };

  // Setup matching cards from vocabulary
  const initializeMatchingGame = () => {
    setSelectedCardId(null);
    setResolvedMatchesCount(0);
    setIsMatcherWon(false);

    // Pick at most 4 elements from vocabulary to keep it clean and fits in viewports
    const subset = [...vocabList].sort(() => 0.5 - Math.random()).slice(0, 4);

    const esCards = subset.map((item, idx) => ({
      id: `es-${idx}`,
      text: item.spanish,
      lang: "es" as const,
      pairId: idx,
      isMatched: false,
    }));

    const hyCards = subset.map((item, idx) => ({
      id: `hy-${idx}`,
      text: item.armenian,
      lang: "hy" as const,
      pairId: idx,
      isMatched: false,
    }));

    // Shuffle separately
    const combined = [...esCards, ...hyCards].sort(() => 0.5 - Math.random());
    setMatchCards(combined);
  };

  const handleCardMatchSelection = (cardId: string) => {
    if (isMatcherWon) return;
    const card = matchCards.find(c => c.id === cardId);
    if (!card || card.isMatched) return;

    playClickSound();

    if (selectedCardId === null) {
      setSelectedCardId(cardId);
    } else {
      const prevCard = matchCards.find(c => c.id === selectedCardId);
      if (!prevCard) {
        setSelectedCardId(cardId);
        return;
      }

      // If clicked the same card, deselect
      if (prevCard.id === card.id) {
        setSelectedCardId(null);
        return;
      }

      // Check match: different language and same pairId
      if (prevCard.lang !== card.lang && prevCard.pairId === card.pairId) {
        // Correct pair match!
        playSuccessSound();
        setMatchCards(prev =>
          prev.map(c =>
            c.id === prevCard.id || c.id === card.id ? { ...c, isMatched: true } : c
          )
        );
        setSelectedCardId(null);
        
        // Accumulate matching progress
        const nextCount = resolvedMatchesCount + 1;
        setResolvedMatchesCount(nextCount);
        
        // Check if all 4 matched
        if (nextCount === 4) {
          setIsMatcherWon(true);
          props.onIncrementScore(20);
        }
      } else {
        // Bad match
        playFailureSound();
        const flashId = prevCard.id;
        const targetId = card.id;
        
        // Pulse background for visual error then uncheck
        setSelectedCardId(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto" id="vocab_flashcard_container">
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-600 rounded-full tracking-wider uppercase mb-2 inline-block">
            Բառախաղ և Մարզում
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Թեմատիկ բառարաններ
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            սովորեք եղանակի, թվերի, ժամանակի և ամիսների բառերը ինտերակտիվ խաղերով:
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-center">
          <button
            onClick={() => {
              playClickSound();
              setActiveMode("flashcards");
            }}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeMode === "flashcards"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Քարտեր (Flashcards)
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveMode("matching");
            }}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeMode === "matching"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Միացման Խաղ
          </button>
        </div>
      </div>

      {/* Topic selection chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[Topic.NUMBERS, Topic.TIME, Topic.WEATHER, Topic.MONTHS].map(topic => {
          const active = selectedTopic === topic;
          return (
            <button
              key={topic}
              onClick={() => {
                playClickSound();
                setSelectedTopic(topic);
              }}
              className={`cursor-pointer px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                active
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-150"
              }`}
            >
              {lessonsData[topic].titleArm}
            </button>
          );
        })}
      </div>

      {/* FLASHCARD VIEW */}
      {activeMode === "flashcards" && (
        <div className="max-w-md mx-auto" id="flashcard_module_box">
          {/* Main Flipping Card Frame */}
          <div
            onClick={handleFlip}
            className={`cursor-pointer w-full h-64 md:h-72 aspect-video bg-gradient-to-br from-indigo-50 to-indigo-10/20 rounded-3xl border-2 border-indigo-100 p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform duration-300 relative overflow-hidden ${
              isFlipped ? "ring-2 ring-indigo-400 rotate-1/2 scale-102" : "hover:border-indigo-300"
            }`}
          >
            {/* Pronounce tag */}
            {!isFlipped && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeech(vocabList[cardIndex].spanish);
                }}
                className="cursor-pointer absolute top-4 right-4 p-2 bg-white hover:bg-indigo-50 border border-indigo-150 text-indigo-600 rounded-full shadow-sm transition-all"
                title="Լսել արտասանությունը"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}

            <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest font-mono">
              {isFlipped ? "ՀԱՅԵՐԵՆ ԹԱՐԳՄԱՆՈՒԹՅՈՒՆ" : "ԻՍՊԱՆԵՐԵՆ ԲԱՌ"}
            </span>

            {/* Central Word */}
            <div className="text-center my-auto px-4">
              {isFlipped ? (
                <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-900 leading-snug">
                  {vocabList[cardIndex].armenian}
                </h3>
              ) : (
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-mono">
                    {vocabList[cardIndex].spanish}
                  </h3>
                  {vocabList[cardIndex].transcription && (
                    <p className="text-sm font-semibold text-slate-500 font-mono">
                      [{vocabList[cardIndex].transcription}]
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom guide */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Սեղմեք քարտը շրջելու համար</span>
              <span className="font-mono">{cardIndex + 1} / {vocabList.length}</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-4">
            <button
              onClick={handlePrevCard}
              className="cursor-pointer px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition duration-200"
            >
              Նախորդը
            </button>

            <button
              onClick={handleFlip}
              className="cursor-pointer px-4 py-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Շրջել</span>
            </button>

            <button
              onClick={handleNextCard}
              className="cursor-pointer px-4 py-2 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition duration-200"
            >
              Հաջորդը
            </button>
          </div>
        </div>
      )}

      {/* MATCHING PUZZLE VIEW */}
      {activeMode === "matching" && (
        <div className="max-w-2xl mx-auto" id="matching_puzzle_box">
          {isMatcherWon ? (
            <div className="text-center p-8 bg-emerald-50 border border-emerald-150 rounded-3xl" id="matcher_congratulate_box">
              <span className="text-2xl">🏆</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Փայլուն հաղթանակ:</h3>
              <p className="text-slate-500 text-sm mt-1">Բոլոր բառերը հաջողությամբ միացված են։ Դուք վաստակեցիք +20 միավոր։</p>
              
              <button
                onClick={initializeMatchingGame}
                className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition transition-all cursor-pointer"
              >
                Խաղալ Նորից
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-semibold uppercase">Միացրեք Իսպաներեն և Հայերեն զույգերը.</span>
                <button
                  onClick={initializeMatchingGame}
                  className="cursor-pointer text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-bold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Սկսել նորից</span>
                </button>
              </div>

              {/* Memory board cards list */}
              <div className="grid grid-cols-2 gap-4">
                {matchCards.map((card) => {
                  const isSelected = selectedCardId === card.id;
                  return (
                    <button
                      key={card.id}
                      disabled={card.isMatched}
                      onClick={() => handleCardMatchSelection(card.id)}
                      className={`w-full p-4 h-24 rounded-2xl border-2 flex items-center justify-center text-center transition-all cursor-pointer ${
                        card.isMatched
                          ? "border-emerald-250 bg-emerald-50/30 text-emerald-400 opacity-60"
                          : isSelected
                            ? "border-indigo-600 bg-indigo-50/10 text-indigo-950 scale-102 font-bold ring-2 ring-indigo-200"
                            : "border-slate-200 bg-white hover:border-slate-350 text-slate-800 shadow-sm"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className={`text-3xs uppercase tracking-widest font-mono block ${
                          card.lang === "es" ? "text-indigo-400" : "text-amber-500"
                        }`}>
                          {card.lang === "es" ? "Spain" : "Armenia"}
                        </span>
                        <p className={`text-sm md:text-base font-bold ${card.lang === "es" ? "font-mono" : ""}`}>
                          {card.text}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
