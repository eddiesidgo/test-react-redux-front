import React from 'react'
import ListOfUsers from '../components/ListOFUsers'
import UserForm from '../components/UserForm'

const UsersPage = () => {
  return (
    <div>
      <UserForm />
      <ListOfUsers />
    </div>
  )
}

export default UsersPage