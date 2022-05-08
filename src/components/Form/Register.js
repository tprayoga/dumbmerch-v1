import React, { useContext, useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../../context/userContext';

const Register = () => {
    let navigate = useNavigate();

    const title = 'Register';
    document.title = 'DumbMerch | ' + title;
  
    const [state, dispatch] = useContext(UserContext);
  
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
    });
  
    const { name, email, password } = form;
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        // Configuration Content-type
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
  
        // Data body
        const body = JSON.stringify(form);
  
        // Insert data user to database
        const response = await API.post('/register', body, config);
  
        // Notification
        if (response.data.status === 'Success') {
          const alert = (
            <Alert variant="success" className="py-1">
              Success
            </Alert>
          );
          setMessage(alert);
          setForm({
            name: '',
            email: '',
            password: '',
          });
        } else {
          const alert = (
            <Alert variant="danger" className="py-1">
              Failed
            </Alert>
          );
          setMessage(alert);
        }
      } catch (error) {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
        console.log(error);
      }
    });
  return (
    <div className="d-flex justify-content-center">
      <Card bg='dark' className="p-4">
        <div
          style={{ fontSize: '36px', lineHeight: '49px', fontWeight: '700' }}
          className="mb-2 sub-headline"
        >
          Register
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleChange}
              className="px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant='danger py-2'>
              Register
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Register
