import React, { useContext } from 'react';
import { StepperContext } from '../../contexts/stepperContext';

export const FirstForm = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };


  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Entreprise */}
        <div className="input-box">
          <input
            type="text"
            name="company_name"
            id="company_name"
            value={userData.company_name || ''}
            onChange={handleChange}
            className="input-style"
            required
          />
          <label htmlFor="company_name" className="">Entreprise</label>
        </div>

        {/* Raison sociale */}
        <div className="input-box">
          <input
            type="text"
            name="raison_sociale"
            id="raison_sociale"
            value={userData.raison_sociale || ''}
            onChange={handleChange}
            className="input-style"
            required
          />
          <label htmlFor="raison_sociale" >Raison Sociale</label>
        </div>

        {/* Adresse */}
        <div className="input-box col-span-2">
          <input
            type="text"
            name="adresse"
            id="adresse"
            required
            value={userData.adresse || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="adresse" >Adresse</label>
        </div>

        {/* Personne à contacter - Fonction */}
        <div className="input-box">
          <input
            type="text"
            name="personne_contact"
            id="personne_contact"
            required
            value={userData.personne_contact || ''}
            onChange={handleChange}
            className="input-style"
            
          />
          <label htmlFor="personne_contact">Personne à Contacter</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="fonction"
            id="fonction"
            required
            value={userData.fonction || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="fonction" >Fonction</label>

        </div>

        {/* Téléphone */}
        <div className="input-box">
          <input
            type="text"
            name="telephone"
            id="telephone"
            required
            value={userData.telephone || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="telephone" className="">Téléphone</label>
        </div>

        {/* Fax */}
        <div className="input-box">
          <input
            type="text"
            name="fax"
            id="fax"
            required
            value={userData.fax || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="fax" className="">Fax</label>
        </div>

        {/* Email */}
        <div className="input-box">
          <input
            type="email"
            name="email"
            id="email"
            required='required'
            value={userData.email || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="email" className="label-style">E-mail</label>
        </div>


        {/* N° de RC */}
        <div className="input-box">
          <input
            type="text"
            name="rc_number"
            id="rc_number"
            required
            value={userData.rc_number || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="rc_number" >N° de RC</label>
        </div>

        {/* N° ICE */}
        <div className="input-box">
          <input
            type="text"
            name="ice_number"
            id="ice_number"
            required
            value={userData.ice_number || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="ice_number" className="">N° ICE</label>
        </div>

        {/* Date de création */}
        <div className="input-box">
          <input
            type="date"
            name="date_creation"
            id="date_creation"
            required
            value={userData.date_creation || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="date_creation" className="">Date de Création</label>
        </div>

        {/* Forme juridique */}
        <div className="input-box">
          <input
            type="text"
            name="forme_juridique"
            id="forme_juridique"
            required
            value={userData.forme_juridique || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="forme_juridique" className="">Forme Juridique</label>
        </div>

        {/* Intermédiaire */}
        <div className="input-box">
          <input
            type="text"
            name="intermediaire"
            id="intermediaire"
            required
            value={userData.intermediaire || ''}
            onChange={handleChange}
            className="input-style"
          />
          <label htmlFor="intermediaire" className="">Intermédiaire</label>
        </div>
      </div>
      {/* Secteur Économique */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Nature de l'Activité</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="Domestique"
              checked={userData.Domestique || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>Domestique</div>
          </label>
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="Export"
              checked={userData.Export || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>Export</div>
          </label>
        </div>
        <h3 className="text-md font-semibold mb-2">Secteur Économique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="commerce"
              checked={userData.commerce || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>Commerce</div>
          </label>

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="prestations_services"
              checked={userData.prestations_services || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>Prestations de services</div>
          </label>

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="production_serie"
              checked={userData.production_serie || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }} 
            />
            <span></span>
            <div>Production de série</div>
          </label>
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="production_mesure"
              checked={userData.production_mesure || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }} /* Hide the default checkbox */
            />
            <span></span>
            <div>Production sur mesure</div>
          </label>

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="autres"
              checked={userData.autres || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>Autres</div>
          </label>
        </div>
      </div>

      {/* Composition de la Clientèle */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Composition de la Clientèle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="industriels"
              checked={userData.industriels || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>Industriels</div>
          </label>

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="distributeurs"
              checked={userData.distributeurs || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>Distributeurs</div>
          </label>

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="detaillants"
              checked={userData.detaillants || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>Détaillants</div>
          </label>

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="filiales_affilies"
              checked={userData.filiales_affilies || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>Filiales ou sociétés affiliées</div>
          </label>
        </div>
      </div>
    </div>
  );
};
