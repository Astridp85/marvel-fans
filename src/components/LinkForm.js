import React, { useState } from "react";

const LinkForm = () => {


    const valueInitial = {
        nombreUsuario: '',
        identificacion: '',
        email: ''
    }
    const [values, setValues] = useState(valueInitial);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values,[name]:value})
       
    };

    const solveSubmit = e => {
        e.preventDefault();
        console.log(values);
    }


    return (
        <form className="card card-body" onSubmit={solveSubmit}>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">perm_identity</i>
                </div>
                <input
                    type="text"
                    className="form-control "
                    placeholder="Nombre de usuario"
                    name="nombre"
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    type="number"
                    className="form-control "
                    placeholder="Identificación"
                    name="identificacion"
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">mail</i>
                </div>
                <input
                    type="email"
                    className="form-control "
                    placeholder="Correo electrónico"
                    name="correo"
                    onChange={handleInputChange}
                />
            </div>

            <button className="btn btn-primary btn-block">
                Unirme
            </button>



        </form>
    )
}
export default LinkForm;