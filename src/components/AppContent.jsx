import React from 'react'
import { routes } from '../routes'
import { Route, Routes } from 'react-router-dom'
//Reemplazar la landing por otro componente 
export default function Appcontent() {
  return (
    <div className='w-full flex flex-col gap-10 px-5 my-10' style={{ maxWidth: "calc(100% - 70px)", overflow: 'auto', height: 'calc(100vh - 140px)' }}>
      <Routes>
        {
          routes
            .filter(route => route.element && route.element.name !== 'LandingPage')
            .map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={<route.element />}
              />
            ))
        }
        {/* <Route path={'/'} element={<Dashboard />} /> */}
      </Routes>
    </div>
  )
}
