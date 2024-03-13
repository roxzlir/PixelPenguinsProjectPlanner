import React from "react";

// Används i PeopleRullup.js
// Funktionskomponent för att rendera en rullista med alla namn från 'data'
const NameListDropdown = ({ data }) => {
  return (
    <div style={{ backgroundColor: "lightgrey" }}>
      <h2>Alla namn</h2>
      <select>
        {data.map((item) => (
          <option key={item.id}>
            {item.properties.Name.title[0]?.plain_text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NameListDropdown;
