import {
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Spin,
  Pagination,
  notification,
} from "antd";

import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import {
  addFoodItems,
  deleteFoodItem,
  getCategories,
  getFoodItems,
  updateFoodItems,
} from "../Services";
import React, { useState } from "react";
import TextArea from "antd/lib/input/TextArea";

import confirm from "antd/lib/modal/confirm";
const { Option } = Select;

const Home = () => {
  // table code start
  const columns = [
    {
      title: "Food Item Name",
      key: "food_item_name",
      width: "10%",
      render: (record) => <p>{record.attributes.food_item_name}</p>,
    },
    {
      title: "Food Item Description",
      key: "food_item_desc",
      width: "10%",
      render: (record) => <p>{record.attributes.food_item_desc}</p>,
    },

    {
      title: "Price",
      key: "food_item_price",
      width: "10%",
      render: (record) => <p>{`$${record.attributes.food_item_price}`}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (record) => {
        return (
          <>
            <a href="#" onClick={(e) => handleEditModal(e, record)}>
              <Button type="primary" size="small">
                Edit
              </Button>
            </a>
            <a
              style={{ marginLeft: "5px", color: "#f00" }}
              href="#"
              onClick={(e) => handleDeleteFoodItem(e, record)}
            >
              <Button type="danger" size="small">
                Delete
              </Button>
            </a>
          </>
        );
      },
    },
  ];

  const [listProcessing, setListProcessing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [foodItemName, setFoodItemName] = useState("");
  const [foodItemDesc, setFoodItemDesc] = useState("");
  const [price, setPrice] = useState("");
  const [foodCateogry, setFoodCategory] = useState([]);
  const [modalType, setModalType] = useState("add");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [perPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchMenuData(pageNo);
    fetchCategories();
  }, []);

  // fetch the menu data
  const fetchMenuData = (currPage) => {
    setListProcessing(true);
    getFoodItems(currPage, perPage)
      .then((res) => {
        if (res && res.data && res.data.data && res.data.data.length > 0) {
          const foodItems = res.data.data;
          setTotalRecords(res.data.meta.pagination.total);
          setItems(foodItems);
        }
      })
      .finally(() => {
        setListProcessing(false);
      });
  };

  const fetchCategories = () => {
    const categories = getCategories();
    categories.then((res) => {
      if (res && res.data && res.data.data) {
        const categoryList = res.data.data;
        setCategories(categoryList);
      }
    });
  };

  // show the modal
  const showModal = () => {
    setVisible(true);
    setModalType("add");
  };

  // edit the value in the modal
  const handleEditModal = (e, record) => {
    setSelectedItemId(record.id);
    setFoodItemName(record.attributes.food_item_name);
    setFoodItemDesc(record.attributes.food_item_desc);
    setPrice(record.attributes.food_item_price);
    setFoodCategory(
      record.attributes.categories.data.map((item) => {
        return item.id;
      })
    );
    e.preventDefault();
    setVisible(true);
    setModalType("update");
  };

  // function to update the food item values
  const handleUpdateFoodItem = () => {
    setIsProcessing(true);
    const params = {
      data: {
        food_item_name: foodItemName,
        food_item_desc: foodItemDesc,
        food_item_price: price,
        categories: foodCateogry,
      },
    };
    updateFoodItems(params, selectedItemId).then((res) => {
      if (res.data) {
        notification.success({
          message: "Success",
          description: "Food item has been updated successfully",
        });
        setIsProcessing(false);
        setVisible(false);
        fetchMenuData(pageNo);
      }
    });
  };

  // reset the form fields
  const resetForm = () => {
    setFoodItemName("");
    setFoodItemDesc("");
    setPrice("");
    setFoodCategory("");
  };
  // add food items in the db
  const handleAddFoodItems = () => {
    setIsProcessing(true);
    const params = {
      data: {
        food_item_name: foodItemName,
        food_item_desc: foodItemDesc,
        food_item_price: price,
        categories: foodCateogry,
      },
    };
    addFoodItems(params)
      .then((res) => {
        if (res.data) {
          notification.success({
            message: "Success",
            description: "Food item has been saved successfully",
          });
          resetForm();
          fetchMenuData(pageNo);
        }
      })
      .finally(() => {
        setIsProcessing(false);
        setVisible(false);
      });
  };

  // delete food items from the api
  const handleDeleteFoodItem = (e, record) => {
    e.preventDefault();
    confirm({
      title: "Are you sure you want to delete this record?",
      onOk() {
        deleteFoodItem(record.id).then((res) => {
          if (res.data) {
            notification.success({
              message: "Success",
              description: "Food item has been removed successfully!",
            });
            fetchMenuData(pageNo);
          }
        });
      },
      okCancel() {},
    });
  };

  const onPageChange = (pageNo) => {
    fetchMenuData(pageNo);
    setPageNo(pageNo);
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Row justify="space-between" align="center">
              <Col>
                <h2>Menu Table</h2>
              </Col>
              <Col>
                <Button type="primary" size="small" onClick={() => showModal()}>
                  <FaPlus type="plus" />
                  Add Food Item
                </Button>

                {modalType === "add" ? (
                  <Modal
                    title="Add food item"
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    footer={null}
                  >
                    <Form>
                      <Form.Item>
                        <Input
                          size="small"
                          placeholder="Food item name"
                          onChange={(e) => setFoodItemName(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <TextArea
                          size="small"
                          placeholder="Description..."
                          rows={3}
                          onChange={(e) => setFoodItemDesc(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Input
                          size="small"
                          placeholder="Price"
                          type="number"
                          maxLength={10}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Select
                          mode="multiple"
                          placeholder="Category"
                          value={foodCateogry}
                          onChange={setFoodCategory}
                        >
                          {categories.map((catObj) => {
                            return (
                              <Option value={catObj.id}>
                                {catObj.attributes.category_name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Row align="end">
                        <Col>
                          <Button
                            type="primary"
                            size="small"
                            onClick={handleAddFoodItems}
                            loading={isProcessing}
                          >
                            Submit
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            type="link"
                            size="small"
                            onClick={() => setVisible(false)}
                          >
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Modal>
                ) : (
                  <Modal
                    title="Update food item"
                    visible={visible}
                    footer={null}
                    onCancel={() => setVisible(false)}
                  >
                    <Form>
                      <Form.Item>
                        <Input
                          size="small"
                          placeholder="Food item name"
                          onChange={(e) => setFoodItemName(e.target.value)}
                          value={foodItemName}
                        />
                      </Form.Item>
                      <Form.Item>
                        <TextArea
                          size="small"
                          placeholder="Description..."
                          rows={3}
                          onChange={(e) => setFoodItemDesc(e.target.value)}
                          value={foodItemDesc}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Input
                          size="small"
                          placeholder="Price"
                          type="number"
                          maxLength={10}
                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Select
                          mode="multiple"
                          placeholder="Category"
                          value={foodCateogry}
                          onChange={setFoodCategory}
                        >
                          {categories.map((catObj) => {
                            return (
                              <Option value={catObj.id}>
                                {catObj.attributes.category_name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Row align="end">
                        <Col>
                          <Button type="primary" onClick={handleUpdateFoodItem}>
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Modal>
                )}
              </Col>
            </Row>
            <div className="table-responsive">
              <Spin spinning={listProcessing}>
                <Table
                  columns={columns}
                  dataSource={items}
                  pagination={false}
                  className="ant-border-space mt-10"
                />
                <Row type="flex" align="end" className="mt-10 mb-20">
                  <Col>
                    <Pagination
                      current={pageNo}
                      pageSize={perPage}
                      total={totalRecords}
                      onChange={onPageChange}
                      responsive={true}
                      showTotal={(totalRecords) => `${totalRecords} results`}
                    />
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

export default Home;
