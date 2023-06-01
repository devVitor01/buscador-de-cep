import { FaSearch } from 'react-icons/fa';
import './App.css';
import { useState } from 'react';
import api from'./services/api.js';

function App() {
  let imageStreet = 'assets/street.png';
  let dark = 'App-dark';
  let light = 'App-light';
  let sun = 'assets/sun.png';
  let moon = 'assets/moon.png'

  const [input, setInput] = useState('');
  const [cep, setcep] = useState({});
  const [theme, settheme] = useState(true);

  async function handleSearch(){
    // 05639100/json/

    if(input === ''){
      alert('Preencha o campo de pesquisa!');
      return; 
    }

    try{
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setcep(response.data);
      setInput('');

    }catch{
      alert('Ops algo deu errado');
      setInput('');
    }
  }

  function trocaTheme(){
    settheme(!theme);
  }

  return (
    <div className="App" id={theme ? light : dark}>
      <div className='box'>
        <h1>Buscador de Cep<img src={imageStreet} alt='img'/></h1>

        <div className='form'>
          <input 
          type='text'
          placeholder='Digite o seu cep...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ></input>

          <button onClick={handleSearch}><FaSearch size={30} color='#000'/></button>
        </div>

        {Object.keys(cep).length > 0 && (
          <div className='text'>
          <h2>CEP: {cep.cep}</h2>

          <p>Logradouro: <strong><span>{cep.logradouro}</span></strong></p>

          <p>Complemento: <strong><span>{cep.complemento}</span></strong></p>

          <p>Bairro: <strong><span>{cep.bairro}</span></strong></p>

          <p><strong><span>{cep.localidade} - {cep.uf}</span></strong></p>
        </div>
        )}
      </div>

      <button className='theme-btn' onClick={trocaTheme}><img src={theme ? moon : sun} alt='btn-img' /></button>
    </div>
  );
}

export default App;
