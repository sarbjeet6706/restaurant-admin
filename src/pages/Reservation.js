import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { getReservations } from "../Services";
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
    title: "Phone",
    key: "user_phone_number",
    render: (record) => <p>{record.attributes.user_phone_number}</p>,
  },
  {
    title: "Reservation Date",
    key: "reservation_date",
    render: (record) => <p>{record.attributes.reservation_date}</p>,
  },
  {
    title: "Reservation Time",
    key: "reservation_time",
    render: (record) => <p>{record.attributes.reservation_time}</p>,
  },
  {
    title: "No. of guests",
    key: "no_of_guests",
    render: (record) => <p>{record.attributes.no_of_guests}</p>,
  },
  {
    title: "Status",
    key: "order_status",
    render: (record) => <p>{record.attributes.order_status}</p>,
  },
  {
    title: "Actions",
    key: "action",
    render: (record) => {
      return (
        <>
          <a href="#">
            <MdModeEdit size={18} />
          </a>
          <a style={{ marginLeft: "5px", color: "#f00" }} href="#">
            <FaTrashAlt size={16} />
          </a>
        </>
      );
    },
  },
];
const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservationData();
  }, []);

  //fetch the data from the api
  const fetchReservationData = () => {
    getReservations().then((res) => {
      console.log(res);
      if (res && res.data && res.data.data && res.data.data.length > 0) {
        const reservationData = res.data.data;
        setReservations(reservationData);
      }
    });
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Row justify="space-between" align="center">
              <Col>
                <h2>Reservation Table</h2>
              </Col>
              <Col>
                <Button type="primary" size="small">
                  <FaPlus type="plus" />
                  Add reservations
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
                dataSource={reservations}
                pagination={false}
                className="ant-border-space mt-10"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Reservation;
