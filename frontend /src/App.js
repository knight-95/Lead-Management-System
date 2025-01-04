import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import AdminLayout from './layouts/admin';

import initialTheme from './theme/theme'; //  { themeGreen }
// Chakra imports

export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route
          path="admin/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ChakraProvider>
  );
}
