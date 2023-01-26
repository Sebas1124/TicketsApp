import React, { useContext, useState } from 'react'
import { Row, Col, Typography, Button, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons'
import { useHideMenu } from './../hooks/useHideMenu';
import { SocketContext } from './../context/SocketContext';
import { useForm } from '../hooks/useForm';

const { Title, Text } = Typography;


const formData = {
  paciente: '',
  category: '',
}

const formValidations = {
  paciente: [ (value) => value.includes('@') && value.includes('.'), 'El correo debe tener un "@" y un "."'],
  category: [ (value) => value.length >= 1 , 'La contraseña no es válida'],
}

export const CreateTicket = () => {

  useHideMenu(true);

  const { socket } = useContext( SocketContext );
  const [ ticket, setTicket ] = useState([])


  const { paciente, category, onInputChange, formState
  } = useForm( formData, formValidations )


  const onSubmit = ( e ) => {
    e.preventDefault();
    socket.emit('solicitar-ticket', formState, ( ticket ) => {
      setTicket( ticket )
    })
  }

  return (
    <>
        <Row>
            <Col span={ 14 } offset={ 6 } align="center">
              <Title lavel={ 3 }> Presione el boton para generar un nuevo Turno </Title>
              <form onSubmit={ onSubmit }>
                <label htmlFor="paciente">Nombre de Paciente</label>
                <Input 
                  name='paciente' 
                  value={ paciente } 
                  onChange={ onInputChange }
                  aria-label='Paciente'
                  size='large'
                  style={{ marginBottom: 7 }}
                  />
                  <label htmlFor="category">Categoria del turno</label>
                <Input 
                  name='category' 
                  value={ category } 
                  onChange={ onInputChange }
                  aria-label='cateogory'
                  size='large'
                  style={{ marginBottom: 7, display: 'flex', justifyContent: 'center' }}
                  />
                <Button
                type='primary'
                shape='round'
                icon={ <DownloadOutlined/> }
                size="large"
                htmlType='submit'
                // onClick={ newTicket }
                >
                    Generar admisión
                </Button>
              </form>
              
            </Col>

        </Row>

        {
          ticket && (
            <Row style={{ marignTop: 100 }}>
              <Col span={ 14 } offset={ 6 } align='center'>
                <Text lavel={ 2 }> Prioridad: </Text>
                <br />
                <Text type='success' style={{ fontSize: 18 }}>
                    { ticket.category }
                </Text>
              </Col>
              <Col span={ 14 } offset={ 6 } align='center'>
                <Text lavel={ 2 }> Paciente: </Text>
                <br />
                <Text type='success' style={{ fontSize: 18 }}>
                    { ticket.paciente }
                </Text>
              </Col>
              <Col span={ 14 } offset={ 6 } align='center'>
                <Text lavel={ 2 }> Turno número: </Text>
                <br />
                <Text type='success' style={{ fontSize: 18 }}>
                    { ticket.numero }
                </Text>
              </Col>
            </Row>
          )
        }
        
    </>
  )
}
