import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';
import axios from 'axios';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item {
   id: number,
   image_url: string,
   title: string
}

interface IBGEUFResponse {
   sigla: string,
}

interface IBGECityResponse {
   nome: string,
}

const CreatePoint = () => {
   // states for arrays and obj shoud have a type of elements
   const [ items, setItems ] = useState<Item[]>([]); // it could be useState<Array<Item>>([]) also
   const [ ufs, setUfs ] = useState<string[]>([]);
   const [ cities, setCities ] = useState<string[]>([]);

   const [ selectedUf, setSelectedUf ] = useState<string>('0');
   const [ selectedCity, setSelectedCity ] = useState<string>('0');
   
   const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);
   const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>([0, 0]);

//get initial position
   useEffect(() =>{
      navigator.geolocation.getCurrentPosition(position => {
         const { latitude, longitude } = position.coords;
         setInitialPosition([latitude, longitude]);
      })
   }, [])
//get items
   useEffect(() => {
      api.get('items').then(response => {
         
         setItems(response.data.data);

      }).catch(error => {
         
         console.log('Failed to load API resources to get Items!')
         console.error(error);
      
      })
   }, [])
//get UF from IBGE
   useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
         .then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);

         }).catch(error => {
         
            console.log('Failed to load IBGE API resources to get UFs!')
            console.error(error);
      
         })
   }, [])
//get Cities every time seceted UF changes
   useEffect(() => {
      if (selectedUf === '0') return;

      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
         .then(response => {
            const citiesNames = response.data.map(city => city.nome);
            setCities(citiesNames);

         }).catch(error => {
         
            console.log('Failed to load IBGE API resources to get Cities!')
            console.error(error);
      
         })
   }, [selectedUf])

   function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
      setSelectedUf(event.target.value);
   }

   function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
      setSelectedCity(event.target.value);
   }

   function handleMapClick(event: LeafletMouseEvent) {
      setSelectedPosition([
         event.latlng.lat,
         event.latlng.lng,
      ]);
   }

   return (
      <div id="page-create-point">
         <header>
            <img src={logo} alt="Ecoleta" />
            <Link to="/">
               <FiArrowLeft />
               Voltar para a home
            </Link>
         </header>

         <form>
            <h1>Cadastro do <br /> ponto de coleta</h1>

            <fieldset>
               <legend>
                  <h2>Dados</h2>
               </legend>

               <div className="field">
                  <label htmlFor="name">Nome da entidade</label>
                  <input
                     type="text"
                     name="name"
                     id="name"
                  />
               </div>

               <div className="field-group">
                  <div className="field">
                     <label htmlFor="name">E-mail</label>
                     <input
                        type="email"
                        name="email"
                        id="email"
                     />
                  </div>

                  <div className="field">
                     <label htmlFor="name">Whatsapp</label>
                     <input
                        type="text"
                        name="whatsapp"
                        id="whatsapp"
                     />
                  </div>
               </div>
            </fieldset>

            <fieldset>
               <legend>
                  <h2>Endereço</h2>
                  <span>Selecione o endereço no mapa</span>
               </legend>

               <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                  <TileLayer 
                     attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                     position={selectedPosition}
                  />
               </Map>

               <div className="field-group">
                  <div className="field">
                     <label htmlFor="uf">Estado (UF)</label>
                     <select
                        name="uf"
                        id="uf"
                        value={selectedUf}
                        onChange={handleSelectUf}
                     >
                        <option value="0">Selecione uma UF</option>
                        {ufs ?
                           ufs.map(uf => {
                              return (
                              <option key={uf} value={uf}>{uf}</option>
                              )
                           }) : ''
                        }

                     </select>
                  </div>

                  <div className="field">
                     <label htmlFor="city">Cidade</label>
                     <select
                        name="city"
                        id="city"
                        value={selectedCity}
                        onChange={handleSelectCity}
                     >
                        <option value="0">Selecione uma Cidade</option>
                        {cities ?
                           cities.map(city => {
                              return (
                              <option key={city} value={city}>{city}</option>
                              )
                           }) : ''
                        }

                     </select>
                  </div>
               </div>
            </fieldset>

            <fieldset>
               <legend>
                  <h2>Itens de coleta</h2>
                  <span>Selecione um ou mais items</span>
               </legend>

               <ul className="items-grid">
               
               {items ?
                  items.map(item => {
                     return (
                        <li key={item.id}>
                           <img
                              src={item.image_url}
                              alt={item.title}
                           />
                           <span>{item.title}</span>
                        </li>
                     )
                  }) : ''
               }

               </ul>

            </fieldset>
            <button type="submit">
               Cadastrar ponto de coleta
            </button>

         </form>
      </div>
   );
};

export default CreatePoint;
