import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes")
const addSuperHero = (hero) =>
  axios.post("http://localhost:4000/superheroes", hero)

function useQueryHook(
  onSuccess,
  onError,
  refetchOnMount = true,
  enabled = true
) {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    refetchOnMount,
    enabled,
  })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes")
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     }
    //   })
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes")
      const prevHeroes = queryClient.getQueryData("super-heroes")
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {
              id: oldQueryData?.data?.length + 1,
              ...newHero,
            },
          ],
        }
      })
      return { prevHeroes }
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.prevHeroes)
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes")
    },
  })
}

export default useQueryHook
