import { auth } from "./../../../auth"

export default async function Teste() {
    const {user} = await auth()
    console.log(user)

    return (<p>Welcome {user?.name}!</p>)
}