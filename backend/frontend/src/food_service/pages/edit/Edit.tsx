import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Button, Input, Select, Tooltip, Modal, Divider, Row, Col, Space, UploadFile, UploadProps, GetProp } from 'antd';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from "@ant-design/icons";
import { MenuInterface } from '../../interfaces/IMenu';
import { MealInterface } from '../../interfaces/IMeal';
import { FoodCategoryInterface } from '../../interfaces/IFoodCategory';
import { GetMenus, UpdateMenu, DeleteMenuByID } from '../../services/https/MenuAPI';
import { GetMeals } from '../../services/https/MealAPI';
import { GetFoodCategories } from '../../services/https/FoodCategoryAPI';
// import { UploadOutlined } from '@ant-design/icons';
import './index.css';

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Edit: React.FC = () => {
  const [menu, setMenu] = useState<MenuInterface[]>([]);
  const [meals, setMeals] = useState<MealInterface[]>([]);
  const [foodCategories, setFoodCategories] = useState<FoodCategoryInterface[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingRecord, setEditingRecord] = useState<MenuInterface | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const location = useLocation();


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

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  
  
  const saveChanges = async () => {
    if (editingRecord) {
      try {
        if (fileList.length > 0) {
          editingRecord.ImageMenu = fileList[0].thumbUrl; // ใช้ thumbUrl ของไฟล์ที่เลือก
        }
    
        // Update the menu item
        const result = await UpdateMenu(editingRecord); // Ensure this API function handles the updated ImageMenu
        if (result) {
          message.success('Updated successfully');
          console.log('Updated:', result);
          fetchData(); // Load updated data
          setEditingKey(null);
          setEditingRecord(null);
          setFileList([]); // Clear the selected image file
        } else {
          message.error('Failed to update data');
        }
      } catch (error) {
        console.error("Error updating data:", error);
        message.error('Error occurred while updating data');
      }
    }
  };
  
  const cancelEdit = () => {
    setEditingKey(null);
    setEditingRecord(null);
    fetchData(); // รีเฟรชข้อมูลหลังยกเลิกการแก้ไข
  };

  const deleteRecord = async (id: number) => {
    try {
      await DeleteMenuByID(id);
      fetchData(); // รีเฟรชข้อมูลหลังการลบ
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
      title: "Image",
      dataIndex: "ImageMenu",
      key: "ImageMenu",
      render: (_text: unknown, record: MenuInterface) => (
        editingKey === record.ID ? (
          <ImgCrop rotationSlider>
            <Upload
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={(file) => {
                  setFileList([file]);
                  return false; 
                }}
                maxCount={1}
                multiple={false}
                listType="picture-card"
            >
                <div>
                    <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </Upload>
        </ImgCrop>
        ) : (
          <img src={record.ImageMenu} className="image-edit" width="100%" />
        )
      )
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
        <div className='container-edit-button'>
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
                navigate(`${location.pathname}/create-menu/`);
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
