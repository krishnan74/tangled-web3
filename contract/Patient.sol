// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Patient {

    struct PatientDetails {
        uint256 patientID;
        string patientName;
        uint256 diagnosisID;
        string gender;
        uint256 age;
        uint256[] medicationsIDs;
    }

    mapping(address => PatientDetails[]) private patientsByDoctor;

    function addPatientDetails( uint256 _patientID, string memory _patientName, uint256 _diagnosisID, string memory _gender, uint256 _age, uint256[] memory _medicationsIDs) public {
        PatientDetails memory newPatient = PatientDetails(
            _patientID,
            _patientName,
            _diagnosisID,
            _gender,
            _age,
            _medicationsIDs
        );
        patientsByDoctor[msg.sender].push(newPatient);
    }

    function getAllPatients() public view returns(PatientDetails[] memory){
        return patientsByDoctor[msg.sender];
    }

    function getPatientCount() public view returns (uint256) {
        return patientsByDoctor[msg.sender].length;
    }

    function getPatientDetails(uint256 _index) public view returns (
        uint256 patientID,
        string memory patientName,
        uint256 diagnosisID,
        string memory gender,
        uint256 age,
        uint256[] memory medicationsIDs
    ) {
        require(_index < patientsByDoctor[msg.sender].length, "Patient index out of bounds");
        PatientDetails memory patient = patientsByDoctor[msg.sender][_index];
        return (
            patient.patientID,
            patient.patientName,
            patient.diagnosisID,
            patient.gender,
            patient.age,
            patient.medicationsIDs
        );
    }

    function getMedications(uint256 _patientID) public view returns (uint256[] memory) {
        for (uint256 i = 0; i < patientsByDoctor[msg.sender].length; i++) {
            if (_patientID == patientsByDoctor[msg.sender][i].patientID) {
                return patientsByDoctor[msg.sender][i].medicationsIDs;
            }
        }
        
        uint256[] memory emptyArray;
        return emptyArray;
    }

}
