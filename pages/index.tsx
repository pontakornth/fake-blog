import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import { Post } from '../@types/Post'

type HomeProps = {
  postList: Post[]
}

const Home: NextPage<HomeProps> = ({postList}) => {
  return  (
    <div className="main">
      <h1>Fake Blog</h1>
      <ul>
        {postList.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context)  => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const json = await response.json()
  return {
    props: {
      postList: json,
    }
  }
}

export default Home
