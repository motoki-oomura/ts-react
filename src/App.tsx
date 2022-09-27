import React from 'react';
import RouteGuard from "@features/Router/components/RouteGuard";
import Routes from "@features/Router/components/Routes";
import './App.css';

function App() {
  const initialized = true;
  const authenticated = true;

  const routeTypes = [
      { type: "public" },
      {
          type: "private",
          guard: (element: unknown) => <RouteGuard
              initialized={initialized}
              authenticated={authenticated}
              redirectPath={'/login'}
              element={element}
              loadingComponent={null}
          />
      },
      { type: "_demo" },
  ];

  return (
    <>
        <Routes types={routeTypes} />
    </>
  );
}

export default App;
