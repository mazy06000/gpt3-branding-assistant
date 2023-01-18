import React from "react";

interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid = props.prompt.length <= 32;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };
  return (
    <>
      <p>
        Welcome to our AI-powered transcription and translation website! Our
        cutting-edge technology allows for accurate transcription and
        translation of video and audio content in any language.
      </p>
      <input
        type="text"
        placeholder="Your prompt"
        value={props.prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div>
        {props.prompt.length}/{props.characterLimit}
      </div>
      <button onClick={props.onSubmit} disabled={props.isLoading || !isPromptValid}>
        Submit
      </button>
    </>
  );
};

export default Form;
