import { Row, Col, Card, Table, message, Typography } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useEffect } from "react";
import { getReservations } from "../Services";

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
    title: "Phone",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "Reservation Date",
    key: "res_date",
    dataIndex: "res_date",
  },
  {
    title: "Reservation Time",
    key: "res_time",
    dataIndex: "res_time",
  },
  {
    title: "No. of guests",
    key: "guests",
    dataIndex: "guests",
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
          <Title level={5}>Name</Title>
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

    res_date: (
      <>
        <div className="ant-employed">
          <span>07-07-22</span>
        </div>
      </>
    ),
    res_time: (
      <>
        <div className="ant-employed">
          <span>4:30 p.m.</span>
        </div>
      </>
    ),
    guests: (
      <>
        <div className="ant-employed">
          <span>2</span>
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
    ),
  },
];

const Reservation = () => {
  useEffect(() => {
    fetchReservationData();
  }, []);
  const fetchReservationData = () => {
    getReservations().then((response) => {
      console.log("Reservation data", response);
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
              title="Reservation Table"
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

export default Reservation;
