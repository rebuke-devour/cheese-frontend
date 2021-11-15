import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"



function Show(props) {
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id;
    const cheeses = props.cheeses;
    const cheese = cheeses.find((p) => p._id === id);
  
  // state for form
  const [editForm, setEditForm] = useState(cheese);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

    // handlesubmit for form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.updateCheeses(editForm);
        // redirect people back to index
        navigate("/");
      };

      const removeCheese = () => {
        props.deleteCheese(cheese._id);
        navigate("/");
      };

    return (
        <div className="person">
        <h1>{cheese.name}</h1>
        <h2>{cheese.title}</h2>
        <img src={cheese.image} alt={cheese.name} />
        <button id="delete" onClick={removeCheese}>
          DELETE
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.title}
            name="title"
            placeholder="title"
            onChange={handleChange}
          />
        <input type="submit" value="Update Cheese" />
        </form>
      </div>
    );
  }
  
  export default Show