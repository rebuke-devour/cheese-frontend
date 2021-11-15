import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
    const [cheeses, setCheese] = useState(null);
    const URL = "https://jt-cheese-backend.herokuapp.com/cheese/";
    
    const getCheese = async ()=> {
        const response = await fetch(URL);
        const data = await response.json()
        setCheese(data);
    };

    const createCheese = async (cheese) => {
        await fetch(URL,{
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cheese),
        });
        getCheese();
    };

    const updateCheese = async (cheese, id) => {
        // make post request to create people
        await fetch(URL + id, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cheese),
        });
        // update list of people
        getCheese();
      };
    

    const deleteCheeses = async (id) => {
        // make post request to create people
        await fetch(URL + id, {
          method: "delete",
        });
        // update list of people
        getCheese();
      };
    

    useEffect(()=> getCheese(), []);


    return (
        <main>
        <Routes>
          <Route path="/" element={
            <Index cheeses={cheeses} 
              createCheeses={createCheese}
            />
          }/>
          <Route path="/cheeses/:id" element={
            <Show 
            cheeses={cheeses} 
            updateCheeses={updateCheese} 
            deleteCheeses={deleteCheeses}
            />
          }/>
        </Routes>
      </main>
    );
  
}

export default Main;