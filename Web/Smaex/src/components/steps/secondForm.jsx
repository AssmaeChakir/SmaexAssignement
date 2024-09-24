import React, { useContext } from 'react';
import { StepperContext } from '../../contexts/stepperContext';

export const SecondForm = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e, rowIndex, column) => {
    const value = e.target.value;
    setUserData(prev => {
      const updatedData = { ...prev };
      updatedData.tableData = updatedData.tableData || [];
      updatedData.tableData[rowIndex] = {
        ...updatedData.tableData[rowIndex],
        [column]: value,
      };
      return updatedData;
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: checked,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-green-700">Conditions de paiement</h2>
      <p className='m-2'>Répartition en % chiffre d'affaires</p>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 sm:table-auto">
          <thead>
            <tr>
              <th className="border border-t-transparent border-l-transparent bg-transparent px-2 py-1 sm:px-4 sm:py-2"></th>
              <th className="border bg-gray-200 border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Au comptant</th>
              <th className="border bg-gray-200 border-gray-300 px-2 py-1 sm:px-4 sm:py-2">A crédit</th>
              <th className="border bg-gray-200 border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Durée de crédit</th>
              <th className="border bg-gray-200 border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Comptant contre documents</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1].map(rowIndex => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  <label htmlFor={rowIndex === 0 ? 'Domestique' : 'Export'} className="text-xs sm:text-base">
                    {rowIndex === 0 ? 'Domestique' : 'Export'}
                  </label>
                </td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  <input
                    type="text"
                    value={userData.tableData?.[rowIndex]?.column2 || ''}
                    onChange={(e) => handleChange(e, rowIndex, 'column2')}
                    className="input-style w-full text-xs sm:text-base"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  <input
                    type="text"
                    value={userData.tableData?.[rowIndex]?.column3 || ''}
                    onChange={(e) => handleChange(e, rowIndex, 'column3')}
                    className="input-style w-full text-xs sm:text-base"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  <input
                    type="text"
                    value={userData.tableData?.[rowIndex]?.duration || ''}
                    onChange={(e) => handleChange(e, rowIndex, 'duration')}
                    className="input-style w-full text-xs sm:text-base"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  <input
                    type="text"
                    value={userData.tableData?.[rowIndex]?.column5 || ''}
                    onChange={(e) => handleChange(e, rowIndex, 'column5')}
                    className="input-style w-full text-xs sm:text-base"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className='mt-6'>
        <h2 className="text-lg font-semibold mb-4 text-green-700">Chiffre d'affaires assurable</h2>
        <h3 className='text-md font-semibold mb-2'>Domestique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="mad"
              checked={userData.mad || false}
              onChange={handleCheckboxChange}
              style={{ display: 'none' }}
            />
            <span></span>
            <div>MAD</div>
          </label>
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Export</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="eur"
                checked={userData.eur || false}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}

              />
              <span></span>
              <div>EUR</div>
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="usd"
                checked={userData.usd || false}
                onChange={handleCheckboxChange}
                style={{ display: 'none' }}

              />
              <span></span>
              <div>USD</div>
            </label>
          </div>
          <div className="">
            <label className="text-green-700 m-5">Autre</label>
            <input
              type="text"
              name="autre"
              value={userData.autre || ''}
              onChange={(e) => setUserData({ ...userData, autre: e.target.value })}
              className="border border-green-700 px-4 py-2 w-5/6"
            />
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <h3 className=" font-semibold mb-2 text-green-700">Comment calculer mon chiefre d'affaires assurable?</h3>
        <h3 className="font-semibold mb-2 text-green-700">Chifre d'affaires total</h3>
        <p>
          -Ventes aux sociétés du même groupe <br />
          - Ventes payées cash ou d'avance <br />
          - Ventes payées par paiement sécurisés (Lettres de crédi...) <br />
          -Ventes aux particuliers et aux administrations <br />
        </p>
        <h3 className="font-semibold text-green-700">= Chiffre d'affaires assurable</h3>




      </div>

      <div className='mt-6'>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-t-transparent border-l-transparent bg-transparent px-4 py-2"></th>
              <th className="border bg-gray-200 border-gray-300 px-4 py-2">Au comptant</th>
              <th className="border bg-gray-200 border-gray-300 px-4 py-2">A crédit</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1].map((rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 px-4 py-2">
                  <label htmlFor={rowIndex === 0 ? 'Domestique' : 'Export'}>
                    {rowIndex === 0 ? 'Domestique' : 'Export'}
                  </label>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-start space-x-4">
                    <ul className="flex-none">
                      <li>Maroc:</li>
                      <li>Export:</li>
                      <li>pays 1:</li>
                      <li>pays 2:</li>
                      <li>pays 3:</li>
                      <li>pays 4:</li>
                    </ul>
                    <textarea
                      className="flex-grow h-40 input-style"
                      value={userData.tableData?.[rowIndex]?.aucomptant || ''}
                      onChange={(e) => handleChange(e, rowIndex, 'aucomptant')}
                    ></textarea>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-start space-x-4">
                    <ul className="flex-none">
                      <li>Maroc:</li>
                      <li>Export:</li>
                      <li>pays 1:</li>
                      <li>pays 2:</li>
                      <li>pays 3:</li>
                      <li>pays 4:</li>
                    </ul>
                    <textarea
                      className="flex-grow h-40 input-style"
                      value={userData.tableData?.[rowIndex]?.a_crédit || ''}
                      onChange={(e) => handleChange(e, rowIndex, 'a_crédit')}
                    ></textarea>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
