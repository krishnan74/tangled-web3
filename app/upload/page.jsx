"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3Provider } from "@/context/Web3ProviderContext";
import contractABI from "@/contract/contractAbi.json";

const Page = () => {
  const { provider, wallet } = useWeb3Provider();
  const [patientIndex, setPatientIndex] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");

  const [diagnosisID, setDiagnosisID] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");

  const [patientGender, setPatientGender] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [medicationInput, setMedicationInput] = useState("");
  const [medications, setMedications] = useState([]);
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [medicationOptions, setMedicationOptions] = useState([]);

  console.log("diagnosisID", diagnosisID);
  console.log("selectedDisease", selectedDisease);
  console.log("medications", medications);

  const contractAddress = "0x3b9B2e444d85a5daDB5809c148D4922B925bFBD8";

  const Contract = new ethers.Contract(contractAddress, contractABI, provider);

  // Disease mapping
  const diseaseMapping = {
    1: "Flu",
    2: "Common Cold",
    3: "COVID-19",
  };

  // Medication mapping
  const medicationMapping = {
    101: "Dolo",
    102: "Paracetamol",
    103: "Ibuprofen",
    104: "Aspirin",
    105: "Zinc",
    106: "Vitamin C",
    107: "Vitamin D",
    108: "Azithromycin",
    109: "Remdesivir",
    110: "Favipiravir",
    111: "Ivermectin",
    112: "Hydroxychloroquine",
    113: "Dexamethasone",
    114: "Oxygen",
    115: "Ventilator",
    116: "Plasma",
    117: "Antibiotics",
    118: "Antivirals",
    119: "Antifungals",
    120: "Antiparasitics",
    121: "Antiretrovirals",
    122: "Antimalarials",

    // Add more medication IDs and names here as needed
  };

  useEffect(() => {
    // Set disease options for dropdown
    const options = Object.keys(diseaseMapping).map((id) => ({
      id,
      name: diseaseMapping[id],
    }));
    setDiseaseOptions(options);

    // Set medication options for suggestion
    const meds = Object.keys(medicationMapping).map(
      (id) => medicationMapping[id]
    );
    setMedicationOptions(meds);
  }, []);

  const handleAddMedication = () => {
    if (medicationInput.trim() !== "") {
      // Find the ID of the medication based on its name
      const medicationId = Object.keys(medicationMapping).find(
        (key) => medicationMapping[key] === medicationInput.trim()
      );

      // If medicationId is found, push it to the medications array
      if (medicationId) {
        setMedications([...medications, parseInt(medicationId)]);
        setMedicationInput("");
      } else {
        console.error("Medication not found in the medication mapping.");
      }
    }
  };

  const handleRemoveMedication = (indexToRemove) => {
    setMedications(medications.filter((_, index) => index !== indexToRemove));
  };

  async function addPatientDetails() {
    const signer = provider.getSigner();
    const ContractWithSigner = Contract.connect(signer);

    try {
      if (provider) {
        const tx = await ContractWithSigner.addPatientDetails(
          patientId,
          patientName,
          parseInt(diagnosisID),
          patientGender,
          parseInt(patientAge),
          medications.map((medication) => parseInt(medication)) // Convert medications to integers
        );
        console.log(tx);
      }
    } catch (error) {
      console.error("Error uploading patient details:", error);
    }
  }

  async function getPatientDetails() {
    const signer = provider.getSigner();
    const ContractWithSigner = Contract.connect(signer);

    try {
      if (provider) {
        const tx = await ContractWithSigner.getPatientDetails(patientIndex);
        console.log(tx);
      }
    } catch (error) {
      console.error("Error uploading patient details:", error);
    }
  }

  async function getMedications() {
    try {
      if (provider) {
        const meds = await Contract.getMedications(patientId);
        console.log("Medications:", meds);
      }
    } catch (error) {
      console.error("Error getting medications:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <p className="mb-4">Connected Wallet: {wallet}</p>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Patient ID"
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Patient Name"
            className="px-3 py-2 border rounded"
          />
          <select
            onChange={(e) => {
              setDiagnosisID(e.target.value);
              setSelectedDisease(diseaseMapping[e.target.value]);
            }}
            className="px-3 py-2 border rounded"
          >
            <option value="">Select Diagnosis</option>
            {diseaseOptions.map((option) => (
              <option key={option.id} value={option.id} name={option.name}>
                {option.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={patientGender}
            onChange={(e) => setPatientGender(e.target.value)}
            placeholder="Patient Gender"
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            placeholder="Patient Age"
            className="px-3 py-2 border rounded"
          />
          <div className="flex flex-wrap gap-2">
            {medications.map((medication, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-2 py-1 rounded"
              >
                <span>{medicationMapping[medication]}</span>
                <button
                  onClick={() => handleRemoveMedication(index)}
                  className="ml-2 text-red-600"
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={medicationInput}
              onChange={(e) => setMedicationInput(e.target.value)}
              placeholder="Add Medication"
              className="flex-grow px-3 py-2 border rounded"
              list="medications"
            />
            <datalist id="medications">
              {medicationOptions.map((medication) => (
                <option key={medication} value={medication} />
              ))}
            </datalist>
            <button
              onClick={handleAddMedication}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <button
            onClick={addPatientDetails}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload Patient Details
          </button>
          <button
            onClick={getPatientDetails}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get Patient Details
          </button>
          <input type="number" placeholder="patientIndex" value={patientIndex} onChange={(e)=>setPatientIndex(e.target.value)}/>
        </div>
      </div>
    </div>
  );
};

export default Page;
