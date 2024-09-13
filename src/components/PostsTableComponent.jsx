import React from 'react'
import { useState, useEffect } from 'react'

const UsersTableComponent = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') 
      .then(response => response.json())
      .then(data => setPosts(data))
  }, [])
  return (
    <table class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Title</th> 
          <th class="px-4 py-2">Body</th>
        </tr>
      </thead>
      <tbody>

        {posts.map(post => (
          <tr key={post.id}>
            <td class="border px-4 py-2">{post.title}</td>
            <td class="border px-4 py-2">{post.body}</td>
          </tr>
        ))}


      </tbody>
    </table>
  )
}

export default UsersTableComponent