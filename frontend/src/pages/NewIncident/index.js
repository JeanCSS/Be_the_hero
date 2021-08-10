import React,{ useState } from 'react';
import api from '../../services/api'
import './styles.css';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'

export default function NewIncident(){
 
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');
    const ong_id = localStorage.getItem('ongId');
    //console.log({title, ong_id, description, value});

    async function handleNewIncident(e){
        e.preventDefault();

        const res = await api.post('/incidents', { title, description, value }, { headers: { authorization: ong_id }})
        console.log({res})

    }
    return (
        <div className="new-incident-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="be the hero"/>
                        <h1>
                            Cadastrar novo caso
                        </h1>
                        <p>Descreva detalhadamente para encontrar um heroi para resolver isso.</p>
                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041"/>
                            Voltar para home
                        </Link>
                    </section>
                    <form onSubmit={e => handleNewIncident(e)}>
                        <input 
                            value={ title }
                            onChange={e => setTitle(e.target.value)}
                            placeholder="titulo do caso"/>
                        <textarea 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Descrição"/>
                        <input 
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder="Valor em reais"/>
                      
                        <button className="button" type='submit'> Cadastrar </button>
                    </form>
                </div>
            </div>
    )
}