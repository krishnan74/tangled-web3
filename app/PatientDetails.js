import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hpryrakhigrduskaqyci.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwcnlyYWtoaWdyZHVza2FxeWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMzU1MzMsImV4cCI6MjAyMzgxMTUzM30.wQj_SPW8C_mmNMTIZQoRK_0JKH36VhIgcqlEsE-w40E'
const supabase = createClient(supabaseUrl, supabaseKey)

function PatientDetails(props) {
  const router = useRouter();

  const [patient, setPatient] = useState(props.id);
  const [diseaseNames, setDiseaseNames] = useState(props.diagnosis);
  const [medicineNames, setMedicineNames] = useState(props.medications);

  const fetchDiseaseNames = async (diagnosis) => {
    try {
      const { data, error } = await supabase
        .from("Disease")
        .select("disease_name")
        .in("id", diagnosis);
  
      if (error) {
        throw error;
      }
  
      return data.map((disease) => disease.disease_name);
    } catch (error) {
      console.error("Error fetching disease names:", error.message);
      return [];
    }
  };
  
  const fetchMedicineNames = async (medications) => {
    try {
      const { data, error } = await supabase
        .from("Medicine")
        .select("medicine_name")
        .in("id", medications);
  
      if (error) {
        throw error;
      }
  
      return data.map((medicine) => medicine.medicine_name);
    } catch (error) {
      console.error("Error fetching medicine names:", error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const resDiseases = await fetchDiseaseNames(diseaseNames);
        setDiseaseNames(resDiseases);

        const resMedicines = await fetchMedicineNames(medicineNames);
        setMedicineNames(resMedicines);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {patient && (
        <div>
          <h2>
            {patient.first_name} {patient.last_name}
          </h2>
          <h4>Age: {patient.age}</h4>
          <h4>Gender: {patient.gender}</h4>
        </div>
      )}

      <h3>Diseases:</h3>
      <ul>
        {diseaseNames.map((diseaseName) => (
          <li key={diseaseName}>{diseaseName}</li>
        ))}
      </ul>

      <h3>Medicines:</h3>
      <ul>
        {medicineNames.map((medicineName) => (
          <li key={medicineName}>{medicineName}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientDetails;
