// Mui css
import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";

// 버튼 스타일
const blueBase = "#003C84";
const blueMain = alpha(blueBase, 0.8);

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: blueMain,
            light: alpha(blueBase, 0.5),
            dark: alpha(blueBase, 0.9),
            contrastText:
                getContrastRatio(blueMain, "#fff") > 4.5 ? "#fff" : "#111",
        },
    },
});

export default buttonTheme;
