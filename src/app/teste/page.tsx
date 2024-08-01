'use client'

import { useEffect, useState } from "react";
//import { auth } from "./../../../auth"
import { getSession } from "next-auth/react";

export default  function Teste() {

    const [session, setSession] = useState(null);


    useEffect(() => {
      async function fetchSession() {
        const session = await getSession();
        setSession(session);
      }
  
      fetchSession();
    }, []);
   
    console.log(session)

    return (<p>{session?.user.name}</p>)
}