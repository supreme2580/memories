import { gql } from "@apollo/client"
import client from "../apollo-client"
import { useEffect, useState } from "react"
import Loader from "./Loader"
import Error from "./Error"
import ItemsList from "./ItemsList"

export default function Result({ owner }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  async function getData() {
    const query = `
    query Memories{
      memories(where: {owner: "${owner}"}) {
        id
        imageUrl
        imageDate
      }
    }
  `
    const { data } = await client.query({
      query: gql(query)
    }).catch(() => setError(true))
    if (data) {
      setData(data)
      setLoading(false)
      console.log(data)
    }
  }

  getData()

    return(
        <div>
          {
            loading ? <Loader /> : error ? <Error /> : <ItemsList data={data} />
          }
        </div>
    )
}