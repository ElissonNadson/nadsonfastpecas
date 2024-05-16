import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import { addDoc, collection} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import DatePicker from "react-datepicker";
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all'; 
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import logo from '../assets/4.png'; 
import "./calendario.css";



export function Calendario(){

    const [texto, setTexto] = useState("");
    const [data, setData] = useState("");
    const [eventos, setEventos] = useState([]);

    const calendarioCollectionRef = collection(db, "calendario"); 



    useEffect(() => {
        const getEventos = async () => {
            try {
                const querySnapshot = await getDocs(calendarioCollectionRef);
                const eventosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // Converta o Timestamp para um objeto Date
                    data: doc.data().data.toDate()
                }));
                setEventos(eventosData);
            } catch (error) {
                console.error("Erro ao obter eventos:", error);
            }
        };
        getEventos();
    }, []);

    async function criarEvento() {
        try {
            const produto = await addDoc(calendarioCollectionRef, {
                data,
                texto,
            });
            console.log("Evento criado:", produto.id);
            console.log("Evento Criado");
           
            Swal.fire({
                title: "Evento criado!",
                icon: "success",
                // showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "Feito"
            }).then((result) => { 
                if (result.isConfirmed) {
                    window.location.href = "/calendario";

                }
            });
        } catch (error) {
            console.error("Erro ao criar evento:", error);
            Swal.fire({
                icon: "error",
                title: "Erro ao criar evento!"
                
              });
        }
    }
    
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
                       
                            <Link className="nav-link fw-bold fs-2" to={"/vp"}>Lista de produtos</Link>
                            <Link className="nav-link fw-bold fs-2  " to={"/vvp"}>Vendas</Link>
                            <Link className="nav-link fw-bold fs-2  " to={"/calendario"}>Calendario</Link>
                        </div>
                    </div>
                </div>
            </nav>
      
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="container rounded custom-container p-4 ">
                            <div className="mb-3">
                                <div className="text-center mb-4">
                                    <a className="navbar-brand2 navbar-brand-custom">
                                        <img src={logo} alt="Logo" className="logo2-img" />
                                    </a>
                                </div>
                                <label className="form-label">Nome do evento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Dia de promoção"
                                    value={texto}
                                    onChange={(event) => setTexto(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <DatePicker
                                    showIcon
                                    selected={data}
                                    onChange={date => setData(date)}
                                    dateFormat="yyyy-MM-dd"
                                    // className="form-control"
                                    placeholderText="Selecione uma data"
                                    required
                                />
                            </div>
                            <button className="btn-confirmar-venda" onClick={criarEvento}>Criar evento</button>
                        </div>
                    </div>
                </div>
            </div>
            {console.log(eventos)}
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                locales={[allLocales]} // Adicione a localização importada aqui
                locale="pt" // Defina o idioma padrão para português  
                events={eventos.map(evento => ({
                    title: evento.texto,
                    start: evento.data
                }))} 
            />
         
             
        </div>
    )
}