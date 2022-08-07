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
  notification,
} from "antd";

import confirm from "antd/lib/modal/confirm";
import { DownOutlined } from "@ant-design/icons";
import OrderDetailsModal from "./OrderDetailModal";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [perPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

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
      title: "Phone",
      key: "user_phone_number",
      render: (record) => <p>{record.attributes.user_phone_number}</p>,
    },
    {
      title: "Order Date",
      key: "created_at",
      render: (record) => (
        <p>
          {moment(record.attributes.createdAt).format("D MMM YY - hh:mm a")}
        </p>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record) => <p>{record.attributes.status}</p>,
    },
    {
      title: "Details",
      key: "details",
      render: (record) => (
        <div>
          <a href="#" onClick={(e) => handleViewDetails(e, record)}>
            View Details
          </a>
        </div>
      ),
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
          notification.success({
            message: "Success",
            description: "Order status has been confirmed successfully!",
          });

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
              notification.success({
                message: "Success",
                description: "Order has been removed successfully!",
              });

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

  const handleViewDetails = (e, record) => {
    if (e) e.preventDefault();
    setFoodItems(record.attributes.food_items);
    setTimeout(() => {
      setShowModal(true);
    }, 200);
  };

  const handleRefreshOrders = () => {
    setPageNumber(1);
    fetchOrders(1);
  };

  return (
    <>
      <div className="tabled">
        <Row type="flex" justify="end">
          <Col>
            <Button type="primary" onClick={handleRefreshOrders}>
              Refresh orders
            </Button>
          </Col>
        </Row>
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
        {showModal && (
          <OrderDetailsModal
            showModal={showModal}
            setShowModal={setShowModal}
            foodItems={foodItems}
          />
        )}
      </div>
    </>
  );
};

export default Orders;
