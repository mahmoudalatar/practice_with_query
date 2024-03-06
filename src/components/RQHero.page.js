import React from "react";
import { Link, useParams } from "react-router-dom";
import useHeroHook from "../hooks/useHeroHook.js";

function RQHero() {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useHeroHook(heroId);

  if (isLoading) {
    return <h2>loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>
        {data?.data.name} - {data?.data.alterEgo}
      </h2>
      <Link to="/rq-super-heroes">Return to: RQ Super Heroes</Link>
    </>
  );
}

export default RQHero;
