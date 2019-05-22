import React from 'react'
import  { Button } from "@material-ui/core";
import StallsTable from "./stallstable/StallsTable";

import styles from "./marketprofile.module.css";

const MarketProfile = props => {
  const marketObj = {
    marketname: "Vendme Market",
    marketaddress: {
      street: "123 MyMarket St",
      state: "North, State 12345"
    },
    markethours: "9am-4:30pm",
    availableStalls: [
      {
        quantity: 1,
        width: 20,
        length: 189
      },
      {
        quantity: 3,
        width: 30,
        length: 89
      },
      {
        quantity: 5,
        width: 120,
        length: 109
      }
    ]
  };

  return (
    <div>
      <div className={styles.marketcard}>
         <img src={props.profileImage} alt="Market Logo" className={styles.profimg} />
         <ul className={styles.marketinfo}>
           <h3>{marketObj.marketname}</h3>
           <li>{marketObj.marketaddress.street}</li>
           <li>{marketObj.marketaddress.state}</li>
           <li>{marketObj.markethours}</li>
         </ul>
      </div>
      <div className={styles.availinfo}>
        <h3>Available Stalls</h3>
        <StallsTable stalls={marketObj.availableStalls}/>
      </div>
    </div>
  );
}

export default MarketProfile
