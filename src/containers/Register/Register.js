import React from 'react';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';

import Button from "../../components/Form/Button";

import Session from '../../models/Session';

import { compose } from '../../utils/Compose';
import withSession from '../../hocs/withSession';
import { withRouter, useHistory } from 'react-router';

function Register({ userLogin }) {
  const history = useHistory();
  
  const handleSubmit = value => {
    const { name, lastname } = value;
    
    // Genero sesión y la guardo en LS 
    userLogin(new Session(name, lastname));


    history.push('list')
  };

  return (
    <div className="row justify-content-md-center mt-3">
        <div className="col-md-4 col-sm-12">

        <Form
          initialValue={{ name: '', lastname: '' }}
          validate={({ name, lastname }) => {
            if (!name || !lastname) {
              return 'Rellene todos los campos del formulario';
            }
          }}
          onSubmit={handleSubmit}
          onError={error =>
            <small id="nameHelp" className="form-text text-danger">`${error}`</small>
          }
        >
          <div className="form-group">
            <Input
              name="name"
              type="text"
              placeholder="type your name"
              className="form-control"
              autoComplete="username"
              
            />
            
          </div>
          <div className="form-group">
            <Input
              name="lastname"
              type="text"
              placeholder="type your lastname"
              className="form-control"
            
            />

          </div>
          
          <Button className="btn btn-primary disabled" buttonText="Submit" />
        </Form>
        </div>

    </div>
  );
}
export default compose(withSession)(withRouter(Register));