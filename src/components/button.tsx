export function Button({ children, onClick }) {
  return <button className="text-black" onClick={onClick}>{children}</button>;
}
