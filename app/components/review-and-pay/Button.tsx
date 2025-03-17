interface Props {
  text: string;
  handleClick: () => void;
}

export default function Button({ text, handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className="bg-blue-primary hover:bg-blue-semidark text-white px-4 py-0.5 text-sm rounded-md self-end mb-0.5"
    >
      {text}
    </button>
  );
}
