"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3Provider } from "@/context/Web3ProviderContext";
import contractABI from "@/contract/contractAbi.json";
import contractAddress from "@/contract/contractAddress";
import PatientCard from "@/components/PatientCard";

const Page = () => {
  // const provider = localStorage.getItem("web3Provider");
  // const wallet = localStorage.getItem("web3Wallet");

  const { provider, wallet } = useWeb3Provider();

  const [patientIndex, setPatientIndex] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [patientId, setPatientId] = useState("");
  const [patientsArray, setPatientsArray] = useState([]);

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

  useEffect(() => {
    if(provider){
      getAllPatientDetails();
    }
    
  }, [provider]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <p className="mb-4">Your wallet address: {wallet}</p>

        <div className="grid grid-cols-3 gap-10">
          {patientsArray.map((patient, index) => (
            <PatientCard
              key={index}
              id={patient.patientID}
              name={patient.patientName}
              number={index + 1}
              diagnosis={patient.diagnosisID.toString()}
              age={patient.age.toString()}
              gender={patient.gender}
              medications={patient.medicationsIDs}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
