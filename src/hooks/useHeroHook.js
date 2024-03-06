import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHero = ({ queryKey }) => {
  const [, heroId] = queryKey;
  console.log(heroId);
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

function useHeroHook(heroId) {
  return useQuery(["super-heroes", heroId], fetchSuperHero);
}

export default useHeroHook;
