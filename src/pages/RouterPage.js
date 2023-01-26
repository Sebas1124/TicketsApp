
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';

import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useContext } from 'react';
import { Ingresar } from './Ingresar';
import { Cola } from './Cola';
import { CreateTicket } from './CreateTicket';
import { Escritorio } from './Escritorio';
import { UiContext } from '../context/UiContext';
const {  Sider, Content } = Layout;

export const RouterPage = () => {
    
    const { ocultarMenu } = useContext( UiContext );

  return (
    <Router>
        <Layout style={{ height:'100vh' }}>
            <Sider collapsedWidth="0" breakpoint="md" hidden={ ocultarMenu }>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={ <UserOutlined/> }>
                    <Link to="/Ingresar">
                        Ingresar
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={ <VideoCameraOutlined/> }>
                    <Link to="/cola">
                        Cola de tickets
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={ <UploadOutlined/> }>
                    <Link to="/crear">
                        Crear tickets
                    </Link>
                </Menu.Item>
            </Menu>
            </Sider>
        <Layout className="site-layout">
            <Content
                className="site-layout-background"
                style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                }}
            >
                <Routes>
                    <Route path='/ingresar' element={ <Ingresar/> }/>
                    <Route path='/cola' element={ <Cola/> }/>
                    <Route path='/crear' element={ <CreateTicket/> }/>
                    <Route path='/escritorio' element={ <Escritorio/> }/>
                    <Route path="*" element={ <Ingresar/> }/>
                </Routes>

            </Content>
        </Layout>
        </Layout>
    </Router>
  )
}
