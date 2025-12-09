import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types';
enum Centuries {
  SXTN = '16',
  SVNTN = '17',
  EIGHTN = '18',
  NNTN = '19',
  TWT = '20',
  ALL = 'all',
}

enum Sort {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
  NONE = 'none',
}
export const useUrlReducer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(
    () => ({
      name: searchParams.get('query') || '',
      century: searchParams.getAll('centuries'),
      sex: searchParams.get('sex') || '',
      sort: searchParams.get('sort') || '',
      order: searchParams.get('order') || '',
    }),
    [searchParams],
  );

  type FilterAction =
    | { type: 'SET_QUERY'; payload: string }
    | { type: 'SET_CENTURY'; payload: Centuries }
    | { type: 'SET_SEX'; payload: Sex }
    | { type: 'SET_SORT'; payload: Sort }
    | { type: 'SET_REVERSE' }
    | { type: 'RESET_FILTERS' };

  const dispatch = (action: FilterAction) => {
    setSearchParams(params => {
      switch (action.type) {
        case 'SET_QUERY':
          if (action.payload.length === 0) {
            params.delete('query');
          } else {
            params.set('query', action.payload);
          }

          return params;
        case 'SET_CENTURY':
          if (action.payload === Centuries.ALL) {
            params.delete('centuries');
          } else {
            const current = params.getAll('centuries');

            params.delete('centuries');
            if (current.includes(action.payload)) {
              current
                .filter(c => c !== action.payload)
                .forEach(c => params.append('centuries', c));
            } else {
              [...current, action.payload].forEach(c =>
                params.append('centuries', c),
              );
            }
          }

          return params;

        case 'SET_SEX':
          if (action.payload === Sex.ALL) {
            params.delete('sex');
          } else {
            params.set('sex', action.payload);
          }

          return params;

        case 'SET_SORT':
          if (action.payload === Sort.NONE) {
            params.delete('sort');
          } else {
            params.set('sort', action.payload);
          }

          return params;

        case 'SET_REVERSE':
          if (state.order) {
            params.delete('order');
          } else {
            params.set('order', 'desc');
          }

          return params;
        case 'RESET_FILTERS':
          params.delete('query');
          params.delete('centuries');
          params.delete('sex');
          params.delete('sort');
          params.delete('order');

          return params;
      }
    });
  };

  return [state, dispatch] as const;
};
