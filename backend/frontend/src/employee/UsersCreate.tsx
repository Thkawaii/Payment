import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { CreateEmployee, GetPositions } from "./services/https";
import { PositionInterface } from "./interfaces/IPosition";
import { EmployeeInterface } from "./interfaces/IEmployee";
import {
  Space,
  Button,
  Col,
  Row,
  Form,
  Input,
  message,
  Select,
  DatePicker,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

const { Option } = Select;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function UserCreate() {
  const [positions, setPositions] = useState<PositionInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();

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

  const onFinish = async (values: EmployeeInterface) => {
    values.Profile = fileList[0].thumbUrl;
    console.log("Data sent to API:", values);
    try {
      const res = await CreateEmployee(values);
      console.log("API Response:", res);
      if (res) {
        messageApi.open({
          type: "success",
          content: "Data saved successfully",
        });
        setTimeout(() => navigate("/login/employee"), 500);
      } else {
        messageApi.open({
          type: "error",
          content: "Error !",
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      messageApi.open({
        type: "error",
        content: "Error !",
      });
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await GetPositions();
      if (Array.isArray(response)) {
        setPositions(response);
      } else {
        console.error("Data fetched is not an array:", response);
        setPositions([]);
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <React.Fragment>
      {contextHolder}
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="create-form"
          style={{ boxShadow: "none", borderRadius: 0 }}
        >
          <Row gutter={20} justify="start" style={{ width: "100%" }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
                    beforeUpload={(file) => {
                      setFileList([...fileList, file]);
                      return false;
                    }}
                    maxCount={1}
                    multiple={false}
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

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="First Name"
                name="FirstName"
                rules={[{ required: true, message: "กรุณากรอกชื่อ !" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Last Name"
                name="LastName"
                rules={[{ required: true, message: "กรุณากรอกนามสกุล !" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Email"
                name="Email"
                rules={[{ required: true, message: "กรุณากรอกอีเมล !" }]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Gender"
                name="Gender"
                rules={[{ required: true, message: "กรุณาระบุเพศ !" }]}
              >
                <Select placeholder="Select gender" allowClear>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Date of Birth"
                name="Date_of_Birth"
                rules={[{ required: true, message: "กรุณาเลือกวันเกิด !" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="PositionID"
                label="Position"
                rules={[{ required: true, message: "กรุณาระบุตำแหน่ง !" }]}
              >
                <Select placeholder="Select a position" allowClear>
                  {positions.map((item) => (
                    <Option value={item.ID} key={item.ID}>
                      {item.Position_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <NavLink to="/login/employee">
                    <Button style={{ marginRight: "10px" }}>Cancel</Button>
                  </NavLink>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    Create
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
