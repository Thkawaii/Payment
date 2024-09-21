import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker, Select, message, Row, Col, Space, Upload } from "antd";
import { EmployeeInterface } from "./interfaces/IEmployee";
import { PositionInterface } from "./interfaces/IPosition";
import { UpdateEmployee, GetPositions, GetEmployeeById } from "./services/https";
import dayjs from "dayjs";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";

const { Option } = Select;

export default function UsersUpdate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [employee, setEmployee] = useState<EmployeeInterface>();
  const [positions, setPositions] = useState<PositionInterface[]>([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { id } = useParams();

  const onFinish = async (values: EmployeeInterface) => {
    const updatedEmployee = {
      ...employee,
      ...values,
      Date_of_Birth: values.Date_of_Birth ? dayjs(values.Date_of_Birth).toISOString() : "",
      Profile: fileList.length > 0 ? fileList[0].thumbUrl : employee?.Profile, // Use new profile image or keep old one
    };
    try {
      const res = await UpdateEmployee(updatedEmployee.ID, updatedEmployee);
      if (res) {
        messageApi.success("อัปเดตข้อมูลสำเร็จ!");
        setTimeout(() => {
          navigate("/login/employee"); // เปลี่ยนเส้นทางไปหน้าแรก
        }, 2000);
      } else {
        messageApi.error("อัปเดตข้อมูลไม่สำเร็จ!");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      messageApi.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล!");
    }
  };

  const getPositions = async () => {
    try {
      const res = await GetPositions();
      if (res) {
        setPositions(res);
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const getUserById = async () => {
    try {
      const res = await GetEmployeeById(Number(id));
      if (res) {
        setEmployee(res);
        form.setFieldsValue({
          FirstName: res.FirstName,
          LastName: res.LastName,
          Gender: res.Gender,
          Email: res.Email,
          Date_of_Birth: dayjs(res.Date_of_Birth),
          PositionID: res.PositionID,
        });

        // Convert the existing profile URL to UploadFile type
        setFileList(res.Profile ? [{ uid: '-1', name: 'profile-image', url: res.Profile }] : []); 
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  useEffect(() => {
    getPositions();
    getUserById();
  }, [id]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <React.Fragment>
      {contextHolder}
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="รูปประจำตัว"
                name="Profile"
                valuePropName="fileList"
              >
                <ImgCrop rotationSlider>
                  <Upload
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={() => false} // Prevent automatic upload
                    maxCount={1}
                    listType="picture-card"
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>อัพโหลด</div>
                    </div>
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="ชื่อจริง"
                name="FirstName"
                rules={[{ required: true, message: "กรุณากรอกชื่อ!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="นามสกุล"
                name="LastName"
                rules={[{ required: true, message: "กรุณากรอกนามสกุล!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="อีเมล"
                name="Email"
                rules={[{ type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง!" }, { required: true, message: "กรุณากรอกอีเมล!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="วัน/เดือน/ปี เกิด"
                name="Date_of_Birth"
                rules={[{ required: true, message: "กรุณาเลือกวันเกิด!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="เพศ"
                name="Gender"
                rules={[{ required: true, message: "กรุณาระบุเพศ!" }]}
              >
                <Select allowClear>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="ตำแหน่ง"
                name="PositionID"
                rules={[{ required: true, message: "กรุณาเลือกตำแหน่ง!" }]}
              >
                <Select allowClear>
                  {positions.map((position) => (
                    <Option value={position.ID} key={position.ID}>
                      {position.Position_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Form.Item>
                <Space>
                  <Button onClick={() => navigate("/login/employee")} htmlType="button">
                    ยกเลิก
                  </Button>
                  <Button type="primary" htmlType="submit">
                    ยืนยัน
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Container>
    </React.Fragment>
  );
}
