/*import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') === 'true';

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;*/

import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';
import type { Session } from '@supabase/supabase-js';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return session ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

