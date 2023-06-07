import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  LoginRequest,
  selectToken,
  setCredentials,
  selectLoading,
  selectError,
} from './authSlice';

export function Auth() {
  const token = useAppSelector(selectToken);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<LoginRequest>({
    email: '',
    token: '',
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    dispatch(setCredentials(formState));
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Your email</span>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter email"
            />
          </label>
          <label>
            <span>Your token</span>
            <input
              type="text"
              name="token"
              onChange={handleChange}
              placeholder="Token"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
      <div className="form-instructions">
        <h4>Please fill both email and token</h4>
        <p>
          In order to the get token please click{' '}
          <a
            href="https://newsapi.org/register"
            className="link"
            target="_blank"
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
}
