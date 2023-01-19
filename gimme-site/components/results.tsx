import React from "react";

interface ResultsProps {
  snippet: string;
  keywords: string[];
  onBack: any;
  prompt: string;
}

const Results: React.FC<ResultsProps> = (props) => {
  const keyworsElement = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = <div key={i} className="bg-emerald-200 p-1 px-1 rounded-md">#{props.keywords[i]}</div>;
    keyworsElement.push(element);
  }

  const keywordElementsHolder = <div className="flex flex-wrap gap-2">{keyworsElement}</div>
  const resultSection = (label: string, body: any) => {
    return (
      <div className="bg-slate-200 p-4 mb-3 rounded-md drop-shadow-md">
        <div className="text-slate-500 text-sm font-bold mb-1">{label}</div>
        <div className="text-md">{body}</div>
      </div>
    );
  };
  return (
    <>
      <div className="mb-6">
        {resultSection("Prompt", <div className="text-lg font-semibold">{props.prompt}</div>)}
        {resultSection("Snippet", props.snippet)}
        {resultSection("Keywords", keywordElementsHolder)}
      </div>
      <button
        className="text-white text-lg bg-gradient-to-r from-green-800 to-green-500 disabled:opacity-50 w-full p-3 rounded-md"
        onClick={props.onBack}
      >
        Back
      </button>
    </>
  );
};

export default Results;
