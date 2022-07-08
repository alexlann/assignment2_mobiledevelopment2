import { Navigate, Route, Routes } from "react-router-dom";
import Container from "../Design/Container/Container";
import AuthContainer from "./AuthContainer";
import AppHeader from "./Header/AppHeader";
import ColorsOverview from "./Colors/ColorsOverview";
import LikesOverview from "./Colors/LikesOverview";

function App() {
  return (
    <AuthContainer>
      <AppHeader />
      <Container>
        <Routes>
          <Route path="/colors" element={<ColorsOverview/>}/>
          <Route path="/likes" element={<LikesOverview/>}/>
          <Route path="/" element={<Navigate to="/colors"/>}/>
        </Routes>
      </Container>
    </AuthContainer>
  );
}

export default App;
