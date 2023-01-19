import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo from "../public/logo.png";

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

  const gradientTextStyle = "text-white text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-500"

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-4">
        <div className="bg-slate-100 bg-opacity-90 shadow-md p-6 rounded-md text-black">
          <div className="text-center my-6">
            <Image src={logo} width={250} height={250} className="m-auto"/>
            <h1 className={gradientTextStyle + " text-3xl font-bold"}>Gimme!</h1>
          <div className={gradientTextStyle + " font-bold"}>Your AI branding assistant</div>
          </div>
          {displayElement}
        </div>
      </div>
    </div>
  );
};

export default Gimme;
