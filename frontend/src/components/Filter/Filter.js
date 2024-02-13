import { useDispatch, useSelector } from "react-redux";
import "./Filter.css";
import {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  selectTitleFilter,
  selectAuthorFilter,
  resetFilters,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";

export const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter());
  };

  const handleResetFilters = () => {
    dispatch(() => resetFilters());
  };
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-groupe">
          <input
            type="text"
            value={titleFilter}
            placeholder="filter by title"
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="filter-groupe">
          <input
            type="text"
            value={authorFilter}
            placeholder="filter by author"
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilterChange}
            />
            Only Favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};
