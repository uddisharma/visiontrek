import {React,useEffect,useState} from 'react'

function App() {
  const [backenddata,setBackendData] = useState([{}]);
  useEffect(()=>{
   fetch('/api').then((response)=>response.json())
   .then(
    data=>{
      setBackendData(data)
    }
   )
  },[])
  return (
    <div>App</div>
  )
}

export default App