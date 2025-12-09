import { LoadingState, Sex } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '@shared/api';
import { APIPerson, formPersonList, Person } from '@entities/index';
import { useUrlReducer } from './useURLReducer';

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

export const usePeoplePage = () => {
  const [people, setPeople] = useState<null | Person[]>(null);
  const [state, dispatch] = useUrlReducer();
  const [visiblePeople, setVisiblePeople] = useState<LoadingState | Person[]>(
    LoadingState.LOADING,
  );

  const load = async () => {
    try {
      const peopleApi = await getPeople();

      if (!peopleApi) {
        setVisiblePeople(LoadingState.LOADING_ERROR);

        return;
      }

      if (peopleApi.length === 0) {
        setVisiblePeople(LoadingState.NO_PEOPLE);
      }

      setPeople(formPersonList(peopleApi));
    } catch (e) {
      setVisiblePeople(LoadingState.LOADING_ERROR);

      return;
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filters = {
    setQuery: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_QUERY', payload: e.target.value });
    },
    setCentury: (century: Centuries) => {
      dispatch({ type: 'SET_CENTURY', payload: century });
    },
    setSex: (sex: Sex) => {
      dispatch({ type: 'SET_SEX', payload: sex });
    },
    setSort: (sort: Sort) => {
      dispatch({ type: 'SET_SORT', payload: sort });
    },
    setReverse: () => {
      dispatch({ type: 'SET_REVERSE' });
    },
    resetFilters: () => {
      dispatch({ type: 'RESET_FILTERS' });
    },
  };

  useEffect(() => {
    if (people === null) {
      return;
    }

    let ppl = [...people];

    if (state.name !== '') {
      ppl = ppl.filter(
        el =>
          el.name.indexOf(state.name) !== -1 ||
          (el.motherName && el.motherName.indexOf(state.name) !== -1) ||
          (el.fatherName && el.fatherName.indexOf(state.name) !== -1),
      );
    }

    if (state.century.length > 0) {
      ppl = ppl.filter(el => {
        const century = String(Math.floor(el.born / 100) + 1);

        return state.century.includes(century);
      });
    }

    if (state.sex !== '') {
      ppl = ppl.filter(el => el.sex === state.sex[0].toLowerCase());
    }

    if (state.sort === '') {
      setVisiblePeople(people);
    }

    if (state.sort !== '') {
      let compare;

      if (state.sort === Sort.NONE) {
        setVisiblePeople(ppl);

        if (state.order) {
          filters.setReverse();
        }

        return;
      }

      switch (state.sort) {
        case Sort.NAME:
          compare = state.order
            ? (a: APIPerson, b: APIPerson) => b.name.localeCompare(a.name)
            : (a: APIPerson, b: APIPerson) => a.name.localeCompare(b.name);
          break;
        case Sort.BORN:
          compare = state.order
            ? (a: APIPerson, b: APIPerson) => b.born - a.born
            : (a: APIPerson, b: APIPerson) => a.born - b.born;
          break;
        case Sort.DIED:
          compare = state.order
            ? (a: APIPerson, b: APIPerson) => b.died - a.died
            : (a: APIPerson, b: APIPerson) => a.died - b.died;
          break;
        case Sort.SEX:
          compare = state.order
            ? (a: APIPerson, b: APIPerson) => b.sex.localeCompare(a.sex)
            : (a: APIPerson, b: APIPerson) => a.sex.localeCompare(b.sex);
          break;
      }

      const list = ppl.sort(compare);

      if (list.length === 0) {
        setVisiblePeople(LoadingState.NO_MATCH);

        return;
      }

      setVisiblePeople(ppl.sort(compare));
    }
  }, [state, people]);

  return { visiblePeople, filters };
};
