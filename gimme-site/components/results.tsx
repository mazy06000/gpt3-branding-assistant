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
    const element = <div key={i}>#{props.keywords[i]}</div>;
    keyworsElement.push(element);
  }
  return (
    <>
      <div>
        <div>
          <div>
            <b>Prompt</b>
          </div>
          <div>{props.prompt}</div>
        </div>
        <div>
          <div>
            <b>Snippet</b>
          </div>
          <div>{props.snippet}</div>
        </div>
        <div>
          <div>
            <b>Keywords</b>
          </div>
          <div>{keyworsElement}</div>
        </div>
      </div>
      <button onClick={props.onBack}>Back</button>
    </>
  );
};

export default Results;
