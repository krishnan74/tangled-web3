import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3Provider } from "@/context/Web3ProviderContext";
import { ethers } from "ethers";
import contractABI from "@/contract/contractAbi.json";

const PatientPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { provider, wallet } = useWeb3Provider();

  const [patientDetails, setPatientDetails] = useState({});

  console.log(provider);

  async function getPatientDetails() {
    try {
      if (provider) {
        const signer = provider.getSigner();
        const contractAddress = "0x3C2bB9eB6E16999cdAeF968B20fD7580a6d412ce";
        const Contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );
        const ContractWithSigner = Contract.connect(signer);
        const patientDetails = await ContractWithSigner.getPatientDetails(id);
        console.log("patientDetails", patientDetails);
      }
    } catch (error) {
      console.error("Error uploading patient details:", error);
    }
  }

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
        <span className="font-semibold">Patient ID:</span>
      </p>
      <p>
        <span className="font-semibold">Diagnosis ID:</span>{" "}
      </p>
      <p>
        <span className="font-semibold">Medications:</span>{" "}
      </p>
    </div>
  );
};

export default PatientPage;
