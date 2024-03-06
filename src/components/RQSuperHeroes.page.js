import { useState } from "react"
import useQueryHook, { useAddSuperHeroData } from "../hooks/useQueryHook.js"
import { Link } from "react-router-dom"

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("")
  const [alterEgo, setAlterEgo] = useState("")

  const onSuccess = (data) => {
    console.log("success side effect", data)
  }
  const onError = (error) => {
    console.log("failed side effect", error)
  }

  const { isLoading, data, isError, error } = useQueryHook(onSuccess, onError)

  const { mutate: addSuperHero, error: postError } = useAddSuperHeroData()

  function handlingAddingHero() {
    console.log(name, alterEgo)
    addSuperHero({ name, alterEgo })
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  console.log(postError)

  return (
    <>
      <h2>Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handlingAddingHero}>Add Hero</button>
      </div>

      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/hero/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}
    </>
  )
}
