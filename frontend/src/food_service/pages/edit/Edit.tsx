import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, Modal, Divider, Row, Col, Space } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { MenuInterface } from '../../interfaces/IMenu';
import { MealInterface } from '../../interfaces/IMeal';
import { FoodCategoryInterface } from '../../interfaces/IFoodCategory';
import { GetMenus, UpdateMenu, DeleteMenuByID } from '../../services/https/MenuAPI';
import { GetMeals } from '../../services/https/MealAPI';
import { GetFoodCategories } from '../../services/https/FoodCategoryAPI';
// import Create from '../create/Create';
import './index.css';

const { Option } = Select;

const Edit: React.FC = () => {
  const [menu, setMenu] = useState<MenuInterface[]>([]);
  const [meals, setMeals] = useState<MealInterface[]>([]);
  const [foodCategories, setFoodCategories] = useState<FoodCategoryInterface[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingRecord, setEditingRecord] = useState<MenuInterface | null>(null);
  // const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await GetMenus();
      if (Array.isArray(response)) {
        setMenu(response);
      } else {
        setMenu([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await GetMeals();
      if (Array.isArray(response.data)) {
        setMeals(response.data);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }
  };

  const fetchFoodCategories = async () => {
    try {
      const response = await GetFoodCategories();
      if (Array.isArray(response.data)) {
        setFoodCategories(response.data);
      } else {
        setFoodCategories([]);
      }
    } catch (error) {
      console.error("Error fetching food category data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMeals();
    fetchFoodCategories();
  }, []);

  const handleEdit = (record: MenuInterface) => {
    setEditingKey(record.ID);
    setEditingRecord({ ...record });
  };

  const saveChanges = async () => {
    if (editingRecord) {
      try {
        const result = await UpdateMenu(editingRecord);
        if (result) {
          fetchData(); // Reload data after update
          setEditingKey(null);
          setEditingRecord(null);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditingRecord(null);
    fetchData(); // Refresh data after cancel
  };

  const deleteRecord = async (id: number) => {
    try {
      await DeleteMenuByID(id);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => deleteRecord(id),
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Menu List',
      dataIndex: 'MenuList',
      key: 'MenuList',
      render: (text: string, record: MenuInterface) => (
        editingKey === record.ID ? (
          <Input
            value={editingRecord?.MenuList || ''}
            onChange={(e) => setEditingRecord(prev => prev ? { ...prev, MenuList: e.target.value } : null)}
          />
        ) : text
      ),
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      render: (text: number, record: MenuInterface) => (
        editingKey === record.ID ? (
          <Input
            type="number"
            value={editingRecord?.Price ?? 0}
            onChange={(e) => setEditingRecord(prev => prev ? { ...prev, Price: Number(e.target.value) } : null)}
          />
        ) : text
      ),
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      render: (text: string, record: MenuInterface) => (
        editingKey === record.ID ? (
          <Input
            value={editingRecord?.Description || ''}
            onChange={(e) => setEditingRecord(prev => prev ? { ...prev, Description: e.target.value } : null)}
          />
        ) : text
      ),
    },
    {
      title: 'Meal',
      dataIndex: 'Meal',
      key: 'Meal',
      render: (item: { Name: string }, record: MenuInterface) => (
        editingKey === record.ID ? (
          <Select
            value={editingRecord?.MealID ?? undefined}
            onChange={(value) => setEditingRecord(prev => prev ? { ...prev, MealID: value } : null)}
          >
            {meals.map(meal => (
              <Option key={meal.ID} value={meal.ID}>
                {meal.Name}
              </Option>
            ))}
          </Select>
        ) : item.Name
      ),
    },
    {
      title: 'Food Category',
      dataIndex: 'FoodCategory',
      key: 'FoodCategory',
      render: (item: { Name: string }, record: MenuInterface) => (
        editingKey === record.ID ? (
          <Select
            value={editingRecord?.FoodCategoryID ?? undefined}
            onChange={(value) => setEditingRecord(prev => prev ? { ...prev, FoodCategoryID: value } : null)}
          >
            {foodCategories.map(foodCategory => (
              <Option key={foodCategory.ID} value={foodCategory.ID}>
                {foodCategory.Name}
              </Option>
            ))}
          </Select>
        ) : item.Name
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: MenuInterface) => (
        <div>
          {editingKey === record.ID ? (
            <>
              <Button onClick={saveChanges} style={{ marginRight: 8 }}>Save</Button>
              <Button onClick={cancelEdit}>Cancel</Button>
            </>
          ) : (
            <>
              <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
              <Tooltip title="Delete this item">
                <Button onClick={() => confirmDelete(record.ID)} danger>Delete</Button>
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  // const openCreatePage = () => {
  //   setShowCreate(true); // Show the Create component
  // };

  // const closeCreatePage = () => {
  //   setShowCreate(false); // Hide the Create component
  // };

  // const handleDataCreated = () => {
  //   fetchData(); // Refresh data when new data is created
  //   navigate('manage-data')
    
  // };

  // if (showCreate) {
  //   return <Create/>;
  // }

  return (
    <div className='setup-page'>
      <Row align='middle'>
        <Col span={12}>
          <h2 className='setup-page-header'>Edit Menu</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                // openCreatePage();
                navigate(`/create-menu/`);
              }}
              
              style={{marginRight: '20px'}}
            >
              Create Data
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div className='custom-table'>
        <Table dataSource={menu} columns={columns} rowKey="ID" />
      </div>
    </div>
  );
};

export default Edit;
