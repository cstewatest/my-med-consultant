import React from "react";
import Breadcrumbs from './Breadcrumbs'

const MedicalInfo = (props) => {
  if (props.isFething || !props.hasSubmittedMedicalInfo) {
    return null;
  }

  return (
    <Breadcrumbs itemObjs={props.itemObjs} onItemSelection={props.onItemSelection} />
  );
}

export default MedicalInfo
