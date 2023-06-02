import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IFilm, IPeople, IStarships, IVehicle } from '@types';

interface ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const peopleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    listPeople: builder.query<ListResponse<IPeople>, string>({
      query: (url) => url
    }),
    getListOfFilms: builder.query<Array<IFilm>, Array<string>>({
      // @ts-ignore
      queryFn: async (urls, _queryApi, _extraOptions, baseQuery) => {
        const fetchedFilms = await Promise.all(urls.map((u) => baseQuery(u)));
        const mergedFilms = [...fetchedFilms.map((result) => result.data)];

        return { data: mergedFilms };
      }
    }),
    getListOfVehicles: builder.query<Array<IVehicle>, Array<string>>({
      // @ts-ignore
      queryFn: async (urls, _queryApi, _extraOptions, baseQuery) => {
        const fetchedVehicles = await Promise.all(
          urls.map((u) => baseQuery(u))
        );
        const mergedVehicles = [
          ...fetchedVehicles.map((result) => result.data)
        ];

        return { data: mergedVehicles };
      }
    }),
    getListOfStarships: builder.query<Array<IStarships>, Array<string>>({
      // @ts-ignore
      queryFn: async (urls, _queryApi, _extraOptions, baseQuery) => {
        const fetchedStarships = await Promise.all(
          urls.map((u) => baseQuery(u))
        );
        const mergedStarships = [
          ...fetchedStarships.map((result) => result.data)
        ];

        return { data: mergedStarships };
      }
    })
  })
});

export const {
  useListPeopleQuery,
  useGetListOfFilmsQuery,
  useGetListOfVehiclesQuery,
  useGetListOfStarshipsQuery
} = peopleApi;
