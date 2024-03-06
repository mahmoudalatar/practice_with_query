import axios from "axios"
import React from "react"
import { useInfiniteQuery } from "react-query"

const fetchInfinite = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

function RQInfinite() {
  const {
    isLoading,
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("colors", fetchInfinite, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 3) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
  })

  if (isLoading) {
    return <h2>loading</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} . {color.label}
                </h2>
              ))}
            </React.Fragment>
          )
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load more
        </button>
      </div>
      {/* <div>
        {isFetching && !isFetchingNextPage ? <h2>Loading...</h2> : null}
      </div> */}
    </>
  )
}

export default RQInfinite
