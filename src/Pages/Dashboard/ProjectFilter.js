const filterList = [
  "all",
  "mine",
  "design",
  "development",
  "sales",
  "marketing",
];

export default function ProjectFilter({ currentFilter, handleClick }) {
  return (
    <div className="projectFilter">
      <nav>
        <p>Filter By:</p>
        {filterList.map((item) => (
          <button
            className={`filter__btn ${currentFilter === item ? "active" : ""}`}
            key={item}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}
