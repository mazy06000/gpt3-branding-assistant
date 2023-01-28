import React from "react";

interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid = props.prompt.length < 32;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };
  let statusColor = "text-slate-500";
  let statusText = null;
  if (!isPromptValid) {
    statusColor = "text-red-400";
    statusText = `Input must be less than ${props.characterLimit} characters.`;
  }
  return (
    <>
      <div className="mb-4">
        <p className="pb-4 text-justify mb-2">
          Unleash the potential of your brand with our AI-powered GPT-3
          assistant - the ultimate tool for creating and maintaining a strong
          brand identity for businesses of all sizes.
        </p>
        <input
          className="p-2 w-full rounded-md focus:outline-green-700"
          type="text"
          placeholder="Coffee"
          value={props.prompt}
          onChange={(e) => updatePromptValue(e.currentTarget.value)}
        ></input>
        <div
          className={statusColor + " flex justify-between my-2 mb-6 text-sm"}
        >
          <div>{statusText}</div>
          <div>
            {props.prompt.length}/{props.characterLimit}
          </div>
        </div>
        <button
          className="text-white text-lg bg-gradient-to-r from-green-800 to-green-500 disabled:opacity-50 w-full p-3 rounded-md"
          onClick={props.onSubmit}
          disabled={props.isLoading || !isPromptValid}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Form;
