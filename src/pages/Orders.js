import { Row, Col, Card, Table, Typography } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { getOrders } from "../Services";

const { Title } = Typography;

// table code start
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "10%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Food Items",
    key: "items",
    dataIndex: "items",
  },
  {
    title: "User Phone Number",
    key: "user_phone",
    dataIndex: "user_phone",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
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
    name: (
      <>
        <div className="avatar-info">
          <Title level={5}>Name </Title>
        </div>
      </>
    ),
    email: (
      <>
        <div className="author-info">
          <Title level={5}>support@gmail.com</Title>
        </div>
      </>
    ),

    items: (
      <>
        <div className="ant-employed">
          <span>Chinese, italian, indian</span>
        </div>
      </>
    ),
    user_phone: (
      <>
        <div className="ant-employed">
          <span>1234567890</span>
        </div>
      </>
    ),
    status: (
      <>
        <div className="ant-employed">
          <span>Pending</span>
        </div>
      </>
    ),
    action: (
      <>
        <div>
          <span>
            <a style={{ marginRight: "5px" }} href="#">
              <MdModeEdit size={18} />
            </a>
            <a style={{ marginLeft: "5px" }} href="#">
              <FaTrashAlt size={18} />
            </a>
          </span>
        </div>
      </>
    ),
  },
];

const Orders = () => {
  // fetch the orders
  const fetchOrders = () => {
    getOrders().then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Orders Table"
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

export default Orders;
