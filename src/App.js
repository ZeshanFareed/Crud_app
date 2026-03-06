import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';

function App() {

  let [uname, setUname] = useState('')
  let [password, setPassword] = useState('')

  let handleSubmit = (event) => {

    event.preventDefault();
    console.log(uname, password)
  }

  // let getUname = (event) => {
  //    setUname(event.target.value)
  // }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <form onSubmit={handleSubmit}>
              <div className='text-start'>
                <label className="form-label">Username</label>
                <input type="text" onChange={(event) => setUname(event.target.value)} className="form-control" value={uname} />
              </div>
              <div className='text-start'>
                <label className="form-label">Password</label>
                <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" value={password}/>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
