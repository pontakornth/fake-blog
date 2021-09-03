import type { GetServerSideProps, NextPage } from 'next'
import { Post, Comment } from '../../@types/Post'

type PostDetailProps = {
	post: Post,
	comments: Comment[]
}

const PostDetail: NextPage<PostDetailProps> = ({ post, comments }) => {
	return (
		<div className="detail">
			<h1>{post.title}</h1>
			<p>{post.body}</p>
			<h2>Comments</h2>
			<ul>
				{comments.map(comment => (
					<li key={comment.id}>{comment.body}</li>
				))}
			</ul>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const postId: string = context.params!['id'] as unknown as string
	const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
	const commentsResponsee = await fetch(`https://jsonplaceholder.typicode.com/comments/?postId=${postId}`)
	const post: Post = await postResponse.json()
	const comments: Comment[] = await commentsResponsee.json()
	return {
		props: {
			post,
			comments,
		}
	}
}

export default PostDetail
