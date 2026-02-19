export default function SuggestionChips({ suggestions, onSelect }) {
  return (
    <div className="suggestions">
      <p className="suggestions-label">Try asking:</p>
      <div className="chips">
        {suggestions.map((s) => (
          <button key={s} className="chip" onClick={() => onSelect(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
