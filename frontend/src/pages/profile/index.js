import React,{ useEffect,useState } from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import { FiPower,FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'

export default function Profile(){
    const ongId = localStorage.getItem('ongId');
    const nomeOng = localStorage.getItem('ongNome')
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile',{
            headers: {
                authorization: ongId,
            }
        }).then(response =>{ 
            setIncidents(response.data)
        })
    }, [ongId]);
    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`,{
               headers:{
                   authorization:ongId,
               } 
            });          
        }catch(err){
            alert('Erro ao deletar');
        }
        setIncidents(incidents.filter(incident => incident.id !== id));
    }
    let handleLogout = () =>{
        localStorage.clear();

        history.push('./');

    }

    return (
        <div className="profile-container"> 
            <header>
                <img src={ logoImg } alt="Be_The_Heroes"></img>
                <span>Bem vinda {nomeOng}</span>
                <Link  className="button" to="incidents/new"> Cadastrar novo caso </Link>
                <button type="button" onClick = { handleLogout } >
                    <FiPower size = {18} color="red"></FiPower>
                </button>
                
            </header>
                <h1>Casos Cadastrados</h1>
                <ul>
                   {incidents.map(incident =>(
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>
                            <strong>Descrição:</strong>
                            <p>{incident.description}</p>
                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-br',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
                            <button onClick = { () => handleDeleteIncident(incident.id) } type="button">
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                     </li>
                   ))}
                </ul>

        </div>
    );
}