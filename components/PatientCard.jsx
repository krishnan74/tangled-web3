import React from "react";
import Link from "next/link";

const PatientCard = (props) => {
  return (
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 mb-4">
      <h3 className="text-lg font-semibold mb-2">Patient Information</h3>
      <p>
        <span className="font-semibold">Patient ID:</span> {props.id}
      </p>

      <p>
        <span className="font-semibold">Patient Name:</span> {props.name}
      </p>
      <p>
        <span className="font-semibold">Age:</span> {props.age}
      </p>
      <p>
        <span className="font-semibold">Gender:</span> {props.gender}
      </p>
      <p>
        <span className="font-semibold">Diagnosis:</span> {props.diagnosis}
      </p>
      <p>
        <span className="font-semibold">Medications:</span>{" "}
        {props.medications.length > 0
          ? props.medications.join(", ")
          : "No medications prescribed."}
      </p>
      <Link href={`/patient/${props.id}`}>
        <button className="text-blue-500">View Details</button>
      </Link>
    </div>
  );
};

export default PatientCard;
