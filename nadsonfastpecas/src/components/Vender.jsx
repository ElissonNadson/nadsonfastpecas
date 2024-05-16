import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { collection,  getDocs} from "firebase/firestore";
import { db } from "../services/firebase";
import logo from '../assets/4.png'; 
import "./vender.css";




export default function Vender(){


    
    const [produtos, setProdutos] = useState([]);
    const [vendas, setVendas] = useState([]);

    const [vendaProduto, setVendaProduto] = useState(null);

    const produtosCollectionRef = collection(db, "produtos");
    const vendasCollectionRef = collection(db, "vendas");

   

    useEffect(() => {
        const getProdutos = async () => {
            const data = await getDocs(produtosCollectionRef);
            setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getProdutos();
    }, []);

    

    useEffect(() => {
        const getVendas = async () => {
            const data = await getDocs(vendasCollectionRef);
            setVendas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getVendas();
    }, []);


    return(
        <div>
           <nav className="navbar navbar-expand-lg navbar-light ok">
                <div className="container">
                    <a className="navbar-brand" href="#"> </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-auto kl"> 
                            <Link className="nav-link fw-bold fs-2" to={"/cp"}>Cadastrar</Link>
                            <Link className="nav-link fw-bold fs-2" to={"/vp"}>Lista de produtos</Link>
                            <Link className="nav-link fw-bold fs-2  " to={"/vvp"}>Vendas</Link>
                            <Link className="nav-link fw-bold fs-2  " to={"/calendario"}>Calendario</Link>
                        </div>
                    </div>
                </div>
            </nav>
      
            <div className="container mt-5">
                <h1>Vendas</h1>
                <div className="table-responsive">
                    <table className="table table-scrollable ">
                        <thead className="thead-dark " >
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Valor de Venda</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Valor total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map((venda) =>(
                                <tr key={venda.id}>
                                    <td>{venda.nomePeca}</td>
                                    <td>{venda.precoVenda}</td>
                                    <td>{venda.quantidadeVendida}</td>
                                    <td>{venda.totalVenda}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}