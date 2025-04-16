import axios from "axios"
import { useState, useEffect } from "react"

const Index = () => {
  const [data, setData] = useState(null)

  const testFetch = async () => {
    axios
      .get("http://localhost:8000/api/hello")
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    testFetch()
  }, [])

  return (
    <div>
      <h1> Nao e para voce estar aqui </h1>
      <h1> Teste </h1>
      <h1> {data} </h1>
    </div>
  )
}

export default Index
