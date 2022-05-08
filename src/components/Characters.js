import React, { useEffect, useState, useRef } from "react";
import { Button, Card, List, Input, Table, Tag, Space, Modal, Descriptions } from "antd";
import { API_BASE_CHARACTERS } from "../config/EnvironmentConfig";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import CharacterDetail from "./CharacterDetail";
import "./Characters.css"

function Characters() {
  const { Meta } = Card;
  const { Search } = Input;
  const [characters, SetCharacters] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [pageSize, setPageSize] = useState("20");
  const [totalCharacterNumbers, setTotalCharacterNumbers] = useState();
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch(API_BASE_CHARACTERS)
      .then((response) => response.json())
      .then((data) => {
        SetCharacters(data.results);
        setTotalCharacterNumbers(data.info.count);
        setPageNumber(data.info.pages);
      });
  }, []);

  var searchInput = useRef();
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  function onPaginationChange(current, pageSize, filters) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${current}`)
      .then((data) => data.json())
      .then((response) => {
        SetCharacters(response.results);
        setPageSize(pageSize);
      });
  }
  function onTableChange(pagination, filters) {
    let url = `${API_BASE_CHARACTERS}/?`;
    if (filters.gender) {
      url += `&gender=${filters.gender[0]}`;
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          setTotalCharacterNumbers(data.info.count);
          setPageNumber(data.info.pages);
          SetCharacters(data.results);
          setPageSize(pagination.pageSize);
        });
    }
    if (filters.status) {
      url += `&status=${filters.status[0]}`;
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          setTotalCharacterNumbers(data.info.count);
          setPageNumber(data.info.pages);
          SetCharacters(data.results);
          setPageSize(pagination.pageSize);
        });
    }
    if (filters.name) {
      url += `&name=${filters.name[0]}`;
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          setTotalCharacterNumbers(data.info.count);
          setPageNumber(data.info.pages);
          SetCharacters(data.results);
          setPageSize(pagination.pageSize);
        });
    }
  }

  const [character, SetCharacter] = useState();
  const showModal = (characterId) => {
    setIsModalVisible(true);
    fetch(`${API_BASE_CHARACTERS}/${characterId}`)
      .then((response) => response.json())
      .then((data) => {
        SetCharacter(data);
        console.log(data);
      });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
        { text: "unknown", value: "unknown" },
      ],
      onFilter: (value, record) => record.gender.includes(value),
    },
    {
      title: "Origin",
      dataIndex: ["origin", "name"],
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Alive", value: "Alive" },
        { text: "Dead", value: "Dead" },
        { text: "unknown", value: "unknown" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status, row) => (
        <>
          <Tag
            color={
              status === "Alive"
                ? "geekblue"
                : status === "Dead"
                ? "volcano"
                : "green"
            }
            key={status}
          >
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Species",
      dataIndex: "species",
      key: "species",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* <Link to={`/characters/${text.id}`}> */}
          <Button onClick={() => showModal(record.id)} type="primary">
            Details Page{" "}
          </Button>
          {/* </Link> */}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        </div>
      <Modal
        title={character?.name}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Card
          hoverable
          style={{ width: 480, height: 600 }}
          cover={<img alt="example" src={character?.image} />}
        >
          <Meta  />
          <Tag color="volcano">{character?.status}</Tag>
          <Tag color="magenta">{character?.species}</Tag>
          <Tag color="geekblue">{character?.gender}</Tag>
          <Descriptions >
          <Descriptions.Item label="Episode Attendance">{character?.episode.length}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Modal>
      <Table
       title={()=>(<h3 className="charactersTitle" >Characters List</h3>)}
        columns={columns}
        dataSource={characters}
        onChange={onTableChange}
        rowKey="id"
        pagination={{
          total: totalCharacterNumbers,
          showSizeChanger: true,
          onChange: onPaginationChange,
          pageSize: pageSize,
          pageSizeOptions: ["10", "20", "30", "40"],
        }}
      />
    </div>
  );
}

export default Characters;
