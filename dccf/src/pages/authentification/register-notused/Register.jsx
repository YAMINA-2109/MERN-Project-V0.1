import { useState } from "react";
import upload from "../../../utils/Upload";
import newRequest from "../../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import './Register.scss';
import ''

const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    name: "",
    prénom: "",
    email: "",
    password: "",
    photo: "",
    pays: "",
    isSeller: false,
    bio: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/register", {
        ...user,
        photo: url,
      });
      console.log(user);
      navigate("/login")
    } catch (err) {
      console.log(user);
      console.log(err);
    }
  };
  return (
    <div className="all">
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Créer un nouveau compte</h1>
          <label htmlFor="">Nom</label>
          <input
            name="name"
            type="text"
            placeholder="Nom"
            onChange={handleChange}
          />
          <label htmlFor="">Prénom</label>
          <input
            name="prénom"
            type="text"
            placeholder="Prénom"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Mot de passe</label>
          <input name="password" type="password" placeholder="password" onChange={handleChange} />
          <label htmlFor="">Photo de profil</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Pays</label>
          <input
            name="pays"
            type="text"
            placeholder="Algérie"
            onChange={handleChange}
          />
                <button type="submit">S&apos;inscrire</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Numéro de téléphone</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="Une brève description de vous-même"
            name="bio"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  </div>

  )
}

export default Register
