import { Row, Col, Card, Table } from "antd";

import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useEffect } from "react";
import { getFoodItems } from "../Services";

const Home = () => {
  // table code start
  const columns = [
    {
      title: "Food Item Name",
      dataIndex: "item_name",
      key: "item_name",
      width: "32%",
    },
    {
      title: "Food Item Description",
      dataIndex: "item_desc",
      key: "item_desc",
    },

    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Actions",
      key: "action",
      dataIndex: "action",
    },
  ];

  const data = [
    {
      key: "1",
      item_name: (
        <>
          <div>
            <span>Chinese</span>
          </div>
        </>
      ),
      item_desc: (
        <>
          <div>
            <span>This is the best quality of the food</span>
          </div>
        </>
      ),

      price: (
        <>
          <div>
            <span>07-07-22</span>
          </div>
        </>
      ),
      action: (
        <>
          <div>
            <span>
              <span>
                <a style={{ marginRight: "5px" }} href="#">
                  <MdModeEdit size={18} />
                </a>
                <a style={{ marginLeft: "5px" }} href="#">
                  <FaTrashAlt size={18} />
                </a>
              </span>
            </span>
          </div>
        </>
      ),
    },
  ];
  // project table start

  useEffect(() => {
    fetchMenuData();
  }, []);
  const fetchMenuData = () => {
    getFoodItems().then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Menu Table"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
