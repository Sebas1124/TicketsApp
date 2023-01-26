import React from 'react'

import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';

import { SaveOutlined } from '@ant-design/icons';
import { useNavigate, Navigate } from 'react-router-dom';
import { useHideMenu } from './../hooks/useHideMenu';
import jwt_decode from 'jwt-decode'

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import { getUserStorage } from './../helpers/getUserStorage';

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export const Ingresar = () => {

  useHideMenu(false);

  const [ usuario ] = useState( getUserStorage() );

  const history = useNavigate();

  const onGoogleLogin = (response) => {

    var UserGoogle = jwt_decode(response.credential)
    console.log(UserGoogle);
  }

  const onFinish = ({ agente, escritorio }) => {

    localStorage.setItem('agente', agente)
    localStorage.setItem('escritorio', escritorio)

    history('/escritorio');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if ( usuario.agente && usuario.escritorio ) {
    return <Navigate to="/escritorio" />
  }

  return (
    <>
     <Title lavel={ 2 }> Ingresar</Title>
     <Text>Ingrese su nombre y número de consultorio</Text>
     <Divider/>

      <Form
        {...layout}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={ onFinish }
        onFinishFailed={ onFinishFailed }
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del doctor"
          name="agente"
          rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Consultorio"
          name="escritorio"
          rules={[{ required: true, message: 'Ingrese el numero de escritorio' }]}
        >
          <InputNumber min={1} max={ 99 } />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
          <Button type="primary" htmlType="submit" shape='round'>
          <SaveOutlined />
            Ingresar
          </Button>
          <br /> <br />
          <GoogleOAuthProvider clientId="76843581765-1i3l367gmut57cjakun9mqaho3i814g7.apps.googleusercontent.com">
            <GoogleLogin
              clientId="76843581765-1i3l367gmut57cjakun9mqaho3i814g7.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={onGoogleLogin}
              onFailure={onFinishFailed}
              cookiePolicy={'single_host_origin'}
            />,
          </GoogleOAuthProvider>
        </Form.Item>
      </Form>
    </>
    
  )
}
