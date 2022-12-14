import {useContext} from "react";
import AppContext from "../context/appContext";

const useAppData = () => useContext(AppContext);

export default useAppData;