import React,{ useEffect,useState } from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import { FiPower,FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'

export default function Profile(){
    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome')
    const [incidents, setIncidents] = useState(null);
    const history = useHistory();
    console.log(ongNome);
    useEffect(() => {
        api.get('profile',{
            headers: {
                authorization: ongId,
            }
        }).then(response =>{ 
            setIncidents(response.data.incidents)
        })
    }, [ongId]);
    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/delete/${id}`,{
               headers:{
                   Authorization: ongId,
               } 
            });          
        }catch(err){
            alert(`Erro ao deletar ${id} de ${ongId}`);
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
                <span>Bem vindo {ongNome}</span>
                <Link  className="button" to="incidents/new"> Cadastrar novo caso </Link>
                <button type="button" onClick = { handleLogout } >
                    <FiPower size = {18} color="red"></FiPower>
                </button>
                
            </header>
                <h1>Casos Cadastrados</h1>
                <ul>
                    {console.log(incidents)}
                    {incidents == null? '<li>Nada pra mostrar</li>' :incidents.map(incident =>(
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