import React from "react";
import Router from "./Router/Router";
import styled from "@emotion/styled";

function App() {
  return (
    <AppContainer>
      <Router />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 0;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

export default App;
