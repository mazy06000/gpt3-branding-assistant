import React from "react";
import Form from "./form";
import Results from "./results";

const Gimme: React.FC = () => {
  const CHARACTERLIMIT: number = 32;
  const ENDPOINT: string =
    "https://z4crnhfzdc.execute-api.eu-west-2.amazonaws.com/prod/generate_snippet_keywords";
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKewords] = React.useState([]);
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = () => {
    console.log("Submitting:", prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
  };

  const onResult = (data: any) => {
    setSnippet(data.snippet);
    setKewords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false);
  };

  let displayElement = null;

  if (hasResult) {
    displayElement = (
      <Results
        prompt={prompt}
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
      />
    );
  } else {
    displayElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        characterLimit={CHARACTERLIMIT}
      />
    );
  }

  return (
    <>
      <h1>Gimme!</h1>
      {displayElement}
    </>
  );
};

export default Gimme;
