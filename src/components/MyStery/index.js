import React from "react";
import { MySteryContainer } from "./styles";
import MySteryBoxImage from '../../assets/images/MySteryBox.png';

export const MyStery = () => {

  return (
    <MySteryContainer>
      <div className="mystery-image">
        <img src={MySteryBoxImage} alt='myStery-img' /> 
      </div>
      <div className="coming-soon-text">COMING SOON</div>
      <div className="mystery-text">MyStery Box</div>
    </MySteryContainer>
  );
};