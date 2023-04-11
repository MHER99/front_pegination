import './App.css';
import { useEffect,useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Table from 'react-bootstrap/Table';


function App() {
  const [userdata,setuserData]=useState([])
  const [cikle,setCikle] = useState(1)
  const [limit,setLimit] = useState(3) //limit for row table
  const limitFech = 8 //limit for mysql query
  const[page,setPage]=useState(1)
  const npage = Math.ceil(userdata.length/limit)
  const lastIndex = page*limit
  const firstIndex = lastIndex -limit
  const records = userdata.slice(firstIndex,lastIndex)
  const numbers = [...Array(npage+1).keys()].slice(1)
  
  const SignPostUrl = "http://localhost:3001/dataUser"
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "cikle":cikle,
      "limitFetch":limitFech
  })
  };

  async function fechData (){
    await fetch(SignPostUrl,requestOptions)
    .then(response => response.json())
    .then(data => setuserData(userdata.concat(data)));
  }

    useEffect(() => {
      fechData()
  }, [cikle]);
  const prevPage = ()=>{
    if(page>1){
      setPage(page-1)
    }
  }
  const changePage = (id)=>{
    if(id === Math.floor(limitFech*cikle/limit)){
      setCikle(cikle+1)
    }
    setPage(id)



  }
  const nextPage = ()=>{ 
    if(page <npage){
      setPage(page+1) 
      if(page === Math.floor(limitFech*cikle/limit)){
        setCikle(cikle+1)
      }
      
    } 
  }

  return (
    <div className="App">
        <Table striped bordered hover>
          <thead>
            <th className="custom-header">ID</th>
            <th className="custom-header">Name</th>
            <th className="custom-header">Email</th>
          </thead>
          <tbody>
          {
           records.map((item)=>(
            <tr key={item.id}>
              <td lassName="custom-cell">{item.id}</td>
              <td lassName="custom-cell">{item.last_name}</td>
              <td lassName="custom-cell">{item.email}</td>
              </tr>
              ))
          }
        </tbody>
        </Table>

        <nav>
          <ul className='pagination'>
            <li className='page-item' >
            <a href='#'className='page-link'
            onClick={prevPage}>Prev</a>
            </li>
            {
              numbers.map((n,i)=>(
                <li className={`page-item ${page===n ?'active':''}`} key = {i}>
                  <a href='#'
                  className='page-link'
                  onClick={()=> changePage(n)}
                   >
                    {n}</a>
                </li>
              ))
            }
            <li className='page-item' >
            <a href='#'className='page-link'
            onClick={nextPage}>Next</a>
            </li>


          </ul>
          <div>
      <h4>quantity for rows</h4>
      <select value={limit} onChange={(e)=>setLimit(e.target.value)} >
        <option value="">Select an option</option>
        <option value="3">3 rows</option>
        <option value="5">5 rows</option>
      </select>
      <p>You selected: {limit}</p>
    </div>
        </nav>
      

    </div>
  );
}

export default App;
