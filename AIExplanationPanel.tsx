import React, { useState } from "react";
import { Brain, Send, MessageCircle, AlertCircle, Sparkles, BookOpen } from "lucide-react";
import { playClickSound, playSuccessSound } from "./audio";

export default function AIExplanationPanel() {
  const [userQuery, setUserQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const samplePrompts = [
    "Ինչպե՞ս ճիշտ ասել «ժամը 7-ն անց կես է» առավոտյան:",
    "Բացատրիր Tener բայի դերը տարիք արտահայտելու համար:",
    "Ինչո՞ւ են ածականները իսպաներենում գոյականից հետո գրվում:",
    "Ինչպե՞ս կառուցել եղանակի մասին նախադասություններ Hace-ով:"
  ];

  const handleQuerySubmit = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;
    playClickSound();
    setIsLoading(true);
    setErrorText(null);
    setAiResponse(null);
    setUserQuery(queryText);

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userSentence: queryText,
          action: "ask",
          themeContext: "general"
        })
      });

      const data = await response.json();
      if (data.success) {
        setAiResponse(data.text);
        playSuccessSound();
      } else {
        setErrorText(data.message || "AI-օգնականը անհասանելի է:");
      }
    } catch (err) {
      setErrorText("Կապի սխալ: Խնդրում ենք ստուգել ձեր կապը սերվերի հետ և փորձել նորից:");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto" id="ai_tutor_consultant_box">
      {/* Header design */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700">
          <Brain className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <span className="text-3xs font-extrabold uppercase tracking-widest text-indigo-500 font-mono">INTELLIGENT ASSISTANT</span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-none">
            AI-Օգնական Ուսուցիչ
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Տվեք ձեր ցանկացած հարցը իսպաներենի քերականության, բառերի կամ նախադասությունների կառուցման մասին հայերենով:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ask panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5Packed">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Հաճախակի տրվող հարցեր (Օրինակներ)`
            </h3>
            
            <div className="space-y-2">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuerySubmit(prompt)}
                  disabled={isLoading}
                  className="w-full text-left p-3 bg-white hover:bg-indigo-50/40 text-xs text-slate-700 hover:text-indigo-950 rounded-xl border border-slate-200 hover:border-indigo-250 transition-all font-medium leading-relaxed cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
            <div className="flex items-start gap-2 text-indigo-950 text-xs leading-relaxed">
              <BookOpen className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>
                Մեր AI-ն օգտագործում է <strong>Gemini 3.5 Flash</strong> մոդելը` ճշգրիտ և պարզ պարզաբանումներ հայերենով տրամադրելու համար:
              </span>
            </div>
          </div>
        </div>

        {/* Console / Response panel */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          {/* Main chat input */}
          <div className="bg-slate-50/40 border-2 border-slate-200 focus-within:border-indigo-500 rounded-2xl p-2.5 flex items-center gap-2 transition-all">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleQuerySubmit(userQuery);
              }}
              placeholder="Գրեք ձեր հարցը այստեղ (օր.՝ Ինչպե՞ս ասել «ձյուն է գալիս»)..."
              className="flex-1 bg-transparent border-none text-slate-900 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-0 disabled:opacity-60"
            />
            <button
              onClick={() => handleQuerySubmit(userQuery)}
              disabled={isLoading || !userQuery.trim()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold rounded-xl text-xs sm:text-sm shadow-md transition duration-200 shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Հարցնել</span>
            </button>
          </div>

          {/* Answer Area */}
          <div className="min-h-[200px] bg-slate-50 border border-slate-150 rounded-2xl p-5 flex flex-col justify-between overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-12 my-auto">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-slate-500 text-xs sm:text-sm italic">AI Օգնականը պատրաստում է մանրամասն պատասխանը ձեզ համար...</p>
              </div>
            ) : errorText ? (
              <div className="text-center py-8 my-auto max-w-md mx-auto">
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-2" />
                <p className="text-rose-700 font-bold text-sm">AI-օգնականը ժամանակավորապես անհասանելի է</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {errorText}
                </p>
              </div>
            ) : aiResponse ? (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-xs uppercase font-mono tracking-wider border-b border-slate-200 pb-1.5">
                  <MessageCircle className="w-4 h-4" />
                  <span>Պատասխան`</span>
                </div>
                <div className="prose prose-indigo max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  {aiResponse}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 my-auto">
                <Brain className="w-10 h-10 text-slate-350 mx-auto mb-3" />
                <p className="text-slate-400 font-medium text-xs sm:text-sm max-w-sm mx-auto">
                  Դեռևս հարցում չկա: Ընտրեք ձախ կողմի օրինակներից մեկը կամ մուտքագրեք ձեր սեփական հարցը:
                </p>
              </div>
            )}

            <div className="mt-6 pt-3 border-t border-slate-150 text-2xs text-slate-400 italic flex items-center gap-1">
              <span>* AI Ուսուցիչը տիրապետում է ողջ իսպաներեն քերականությանը:</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
