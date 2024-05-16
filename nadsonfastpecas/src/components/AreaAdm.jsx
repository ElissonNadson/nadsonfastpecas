import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import logo from '../assets/4.png'; 

import "./areaAdm.css";

export default function AreaAdm(){

    const [infoPessoal, setInfoPessoal] = useState(null);

    const fetchUserData = async () =>{
        auth.onAuthStateChanged( async (user) => {
            console.log(user);
            const docRef = doc(db, "Administradores", user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists){
                setInfoPessoal(docSnap.data());
                console.log(docSnap.data());
            }else{
                console.log("Administrador não logado!")
            }
        });
    }

    useEffect(() =>{
        fetchUserData();
    }, []);

    async function HandleDeslogar(){
        try {
            await auth.signOut();
            window.location.href = "./loginAdm";
            console.log("Adminitrador deslogado!");
        } catch (error) {
            console.log("Erro ao deslogar: ", error.message);
        }
    }

    
    return(

            <div className="dashboard">
                {infoPessoal ? ( 
                <div>
                    <nav className="navbar">
                        <div className="container-fluid">
                            <a className="navbar-brand">Olá, {infoPessoal.nome}</a>
                            <button onClick={HandleDeslogar} className="btn-sair">Sair</button>
                        </div>
                    </nav>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card">
                                    <h2 className="card-header">Cadastro de produto</h2>
                                    <p className="card-body">Aqui você conseguirá cadastrar seus produtos</p>
                                    <button className="btn-cadastrar-adm"><Link to={"/cp"} className="linkEstilizado">cadastrar</Link></button>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card">
                                    <h2 className="card-header">Visualizar produtos</h2>
                                    <p className="card-body">Aqui você conseguirá visualizar seus produtos</p>
                                    <button className="btn-visualizar-adm"><Link to={"/vp"} className="linkEstilizado">visualizar</Link></button>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card">
                                    <h2 className="card-header">Visualizar vendas</h2>
                                    <p className="card-body">Aqui você conseguirá visualizar suas vendas</p>
                                    <button className="btn-vender-adm"><Link to={"/vvp"} className="linkEstilizado">vendas</Link></button>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card">
                                    <h2 className="card-header">Adicionar evento no calendario</h2>
                                    <p className="card-body">Aqui você conseguirá adicionar evento no calendario</p>
                                    <button className="btn-calendario-adm"><Link to={"/calendario"} className="linkEstilizado">add evento</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                 




                 
                </div>
                ) : ( 
                    <p>Carregando....</p>
                )}
            </div>
            );
}



            
