import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetchHerosByParallel = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

function DynamicParallelQueries({ herosIds }) {
  const queryResults = useQueries(
    herosIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchHerosByParallel(id),
      };
    })
  );

  console.log(queryResults);

  return (
    <div>
      {queryResults.map(
        (data) =>
          data.isSuccess && (
            <h1 key={data.data.data.id}>{data.data.data.name}</h1>
          )
      )}
    </div>
  );
}

export default DynamicParallelQueries;
