import React from "react";

import Providers from "@features/Providers";
import Routes from "@routing/Routes";

const App: React.FC = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default App;
