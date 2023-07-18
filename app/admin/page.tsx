'use client'
import React , {useState } from 'react'
import Admin from '../../testing_data/admin.json'
import { useRouter } from 'next/navigation';

export default function AdminForm() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleClick(){
        if ( Admin.name === name && Admin.password === password ){
            console.log("you are the admin");
            router.push('/admin/create_new');
        }
        else{
            const response = await fetch('http://localhost:3000/api', { 
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                } , 
                body : JSON.stringify({ name : name , password : password})
            })
        }
    }
    return (
        <div>
            <input className='block' value={name} placeholder='name' onChange={ (e) => setName(e.target.value)}></input>
            <input className='block' value={password} placeholder='password' onChange={ (e) => setPassword(e.target.value)}></input>
            <button onClick={ () => {handleClick()}}>Authenticate</button>
            <div>
                Name : {name}
                Password : {password}
                </div>
        </div>
    )
}


