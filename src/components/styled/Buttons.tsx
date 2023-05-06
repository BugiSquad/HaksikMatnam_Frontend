import {styled} from "@mui/system";
import {Button, IconButton} from "@mui/material";

export const OrangeButton = styled(Button)({
    margin: "5px",
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FE724C',
    fontWeight: "bold",
    color: "white",
    borderRadius: "2rem",
    padding: "0.5rem",
})
export const OrangeCircleButton = styled(IconButton)({
    background: "#FE724C"
})