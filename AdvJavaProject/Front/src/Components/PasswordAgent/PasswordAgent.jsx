
import React, { useEffect, useState } from 'react';
import '../Password/Password.css'; 
import { RestPass } from '../../APICallFunction/UserFunction';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { AgentReset } from '../../APICallFunction/AgentFunction';

function AgentPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordHint, setPasswordHint] = useState('');
  const username = sessionStorage.getItem('user');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState([]);

  useEffect(()=>{
    checkUsername();
  })

  const checkUsername = ()=>{
    if(!username){
      navigate('/agent');
    }
  }

  const validatePassword = (password1) => {
    const minLength = 6;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password1);
    const hasCapitalLetter = /[A-Z]/.test(password1);
    const hasNumber = /[0-9]/.test(password1);

    if (
      password1.length >= minLength &&
      hasSpecialChar &&
      hasCapitalLetter &&
      hasNumber
    ) {
      return ''; // No errors
    }

    return 'Password must be at least 6 characters long and include at least one special character, one capital letter, and one number.';
  };

  const handleClose = ()=>{setShow(false);}
  const handleReset = async (e) => {
    e.preventDefault();

    
    const hint = validatePassword(newPassword);

    if (hint) {
      setMessage('');
      setPasswordHint(hint);
      return;
    }

    console.log('Password reset initiated with new password:', newPassword);
    setMessage('Password has been successfully reset.');
    setPasswordHint('');


    try {
      console.log(formData);
      console.log(password);
      
      const response = await AgentReset(username, formData);
      console.log(response);

      if (response.status === 200) {
        setMsg(response.data);
        setShow(true);
        // Redirect to the Password component
      } else {
        setMessage('Unable to Change.');
      }
    } catch (error) {
      setMessage('Server Error');
    }
  };

  const redirect =()=>{
    sessionStorage.clear();
    navigate('/agent')
  
   }

  return (
    <div className='background'>
      <div className="password-container">
        <h2 className="password-title">Reset Password</h2>
        <hr className="track-courier-heading-line" />
        <form className="password-form" onSubmit={handleReset}>
          <div className="password-input-group">
            <input
              type="password"
              name='password'
              className="password-input"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
                setPassword(e.target.value);
                setNewPassword(e.target.value);
                setPasswordHint(validatePassword(e.target.value));
              }}
              required
            />
            {passwordHint && (
              <p className="password-hint">
                {passwordHint}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '20px', marginLeft: '20%' }}>
            <button type="submit" className="password-submit-button">
              Reset
            </button>
            <button
              type="button"
              className="password-submit-button"
              onClick={() => window.location.href = '/customer'}
            >
              Back
            </button>
          </div>
        </form>
        {message && <p className={`password-message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      </div>
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>{msg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={redirect} style={ {width:'70px',height:'40px'}}>
                        Login
                    </Button>
                    <Button variant="danger" onClick={handleClose} style={ {width:'70px',height:'40px'}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
}

export default AgentPassword;
