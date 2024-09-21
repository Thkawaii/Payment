import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { PieChartOutlined, UserOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, theme } from 'antd';
import { MdFastfood, MdOutlinePayment, MdOutlineBedroomParent, MdMeetingRoom,MdBorderColor } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoReceiptOutline } from "react-icons/io5";
import logo from "./assets/logo.png";
import './index.css'

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/login/dashboard">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem('Room', 'sub1', undefined, [
    getItem(<Link to="/login/room">Booking</Link>, '2', <MdOutlineBedroomParent />),
    getItem(<Link to="/login/customer">Create Customer</Link>, '3', <UserOutlined />),
    getItem(<Link to="/login/edit">Edite Booking</Link>, '4', <MdBorderColor />),
  ]),
  getItem(<Link to="/login/meeting-room">Meeting Room</Link>, '5', <MdMeetingRoom/>),
  getItem('Food', 'sub2', undefined, [
    getItem(<Link to="/login/food-service">Food Service</Link>, '6', <MdFastfood />),
    getItem(<Link to="/login/manage-data">Manage Data</Link>, '7', <TableOutlined />),
  ]),
  getItem(<Link to="/login/employee">Employee</Link>, '8', <UserOutlined />),
  getItem('Payment', 'sub3', undefined, [
    getItem(<Link to="/login/payment">Payment</Link>, '9', <MdOutlinePayment />),
    getItem(<Link to="/login/receipt">Receipt</Link>, '10', <IoReceiptOutline />),
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo">
            <img
                src={logo}
                alt="Logo"
                style={{ width: "80%", margin: "10px"}}
              />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
          <div className='container-logout-button'>
            <Link to="/">
              <Button className='logout-button'>
                <RiLogoutBoxLine />
                logout
              </Button>
            </Link>
          </div>
        </Sider>
        <Layout>
          <Content style={{ margin: '16px', padding: '16px', height: '100%' }}>
            <div
              style={{
                height: '100%',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            > 
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
