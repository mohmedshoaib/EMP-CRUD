import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import { FormControl } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { editUser, getUser } from "../service/api";
import { useState } from "react";

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#0A6EBD",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

// const defaultValue2 = {
//     status: "",
// }

// const SwitchButton = () => {
//     const [status, setStatus] = useState(defaultValue2)
//     const getUserStatus = (val) => {
//         setStatus(val)
//         editStatus(val, id)
//     }
//     const ActiveSwitches = (
//             <FormControl >
//             <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked onClick={() => getUserStatus(0)}/>} />
//             </FormControl>
//         ); 
//     const DeActiveSwitches = (
//             <FormControl>
//             <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} onclick={() => getUserStatus(1)}/>} />
//             </FormControl>
//         );    
//     return(
//         <div></div>
//     )
// }

// export const ActiveSwitches = (
//     <FormControl >
//     <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked onClick={() => editUserStatus(0)}/>} />
//     </FormControl>
// );

// export const DeActiveSwitches = (
//     <FormControl>
//     <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} onclick={() => editUserStatus(1)}/>} />
//     </FormControl>
// );
