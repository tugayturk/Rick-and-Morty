import Episodes from "./components/Episodes";
import Characters from "./components/Characters";
import HomePage from "./components/HomePage";
import EpisodeDetails from "./components/EpisodeDetails";
import CharacterDetail from "./components/CharacterDetail";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { useParams } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function App() {
 
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
        >
          <Menu.Item key="/">
            <a rel="noopener noreferrer" href="http://localhost:3000/">
              Home Page
            </a>
          </Menu.Item>
          <Menu.Item key="/episodes">
            <a rel="noopener noreferrer" href="http://localhost:3000/episodes">
              Episodes
            </a>
          </Menu.Item>
          <Menu.Item key="/characters">
            <a
              rel="noopener noreferrer"
              href="http://localhost:3000/characters"
            >
              Characters
            </a>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Router>
            <Routes>
              <Route exact path="/" element={<HomePage />}></Route>
              <Route path="/episodes" element={<Episodes />}></Route>
              <Route
                path="/episodes/:episodeId"
                element={<EpisodeDetails />}
              ></Route>
              <Route path="/characters" element={<Characters />}></Route>
              <Route
                path="/characters/:characterId"
                element={<CharacterDetail />}
              ></Route>
            </Routes>
          </Router>
        </div>
      </Content>
      {/* <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer> */}
    </Layout>
  );
}

export default App;
