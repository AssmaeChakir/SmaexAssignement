import { Steper } from "./components/steper";
import { SteperControl } from "./components/steperControl";
import { SecondForm } from './components/steps/secondForm';
import { Final } from './components/steps/final';
import { useState } from "react";
import { FirstForm } from './components/steps/firstForm';
import { StepperContext } from "./contexts/stepperContext";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({ tableData: [] });
  const [finalData, setFinalData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    "Etape 1",
    "Etape 2",
    // "Confirmation"
  ];

  // Function to display the current step component
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <FirstForm />;
      case 2:
        return <SecondForm />;
      // case 3:
      //   return <Final />;
      default:
        return null; // Return null for an invalid step
    }
  };

  // Function to handle next and previous steps
  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "Continuer" ? newStep++ : newStep--;
    // Check boundaries to prevent out-of-range steps
    if (newStep > 0 && newStep <= steps.length) {
      setCurrentStep(newStep);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the nature_activite based on the checkbox selections
    const natureActivite = [];
    if (userData.Domestique) natureActivite.push('Domestique');
    if (userData.Export) natureActivite.push('Export');

    const secteurEconomique = [];
    if (userData.commerce) secteurEconomique.push('commerce');
    if (userData.prestations_services) secteurEconomique.push('prestations_services');
    if (userData.production_serie) secteurEconomique.push('production_serie');
    if (userData.production_mesure) secteurEconomique.push('production_mesure');
    if (userData.autres) secteurEconomique.push('autres'); // Corrected from 'production_serie'

    const clientele = [];
    if (userData.industriels) clientele.push('industriels');
    if (userData.distributeurs) clientele.push('distributeurs');
    if (userData.detaillants) clientele.push('detaillants');
    if (userData.filiales_affilies) clientele.push('filiales_affilies');

    const domestique = [];
    if (userData.mad) domestique.push('mad');

    const xport = [];
    if (userData.eur) xport.push('eur');
    if (userData.usd) xport.push('usd');

    const autre = userData.autre || '';

    const auComptant = userData.tableData?.map(row => row.column2) || [];
    const aCredit = userData.tableData?.map(row => row.column3) || [];
    const dureeCredit = userData.tableData?.map(row => row.column4) || [];
    const comptantDocuments = userData.tableData?.map(row => row.column5) || [];
    const aucomptant = userData.tableData?.map(row => row.aucomptant) || '';
    const acredit = userData.tableData?.map(row => row.a_crédit) || '';
  
    
    


    const payload = {
      ...userData,
      nature_activite: natureActivite.join(','), // join to create a string
      secteur_economique: secteurEconomique.join(','),
      clientele: clientele.join(','),
      au_comptant: auComptant,
      a_credit: aCredit,
      duree_credit: dureeCredit,
      comptant_documents: comptantDocuments,
      domestique: domestique,
      xport: xport,
      autre: autre,
      aucomptant: aucomptant,
      acredit: acredit,
    };
    const newpayload = JSON.stringify(payload)
    console.log('json',newpayload);
    

    try {
      const response = await fetch('http://localhost/SmeaxAssignement/backend/submit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: newpayload, // Directly use payload here
      });

      const textResponse = await response.text();

      if (!response.ok) {
        console.error("Error response:", textResponse);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(textResponse);
        console.log('jsonResponse',jsonResponse);
        
      } catch (error) {
        console.error('JSON parsing error:', error);
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }
      
      // Handle successful submission
      setIsSubmitted(true); // Set submission state on success
    } catch (error) {
      console.error("Submission error", error);
    }
  };


  // Render different content based on submission state
  return (
    <div className='md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white'>
      <div className="container horizontal mt-5">
        <Steper steps={steps} currentStep={currentStep} />
        <div className="my-5 p-5">
          <StepperContext.Provider value={{
            userData,
            setUserData,
            finalData,
            setFinalData
          }}>
            {!isSubmitted ? displayStep(currentStep) : (
              <div className='container md:mt-10'>
      <div className='flex flex-col items-center'>
        <div className='text-green-400'>
          <svg className='w-24 h-24 ' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />

          </svg>
          <div className='mt-3 text-xl font-semibold uppercase text-green-500'>
            Votre demande a été envoyée avec succès.!
          </div>
          <div className='text-lg font-semibold text-gray-500'>
                       Merci pour votre patience. Nous vous contacterons bientôt.
          </div>
          <a href="/" className='mt-10'>
            <button className='h-10 text-green-700 transition-colors duration-150 border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100'>
            Fermer
          </button>
          </a>

        </div>

      </div>

    </div>
            )}
          </StepperContext.Provider>
        </div>
      </div>
      {!isSubmitted && (
        <SteperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
          handleSubmit={currentStep === steps.length ? handleSubmit : null} // Pass handleSubmit only if on last step
        />
      )}
    </div>
  );
}

export default App;
