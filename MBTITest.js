import React, { useState } from 'react';
import { ChevronRight, RefreshCw, CheckCircle, Activity, Shield, Users, Lightbulb, Compass, Target, BookOpen, MinusCircle } from 'lucide-react';

// Definice skupin (rolí)
const groups = {
  analysts: { name: "Analytici (NT)", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", icon: Lightbulb, desc: "Racionální a nestranní, vynikají v intelektuálních debatách a vědě." },
  diplomats: { name: "Diplomaté (NF)", color: "text-green-600", bg: "bg-green-50", border: "border-green-100", icon: Users, desc: "Empatičtí a idealističtí, zaměřují se na pomoc druhým a harmonii." },
  sentinels: { name: "Strážci (SJ)", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", icon: Shield, desc: "Spolupracující a praktičtí, vyhledávají řád, bezpečnost a stabilitu." },
  explorers: { name: "Průzkumníci (SP)", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100", icon: Compass, desc: "Spontánní a vynalézaví, žijí přítomným okamžikem a mají rádi akci." }
};

// Rozšířená data pro 16 osobností
const archetypes = {
  ISTJ: { 
    title: "Správce", 
    group: "sentinels",
    description: "Tichý, vážný a spolehlivý. Cení si tradic a loajality.",
    details: "Jste páteří společnosti. Milujete fakta, detaily a organizaci. Ve všem, co děláte, usilujete o dokonalost a stabilitu. Lidé se na vás mohou vždy spolehnout, že dodržíte slovo.",
    strengths: ["Spolehlivost", "Organizační schopnosti", "Odpovědnost", "Realismus"],
    weaknesses: ["Tvrdohlavost", "Neochota ke změnám", "Může působit chladně", "Sklon se obviňovat"]
  },
  ISFJ: { 
    title: "Ochránce", 
    group: "sentinels",
    description: "Vřelý a svědomitý ochránce, vždy připravený pomoci.",
    details: "Máte silnou potřebu chránit ostatní. Jste velmi všímaví k pocitům druhých a máte vynikající paměť na detaily, které jsou pro lidi důležité. Pracujete tvrdě a tiše.",
    strengths: ["Podpora ostatních", "Spolehlivost", "Trpělivost", "Pozorovací talent"],
    weaknesses: ["Přílišná skromnost", "Bere si věci osobně", "Přetěžování se", "Neochota ke změnám"]
  },
  INFJ: { 
    title: "Poradce", 
    group: "diplomats",
    description: "Tichý vizionář a inspirativní idealista.",
    details: "Jste nejvzácnější typ osobnosti. Máte hluboký vhled do lidské psychiky a silný morální kompas. Nechcete jen proplouvat životem, chcete zanechat pozitivní stopu.",
    strengths: ["Kreativita", "Vhled", "Zásadovost", "Vášeň"],
    weaknesses: ["Perfekcionismus", "Citlivost na kritiku", "Rychlé vyhoření", "Uzavřenost"]
  },
  INTJ: { 
    title: "Architekt", 
    group: "analysts",
    description: "Vynalézavý stratég s plánem pro všechno.",
    details: "Vše vidíte jako šachovou partii. Jste nezávislí myslitelé s vysokými standardy pro sebe i ostatní. Vaše schopnost vidět dlouhodobé důsledky je bezkonkurenční.",
    strengths: ["Strategické myšlení", "Sebevědomí", "Nezávislost", "Otevřenost novým myšlenkám"],
    weaknesses: ["Arogance", "Přílišná analytičnost emocí", "Sklon k souzení", "Perfekcionismus"]
  },
  ISTP: { 
    title: "Kutil", 
    group: "explorers",
    description: "Odvážný experimentátor a mistr nástrojů.",
    details: "Máte rádi ruce od práce a mysl plnou řešení. Jste klidní v krizi a rádi zkoumáte, jak věci fungují. Rutina vás nudí, potřebujete akci a hmatatelné výsledky.",
    strengths: ["Optimismus", "Praktičnost", "Kreativita v krizi", "Uvolněnost"],
    weaknesses: ["Tvrdohlavost", "Nezájem o pocity druhých", "Rizikové chování", "Nestálost"]
  },
  ISFP: { 
    title: "Skladatel", 
    group: "explorers",
    description: "Laskavý umělec připravený prozkoumat nové obzory.",
    details: "Jste svobodomyslní a žijete v přítomném okamžiku. Máte vyvinutý smysl pro estetiku a krásu. Nesnášíte konflikty a omezování vaší svobody.",
    strengths: ["Šarm", "Citlivost k ostatním", "Představivost", "Vášnivost"],
    weaknesses: ["Velká zranitelnost", "Nízké sebevědomí", "Problémy s plánováním", "Přílišná soutěživost"]
  },
  INFP: { 
    title: "Snílek", 
    group: "diplomats",
    description: "Poetický a laskavý altruista.",
    details: "Jste hluboce citliví a empatičtí. Často se ztrácíte ve svých myšlenkách a světech. Vaším cílem je pochopit sami sebe a pomáhat ostatním najít jejich cestu.",
    strengths: ["Empatie", "Štědrost", "Otevřená mysl", "Kreativita"],
    weaknesses: ["Nerealistická očekávání", "Izolace", "Nesoustředěnost", "Zranitelnost"]
  },
  INTP: { 
    title: "Logik", 
    group: "analysts",
    description: "Inovativní vynálezce s žízní po vědění.",
    details: "Milujete vzorce, teorie a abstraktní koncepty. Jste skeptičtí a analytičtí. Problémy pro vás nejsou překážky, ale hádanky k vyřešení.",
    strengths: ["Analytické myšlení", "Originalita", "Otevřenost", "Objektivita"],
    weaknesses: ["Odtažitost", "Roztržitost", "Pochybnosti o sobě", "Neochota následovat pravidla"]
  },
  ESTP: { 
    title: "Podnikatel", 
    group: "explorers",
    description: "Chytrý a energický člověk, který rád riskuje.",
    details: "Jste středem pozornosti. Žijete tady a teď, jednáte rychle a problémy řešíte za pochodu. Teorie vás nudí, chcete vidět okamžité výsledky.",
    strengths: ["Odvaha", "Racionalita", "Všímavost", "Přímé jednání"],
    weaknesses: ["Netrpělivost", "Sklon k riziku", "Nevšímavost k citům", "Problémy s autoritami"]
  },
  ESFP: { 
    title: "Bavič", 
    group: "explorers",
    description: "Spontánní a nadšený bavič, život s vámi není nuda.",
    details: "Milujete lidi, světla reflektorů a zábavu. Jste velmi všímaví k fyzickému světu a módě. Vaší prioritou je užívat si života a vtáhnout do toho i ostatní.",
    strengths: ["Odvážnost", "Originalita", "Estetické cítění", "Praktičnost"],
    weaknesses: ["Citlivost na kritiku", "Špatné plánování", "Snadno se začne nudit", "Soustředění"]
  },
  ENFP: { 
    title: "Bojovník", 
    group: "diplomats",
    description: "Nadšený a kreativní svobodný duch.",
    details: "Jste energičtí, nezávislí a soucitní. Dokážete se nadchnout pro myšlenku a strhnout dav. Hledáte hlubší smysl ve vztazích s lidmi.",
    strengths: ["Zvědavost", "Pozorovací talent", "Nadšení", "Komunikace"],
    weaknesses: ["Nesoustředěnost", "Přehnané přemýšlení", "Emocionální výkyvy", "Stres"]
  },
  ENTP: { 
    title: "Diskutér", 
    group: "analysts",
    description: "Chytrý myslitel, který miluje intelektuální výzvy.",
    details: "Rádi hrajete ďáblova advokáta. Debata je pro vás způsob, jak tříbit názory. Nesnášíte rutinu a hierarchii, raději boříte status quo.",
    strengths: ["Vědomosti", "Rychlé myšlení", "Originalita", "Charisma"],
    weaknesses: ["Hádavost", "Neochota řešit detaily", "Netolerance", "Rychlá ztráta zájmu"]
  },
  ESTJ: { 
    title: "Vedoucí", 
    group: "sentinels",
    description: "Vynikající administrátor a manažer.",
    details: "Jste ztělesněním tradice a řádu. Víte, co je správné a špatné, a nebojíte se vést ostatní. Jste pracovití a očekáváte to samé od svého okolí.",
    strengths: ["Oddanost", "Přímá upřímnost", "Organizace", "Vůdcovství"],
    weaknesses: ["Nepružnost", "Sklon k souzení", "Obtížné vyjadřování emocí", "Workoholismus"]
  },
  ESFJ: { 
    title: "Pečovatel", 
    group: "sentinels",
    description: "Mimořádně starostlivý a oblíbený člověk.",
    details: "Jste společenští tvorové, kteří dbají na to, aby se všichni cítili dobře. Jste velmi praktičtí v pomoci druhým a ceníte si harmonie a spolupráce.",
    strengths: ["Silný smysl pro povinnost", "Loajalita", "Citlivost", "Schopnost propojovat lidi"],
    weaknesses: ["Potřeba uznání", "Přílišná obětavost", "Neochota ke změnám", "Kritika je zraňuje"]
  },
  ENFJ: { 
    title: "Učitel", 
    group: "diplomats",
    description: "Charismatický vůdce, který inspiruje ostatní.",
    details: "Jste přirození vůdci plní vášně. Vidíte potenciál v lidech a chcete jim pomoci růst. Jste empatičtí, ale dokážete být i velmi rozhodní, když jde o správnou věc.",
    strengths: ["Tolerance", "Spolehlivost", "Charisma", "Altruismus"],
    weaknesses: ["Přílišný idealismus", "Přílišná citlivost", "Kolísavé sebevědomí", "Rozhodování"]
  },
  ENTJ: { 
    title: "Velitel", 
    group: "analysts",
    description: "Odvážný a silný vůdce hledající cestu.",
    details: "Jste rození lídři. Promítáte svou autoritu způsobem, který shromažďuje davy. Racionalita a odhodlání jsou vaše hlavní zbraně při dosahování cílů.",
    strengths: ["Efektivita", "Energičnost", "Sebevědomí", "Silná vůle"],
    weaknesses: ["Netolerance", "Netrpělivost", "Arogance", "Špatné zvládání emocí"]
  }
};

// Rozšířený seznam otázek (20 otázek, 5 pro každou dimenzi)
const questions = [
  // E vs I
  { id: 1, dim: "EI", text: "Po náročném týdnu nejlépe dobijete baterky:", options: [{ text: "S přáteli na párty", type: "E" }, { text: "Doma s knihou/filmem", type: "I" }] },
  { id: 2, dim: "EI", text: "V konverzaci s novými lidmi:", options: [{ text: "Zahajuji témata já", type: "E" }, { text: "Čekám, až se mě zeptají", type: "I" }] },
  { id: 3, dim: "EI", text: "V práci preferujete:", options: [{ text: "Týmovou spolupráci a brainstorming", type: "E" }, { text: "Samostatnou práci v klidu", type: "I" }] },
  { id: 4, dim: "EI", text: "Když zazvoní telefon:", options: [{ text: "Hned to zvednu, jsem zvědavý", type: "E" }, { text: "Doufám, že to přejde do hlasové schránky", type: "I" }] },
  { id: 5, dim: "EI", text: "Vaše myšlenky se častěji točí kolem:", options: [{ text: "Dění ve vnějším světě a akcí", type: "E" }, { text: "Vnitřních úvah a nápadů", type: "I" }] },

  // S vs N
  { id: 6, dim: "SN", text: "Zajímá vás více:", options: [{ text: "Co je skutečné a aktuální", type: "S" }, { text: "Co by mohlo být a budoucí možnosti", type: "N" }] },
  { id: 7, dim: "SN", text: "Při učení preferujete:", options: [{ text: "Konkrétní fakta a data", type: "S" }, { text: "Teorie a koncepty", type: "N" }] },
  { id: 8, dim: "SN", text: "Jste spíše:", options: [{ text: "Praktický realista", type: "S" }, { text: "Kreativní vizionář", type: "N" }] },
  { id: 9, dim: "SN", text: "Když vám někdo vypráví příběh:", options: [{ text: "Chcete slyšet detaily a fakta", type: "S" }, { text: "Chcete znát význam a souvislosti", type: "N" }] },
  { id: 10, dim: "SN", text: "Dáváte přednost pokynům, které jsou:", options: [{ text: "Jasné, krok za krokem", type: "S" }, { text: "Obecné, dávající prostor pro improvizaci", type: "N" }] },

  // T vs F
  { id: 11, dim: "TF", text: "Při rozhodování se řídíte:", options: [{ text: "Logikou a rozumem", type: "T" }, { text: "Pocity a hodnotami", type: "F" }] },
  { id: 12, dim: "TF", text: "Je pro vás větší kompliment, když vás nazvou:", options: [{ text: "Kompetentním a chytrým", type: "T" }, { text: "Laskavým a chápavým", type: "F" }] },
  { id: 13, dim: "TF", text: "Když má přítel problém:", options: [{ text: "Nabídnete řešení", type: "T" }, { text: "Nabídnete emocionální oporu", type: "F" }] },
  { id: 14, dim: "TF", text: "V konfliktu je důležitější:", options: [{ text: "Najít pravdu", type: "T" }, { text: "Nezranit city ostatních", type: "F" }] },
  { id: 15, dim: "TF", text: "Často vás obviňují, že jste:", options: [{ text: "Příliš analytický nebo chladný", type: "T" }, { text: "Příliš citlivý nebo emotivní", type: "F" }] },

  // J vs P
  { id: 16, dim: "JP", text: "Váš pracovní styl je:", options: [{ text: "Organizovaný a plánovaný", type: "J" }, { text: "Flexibilní a spontánní", type: "P" }] },
  { id: 17, dim: "JP", text: "Uzávěrky (deadlines) vnímáte jako:", options: [{ text: "Závazné a stresující, pokud se blíží", type: "J" }, { text: "Orientační doporučení", type: "P" }] },
  { id: 18, dim: "JP", text: "Věci raději:", options: [{ text: "Rozhodnete a uzavřete", type: "J" }, { text: "Necháte otevřené pro nové informace", type: "P" }] },
  { id: 19, dim: "JP", text: "Váš kalendář je:", options: [{ text: "Pečlivě vyplněný", type: "J" }, { text: "Poloprázdný nebo neexistující", type: "P" }] },
  { id: 20, dim: "JP", text: "Když jedete na výlet:", options: [{ text: "Máte plán trasy a zastávek", type: "J" }, { text: "Jedete tam, kam vás vítr zavane", type: "P" }] }
];

export default function MBTITest() {
  const [currentStep, setCurrentStep] = useState('intro'); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [result, setResult] = useState(null);

  const startTest = () => {
    setCurrentStep('test');
    setCurrentQuestionIndex(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  };

  const handleAnswer = (type) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores) => {
    const type = [
      finalScores.E >= finalScores.I ? 'E' : 'I',
      finalScores.S >= finalScores.N ? 'S' : 'N',
      finalScores.T >= finalScores.F ? 'T' : 'F',
      finalScores.J >= finalScores.P ? 'J' : 'P'
    ].join('');

    setResult(type);
    setCurrentStep('result');
  };

  // Komponenty pro různé fáze
  const IntroView = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="bg-indigo-100 p-6 rounded-[2rem] mb-6 shadow-sm">
        <Activity className="w-16 h-16 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Komplexní MBTI Analýza</h1>
      <p className="text-gray-600 mb-10 max-w-lg text-lg leading-relaxed">
        Tento test obsahuje <strong>20 otázek</strong> a pomůže vám odhalit nejen váš osobnostní typ, 
        ale také vaši roli ve společnosti, silné stránky a styl práce.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-2xl w-full">
        {Object.values(groups).map((g, i) => {
            const Icon = g.icon;
            return (
                <div key={i} className={`${g.bg} p-4 rounded-[1.5rem] flex items-center shadow-sm border border-transparent`}>
                    <Icon className={`w-6 h-6 ${g.color} mr-3`} /> 
                    <span className="font-semibold text-gray-800">{g.name}</span>
                </div>
            )
        })}
      </div>

      <button 
        onClick={startTest}
        className="flex items-center bg-gray-900 hover:bg-black text-white font-medium py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-xl text-lg tracking-wide"
      >
        Spustit test <ChevronRight className="ml-2 w-6 h-6" />
      </button>
    </div>
  );

  const QuestionView = () => {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col justify-center min-h-[60vh]">
        <div className="w-full bg-gray-100 rounded-full h-2 mb-10 overflow-hidden">
          <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase bg-indigo-50 px-3 py-1 rounded-full">Otázka {currentQuestionIndex + 1} / {questions.length}</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dimenze {question.dim}</span>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-12 leading-tight">
          {question.text}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.type)}
              className="w-full text-left p-6 rounded-[1.5rem] border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-300 group flex items-center justify-between shadow-sm hover:shadow-md"
            >
              <span className="text-lg text-gray-700 font-medium group-hover:text-indigo-900">{option.text}</span>
              <CheckCircle className="w-6 h-6 text-gray-300 group-hover:text-indigo-600 transition-all duration-300 transform scale-90 group-hover:scale-110" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const ResultView = () => {
    const data = archetypes[result];
    const groupData = groups[data.group];
    const GroupIcon = groupData.icon;

    // Expressive Stat Bar Component
    const StatBar = ({ labelL, labelR, valL, valR, color }) => {
      const total = valL + valR;
      const pctL = total === 0 ? 50 : Math.round((valL / total) * 100);
      const pctR = 100 - pctL;
      
      // Určení dominantní strany
      const isLeftDominant = pctL >= pctR;
      
      return (
        <div className="mb-6">
          <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
            <span className={isLeftDominant ? "text-gray-900 scale-105 transition-transform origin-left" : "transition-transform origin-left"}>{labelL}</span>
            <span className={!isLeftDominant ? "text-gray-900 scale-105 transition-transform origin-right" : "transition-transform origin-right"}>{labelR}</span>
          </div>
          
          <div className="flex h-12 rounded-full overflow-hidden bg-gray-50 gap-1 p-1 shadow-inner border border-gray-100">
            {/* Levý segment - Plovoucí styl */}
            <div 
              className={`h-full rounded-full flex items-center justify-start pl-4 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isLeftDominant ? `${color} text-white` : 'bg-gray-200 text-gray-500'}`} 
              style={{ width: `${pctL}%` }}
            >
                <span className={`text-xs font-bold ${isLeftDominant ? 'opacity-100' : 'opacity-0'} transition-opacity delay-300`}>{pctL}%</span>
            </div>
            
            {/* Pravý segment */}
            <div 
              className={`h-full rounded-full flex items-center justify-end pr-4 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${!isLeftDominant ? `${color} text-white` : 'bg-gray-200 text-gray-500'}`} 
              style={{ width: `${pctR}%` }}
            >
                 <span className={`text-xs font-bold ${!isLeftDominant ? 'opacity-100' : 'opacity-0'} transition-opacity delay-300`}>{pctR}%</span>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="w-full max-w-6xl mx-auto p-4 md:p-12 animate-fade-in pb-20">
        {/* Header Results - Hero Section */}
        <div className="text-center mb-16 relative">
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-6 ${groupData.bg} ${groupData.color} border ${groupData.border}`}>
            <GroupIcon className="w-4 h-4" /> {groupData.name}
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-2 tracking-tight">{data.title}</h1>
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 tracking-[0.2em] mb-6 opacity-90">
            {result}
          </div>
          <p className="text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-normal">"{data.description}"</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Levý sloupec - Charakteristika a Skupina */}
          <div className="space-y-6">
            
            {/* Osobnostní profil Card */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="flex items-center text-xl font-bold text-gray-900 mb-6">
                <BookOpen className="w-6 h-6 mr-3 text-gray-900" /> Osobnostní profil
              </h3>
              <p className="text-gray-600 leading-loose text-lg">
                {data.details}
              </p>
            </div>

            {/* Skupina Card */}
            <div className={`p-8 rounded-[2rem] border transition-colors ${groupData.bg} ${groupData.border}`}>
               <h3 className={`flex items-center text-xl font-bold mb-4 ${groupData.color}`}>
                <GroupIcon className="w-6 h-6 mr-3" /> O skupině: {groupData.name}
              </h3>
              <p className="text-gray-800 text-lg leading-relaxed opacity-90">{groupData.desc}</p>
            </div>

             {/* Analýza preferencí - Material 3 Expressive */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
               {/* Dekorativní pozadí */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-10 -mt-10 opacity-50 z-0"></div>

              <h3 className="flex items-center text-xl font-bold text-gray-900 mb-8 relative z-10">
                <Target className="w-6 h-6 mr-3 text-gray-900" /> Analýza preferencí
              </h3>
              <div className="relative z-10">
                <StatBar labelL="Extrovert" labelR="Introvert" valL={scores.E} valR={scores.I} color="bg-blue-600" />
                <StatBar labelL="Smysly" labelR="Intuice" valL={scores.S} valR={scores.N} color="bg-yellow-500" />
                <StatBar labelL="Myšlení" labelR="Cítění" valL={scores.T} valR={scores.F} color="bg-red-500" />
                <StatBar labelL="Usuzování" labelR="Vnímání" valL={scores.J} valR={scores.P} color="bg-green-600" />
              </div>
            </div>
          </div>

          {/* Pravý sloupec - Silné/Slabé stránky */}
          <div className="space-y-6">
            <div className="bg-green-50 p-8 rounded-[2rem] border border-green-100/50">
              <h3 className="text-xl font-bold text-green-900 mb-6">Silné stránky</h3>
              <ul className="space-y-4">
                {data.strengths.map((item, i) => (
                  <li key={i} className="flex items-center bg-white/60 p-3 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 shrink-0" />
                    <span className="text-green-900 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100/50">
              <h3 className="text-xl font-bold text-red-900 mb-6">Slabé stránky</h3>
              <ul className="space-y-4">
                {data.weaknesses.map((item, i) => (
                  <li key={i} className="flex items-center bg-white/60 p-3 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 shrink-0">
                        <MinusCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-red-900 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
                <button 
                onClick={startTest}
                className="w-full py-5 bg-gray-900 hover:bg-black text-white font-bold rounded-[1.5rem] transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-2xl text-lg tracking-wide"
                >
                <RefreshCw className="w-5 h-5 mr-3" /> Restartovat test
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans p-4 md:p-8">
      <div className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden min-h-[700px] flex flex-col justify-center relative border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 opacity-20"></div>
        {currentStep === 'intro' && <IntroView />}
        {currentStep === 'test' && <QuestionView />}
        {currentStep === 'result' && <ResultView />}
      </div>
    </div>
  );
}