import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  
  const [length, setlength]=useState(8);
  const [allowN, setallowN]=useState(false);
  const [allowchar, setallowchar]=useState(false);  
  const [password,setpassword]=useState("");
  let passref = useRef(null);
  const passwordgenerator = useCallback(()=>{
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(allowN){
      str = str+"1234567890";
    }
    if(allowchar){
      str = str+"/[ `!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?~]/"
    }
    for(let i=0;i<length;i++){
      let cha = Math.floor(Math.random()*str.length +1);
      pass = pass + str.charAt(cha); 
    }
    setpassword(pass);
  },[allowN,allowchar,length,setpassword]);
  const copypasstoclip=useCallback(()=>{
    passref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordgenerator();
  },[length,allowN,allowchar,passwordgenerator]);
  return (
    <>
    <h1>Password generator</h1>
    <div>
      <input type='text' value={password} placeholder='password' readOnly ref={passref}></input>
      <button onClick={copypasstoclip}>Copy</button>
    </div>
      <div>
        <div>
          <input type="range" min={8} max={100} value={length} onChange={(e)=>setlength(e.target.value)}/> <label > Length {length}</label>
          <input type='checkbox' onChange={()=>setallowN((prev)=>!prev)}/><label>Numbers</label>
          <input type='checkbox' onChange={()=>setallowchar((prev)=>!prev)}/><label>Characters</label>
        </div>

      </div>
    </>
  )
}

export default App
