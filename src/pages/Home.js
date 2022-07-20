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
} from "antd";

import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useEffect } from "react";
import {
  addFoodItems,
  editFoodItems,
  getCategories,
  getFoodItems,
  updateFoodItems,
} from "../Services";
import React, { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { toast } from "react-toastify";

const { Option } = Select;

const Home = () => {
  // table code start
  const columns = [
    {
      title: "Food Item Name",
      key: "food_item_name",
      width: "32%",
      render: (record) => <p>{record.attributes.food_item_name}</p>,
    },
    {
      title: "Food Item Description",
      key: "food_item_desc",
      render: (record) => <p>{record.attributes.food_item_desc}</p>,
    },

    {
      title: "Price",
      key: "food_item_price",
      render: (record) => <p>{record.attributes.food_item_price}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => {
        return (
          <>
            <a href="#" onClick={(e) => handleEditModal(e, record)}>
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
  useEffect(() => {
    fetchMenuData();
    fetchCategories();
  }, []);

  // fetch the menu data
  const fetchMenuData = () => {
    setListProcessing(true);
    getFoodItems()
      .then((res) => {
        if (res && res.data && res.data.data && res.data.data.length > 0) {
          const foodItems = res.data.data;
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
    debugger;
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
        toast.success("Food items updated successfully");
        setIsProcessing(false);
        setVisible(false);
        fetchMenuData();
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
          toast.success("Food items saved successfully");
          resetForm();
        }
      })
      .finally(() => {
        setIsProcessing(false);
        setVisible(false);
      });
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
              </Spin>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
