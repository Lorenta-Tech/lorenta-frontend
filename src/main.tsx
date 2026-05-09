import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <GoogleOAuthProvider
      clientId="602004007690-jl93hoimj9uvqfg4d4b4i3o30qeeerl8.apps.googleusercontent.com"
    >

      <AuthProvider>

        <App />

      </AuthProvider>

    </GoogleOAuthProvider>

  </StrictMode>,
)