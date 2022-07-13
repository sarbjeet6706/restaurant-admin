import { useEffect, useState } from "react";
import { deleteOrder, getOrders, updateOrder } from "../Services";
import {
  Row,
  Col,
  Table,
  Spin,
  Pagination,
  Menu,
  Dropdown,
  Button,
  Space,
} from "antd";
import { toast } from "react-toastify";
import confirm from "antd/lib/modal/confirm";
import { DownOutlined } from "@ant-design/icons";

const Orders = () => {
  // function to accept or reject the order
  const handleOrderAction = (event, record) => {
    if (event.key === "accept") {
      const param = {
        data: {
          status: "confirmed",
        },
      };
      updateOrder(record.id, param).then((res) => {
        if (res.data) {
          toast.success("Order status has been confirmed successfully!");
          fetchOrders(pageNumber);
        }
      });
    }

    if (event.key === "reject") {
      confirm({
        title: "Are you sure you want to reject this record?",
        onOk() {
          deleteOrder(record.id).then((res) => {
            if (res.data) {
              toast.success("Order has been removed from your table!");
              fetchOrders(pageNumber);
            }
          });
        },
        onCancel() {},
      });
    }
  };

  const menu = (record) => {
    return (
      <Menu onClick={(key) => handleOrderAction(key, record)}>
        <Menu.Item key="accept">
          <a href="#">Accept</a>
        </Menu.Item>
        <Menu.Item key="reject">
          <a href="#">Reject</a>
        </Menu.Item>
      </Menu>
    );
  };

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
                  return (
                    acc + foodItem.food_item_price * foodItem.food_item_qty
                  );
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
              <Dropdown overlay={() => menu(record)} trigger={["click"]}>
                <Button className="ant-dropdown-link" type="primary">
                  <Space>
                    Actions <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </span>
          </div>
        );
      },
    },
  ];

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [perPage] = useState(10);

  // fetch the orders
  const fetchOrders = (currPage) => {
    setIsLoading(true);
    getOrders(currPage, perPage)
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const orderList = response.data.data;
          setOrders(orderList);
          setTotalRecords(response.data.meta.pagination.total);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders(pageNumber);
  }, []);

  const onPageChange = (pageNumber) => {
    setPageNumber(pageNumber);
    fetchOrders(pageNumber);
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <div className="table-responsive">
              <Spin spinning={isLoading}>
                <Table
                  columns={columns}
                  dataSource={orders}
                  pagination={false}
                  className="ant-border-space mt-10"
                />
                <Row type="flex" align="end" className="mt-10 mb-20">
                  <Col>
                    {totalRecords > 10 && (
                      <Pagination
                        current={pageNumber}
                        pageSize={perPage}
                        total={totalRecords}
                        onChange={onPageChange}
                        responsive={true}
                        showTotal={(totalRecords) => `${totalRecords} results`}
                      />
                    )}
                  </Col>
                </Row>
              </Spin>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Orders;
