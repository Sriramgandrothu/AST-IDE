import "./loader.css";

export default function Loader() {
  return (
    <div className="flex flex-col items-center">
      <p className="font-mono text-xs text-blue-500">Team AST</p>
      <div className="loader mt-2 mb-2"></div>
      <p className="font-mono text-xs text-blue-500">Sriram Gandrothu</p>
    </div>
  );
}
