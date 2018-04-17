import { createStore } from "redux";

const POTENTIAL_BODY_LOCATIONS = [
  {
    ID: 16,
    Name: "Abdomen, pelvis & buttocks"
  },
  {
    ID: 7,
    Name: "Arms & shoulder"
  },
  {
    ID: 15,
    Name: "Chest & back"
  },
  {
    ID: 6,
    Name: "Head, throat & neck"
  },
  {
    ID: 10,
    Name: "Legs"
  },
  {
    ID: 17,
    Name: "Skin, joints & general"
  }
];

export const redFlagIDs = [ 
  17, 29, 31, 43, 57, 66, 98, 128, 144, 181, 207, 233, 241, 287, 972, 984, 986, 988, 991 
]

export const redFlagIDsNames = {
  17: "Chest pain", 
  29: "Shortness of breath", 
  31: "Chest tightness",
  43: "Drowsiness", 
  57: "Going black before the eyes", 
  66: "Visual field loss", 
  98: "Difficulty in speaking", 
  128: "Disorientation regarding time or place", 
  144: "Unconsciousness, short", 
  181: "Vomiting blood", 
  207: "Dizziness", 
  233: "Bloody cough", 
  241: "Sleepiness with spontaneous falling asleep", 
  287: "Eye pain", 
  972: "Weakness or numbness on right or left side of body", 
  984: "Absence of a pulse", 
  986: "Irregular heartbeat", 
  988: "Trouble understanding speech", 
  991: "Blue colored skin"
}

const formattedSymptomIDsNames = {
  188: "Pain when pressing on abdomen", 
  228: "Cough with sputum (mucus)",
  989: "Distended (swollen) abdomen",
  92: "Early satiety (feeling full after a small amount of food)",
  194: "Joint effusion (fluid in or around a joint)",
  37: "Palpitations (fast, strong or irregular heartbeat)",
  34: "Skin wheal (skin patch that's elevated, discolored & often itches)",
  64: "Sputum (mucus/phlegm)",
  144: "Brief unconsciousness or fainting", 
  191: "Pain when removing pressure that has been applied to the abdomen"
}

export const noneOption = {
  ID: -1,
  Name: "None"
};

const DEFAULT_MEDICAL_INFO = {
  BODY_LOCATION: {
    potential: POTENTIAL_BODY_LOCATIONS,
    selected: [],
    selectedNames: []
  }
};

export const prompts = {
  BODY_LOCATION: "Which part of your body hurts?",
  BODY_SUBLOCATION: "Specifically, which of these body parts hurt?",
  SUBLOCATION_SYMPTOMS: "Which of these symptoms are you having?",
  ADDITIONAL_SYMPTOMS: "Are you having any additional symptoms?",
  DIAGNOSES: "POTENTIAL DIAGNOSES"
};

export const actionTypes = {
  PERSONAL_DATA_CHANGE: "PERSONAL_DATA_CHANGE",
  OPTIONS_SUBMITTED: "OPTIONS_SUBMITTED",
  REQUEST_COMPLETED: "REQUEST_COMPLETED",
  REQUEST_FAILED: "REQUEST_FAILED",
  PREVIOUS_STAGE_SELECTED: "PREVIOUS_STAGE_SELECTED"
};

export const stages = {
  PERSONAL_DATA: "PERSONAL_DATA",
  BODY_LOCATION: "BODY_LOCATION",
  BODY_SUBLOCATION: "BODY_SUBLOCATION",
  SUBLOCATION_SYMPTOMS: "SUBLOCATION_SYMPTOMS",
  ADDITIONAL_SYMPTOMS: "ADDITIONAL_SYMPTOMS",
  DIAGNOSES: "DIAGNOSES",
  REQUEST_FAILED: "REQUEST_FAILED"
};

export const stagesKeys = [
  "PERSONAL_DATA",
  "BODY_LOCATION",
  "BODY_SUBLOCATION",
  "SUBLOCATION_SYMPTOMS",
  "ADDITIONAL_SYMPTOMS",
  "DIAGNOSES",
  "REQUEST_FAILED"
];

const initialState = {
  gender: undefined,
  birthYear: undefined,
  isFetching: false,
  stage: stages.PERSONAL_DATA,
  medicalInfo: DEFAULT_MEDICAL_INFO
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PERSONAL_DATA_CHANGE: {
      return {
        ...state,
        gender: payload.gender,
        birthYear: payload.birthYear,
        stage: stages.BODY_LOCATION
      };
    }
    case actionTypes.OPTIONS_SUBMITTED: {
      const medicalInfo = state.medicalInfo;
      medicalInfo[state.stage].selected = payload.selected;
      medicalInfo[state.stage].selectedNames = medicalInfo[
        state.stage
      ].potential
        .filter(o => {
          return payload.selected.includes(o.ID);
        })
        .map(o => {
          return o.Name;
        });
      return {
        ...state,
        isFetching: true,
        medicalInfo: medicalInfo
      };
    }
    case actionTypes.REQUEST_COMPLETED: {
      const medicalInfo = state.medicalInfo;
      const nextStageIndex = stagesKeys.indexOf(state.stage) + 1;
      const nextStage = stagesKeys[nextStageIndex];
      let potential = payload.potential;
      if (nextStage == stages.ADDITIONAL_SYMPTOMS) {
        potential.push(noneOption);
      }
      if (nextStage == stages.ADDITIONAL_SYMPTOMS || nextStage == stages.SUBLOCATION_SYMPTOMS) {
        potential = potential.map(symptomObj =>{
          if (formattedSymptomIDsNames[symptomObj.ID]) {
            symptomObj['Name'] = formattedSymptomIDsNames[symptomObj.ID]
          }
          return(symptomObj)
        })
      }
      medicalInfo[nextStage] = { potential: potential, selected: [] };
      return {
        ...state,
        isFetching: false,
        stage: nextStage,
        medicalInfo: medicalInfo
      };
    }
    case actionTypes.REQUEST_FAILED: {
      return {
        ...state,
        isFetching: false,
        stage: stages.REQUEST_FAILED
      };
    }
    case actionTypes.PREVIOUS_STAGE_SELECTED: {
      const { prevStage } = payload;
      const lastIndex = stagesKeys.indexOf(prevStage) + 1;
      const medicalInfoKeys = stagesKeys.slice(1, lastIndex);
      const medicalInfo = Object.assign({}, state.medicalInfo);
      for (const k of Object.keys(medicalInfo)) {
        if (!medicalInfoKeys.includes(k)) {
          delete medicalInfo[k];
        }
      }
      return {
        ...state,
        stage: prevStage,
        medicalInfo: medicalInfo
      };
    }
  }

  return state;
};
export const store = createStore(reducer);
