interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`
}

console.log(greetUser(user))
