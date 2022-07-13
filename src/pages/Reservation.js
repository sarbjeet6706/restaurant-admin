import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import React, { useState, useEffect } from "react";
import {
  deleteReservation,
  getReservations,
  updateReservation,
} from "../Services";
import {
  Row,
  Col,
  Table,
  Button,
  Spin,
  Pagination,
  Space,
  Dropdown,
  Menu,
} from "antd";
import { toast } from "react-toastify";
import confirm from "antd/lib/modal/confirm";
import { DownOutlined } from "@ant-design/icons";

const Reservation = () => {
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
      width: "10%",
      render: (record) => <p>{record.attributes.user_email}</p>,
    },

    {
      title: "Phone",
      key: "user_phone_number",
      width: "10%",
      render: (record) => <p>{record.attributes.user_phone_number}</p>,
    },
    {
      title: "Reservation Date",
      key: "reservation_date",
      width: "10%",
      render: (record) => <p>{record.attributes.reservation_date}</p>,
    },
    {
      title: "Reservation Time",
      key: "reservation_time",
      width: "10%",
      render: (record) => <p>{record.attributes.reservation_time}</p>,
    },
    {
      title: "Guests",
      key: "no_of_guests",
      width: "10%",
      render: (record) => <p>{record.attributes.no_of_guests}</p>,
    },
    {
      title: "Status",
      key: "order_status",
      width: "10%",
      render: (record) => <p>{record.attributes.order_status}</p>,
    },
    {
      title: "Actions",
      key: "action",
      width: "10%",
      render: (record) => {
        return (
          <>
            <Dropdown overlay={() => menu(record)} trigger={["click"]}>
              <Button className="ant-dropdown-link" type="primary">
                <Space>
                  Actions <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </>
        );
      },
    },
  ];

  const menu = (record) => {
    return (
      <Menu onClick={(key) => handleReservationAction(key, record)}>
        <Menu.Item key="accept">
          <a href="#">Accept</a>
        </Menu.Item>
        <Menu.Item key="reject">
          <a href="#">Reject</a>
        </Menu.Item>
      </Menu>
    );
  };

  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [perPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  // function to update and delete the record
  const handleReservationAction = (event, record) => {
    if (event.key === "accept") {
      const param = {
        data: {
          order_status: "confirmed",
        },
      };
      updateReservation(record.id, param).then((res) => {
        if (res.data) {
          toast.success("Order status has been confirmed successfully!");
          fetchReservationData(pageNo);
        }
      });
    }

    if (event.key === "reject") {
      confirm({
        title: "Are you sure you want to reject this record?",
        onOk() {
          deleteReservation(record.id).then((res) => {
            if (res.data) {
              toast.success("Order has been removed from your table!");
              fetchReservationData(pageNo);
            }
          });
        },
        onCancel() {},
      });
    }
  };
  // lifecycle method
  useEffect(() => {
    fetchReservationData(pageNo);
  }, []);

  //fetch the data from the api
  const fetchReservationData = (currPage) => {
    setIsLoading(true);
    getReservations(currPage, perPage)
      .then((res) => {
        if (res && res.data && res.data.data && res.data.data.length > 0) {
          const reservationData = res.data.data;
          setTotalRecords(res.data.meta.pagination.total);
          setReservations(reservationData);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onPageChange = (pageNo) => {
    setPageNo(pageNo);
    fetchReservationData(pageNo);
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
                  dataSource={reservations}
                  pagination={false}
                  className="ant-border-space mt-10"
                />
                <Row type="flex" align="end" className="mt-10 mb-20">
                  <Col>
                    {totalRecords > 10 && (
                      <Pagination
                        current={pageNo}
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

export default Reservation;
