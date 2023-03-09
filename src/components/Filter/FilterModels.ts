export interface FilterInput {
  value: string | null;
}

export interface SearchContextType {
  searchWord: string | null;
  setSearchWord: (arg: string | null) => void;

  sortType: string | null;
  setSortType: (arg: string | null) => void;
}

export enum SortOptionsEnum {
  COURSE_NAME,
  COURSE_SUPPLIER,
  LENGTH_DESC,
  LENGTH_ASC,
  REVIEW_DATE,
  NR_OF_STARS,
}
