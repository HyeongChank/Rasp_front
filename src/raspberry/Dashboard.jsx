import { useEffect, useState } from "react"


const Dashboard = () =>{
    const [data, setData] = useState();

    useEffect(() =>{
        const interval = setInterval(() =>{
            fetch('http://127.0.0.1:5000/api/dashboard')
            .then(response => response.json())
            .then(data => setData(data))
            .then(console.log(data))
        }, 1000)

    return () => clearInterval(interval);
    }, [])

    return(
        <div>

        </div>
    )
}
export default Dashboard()