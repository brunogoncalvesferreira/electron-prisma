import { useEffect, useState, type FormEvent } from "react";

interface User {
  id: string
  name: string
  email: string
}

export function App() {
  const [users, setUsers] = useState<User[]>([])

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const name = data.get('name') as string
    const email = data.get('email') as string

    await window.api.createUser({
      name, email
    })

    fetchUsers()
  }

  async function fetchUsers() {
    const users = await window.api.listUsers()

    return setUsers(users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  
  return (
    <div>
      <form onSubmit={handleCreateUser}>
        <input type="text" placeholder="Nome" name="name"/>
        <input type="text" placeholder="Email" name="email"/>

        <button>Cadastrar</button>
      </form>


      <div>
        {users.map(user => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}