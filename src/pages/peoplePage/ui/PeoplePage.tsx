import { PeopleFilters } from './filters/PeopleFilters';
import { PeopleTable } from './table/PeopleTable';
import { usePeoplePage } from '../model';
import { LoadingState } from '../types';
import { Person } from '@entities/person';
import { Loader } from '@shared/ui';

export const PeoplePage = () => {
  const { visiblePeople, filters } = usePeoplePage();

  const childrenMapper = {
    [LoadingState.LOADING]: <Loader />,
    [LoadingState.LOADING_ERROR]: (
      <p data-cy="peopleLoadingError">Something went wrong</p>
    ),
    [LoadingState.NO_PEOPLE]: (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    ),
    [LoadingState.NO_MATCH]: (
      <p>There are no people matching the current search criteria</p>
    ),
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters filters={filters} />
          </div>

          <div className="column">
            <div className="box table-container">
              {Object.values(LoadingState).some(el => el === visiblePeople) ? (
                childrenMapper[visiblePeople as LoadingState]
              ) : (
                <PeopleTable people={visiblePeople as Person[]} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
