"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3Provider } from "@/context/Web3ProviderContext";
import contractABI from "@/contract/contractAbi.json";
import PatientCard from "@/components/PatientCard";

const Page = () => {
  const { provider, wallet } = useWeb3Provider();

  const [patientIndex, setPatientIndex] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [patientId, setPatientId] = useState("");
  const [patientsArray, setPatientsArray] = useState([]);

  const contractAddress = "0x3C2bB9eB6E16999cdAeF968B20fD7580a6d412ce";

  const Contract = new ethers.Contract(contractAddress, contractABI, provider);

  async function getAllPatientDetails() {
    const signer = provider.getSigner();
    const ContractWithSigner = Contract.connect(signer);

    try {
      if (provider) {
        const patientsArray = await ContractWithSigner.getAllPatients();
        setPatientsArray(patientsArray);
      }
    } catch (error) {
      console.error("Error uploading patient details:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <p className="mb-4">Connected Wallet: {wallet}</p>

        <div className="grid grid-cols-3 gap-10">
          {patientsArray.map((patient, index) => (
            <PatientCard
              key={index}
              id={patient.patientID.toString()}
              name={patient.patientName}
              number={index + 1}
              diagnosis={patient.diagnosisID.toString()}
              age={patient.age.toString()}
              gender={patient.gender}
              medications={patient.medicationsIDs}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Patient ID"
            className="px-3 py-2 border rounded"
          />

          <button
            onClick={getAllPatientDetails}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get All Patient Details
          </button>
          <input
            type="number"
            placeholder="patientIndex"
            value={patientIndex}
            onChange={(e) => setPatientIndex(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
