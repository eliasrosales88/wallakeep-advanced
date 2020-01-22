import React from 'react';
import Form from '../../components/Form/FormR';
import Input from '../../components/Form/InputR';

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
    <div>
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
            <Input
              name="name"
              type="text"
              placeholder="type your name"
              autoComplete="username"
              
            />
            <Input
              name="lastname"
              type="text"
              placeholder="type your lastname"
            
            />
          
          <Button className="btn btn-primary disabled" buttonText="Submit" />
        </Form>
    </div>
  );
}
export default compose(withSession)(withRouter(Register));