import ReactCodeInput from "react-code-input";

const props = {
  inputStyle: {
    margin: "8px",
    width: "50px",
    fontSize: "20px",
    height: "50px",
    textAlign: "center",
    backgroundColor: "transparent",
    border: "1px solid #E4E4E4",
    borderRadius: "4px",
  },
};

const CodeInput = ({ name = "code", value, onChange }) => {
  return (
    <ReactCodeInput
      autoFocus
      name={name}
      className="code-input"
      value={value}
      onChange={onChange}
      type="number"
      fields={5}
      {...props}
    />
  );
};

export default CodeInput;
