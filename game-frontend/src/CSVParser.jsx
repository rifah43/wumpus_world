import React, { useState } from 'react';
import Papa from 'papaparse';
import { board_data} from './wumpus_world/cave.js'

const CSVParser = ({onDataParsed}) => {

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target.result;

        Papa.parse(csvText, {
          complete: (result) => {
            onDataParsed(result.data);
            board_data(result.data);
          },
          header: false, // Set to true if CSV has header row
        });
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload}/>
    </div>
  );
};

export default CSVParser;
