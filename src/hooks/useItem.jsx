import { useContext } from "react";
import { ItemContext } from "../contexts/ItemContext.jsx";

const useItem = () => useContext(ItemContext);

export default useItem;
