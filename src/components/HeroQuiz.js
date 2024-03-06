import React from "react";
import useQueryHook from "../hooks/useQueryHook.js";

function HeroQuiz() {
  const onSuccess = (data) => {
    console.log("success side effect", data);
  };
  const onError = (error) => {
    console.log("failed side effect", error);
  };

  const { isLoading, data, isError, error, refetch } = useQueryHook(
    onSuccess,
    onError,
    false,
    false
  );

  if (isLoading) {
    return <h1>loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <h2>Hero Quiz</h2>
      <button onClick={refetch}>reFetch</button>
      {data?.data.map((e) => (
        <div key={e.id}>{e.name}</div>
      ))}
    </div>
  );
}

export default HeroQuiz;
