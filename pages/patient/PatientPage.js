import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3Provider } from "@/context/Web3ProviderContext";
import { ethers } from "ethers";
import { createClient } from "@supabase/supabase-js";
import contractAddress from "@/contract/contractAddress";
import contractABI from "@/contract/contractAbi.json";

const supabaseUrl = "https://hpryrakhigrduskaqyci.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwcnlyYWtoaWdyZHVza2FxeWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMzU1MzMsImV4cCI6MjAyMzgxMTUzM30.wQj_SPW8C_mmNMTIZQoRK_0JKH36VhIgcqlEsE-w40E";
const supabase = createClient(supabaseUrl, supabaseKey);

const PatientPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { provider, wallet } = useWeb3Provider();

  const [patientDetails, setPatientDetails] = useState({});
  const [diseaseNames, setDiseaseNames] = useState();
  const [medicineNames, setMedicineNames] = useState();

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

  async function getPatientDetails() {
    try {
      if (provider) {
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );
        const ContractWithSigner = Contract.connect(signer);
        const currpatientDetails = await ContractWithSigner.getPatientDetails(
          id
        );

        
        const { diagnosisId, medications } = currpatientDetails;

        // Fetch disease names and medicine names using diagnosis ID and medication IDs
        const resDiseases = await fetchDiseaseNames(diagnosisId);
        const resMedicines = await fetchMedicineNames(medications);

        // Set the fetched data to state
        setPatientDetails(currpatientDetails);
        setDiseaseNames(resDiseases);
        setMedicineNames(resMedicines);
      }
    } catch (error) {
      console.error("Error uploading patient details:", error);
    }
  }

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

  useEffect(() => {
    if (id && provider) {
      getPatientDetails();
    }
  }, [id, provider]);

  if (!patientDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 mb-4">
      <h3 className="text-lg font-semibold mb-2">Patient Details</h3>
      <p>
        <span className="font-semibold">Patient ID:</span> {patientDetails.id}
      </p>
      <p>
        <span className="font-semibold">Diagnosis ID:</span>{" "}
        {diseaseNames}
      </p>
      <p>
        <span className="font-semibold">Medications:</span>{" "}
        {medicineNames}
      </p>
    </div>
  );
};

export default PatientPage;
