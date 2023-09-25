import { Provider } from "react-redux";
import "./App.css";
import { SearchBar } from "./Component/Searchbar/SearchBar";
import { Wallpaper } from "./Component/Wallpaper/Wallpaper";
import { Weather } from "./Component/Wheather/wheather";
import store from "./Store/Store";
import { motion } from "framer-motion";

function App() {
  return (
    <>
      <Wallpaper />
      <motion.div
        className="container"
        initial={{
          x: "100vw",
        }}
        animate={{ x: 0 
        }}
        transition={{
          delay: 1,
          duration: 1,
        }}
      >
        <Provider store={store}>
          <SearchBar />
          <Weather />
        </Provider>
      </motion.div>
    </>
  );
}

export default App;
