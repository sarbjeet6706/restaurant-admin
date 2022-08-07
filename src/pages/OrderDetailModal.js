import React from "react";

import { Modal, Table } from "antd";

const OrderDetailsModal = ({ showModal, setShowModal, foodItems }) => {
  const columns = [
    {
      title: "Food Item",
      width: "200px",
      render: (record) => (
        <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {record.food_item_name}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "food_item_qty",
      align: "center",
    },
    {
      title: "Unit Price",
      key: "food_item_price",
      align: "center",
      render: (record) => {
        return <div>${record.food_item_price.toFixed(2)}</div>;
      },
    },
    {
      title: "Total Price",
      key: "total",
      align: "right",
      render: (record) => {
        return (
          <div>
            ${(record.food_item_price * record.food_item_qty).toFixed(2)}
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      title="Order Details"
      visible={showModal}
      footer={null}
      onCancel={() => setShowModal(false)}
      width={800}
    >
      <Table dataSource={foodItems} columns={columns} pagination={false} />
      <div className="mt-20 text-right pr-20">
        Order Total:{" "}
        <span className="text-bold">
          $
          {foodItems
            .reduce((acc, foodItem) => {
              return acc + foodItem.food_item_price * foodItem.food_item_qty;
            }, 0)
            .toFixed(2)}
        </span>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
