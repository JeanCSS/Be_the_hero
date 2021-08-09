import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'


export default function Register(){
    const [nome, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState(''); 
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {nome,email,whatsapp,city,uf};
        console.log(data);
        try{
            const response = await api.post('ongs',data);
            alert(`seu id de acesso:${response.data.id}`);
            history.push('/');
        }catch{
            alert('Erro no cadastro');
        }
    }

    return <div className="register-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="be the hero"/>
                        <h1>
                            Cadastro
                        </h1>
                        <p>Faça seu cadatro</p>
                        <Link className="back-link" to="/">
                            <FiArrowLeft size={16} color="#E02041"/>
                            Voltar
                        </Link>
                    </section>
                    <form onSubmit= {handleRegister}> 

                        <input 
                            placeholder="Nome da Ong"
                            value={nome}
                            onChange={e => setName(e.target.value)}/>

    <                   input 
                            type="e-mail"
                            placeholder="E-mail"
                            value={email}
                            onChange={ e => setEmail(e.target.value)}/>

                        <input 
                            placeholder="Whatsapp"
                            value={whatsapp}
                            onChange={ e => setWhatsapp(e.target.value)}/>

                        <div className="input-group">

                            <input 
                                placeholder="Cidade"
                                value={city}
                                onChange={e => setCity(e.target.value)}/>

                            <input 
                                placeholder="UF" 
                                width={{width:80}}
                                value={uf}
                                onChange ={ e => setUF(e.target.value)}/>

                        </div>
                        <button className="button" type='submit'> Cadastrar </button>
                    </form>
                </div>
            </div>


}