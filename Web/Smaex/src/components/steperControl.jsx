import React from 'react'
import PropTypes from 'prop-types'; 


export const SteperControl = ({handleSubmit,handleClick,currentStep,steps}) => {
  return (
      <div className='container flex justify-around mt-4 mb-8'>
          <button onClick={(e) => handleClick(e)}
         className={`bg-white text-slate-400 uppercase py-2 px-4
          rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Précédent
          </button> 
          <button
              onClick={(e) => {
                  if (currentStep === steps.length) {
                      handleSubmit(e); // Call handleSubmit on the last step
                  } else {
                      handleClick("Continuer");
                  }
              }}
              className='bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out'
          >
              {currentStep === steps.length ? "Confirmer" : "Continuer"}
          </button>
    </div>
  )
}
SteperControl.propTypes = {
    handleSubmit: PropTypes.func,
    handleClick: PropTypes.func.isRequired, // handleClick should be a function and required
    currentStep: PropTypes.number.isRequired, // currentStep should be a number and required
    steps: PropTypes.arrayOf(PropTypes.string).isRequired, // steps should be an array of strings and required
};
