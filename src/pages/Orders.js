import { useEffect, useState } from "react";
import { getOrders } from "../Services";
import { FaCheck, FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Row, Col, Table, Button, Modal, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

// table code start
const columns = [
  {
    title: "Name",
    key: "user_name",
    width: "10%",
    render: (record) => <p>{record.attributes.user_name}</p>,
  },
  {
    title: "Email",
    key: "user_email",
    render: (record) => <p>{record.attributes.user_email}</p>,
  },

  {
    title: "Order Details",
    key: "food_items",
    render: (record) => {
      return (
        <Row gutter={12} type="flex">
          {record.attributes.food_items.map((item) => {
            return (
              <>
                <Col>{item.food_item_name}</Col>
                <Col>{`$ ${item.food_item_price}`}</Col>
                <Col>{item.food_item_qty}</Col>
              </>
            );
          })}
          <Col>
            {record.attributes.food_items
              .reduce((acc, foodItem) => {
                return acc + foodItem.food_item_price * foodItem.food_item_qty;
              }, 0)
              .toFixed(2)}
          </Col>
        </Row>
      );
    },
  },

  {
    title: "Phone",
    key: "user_phone_number",
    render: (record) => <p>{record.attributes.user_phone_number}</p>,
  },
  {
    title: "Status",
    key: "status",
    render: (record) => <p>{record.attributes.status}</p>,
  },
  {
    title: "Actions",
    key: "action",
    render: (record) => {
      return (
        <div>
          <span>
            <a
              href="#"
              size="small"
              type="link"
              style={{ marginRight: "5px", color: "#019a16" }}
              onClick={() => handleAcceptOrders()}
            >
              <FaCheck size={18} />
            </a>
            <a
              href="#"
              size="small"
              type="link"
              onClick={() => handleRejectOrders()}
              style={{ color: "#f00" }}
            >
              <ImCross size={16} />
            </a>
          </span>
        </div>
      );
    },
  },
];
const handleAcceptOrders = () => {
  // Todo
};

const handleRejectOrders = () => {
  // todo
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // fetch the orders
  const fetchOrders = () => {
    getOrders().then((response) => {
      console.log(response);
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const orderList = response.data.data;
        setOrders(orderList);
      }
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
            <Row justify="space-between" align="center">
              <Col>
                <h2>Orders Table</h2>
              </Col>
              <Col>
                <Button type="primary" size="small">
                  <FaPlus type="plus" />
                  Add orders
                </Button>

                <Modal title="Add food category" okText="Save">
                  <Form>
                    <Form.Item>
                      <Input size="small" placeholder="Food item name" />
                    </Form.Item>
                    <Form.Item>
                      <TextArea
                        size="small"
                        placeholder="Description..."
                        rows={3}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Input size="small" placeholder="Price" />
                    </Form.Item>
                  </Form>
                </Modal>
              </Col>
            </Row>
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={orders}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Orders;
