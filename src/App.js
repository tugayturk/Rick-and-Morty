import Episodes from "./components/Episodes";
import Characters from "./components/Characters";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

function App() {
  const items = ["HomePage", "Episodes", "Characters"];
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items.map((item, index) => ({
            key: String(index + 1),
            label: item,
          }))}
        />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Router>
            <Routes>
              <Route exact path="/" element={<HomePage />}></Route>
              <Route path="/episodes" element={<Episodes />}></Route>
              <Route path="/characters" element={<Characters />}></Route>
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
