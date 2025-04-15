// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

import { useState, useEffect } from 'react';

const App = () => {
  // State for form inputs
  const [vehicleType, setVehicleType] = useState('passenger');
  const [region, setRegion] = useState('almaty');
  const [vehicleAge, setVehicleAge] = useState('0-7');
  const [engineVolume, setEngineVolume] = useState('up-to-1600');
  const [insuredPeriod, setInsuredPeriod] = useState(12);
  const [driverAge, setDriverAge] = useState('25-and-above');
  const [drivingExperience, setDrivingExperience] = useState('3-and-above');
  const [bonusMalus, setBonusMalus] = useState('class-3');
  const [premium, setPremium] = useState(0);
  const [loading, setLoading] = useState(false);

  // Constants based on Kazakhstan OGPO regulations
  const baseRates = {
    passenger: 1983,
    truck: 3166,
    bus: 3374,
    motorcycle: 1290,
    specialVehicle: 1290,
  };

  const regionCoefficients = {
    almaty: 2.96,
    astana: 2.2,
    shymkent: 1.95,
    aqmola: 1.32,
    aqtobe: 1.32,
    almaty_region: 1.32,
    atyrau: 1.32,
    east_kazakhstan: 1.32,
    zhambyl: 1.32,
    west_kazakhstan: 1.32,
    karaganda: 1.32,
    kostanay: 1.32,
    kyzylorda: 1.32,
    mangistau: 1.32,
    pavlodar: 1.32,
    north_kazakhstan: 1.32,
    turkistan: 1.32,
  };

  const vehicleAgeCoefficients = {
    '0-7': 1.0,
    '7-plus': 1.1,
  };

  const engineVolumeCoefficients = {
    'up-to-1600': 1.0,
    '1601-2000': 1.1,
    '2001-2500': 1.2,
    '2501-3000': 1.5,
    '3001-plus': 1.8,
  };

  const insuredPeriodCoefficients = {
    1: 0.2,
    2: 0.3,
    3: 0.4,
    4: 0.5,
    5: 0.6,
    6: 0.7,
    7: 0.8,
    8: 0.9,
    9: 0.95,
    10: 1.0,
    11: 1.0,
    12: 1.0,
  };

  const driverAgeCoefficients = {
    'under-25': 1.1,
    '25-and-above': 1.0,
  };

  const drivingExperienceCoefficients = {
    'under-3': 1.1,
    '3-and-above': 1.0,
  };

  const bonusMalusCoefficients = {
    'class-M': 2.45,
    'class-0': 2.3,
    'class-1': 1.55,
    'class-2': 1.4,
    'class-3': 1.0,
    'class-4': 0.95,
    'class-5': 0.9,
    'class-6': 0.85,
    'class-7': 0.8,
    'class-8': 0.75,
    'class-9': 0.7,
    'class-10': 0.65,
    'class-11': 0.6,
    'class-12': 0.55,
    'class-13': 0.5,
  };

  // Calculate premium whenever inputs change
  useEffect(() => {
    calculatePremium();
  }, [
    vehicleType,
    region,
    vehicleAge,
    engineVolume,
    insuredPeriod,
    driverAge,
    drivingExperience,
    bonusMalus,
  ]);

  const calculatePremium = () => {
    setLoading(true);

    // Simulate API delay (can be removed in production)
    setTimeout(() => {
      try {
        // Get base rate for vehicle type
        const baseRate = baseRates[vehicleType];

        // Apply coefficients
        const regionCoeff = regionCoefficients[region];
        const vehicleAgeCoeff = vehicleAgeCoefficients[vehicleAge];
        const engineVolumeCoeff =
          vehicleType === 'passenger'
            ? engineVolumeCoefficients[engineVolume]
            : 1.0;
        const periodCoeff = insuredPeriodCoefficients[insuredPeriod];
        const driverAgeCoeff = driverAgeCoefficients[driverAge];
        const drivingExpCoeff =
          drivingExperienceCoefficients[drivingExperience];
        const bonusMalusCoeff = bonusMalusCoefficients[bonusMalus];

        // Calculate total premium based on OGPO formula
        const calculatedPremium = Math.round(
          baseRate *
            regionCoeff *
            vehicleAgeCoeff *
            engineVolumeCoeff *
            periodCoeff *
            driverAgeCoeff *
            drivingExpCoeff *
            bonusMalusCoeff
        );

        setPremium(calculatedPremium);
      } catch (error) {
        console.error('Calculation error:', error);
        setPremium(0);
      }

      setLoading(false);
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
        OGPO Insurance Calculator (Kazakhstan)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Type
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="passenger">Passenger Car</option>
            <option value="truck">Truck</option>
            <option value="bus">Bus</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="specialVehicle">Special Vehicle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="almaty">Almaty City</option>
            <option value="astana">Astana City</option>
            <option value="shymkent">Shymkent City</option>
            <option value="aqmola">Aqmola Region</option>
            <option value="aqtobe">Aqtobe Region</option>
            <option value="almaty_region">Almaty Region</option>
            <option value="atyrau">Atyrau Region</option>
            <option value="east_kazakhstan">East Kazakhstan Region</option>
            <option value="zhambyl">Zhambyl Region</option>
            <option value="west_kazakhstan">West Kazakhstan Region</option>
            <option value="karaganda">Karaganda Region</option>
            <option value="kostanay">Kostanay Region</option>
            <option value="kyzylorda">Kyzylorda Region</option>
            <option value="mangistau">Mangistau Region</option>
            <option value="pavlodar">Pavlodar Region</option>
            <option value="north_kazakhstan">North Kazakhstan Region</option>
            <option value="turkistan">Turkistan Region</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Age
          </label>
          <select
            value={vehicleAge}
            onChange={(e) => setVehicleAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="0-7">0-7 years</option>
            <option value="7-plus">Over 7 years</option>
          </select>
        </div>

        {vehicleType === 'passenger' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Engine Volume
            </label>
            <select
              value={engineVolume}
              onChange={(e) => setEngineVolume(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="up-to-1600">Up to 1600 cc</option>
              <option value="1601-2000">1601-2000 cc</option>
              <option value="2001-2500">2001-2500 cc</option>
              <option value="2501-3000">2501-3000 cc</option>
              <option value="3001-plus">Over 3000 cc</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insured Period (months)
          </label>
          <select
            value={insuredPeriod}
            onChange={(e) => setInsuredPeriod(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
              <option key={month} value={month}>
                {month} {month === 1 ? 'month' : 'months'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Driver Age
          </label>
          <select
            value={driverAge}
            onChange={(e) => setDriverAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="under-25">Under 25 years</option>
            <option value="25-and-above">25 years and above</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Driving Experience
          </label>
          <select
            value={drivingExperience}
            onChange={(e) => setDrivingExperience(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="under-3">Under 3 years</option>
            <option value="3-and-above">3 years and above</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bonus-Malus Class
          </label>
          <select
            value={bonusMalus}
            onChange={(e) => setBonusMalus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="class-M">Class M</option>
            <option value="class-0">Class 0</option>
            <option value="class-1">Class 1</option>
            <option value="class-2">Class 2</option>
            <option value="class-3">Class 3 (Default)</option>
            <option value="class-4">Class 4</option>
            <option value="class-5">Class 5</option>
            <option value="class-6">Class 6</option>
            <option value="class-7">Class 7</option>
            <option value="class-8">Class 8</option>
            <option value="class-9">Class 9</option>
            <option value="class-10">Class 10</option>
            <option value="class-11">Class 11</option>
            <option value="class-12">Class 12</option>
            <option value="class-13">Class 13</option>
          </select>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">OGPO Premium:</h2>
          <div className="text-xl font-bold text-blue-700">
            {loading ? (
              <span className="text-gray-500">Calculating...</span>
            ) : (
              <span>{premium.toLocaleString()} KZT</span>
            )}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        <p>
          This calculator is for internal use only. The calculations are based
          on OGPO insurance coefficients for Kazakhstan. The actual premium may
          vary based on current regulations.
        </p>
      </div>
    </div>
  );
};

export default App;
