import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"

export default function Home(props: { count: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) {
  return (
        <h1>{props.count}</h1>
    )
}

export const getServerSideProps = async () => {
    const response = await fetch('http://localhost:3000/api/pools/count')
    const data = await response.json()
    console.log(data)

    return {
        props: {
            count: data.count
        }
    }
}
